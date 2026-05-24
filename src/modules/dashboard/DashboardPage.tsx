import { ArrowRight, BookOpen, Calendar, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router";

import { Button } from "../../app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../app/components/ui/card";
import { Progress } from "../../app/components/ui/progress";

import { useAuth } from "../../app/context/AuthContext";

import { EmptyState } from "../../shared/components/EmptyState";
import { ErrorState } from "../../shared/components/ErrorState";
import { LoadingState } from "../../shared/components/LoadingState";
import { PageHeader } from "../../shared/components/PageHeader";
import { StatCard } from "../../shared/components/StatCard";

import { useDashboard } from "./hooks/useDashboard";

export default function DashboardPage() {
  const { user } = useAuth();
  const { data, loading, error } = useDashboard();

  if (loading) {
    return <LoadingState label="Carregando painel..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Painel Educacional"
        title={`Bem-vindo, ${user?.name ?? "educador"}`}
        description="Acompanhe seu progresso, recomendações e ferramentas de planejamento."
        icon={<BookOpen className="h-10 w-10" />}
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard
          title="Progresso Geral"
          value={`${data.overallProgress}%`}
          description="Média das trilhas"
          icon={<TrendingUp className="h-4 w-4 text-primary" />}
        />

        <StatCard
          title="Trilhas"
          value={data.learningPathCount}
          description="Disponíveis para estudo"
          icon={<BookOpen className="h-4 w-4 text-secondary" />}
        />

        <StatCard
          title="Planos"
          value={data.lessonPlanCount}
          description="Criados por você"
          icon={<Calendar className="h-4 w-4 text-primary" />}
        />
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Progresso de aprendizado</CardTitle>
        </CardHeader>

        <CardContent>
          <Progress value={data.overallProgress} className="h-3" />
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Trilhas Recomendadas</h2>

          <Link to="/app/learning-paths">
            <Button variant="outline">Ver todas</Button>
          </Link>
        </div>

        {data.recommendations.length === 0 ? (
          <EmptyState
            icon={<Target className="h-10 w-10" />}
            title="Nenhuma recomendação encontrada"
            description="Finalize ou refaça o diagnóstico para gerar recomendações."
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {data.recommendations.map((recommendation) => {
              const title =
                recommendation.learningPath?.title ??
                recommendation.resource?.title ??
                "Recomendação";

              const description =
                recommendation.learningPath?.description ??
                recommendation.resource?.description ??
                recommendation.reason;

              const link =
                recommendation.learningPath?.id
                  ? `/app/learning-paths/${recommendation.learningPath.id}`
                  : "/app/library";

              return (
                <Card
                  key={recommendation.id}
                  className="border-0 shadow-sm"
                >
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {description}
                    </p>

                    {recommendation.reason && (
                      <p className="text-sm">
                        {recommendation.reason}
                      </p>
                    )}

                    <Link to={link}>
                      <Button className="w-full">
                        Começar
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}