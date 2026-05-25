import { useNavigate, useParams } from "react-router";
import { ArrowLeft, CheckCircle2, Circle, Clock3, FileText, PlayCircle, Sparkles } from "lucide-react";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../app/components/ui/tabs";
import { EmptyState } from "../../shared/components/EmptyState";
import { ErrorState } from "../../shared/components/ErrorState";
import { LoadingState } from "../../shared/components/LoadingState";
import { PageHeader } from "../../shared/components/PageHeader";
import { StatCard } from "../../shared/components/StatCard";
import { useLearningPathDetail } from "./hooks/useLearningPathDetail";

export default function LearningPathDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { learningPath, progress, resources, loading, savingStepId, error, refresh, toggleStep } =
    useLearningPathDetail(id);

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

  return (
    <div className="space-y-8">
      <Button variant="ghost" className="px-0" onClick={() => navigate("/app/learning-paths")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para Trilhas
      </Button>

      <PageHeader
        eyebrow="Trilha de aprendizagem"
        title={learningPath.title}
        description={learningPath.description}
        icon={<Sparkles className="h-6 w-6" />}
      />

      {error && <ErrorState message={error} onRetry={refresh} />}

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-0 shadow-sm md:col-span-1">
          <CardContent className="space-y-3 p-6">
            <p className="text-sm text-muted-foreground">Progresso geral</p>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold">{progress.percentage}%</span>
              <span className="mb-1 text-sm text-muted-foreground">concluído</span>
            </div>
            <Progress value={progress.percentage} className="h-2.5" />
          </CardContent>
        </Card>
        <StatCard title="Aulas concluídas" value={progress.completed} icon={<CheckCircle2 className="h-5 w-5" />} />
        <StatCard title="Conteúdos disponíveis" value={progress.total} icon={<Clock3 className="h-5 w-5" />} />
      </div>

      <Tabs defaultValue="lessons" className="w-full">
        <TabsList className="grid h-12 w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="lessons">Aulas</TabsTrigger>
          <TabsTrigger value="materials">Materiais</TabsTrigger>
        </TabsList>

        <TabsContent value="lessons" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Conteúdo da trilha</CardTitle>
              <CardDescription>Marque cada etapa concluída conforme avança.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {learningPath.steps.length === 0 ? (
                <EmptyState title="Sem aulas cadastradas" description="As etapas da trilha aparecerão aqui." />
              ) : (
                learningPath.steps.map((step, index) => (
                  <div
                    key={step.id}
                    className="rounded-lg border bg-background p-5 transition-shadow hover:shadow-sm"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex gap-4">
                        <div className="mt-1">
                          {step.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="outline">Aula {index + 1}</Badge>
                            {step.completed && <Badge>Concluída</Badge>}
                          </div>
                          <h3 className="font-semibold">{step.title}</h3>
                          {step.description && (
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                          )}
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant={step.completed ? "outline" : "default"}
                        disabled={savingStepId === step.id}
                        onClick={() => toggleStep(step.id, !step.completed)}
                        className="min-w-36"
                      >
                        {savingStepId === step.id
                          ? "Salvando..."
                          : step.completed
                            ? "Marcar pendente"
                            : "Concluir"}
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Materiais complementares</CardTitle>
              <CardDescription>Recursos vinculados às etapas desta trilha.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {resources.length === 0 ? (
                <EmptyState title="Nenhum material disponível" description="Os materiais complementares aparecerão aqui." />
              ) : (
                resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="flex flex-col gap-4 rounded-lg border p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <FileText className="mt-1 h-5 w-5 text-primary" />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold">{resource.title}</h3>
                          <Badge variant="outline">{resource.type}</Badge>
                        </div>
                      </div>
                    </div>
                    <Button className="min-w-36" variant="outline" asChild>
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
