import { useEffect, useMemo, useState } from "react";

import {
  BookOpen,
  Calendar,
  Edit2,
  Save,
  Sparkles,
  Target,
  Trophy,
  User,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { Button } from "../components/ui/button";

import { Input } from "../components/ui/input";

import { Label } from "../components/ui/label";

import { Progress } from "../components/ui/progress";

import { Badge } from "../components/ui/badge";

import { api } from "../services/api";

import { useAuth } from "../context/AuthContext";

import { useNavigate } from "react-router";

type LearningPath = {
  id: string;
  title: string;
  description: string;
  progress: number;
};

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Administrador(a)",
  TEACHER: "Professor(a)",
  COORDINATOR: "Coordenador(a)",
  SPECIAL_ED:
    "Profissional de Educação Especial",
};

export default function Profile() {
  const {
    user,
    refreshUser,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  const [isEditing, setIsEditing] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [learningPaths, setLearningPaths] =
    useState<LearningPath[]>([]);

  const [
    lessonPlansCount,
    setLessonPlansCount,
  ] = useState(0);

  const [
    diaryEntriesCount,
    setDiaryEntriesCount,
  ] = useState(0);

  useEffect(() => {
    if (!user) return;

    setName(user.name);
    setEmail(user.email);

    loadProfileData();
  }, [user]);

  const loadProfileData = async () => {
    try {
      setLoading(true);

      const [
        learningPathsResponse,
        lessonPlansResponse,
        diaryResponse,
      ] = await Promise.all([
        api.get(
          "/learning-paths/with-progress?page=1&limit=100"
        ),

        api.get(
          "/lesson-plans?page=1&limit=100"
        ),

        api.get(
          "/diary?page=1&limit=100"
        ),
      ]);

      const learningPathsData =
        learningPathsResponse.data
          ?.items ||
        learningPathsResponse.data
          ?.data?.items ||
        [];

      const lessonPlansData =
        lessonPlansResponse.data
          ?.items ||
        lessonPlansResponse.data
          ?.data?.items ||
        [];

      const diaryData =
        diaryResponse.data
          ?.items ||
        diaryResponse.data
          ?.data?.items ||
        [];

      setLearningPaths(
        learningPathsData
      );

      setLessonPlansCount(
        lessonPlansData.length
      );

      setDiaryEntriesCount(
        diaryData.length
      );
    } catch (error) {
      console.error(
        "Erro ao carregar perfil:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      await api.patch("/users/me", {
        name,
        email,
      });

      await refreshUser();

      setIsEditing(false);
    } catch (error) {
      console.error(
        "Erro ao atualizar perfil:",
        error
      );

      alert(
        "Não foi possível atualizar o perfil."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount =
    async () => {
      const confirmed =
        window.confirm(
          "Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita."
        );

      if (!confirmed) return;

      try {
        setDeleting(true);

        await api.delete("/users/me");

        logout();

        navigate("/login");
      } catch (error) {
        console.error(
          "Erro ao excluir conta:",
          error
        );

        alert(
          "Não foi possível excluir sua conta."
        );
      } finally {
        setDeleting(false);
      }
    };

  const stats = useMemo(() => {
    const completed =
      learningPaths.filter(
        (path) =>
          path.progress === 100
      ).length;

    const inProgress =
      learningPaths.filter(
        (path) =>
          path.progress > 0 &&
          path.progress < 100
      ).length;

    return {
      coursesCompleted: completed,

      coursesInProgress:
        inProgress,

      lessonPlansCreated:
        lessonPlansCount,

      diaryEntries:
        diaryEntriesCount,
    };
  }, [
    learningPaths,
    lessonPlansCount,
    diaryEntriesCount,
  ]);

  const achievements =
    useMemo(() => {
      return [
        {
          id: 1,

          title:
            "Primeiros Passos",

          description:
            "Completou sua primeira trilha de aprendizado",

          earned: true,
        },

        {
          id: 2,

          title:
            "Professor Mestre",

          description:
            "Conclua 10 trilhas de aprendizagem",

          earned: false,
        },
      ];
    }, []);

  if (!user || loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="text-muted-foreground">
            Carregando perfil...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary/80 p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="bg-white/15 backdrop-blur-md rounded-3xl p-5 border border-white/20">
              <User className="w-12 h-12" />
            </div>

            <div>
              <p className="text-white/70 text-sm mb-1">
                Perfil Profissional
              </p>

              <h1 className="text-4xl font-bold tracking-tight">
                {user.name}
              </h1>

              <p className="text-white/80 mt-2">
                Continue evoluindo sua jornada educacional 🚀
              </p>
            </div>
          </div>

          {!isEditing ? (
            <Button
              variant="secondary"
              onClick={() =>
                setIsEditing(true)
              }
              className="rounded-2xl h-11 px-6 shadow-lg"
            >
              <Edit2 className="w-4 h-4 mr-2" />

              Editar Perfil
            </Button>
          ) : (
            <div className="flex items-center gap-8">
              <Button
                variant="destructive"
                onClick={
                  handleDeleteAccount
                }
                disabled={deleting}
                className="rounded-2xl h-11 px-6 shadow-lg"
              >
                {deleting
                  ? "Excluindo..."
                  : "Excluir Conta"}
              </Button>

              <Button
                onClick={handleSave}
                disabled={saving}
                className="rounded-2xl h-11 px-6 bg-white text-primary hover:bg-white/90 shadow-lg"
              >
                <Save className="w-4 h-4 mr-2" />

                {saving
                  ? "Salvando..."
                  : "Salvar"}
              </Button>
            </div>
          )}
        </div>

        <div className="absolute right-0 top-0 h-full w-72 bg-white/5 blur-3xl" />
      </div>

      {/* Profile Info */}
      <Card className="border-0 shadow-lg rounded-3xl">
        <CardHeader>
          <CardTitle className="text-2xl">
            Informações do Perfil
          </CardTitle>

          <CardDescription>
            Gerencie seus dados pessoais
            e preferências da conta
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>
                Nome Completo
              </Label>

              <Input
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                disabled={!isEditing}
                className="h-12 rounded-2xl bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label>E-mail</Label>

              <Input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                disabled={!isEditing}
                className="h-12 rounded-2xl bg-white"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Função</Label>

              <Input
                value={
                  ROLE_LABELS[
                    user.role
                  ] || user.role
                }
                disabled
                className="h-12 rounded-2xl bg-white"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <Card className="border-0 shadow-md rounded-3xl">
          <CardContent className="p-6">
            <div className="bg-primary/10 p-3 rounded-2xl w-fit mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>

            <div className="text-3xl font-bold">
              {
                stats.coursesCompleted
              }
            </div>

            <p className="text-sm text-muted-foreground mt-1">
              Trilhas Concluídas
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md rounded-3xl">
          <CardContent className="p-6">
            <div className="bg-secondary/10 p-3 rounded-2xl w-fit mb-4">
              <Target className="w-6 h-6 text-secondary" />
            </div>

            <div className="text-3xl font-bold">
              {
                stats.coursesInProgress
              }
            </div>

            <p className="text-sm text-muted-foreground mt-1">
              Em Progresso
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md rounded-3xl">
          <CardContent className="p-6">
            <div className="bg-primary/10 p-3 rounded-2xl w-fit mb-4">
              <Calendar className="w-6 h-6 text-primary" />
            </div>

            <div className="text-3xl font-bold">
              {
                stats.lessonPlansCreated
              }
            </div>

            <p className="text-sm text-muted-foreground mt-1">
              Planos Criados
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md rounded-3xl">
          <CardContent className="p-6">
            <div className="bg-secondary/10 p-3 rounded-2xl w-fit mb-4">
              <Sparkles className="w-6 h-6 text-secondary" />
            </div>

            <div className="text-3xl font-bold">
              {stats.diaryEntries}
            </div>

            <p className="text-sm text-muted-foreground mt-1">
              Reflexões no Diário
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progress */}
      <Card className="border-0 shadow-lg rounded-3xl">
        <CardHeader>
          <CardTitle className="text-2xl">
            Progresso de Aprendizagem
          </CardTitle>

          <CardDescription>
            Seu avanço nas trilhas e conteúdos educacionais
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {learningPaths.filter(
            (path) =>
              path.progress > 0 &&
              path.progress < 100
          ).length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">
                Você ainda não possui trilhas em andamento.
              </p>
            </div>
          ) : (
            learningPaths
              .filter(
                (path) =>
                  path.progress > 0 &&
                  path.progress < 100
              )
              .map((path) => (
                <div
                  key={path.id}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span>
                      {path.title}
                    </span>

                    <span className="font-semibold">
                      {path.progress}%
                    </span>
                  </div>

                  <Progress
                    value={
                      path.progress
                    }
                    className="h-3 rounded-full"
                  />
                </div>
              ))
          )}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="border-0 shadow-lg rounded-3xl">
        <CardHeader>
          <CardTitle className="text-2xl">
            Conquistas
          </CardTitle>

          <CardDescription>
            Marcos alcançados durante
            sua jornada na plataforma
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {achievements.map(
              (achievement) => (
                <div
                  key={achievement.id}
                  className={`
                    rounded-3xl border p-5
                    transition-all duration-300
                    ${
                      achievement.earned
                        ? "bg-secondary/5 border-secondary/20 hover:shadow-md"
                        : "bg-muted/30 border-muted opacity-70"
                    }
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`
                        p-3 rounded-2xl
                        ${
                          achievement.earned
                            ? "bg-secondary/10"
                            : "bg-muted"
                        }
                      `}
                    >
                      <Trophy
                        className={`
                          w-5 h-5
                          ${
                            achievement.earned
                              ? "text-secondary"
                              : "text-muted-foreground"
                          }
                        `}
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="font-semibold">
                          {
                            achievement.title
                          }
                        </h4>

                        {achievement.earned && (
                          <Badge className="rounded-full bg-secondary/10 text-secondary hover:bg-secondary/10">
                            Conquistada
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        {
                          achievement.description
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}