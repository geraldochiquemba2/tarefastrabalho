import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { updateTaskSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/tasks", async (_req, res) => {
    try {
      const tasks = await storage.getTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar tarefas" });
    }
  });

  app.get("/api/tasks/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const task = await storage.getTask(id);
      if (!task) {
        return res.status(404).json({ message: "Tarefa não encontrada" });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar tarefa" });
    }
  });

  app.patch("/api/tasks/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updateTaskSchema.parse(req.body);
      const updatedTask = await storage.updateTask(id, validatedData);
      
      if (!updatedTask) {
        return res.status(404).json({ message: "Tarefa não encontrada" });
      }
      
      res.json(updatedTask);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      }
      res.status(500).json({ message: "Erro ao atualizar tarefa" });
    }
  });

  app.post("/api/tasks/:id/flowchart", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { nodes, edges } = req.body;
      
      if (!nodes || !edges) {
        return res.status(400).json({ message: "nodes e edges são obrigatórios" });
      }
      
      if (!Array.isArray(nodes) || !Array.isArray(edges)) {
        return res.status(400).json({ message: "nodes e edges devem ser arrays" });
      }
      
      const nodeSchema = z.object({
        id: z.string(),
        type: z.string(),
        position: z.object({
          x: z.number(),
          y: z.number(),
        }),
        data: z.object({
          label: z.string(),
          type: z.string(),
          description: z.string().optional(),
          details: z.array(z.string()).optional(),
          icon: z.string().optional(),
        }),
      });
      
      const edgeSchema = z.object({
        id: z.string(),
        source: z.string(),
        target: z.string(),
        label: z.string().optional(),
        animated: z.boolean().optional(),
        style: z.record(z.any()).optional(),
      });
      
      const flowchartSchema = z.object({
        nodes: z.array(nodeSchema).max(100),
        edges: z.array(edgeSchema).max(200),
      });
      
      const validatedData = flowchartSchema.parse({ nodes, edges });
      const flowchartData = JSON.stringify(validatedData);
      
      if (flowchartData.length > 100000) {
        return res.status(400).json({ message: "Dados do fluxograma muito grandes" });
      }
      
      const updatedTask = await storage.updateTask(id, { flowchartData });
      
      if (!updatedTask) {
        return res.status(404).json({ message: "Tarefa não encontrada" });
      }
      
      res.json(updatedTask);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Dados do fluxograma inválidos", errors: error.errors });
      }
      res.status(500).json({ message: "Erro ao salvar fluxograma" });
    }
  });

  app.post("/api/tasks/reorder", async (req, res) => {
    try {
      const { taskIds } = req.body;
      
      if (!Array.isArray(taskIds)) {
        return res.status(400).json({ message: "taskIds deve ser um array" });
      }
      
      if (!taskIds.every(id => typeof id === 'number' && Number.isInteger(id))) {
        return res.status(400).json({ message: "Todos os IDs devem ser números inteiros" });
      }
      
      const allTasks = await storage.getTasks();
      const allTaskIds = allTasks.map(t => t.id).sort((a, b) => a - b);
      const providedIds = [...taskIds].sort((a, b) => a - b);
      
      if (allTaskIds.length !== providedIds.length || 
          !allTaskIds.every((id, index) => id === providedIds[index])) {
        return res.status(400).json({ 
          message: "taskIds deve conter todos os IDs de tarefas existentes exatamente uma vez" 
        });
      }
      
      await storage.updateTasksOrder(taskIds);
      const tasks = await storage.getTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Erro ao reordenar tarefas" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
