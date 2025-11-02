import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Book, Calendar, Award, Workflow } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Task } from "@shared/schema";
import backgroundImage from "@assets/stock_images/modern_tech_workspac_de275496.jpg";

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
      {/* Hero Section with Gradient Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-background"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--chart-2)/0.1),transparent_50%)]"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)/0.08) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
        
        <header className="relative border-b border-border/50 backdrop-blur-sm bg-card/30">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10 backdrop-blur-sm border border-primary/20">
                <Workflow className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Engenharia de Software
                </h1>
                <p className="text-lg text-muted-foreground mt-1">
                  Plataforma de Entregas de Fluxogramas
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="relative container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-3">Tarefas Disponíveis</h2>
            <p className="text-lg text-muted-foreground">
              Escolha uma tarefa abaixo para visualizar e desenvolver seu fluxograma
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Section with Background Image */}
      <div className="relative py-16 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-chart-2/10"></div>
        </div>

        <main className="container mx-auto px-4 relative z-10">

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse backdrop-blur-sm bg-card/80">
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
                className="hover-elevate transition-all duration-300 backdrop-blur-sm bg-card/80 border-card-border/50 overflow-hidden group"
                data-testid={`card-task-${task.id}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="relative">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="p-2 rounded-md bg-primary/10">
                      <Book className="w-5 h-5 text-primary" />
                    </div>
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
                <CardContent className="space-y-4 relative">
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

          <div className="mt-12 p-8 rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(var(--primary)/0.15),transparent_50%)]"></div>
            <div className="flex items-start gap-4 relative">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Sobre a Plataforma</h3>
                <p className="text-muted-foreground leading-relaxed">
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
    </div>
  );
}
