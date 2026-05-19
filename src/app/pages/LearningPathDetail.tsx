import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";

import {
  ArrowLeft,
  Play,
  FileText,
  CheckCircle2,
  Circle,
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

      const response = await api.get(`/learning-paths/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPathData(response.data);
    } catch (error) {
      console.error("Erro ao carregar trilha:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p>Carregando trilha...</p>;
  }

  if (!pathData) {
    return <p>Trilha não encontrada.</p>;
  }

  const completedLessons =
    pathData.steps?.filter((step: any) => step.completed).length || 0;

  const totalLessons = pathData.steps?.length || 0;

  const progress =
    totalLessons > 0
      ? (completedLessons / totalLessons) * 100
      : 0;

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate("/app/learning-paths")}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para Trilhas de Aprendizado
      </Button>

      <div>
        <h1 className="text-3xl mb-2">
          {pathData.title}
        </h1>

        <p className="text-muted-foreground">
          {pathData.description}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Progresso do Curso</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {completedLessons} de {totalLessons} aulas completadas
              </span>

              <span className="font-medium">
                {Math.round(progress)}%
              </span>
            </div>

            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="lessons" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lessons">
            Aulas
          </TabsTrigger>

          <TabsTrigger value="materials">
            Materiais
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lessons" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vídeo da Aula</CardTitle>

              <CardDescription>
                Assista à introdução do curso
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-primary rounded-full p-4 inline-block mb-2">
                    <Play className="w-8 h-8 text-white" />
                  </div>

                  <p className="text-sm text-muted-foreground">
                    O conteúdo do vídeo seria reproduzido aqui
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aulas do Curso</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {pathData.steps?.map((step: any) => (
                  <div
                    key={step.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {step.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-secondary" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}

                      <span
                        className={
                          step.completed
                            ? "text-muted-foreground line-through"
                            : ""
                        }
                      >
                        {step.title}
                      </span>
                    </div>

                    {step.completed && (
                      <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/10">
                        Completada
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials">
          <Card>
            <CardHeader>
              <CardTitle>Materiais do Curso</CardTitle>

              <CardDescription>
                Baixe recursos para apoiar seu aprendizado
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {pathData.steps?.flatMap((step: any) =>
                  step.resources || []
                ).map((resource: any) => (
                  <div
                    key={resource.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>

                      <div>
                        <p className="font-medium">
                          {resource.title}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {resource.type}
                        </p>
                      </div>
                    </div>

                    <Button size="sm" variant="outline">
                      Abrir
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}