import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Book, Calendar, Award, Workflow } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Task } from "@shared/schema";

export default function LandingPage() {
  const { data: tasks, isLoading } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Básico":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
      case "Intermediário":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20";
      case "Avançado":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-primary/10">
              <Workflow className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Engenharia de Software</h1>
              <p className="text-muted-foreground">
                Plataforma de Entregas de Fluxogramas
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Tarefas Disponíveis</h2>
          <p className="text-muted-foreground">
            Escolha uma tarefa abaixo para visualizar e desenvolver seu fluxograma
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-20 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tasks?.map((task) => (
              <Card
                key={task.id}
                className="hover-elevate transition-all duration-200"
                data-testid={`card-task-${task.id}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Book className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <Badge
                      className={getDifficultyColor(task.difficulty)}
                      data-testid={`badge-difficulty-${task.id}`}
                    >
                      {task.difficulty}
                    </Badge>
                  </div>
                  <CardTitle data-testid={`text-title-${task.id}`}>
                    {task.title}
                  </CardTitle>
                  <CardDescription data-testid={`text-description-${task.id}`}>
                    {task.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span data-testid={`text-deadline-${task.id}`}>
                      Prazo: {formatDate(task.deadline)}
                    </span>
                  </div>
                  <Link href={task.route}>
                    <Button
                      className="w-full"
                      data-testid={`button-view-task-${task.id}`}
                    >
                      Ver Tarefa
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-12 p-6 rounded-md bg-primary/5 border border-primary/20">
          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Sobre a Plataforma</h3>
              <p className="text-sm text-muted-foreground">
                Esta plataforma foi desenvolvida para auxiliar no aprendizado e prática de
                modelagem de processos através de fluxogramas. Cada tarefa apresenta um
                cenário diferente que você deve modelar seguindo as melhores práticas de
                Engenharia de Software.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
