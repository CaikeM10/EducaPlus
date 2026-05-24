import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { Button } from "../components/ui/button";

import { Progress } from "../components/ui/progress";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

import { Badge } from "../components/ui/badge";

import {
  ArrowLeft,
  Play,
  FileText,
  CheckCircle2,
  Circle,
  Clock3,
  BookOpen,
  Download,
  Sparkles,
} from "lucide-react";

import { api } from "../services/api";

export default function LearningPathDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pathData, setPathData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPath();
  }, []);

  async function loadPath() {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        `/learning-paths/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setPathData(response.data);
    } catch (error) {
      console.error(
        "Erro ao carregar trilha:",
        error,
      );
    } finally {
      setLoading(false);
    }
  }

  async function toggleStep(stepId: string, completed: boolean) {
    try {
      await api.post("/learning-paths/progress", {
        stepId,
        completed,
      });

      setPathData((current: any) => {
        if (!current) return current;

        return {
          ...current,
          steps: current.steps.map((step: any) =>
            step.id === stepId ? { ...step, completed } : step,
          ),
        };
      });
    } catch (error) {
      console.error("Erro ao atualizar progresso:", error);
      alert("Não foi possível atualizar o progresso.");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />

          <div>
            <h2 className="text-lg font-semibold">
              Carregando trilha...
            </h2>

            <p className="text-sm text-muted-foreground">
              Preparando sua experiência de aprendizado
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!pathData) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-20 text-center">
          <div className="bg-muted w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-muted-foreground" />
          </div>

          <h2 className="text-xl font-semibold mb-2">
            Trilha não encontrada
          </h2>

          <p className="text-muted-foreground mb-6">
            Parece que esta trilha não existe ou foi removida.
          </p>

          <Button onClick={() => navigate("/app/learning-paths")}>
            Voltar para Trilhas
          </Button>
        </CardContent>
      </Card>
    );
  }

  const completedLessons =
    pathData.steps?.filter(
      (step: any) => step.completed,
    ).length || 0;

  const totalLessons =
    pathData.steps?.length || 0;

  const progress =
    totalLessons > 0
      ? (completedLessons / totalLessons) * 100
      : 0;

  const allResources =
    pathData.steps?.flatMap(
      (step: any) => step.resources || [],
    ) || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <Button
            variant="ghost"
            className="mb-4 pl-0 hover:bg-transparent"
            onClick={() =>
              navigate("/app/learning-paths")
            }
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Trilhas
          </Button>

          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/10 border-0">
              <Sparkles className="w-3 h-3 mr-1" />
              Aprendizado Personalizado
            </Badge>

            <Badge variant="outline">
              {totalLessons} aulas
            </Badge>
          </div>

          <h1 className="text-4xl font-bold tracking-tight mb-3">
            {pathData.title}
          </h1>

          <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
            {pathData.description}
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="border-0 shadow-md bg-gradient-to-r from-primary/5 via-background to-secondary/5">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Progresso Geral
              </p>

              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold">
                  {Math.round(progress)}%
                </span>

                <span className="text-muted-foreground mb-1">
                  concluído
                </span>
              </div>

              <Progress
                value={progress}
                className="h-2"
              />
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-background border">
              <div className="bg-primary/10 p-3 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>

              <div>
                <p className="text-2xl font-bold">
                  {completedLessons}
                </p>

                <p className="text-sm text-muted-foreground">
                  Aulas concluídas
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-background border">
              <div className="bg-secondary/10 p-3 rounded-xl">
                <Clock3 className="w-6 h-6 text-secondary" />
              </div>

              <div>
                <p className="text-2xl font-bold">
                  {totalLessons}
                </p>

                <p className="text-sm text-muted-foreground">
                  Conteúdos disponíveis
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs
        defaultValue="lessons"
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px] h-12">
          <TabsTrigger value="lessons">
            Aulas
          </TabsTrigger>

          <TabsTrigger value="materials">
            Materiais
          </TabsTrigger>
        </TabsList>

        {/* Lessons */}
        <TabsContent
          value="lessons"
          className="space-y-6 mt-6"
        >
          {/* Video Hero */}
          <Card className="overflow-hidden border-0 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl">
                Aula de Introdução
              </CardTitle>

              <CardDescription className="text-base">
                Assista à visão geral da trilha e prepare-se
                para começar sua jornada.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-secondary flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10" />

                <div className="relative text-center text-white">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-5 inline-flex mb-4 hover:scale-105 transition-transform cursor-pointer">
                    <Play className="w-10 h-10 ml-1" />
                  </div>

                  <h3 className="text-xl font-semibold mb-2">
                    Iniciar Aula
                  </h3>

                  <p className="text-sm text-white/80">
                    O conteúdo em vídeo será exibido aqui
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lessons List */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl">
                Conteúdo da Trilha
              </CardTitle>

              <CardDescription>
                Explore todas as aulas disponíveis
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {pathData.steps?.map(
                  (step: any, index: number) => (
                    <div
                      key={step.id}
                      className="group border rounded-2xl p-5 hover:shadow-md hover:border-primary/20 transition-all bg-background"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div
                            className={`mt-1 p-2 rounded-xl ${
                              step.completed
                                ? "bg-secondary/10"
                                : "bg-muted"
                            }`}
                          >
                            {step.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-secondary" />
                            ) : (
                              <Circle className="w-5 h-5 text-muted-foreground" />
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <Badge
                                variant="outline"
                                className="text-xs"
                              >
                                Aula {index + 1}
                              </Badge>

                              {step.completed && (
                                <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/10 border-0">
                                  Concluída
                                </Badge>
                              )}
                            </div>

                            <h3
                              className={`font-semibold text-lg ${
                                step.completed
                                  ? "line-through text-muted-foreground"
                                  : ""
                              }`}
                            >
                              {step.title}
                            </h3>

                            <p className="text-sm text-muted-foreground mt-1">
                              Continue desenvolvendo suas habilidades com conteúdos práticos e acessíveis.
                            </p>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          variant={
                            step.completed
                              ? "outline"
                              : "default"
                          }
                          onClick={() =>
                            toggleStep(
                              step.id,
                              !step.completed,
                            )
                          }
                          className={
                            !step.completed
                              ? "bg-primary hover:bg-primary/90"
                              : ""
                          }
                        >
                          {step.completed
                            ? "Marcar pendente"
                            : "Concluir"}
                        </Button>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Materials */}
        <TabsContent
          value="materials"
          className="mt-6"
        >
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl">
                Materiais Complementares
              </CardTitle>

              <CardDescription>
                Recursos para aprofundar seu aprendizado
              </CardDescription>
            </CardHeader>

            <CardContent>
              {allResources.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="bg-muted w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-muted-foreground" />
                  </div>

                  <h3 className="text-lg font-semibold mb-2">
                    Nenhum material disponível
                  </h3>

                  <p className="text-muted-foreground">
                    Os materiais complementares aparecerão aqui.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {allResources.map(
                    (resource: any) => (
                      <div
                        key={resource.id}
                        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border rounded-2xl p-5 hover:shadow-md transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 p-3 rounded-xl">
                            <FileText className="w-6 h-6 text-primary" />
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">
                                {resource.title}
                              </h3>

                              <Badge variant="outline">
                                {resource.type}
                              </Badge>
                            </div>

                            <p className="text-sm text-muted-foreground">
                              Material complementar da trilha de aprendizado.
                            </p>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className="gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Abrir Material
                        </Button>
                      </div>
                    ),
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
