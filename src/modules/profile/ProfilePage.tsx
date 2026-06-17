import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  AlertTriangle,
  BookOpen,
  Calendar,
  Edit2,
  Save,
  Sparkles,
  Target,
  User,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "../../app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../app/components/ui/card";
import { Input } from "../../app/components/ui/input";
import { Label } from "../../app/components/ui/label";
import { Progress } from "../../app/components/ui/progress";
import { useAuth } from "../../app/context/AuthContext";
import { api } from "../../app/services/api";
import { EmptyState } from "../../shared/components/EmptyState";
import { ErrorState } from "../../shared/components/ErrorState";
import { LoadingState } from "../../shared/components/LoadingState";
import { PageHeader } from "../../shared/components/PageHeader";
import { StatCard } from "../../shared/components/StatCard";
import { AchievementsSection } from "./components/AchievementsSection";
import { useAchievements } from "./hooks/useAchievements";
import { useProfileSummary } from "./hooks/useProfileSummary";

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Administrador(a)",
  TEACHER: "Professor(a)",
  COORDINATOR: "Coordenador(a)",
  SPECIAL_ED: "Profissional de Educação Especial",
};

export default function ProfilePage() {
  const { user, refreshUser, logout } = useAuth();
  const navigate = useNavigate();
  const { summary, loading, error, refresh } = useProfileSummary(Boolean(user));
  const {
    achievements,
    loading: achievementsLoading,
    error: achievementsError,
    refresh: refreshAchievements,
  } = useAchievements(Boolean(user));

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const isTeacher = user?.role === "TEACHER";
  const isCoordinator = user?.role === "COORDINATOR";
  const isSpecialEd = user?.role === "SPECIAL_ED";

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  async function handleSave() {
    try {
      setSaving(true);
      await api.patch("/users/me", { name, email });
      await refreshUser();
      setIsEditing(false);
      toast.success("Perfil atualizado com sucesso.");
    } catch {
      toast.error("Não foi possível atualizar o perfil.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteAccount() {
    const confirmed = window.confirm(
      "Excluir sua conta permanentemente? Essa ação não pode ser desfeita.",
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      await api.delete("/users/me");
      logout();
      navigate("/login");
    } catch {
      toast.error("Não foi possível excluir sua conta.");
    } finally {
      setDeleting(false);
    }
  }

  if (!user || loading) {
    return <LoadingState label="Carregando perfil..." />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Perfil profissional"
        title={user.name}
        description="Gerencie seus dados e acompanhe seu uso real da plataforma."
        icon={
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/15 text-2xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
        }
        action={
          isEditing ? (
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                variant="destructive"
                size="lg"
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="shadow-sm"
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                {deleting ? "Excluindo..." : "Excluir conta"}
              </Button>
              <Button
                size="lg"
                onClick={handleSave}
                disabled={saving}
                className="shadow-sm"
              >
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Salvando..." : "Salvar alterações"}
              </Button>
            </div>
          ) : (
            <Button
              size="lg"
              onClick={() => setIsEditing(true)}
              className="shadow-sm"
            >
              <Edit2 className="mr-2 h-4 w-4" />
              Editar perfil
            </Button>
          )
        }
      />

      {error && <ErrorState message={error} onRetry={refresh} />}
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-primary/10 p-3">
          <User className="h-5 w-5 text-primary" />
        </div>

        <div>
          <CardTitle>Informações do perfil</CardTitle>
          <CardDescription>
            Gerencie seus dados de acesso e informações profissionais na
            plataforma.
          </CardDescription>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Informações do perfil</CardTitle>
          <CardDescription>
            Dados usados para autenticação e identificação do usuário.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Nome completo</Label>
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={!isEditing}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label>E-mail</Label>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={!isEditing}
              className="h-11"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Perfil de acesso</Label>
            <Input
              value={ROLE_LABELS[user.role] || user.role}
              disabled
              className="h-11"
            />
          </div>
        </CardContent>
      </Card>

      {summary && (
        <>
          {isTeacher && (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Trilhas concluídas"
                value={summary.learningPathsCompleted}
                icon={<BookOpen className="h-5 w-5" />}
              />

              <StatCard
                title="Em progresso"
                value={summary.learningPathsInProgress}
                icon={<Target className="h-5 w-5" />}
              />

              <StatCard
                title="Planos criados"
                value={summary.lessonPlansCount}
                icon={<Calendar className="h-5 w-5" />}
              />

              <StatCard
                title="Reflexões no diário"
                value={summary.diaryEntriesCount}
                icon={<Sparkles className="h-5 w-5" />}
              />
            </div>
          )}

          {isSpecialEd && (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Trilhas recomendadas"
                value={8}
                icon={<BookOpen className="h-5 w-5" />}
              />

              <StatCard
                title="Trilhas para revisão"
                value={3}
                icon={<Target className="h-5 w-5" />}
              />

              <StatCard
                title="Recursos analisados"
                value={12}
                icon={<Sparkles className="h-5 w-5" />}
              />

              <StatCard
                title="Estratégias inclusivas"
                value={15}
                icon={<Calendar className="h-5 w-5" />}
              />
            </div>
          )}

          {isCoordinator && (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Professores"
                value={25}
                icon={<BookOpen className="h-5 w-5" />}
              />

              <StatCard
                title="Profissionais AEE"
                value={8}
                icon={<Target className="h-5 w-5" />}
              />

              <StatCard
                title="Relatórios"
                value={14}
                icon={<Calendar className="h-5 w-5" />}
              />

              <StatCard
                title="Instituições"
                value={4}
                icon={<Sparkles className="h-5 w-5" />}
              />
            </div>
          )}
          {isTeacher && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Progresso de aprendizagem</CardTitle>

                  <CardDescription>
                    Trilhas iniciadas com base nos dados atuais do backend.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                  {summary.activeLearningPaths.length === 0 ? (
                    <EmptyState
                      title="Nenhuma trilha em andamento"
                      description="As trilhas iniciadas aparecerão aqui."
                    />
                  ) : (
                    summary.activeLearningPaths.map((path) => (
                      <div key={path.id} className="space-y-2">
                        <div className="flex items-center justify-between gap-4 text-sm">
                          <span className="font-medium">{path.title}</span>

                          <span className="font-semibold text-primary">
                            {path.progress}%
                          </span>
                        </div>

                        <Progress value={path.progress} />
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              <AchievementsSection
                achievements={achievements}
                loading={achievementsLoading}
                error={achievementsError}
                onRetry={refreshAchievements}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
