import { type User, type InsertUser, type Task, type InsertTask } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getTasks(): Promise<Task[]>;
  getTask(id: number): Promise<Task | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private tasks: Map<number, Task>;

  constructor() {
    this.users = new Map();
    this.tasks = new Map();
    this.initializeTasks();
  }

  private initializeTasks() {
    const exampleTasks: Task[] = [
      {
        id: 1,
        title: "Fluxograma de Cadastro",
        description: "Criar um fluxograma completo para o processo de cadastro de livros, autores e categorias em um sistema bibliotecário.",
        deadline: "2025-11-15",
        route: "/tarefa/1",
        difficulty: "Intermediário"
      },
      {
        id: 2,
        title: "Fluxograma de Login",
        description: "Desenvolver um fluxograma detalhado para o processo de autenticação de usuários, incluindo validação de credenciais e recuperação de senha.",
        deadline: "2025-11-20",
        route: "/tarefa/2",
        difficulty: "Básico"
      },
      {
        id: 3,
        title: "Fluxograma de Checkout",
        description: "Criar um fluxograma para o processo de checkout em um e-commerce, incluindo validação de pagamento e envio de confirmação.",
        deadline: "2025-11-25",
        route: "/tarefa/3",
        difficulty: "Avançado"
      },
      {
        id: 4,
        title: "Processo de Matrícula do ISPTEC",
        description: "Modelar o processo completo de matrícula no ISPTEC, desde a divulgação até a entrega do cartão de estudante, incluindo exames de acesso e validações.",
        deadline: "2025-12-01",
        route: "/tarefa/4",
        difficulty: "Avançado"
      }
    ];

    exampleTasks.forEach(task => {
      this.tasks.set(task.id, task);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getTasks(): Promise<Task[]> {
    return Array.from(this.tasks.values());
  }

  async getTask(id: number): Promise<Task | undefined> {
    return this.tasks.get(id);
  }
}

export const storage = new MemStorage();
