import { useNavigate, useParams } from "react-router";

import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Clock3,
  FileText,
  PlayCircle,
  Sparkles,
  GraduationCap,
  Trophy,
  BookOpen,
} from "lucide-react";

import { Badge } from "../../app/components/ui/badge";
import { Button } from "../../app/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../app/components/ui/card";

import { Progress } from "../../app/components/ui/progress";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../app/components/ui/tabs";

import { EmptyState } from "../../shared/components/EmptyState";
import { ErrorState } from "../../shared/components/ErrorState";
import { LoadingState } from "../../shared/components/LoadingState";
import { PageHeader } from "../../shared/components/PageHeader";
import { StatCard } from "../../shared/components/StatCard";

import { useLearningPathDetail } from "./hooks/useLearningPathDetail";

export default function LearningPathDetailPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    learningPath,
    progress,
    resources,
    loading,
    savingStepId,
    error,
    refresh,
    toggleStep,
  } = useLearningPathDetail(id);

  if (loading) {
    return <LoadingState label="Carregando trilha..." />;
  }

  if (!learningPath) {
    return (
      <EmptyState
        title="Trilha não encontrada"
        description="Esta trilha não existe ou você não possui acesso a ela."
        action={
          <Button onClick={() => navigate("/app/learning-paths")}>
            Voltar para Trilhas
          </Button>
        }
      />
    );
  }

  const isCompleted = progress.percentage >= 100;
  function getResourceColor(type: string) {
    switch (type.toLowerCase()) {
      case "pdf":
        return "bg-red-100 text-red-600";

      case "video":
        return "bg-blue-100 text-blue-600";

      case "link":
        return "bg-emerald-100 text-emerald-600";

      default:
        return "bg-violet-100 text-violet-600";
    }
  }

  return (
    <div className="space-y-8">
      {/* BACK */}
      <Button
        variant="ghost"
        className="px-0"
        onClick={() => navigate("/app/learning-paths")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para Trilhas
      </Button>

      {/* HEADER */}
      <PageHeader
        eyebrow="Trilha de aprendizagem"
        title={learningPath.title}
        description={learningPath.description}
        icon={<Sparkles className="h-6 w-6" />}
      />

      {/* HERO */}
      <div className="rounded-3xl bg-gradient-to-r from-primary to-primary/80 p-6 text-white shadow-xl">
        <div className="absolute left-0 bottom-0 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute left-0 bottom-0 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-white/20 text-white border-white/20">
                <GraduationCap className="mr-1 h-3 w-3" />
                {learningPath.level}
              </Badge>

              <Badge className="bg-white/20 text-white border-white/20">
                {learningPath.category}
              </Badge>

              {learningPath.duration && (
                <Badge className="bg-white/20 text-white border-white/20">
                  <Clock3 className="mr-1 h-3 w-3" />
                  {learningPath.duration}
                </Badge>
              )}
            </div>

            <div>
              <h2 className="text-4xl font-bold tracking-tight">
                Continue sua jornada
              </h2>

              <p className="mt-3 max-w-2xl text-lg leading-8 text-white/85">
                Desenvolva competências pedagógicas inclusivas através de
                conteúdos estruturados e recomendações inteligentes.
              </p>
            </div>
          </div>

          <div className="min-w-[220px] rounded-2xl bg-white/10 backdrop-blur-sm p-5 border border-white/20">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/80">Progresso</span>

                <span className="text-2xl font-bold">
                  {progress.percentage}%
                </span>
              </div>

              <Progress
                value={progress.percentage}
                className="h-3 bg-white/20"
              />

              <div className="flex items-center gap-2 text-sm text-white/90">
                {isCompleted ? (
                  <>
                    <Trophy className="h-4 w-4 text-yellow-300" />
                    Trilha concluída
                    <Badge className="ml-2 bg-yellow-500 text-white border-0">
                      Certificado liberado
                    </Badge>
                  </>
                ) : (
                  <>
                    <BookOpen className="h-4 w-4" />
                    {progress.completed} de {progress.total} aulas concluídas
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && <ErrorState message={error} />}

      {/* STATS */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-0 shadow-sm md:col-span-1">
          <CardContent className="space-y-3 p-6">
            <p className="text-sm text-muted-foreground">Progresso geral</p>

            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-primary">
                {progress.percentage}%
              </span>

              <span className="mb-1 text-sm text-muted-foreground">
                concluído
              </span>
            </div>

            <Progress value={progress.percentage} className="h-2.5" />
          </CardContent>
        </Card>

        <StatCard
          title="Aulas concluídas"
          value={progress.completed}
          icon={<CheckCircle2 className="h-5 w-5" />}
        />

        <StatCard
          title="Conteúdos disponíveis"
          value={progress.total}
          icon={<Clock3 className="h-5 w-5" />}
        />
      </div>

      {/* TABS */}
      <Tabs defaultValue="lessons" className="w-full">
        <TabsList className="grid h-12 w-full grid-cols-2 rounded-2xl bg-muted/50 p-1 lg:w-[400px]">
          <TabsTrigger value="lessons" className="rounded-xl">
            Aulas
          </TabsTrigger>
          <TabsTrigger value="materials" className="rounded-xl">
            {" "}
            Materiais{" "}
          </TabsTrigger>
        </TabsList>

        {/* LESSONS */}
        <TabsContent value="lessons" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Conteúdo da trilha</CardTitle>

              <CardDescription>
                Avance pelas etapas e acompanhe sua evolução pedagógica.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {learningPath.steps.length === 0 ? (
                <EmptyState
                  title="Sem aulas cadastradas"
                  description="As etapas da trilha aparecerão aqui."
                />
              ) : (
                learningPath.steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`
                        rounded-2xl border p-5 transition-all duration-200
                        ${
                          step.completed
                            ? "border-primary/20 bg-primary/5"
                            : "bg-background hover:shadow-sm"
                        }
                      `}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex gap-4">
                        <div className="mt-1">
                          {step.completed ? (
                            <CheckCircle2 className="h-6 w-6 text-primary" />
                          ) : (
                            <Circle className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>

                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="outline">Aula {index + 1}</Badge>

                            {step.completed && <Badge>Concluída</Badge>}
                          </div>

                          <div>
                            <h3 className="font-semibold text-lg">
                              {step.title}
                            </h3>

                            {step.description && (
                              <p className="mt-2 text-sm text-muted-foreground leading-6">
                                {step.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant={step.completed ? "outline" : "default"}
                        disabled={savingStepId === step.id}
                        onClick={() => toggleStep(step.id, !step.completed)}
                        className="min-w-40"
                      >
                        {savingStepId === step.id
                          ? "Salvando..."
                          : step.completed
                            ? "Marcar pendente"
                            : "Concluir etapa"}
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* MATERIALS */}
        <TabsContent value="materials" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Materiais complementares</CardTitle>

              <CardDescription>
                Recursos adicionais para aprofundar o aprendizado.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {resources.length === 0 ? (
                <EmptyState
                  title="Nenhum material disponível"
                  description="Os materiais complementares aparecerão aqui."
                />
              ) : (
                resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`rounded-xl p-3 ${getResourceColor(
                          resource.type,
                        )}`}
                      >
                        <FileText className="h-5 w-5 text-primary" />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold">{resource.title}</h3>

                          <Badge variant="outline">{resource.type}</Badge>
                        </div>
                      </div>
                    </div>

                    <Button className="min-w-40" variant="outline" asChild>
                      <a href={resource.url} target="_blank" rel="noreferrer">
                        <PlayCircle className="h-4 w-4" />
                        Abrir material
                      </a>
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
