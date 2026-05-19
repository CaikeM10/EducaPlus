import { useEffect, useState } from "react";
import { Link } from "react-router";

import {
  Award,
  BookOpen,
  Calendar,
  Library,
  Target,
  TrendingUp,
} from "lucide-react";

import { api } from "../services/api";

import { Button } from "../components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { Progress } from "../components/ui/progress";

type RecommendedPath = {
  id: string;
  reason: string;
  learningPath: {
    id: string;
    title: string;
    description: string;
  };
};

const recentActivities = [
  {
    title:
      "Completou aula sobre Recursos Visuais de Aprendizagem",
    date: "há 2 dias",
    type: "learning",
  },
  {
    title:
      "Criou plano de aula: Matemática para Todos os Aprendizes",
    date: "há 3 dias",
    type: "planner",
  },
  {
    title:
      "Adicionou entrada no diário sobre sucesso em sala de aula",
    date: "há 5 dias",
    type: "diary",
  },
];

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  const [recommendedPaths, setRecommendedPaths] =
    useState<RecommendedPath[]>([]);

  const [loadingRecommendations, setLoadingRecommendations] =
    useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      setLoadingRecommendations(true);

      const diagnosisResponse =
        await api.get("/diagnosis/me");

      const diagnosis = diagnosisResponse.data;

      if (!diagnosis) {
        return;
      }

      const recommendationsResponse =
        await api.get(
          `/recommendations/${diagnosis.id}`,
        );

      setRecommendedPaths(
        recommendationsResponse.data,
      );
    } catch (error) {
      console.error(
        "Erro ao carregar recomendações:",
        error,
      );
    } finally {
      setLoadingRecommendations(false);
    }
  };

  const overallProgress = 22;

  const getIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();

    if (
      lowerTitle.includes("autismo") ||
      lowerTitle.includes("espectro")
    ) {
      return Award;
    }

    if (lowerTitle.includes("tdah")) {
      return Target;
    }

    return BookOpen;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl mb-2">
          Bem-vindo de volta, {user?.name}! 👋
        </h1>

        <p className="text-muted-foreground">
          Aqui está seu painel de aprendizado
          personalizado
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Progresso Geral
            </CardTitle>

            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-semibold mb-2">
              {overallProgress}%
            </div>

            <Progress
              value={overallProgress}
              className="h-2"
            />

            <p className="text-xs text-muted-foreground mt-2">
              Continue assim!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Trilhas Ativas
            </CardTitle>

            <BookOpen className="w-4 h-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-semibold">
              {recommendedPaths.length}
            </div>

            <p className="text-xs text-muted-foreground mt-2">
              Trilhas de aprendizado recomendadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Planos de Aula
            </CardTitle>

            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-semibold">
              12
            </div>

            <p className="text-xs text-muted-foreground mt-2">
              Criados este mês
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Learning Paths */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl">
            Trilhas de Aprendizado Recomendadas
          </h2>

          <Link to="/app/learning-paths">
            <Button variant="outline" size="sm">
              Ver Todas
            </Button>
          </Link>
        </div>

        {loadingRecommendations ? (
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground">
              Carregando recomendações...
            </CardContent>
          </Card>
        ) : recommendedPaths.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground">
              Nenhuma recomendação encontrada.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedPaths.map(
              (recommendation) => {
                const Icon = getIcon(
                  recommendation.learningPath.title,
                );

                return (
                  <Card
                    key={recommendation.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                      </div>

                      <CardTitle className="text-base mt-2">
                        {
                          recommendation.learningPath
                            .title
                        }
                      </CardTitle>

                      <CardDescription className="text-sm">
                        {
                          recommendation.learningPath
                            .description
                        }
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-1">
                            Motivo da recomendação
                          </p>

                          <p className="text-sm text-muted-foreground">
                            {recommendation.reason}
                          </p>
                        </div>

                        <Link
                          to={`/app/learning-paths/${recommendation.learningPath.id}`}
                        >
                          <Button className="w-full bg-primary hover:bg-primary/90">
                            Começar Aprendizado
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              },
            )}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl mb-4">
          Ações Rápidas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/app/planner">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/10 p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-secondary" />
                  </div>

                  <CardTitle className="text-base">
                    Criar Plano de Aula
                  </CardTitle>
                </div>

                <CardDescription className="text-sm">
                  Planeje sua próxima aula inclusiva
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/app/library">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Library className="w-5 h-5 text-primary" />
                  </div>

                  <CardTitle className="text-base">
                    Explorar Biblioteca
                  </CardTitle>
                </div>

                <CardDescription className="text-sm">
                  Explore recursos de ensino
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/app/diary">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/10 p-2 rounded-lg">
                    <BookOpen className="w-5 h-5 text-secondary" />
                  </div>

                  <CardTitle className="text-base">
                    Adicionar Entrada no Diário
                  </CardTitle>
                </div>

                <CardDescription className="text-sm">
                  Reflita sobre sua prática
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl mb-4">
          Atividade Recente
        </h2>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {recentActivities.map(
                (activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />

                    <div className="flex-1">
                      <p className="text-sm">
                        {activity.title}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {activity.date}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}