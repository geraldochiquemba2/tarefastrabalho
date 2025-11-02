import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import FlowchartCanvas from "@/components/FlowchartCanvas";
import FlowchartLegend from "@/components/FlowchartLegend";
import type { Task } from "@shared/schema";

export default function TaskPage() {
  const [, params] = useRoute("/tarefa/:id");
  const taskId = params?.id ? parseInt(params.id) : 1;

  const { data: task, isLoading } = useQuery<Task>({
    queryKey: ["/api/tasks", String(taskId)],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando tarefa...</p>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Tarefa não encontrada</h2>
          <p className="text-muted-foreground mb-4">
            A tarefa que você está procurando não existe.
          </p>
          <Link href="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para início
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-background">
      <div className="border-b border-border bg-card px-4 py-3 flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon" data-testid="button-back">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-lg font-semibold" data-testid="text-task-title">
            {task.title}
          </h1>
          <p className="text-sm text-muted-foreground" data-testid="text-task-description">
            {task.description}
          </p>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 border-r border-border bg-sidebar p-4 overflow-y-auto">
          <FlowchartLegend />

          <div className="mt-6 p-4 rounded-md bg-primary/5 border border-primary/20">
            <h4 className="text-sm font-medium mb-2">Sobre o Fluxo</h4>
            <p className="text-xs text-muted-foreground">
              Este fluxograma representa o processo completo de cadastro no sistema
              bibliotecário, incluindo validação, etiquetagem e sincronização.
            </p>
          </div>

          <div className="mt-4 p-4 rounded-md bg-card border border-card-border">
            <h4 className="text-sm font-medium mb-2">Prazo de Entrega</h4>
            <p className="text-xs text-muted-foreground">
              {new Date(task.deadline).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="flex-1">
          <FlowchartCanvas taskId={taskId} />
        </div>
      </div>
    </div>
  );
}
