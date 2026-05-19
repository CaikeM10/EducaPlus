import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import {
  BookOpen,
  Target,
  Award,
  Brain,
  Users,
  Lightbulb,
} from "lucide-react";

import { api } from "../services/api";

const iconMap: Record<string, any> = {
  FUNDAMENTOS: BookOpen,
  TDAH: Target,
  AUTISMO: Award,
  DISLEXIA: Brain,
  PEDAGOGIA: Users,
  FRAMEWORKS: Lightbulb,
};

const getLevelColor = (level: string) => {
  switch (level) {
    case "Iniciante":
      return "bg-green-100 text-green-800 hover:bg-green-100";

    case "Intermediário":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";

    case "Avançado":
      return "bg-purple-100 text-purple-800 hover:bg-purple-100";

    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

export default function LearningPaths() {
  const [learningPaths, setLearningPaths] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLearningPaths();
  }, []);

  async function loadLearningPaths() {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/learning-paths/with-progress", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLearningPaths(response.data);
    } catch (error) {
      console.error("Erro ao carregar trilhas:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p>Carregando trilhas...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Trilhas de Aprendizado</h1>

        <p className="text-muted-foreground">
          Explore cursos estruturados para aprimorar suas habilidades de ensino
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningPaths.map((path) => {
          const Icon =
            iconMap[path.category?.toUpperCase()] || BookOpen;

          return (
            <Card
              key={path.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  <Badge className={getLevelColor(path.level || "Iniciante")}>
                    {path.level || "Iniciante"}
                  </Badge>
                </div>

                <CardTitle className="text-lg">
                  {path.title}
                </CardTitle>

                <CardDescription>
                  {path.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    {path.steps?.length || 0} aulas
                  </span>

                  <span>
                    {path.duration || "4 semanas"}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Progresso
                    </span>

                    <span className="font-medium">
                      {path.progress || 0}%
                    </span>
                  </div>

                  <Progress
                    value={path.progress || 0}
                    className="h-2"
                  />
                </div>

                <Link to={`/app/learning-paths/${path.id}`}>
                  <button className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg px-4 py-2 transition-colors">
                    {path.progress > 0
                      ? "Continuar Aprendendo"
                      : "Iniciar Trilha"}
                  </button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}