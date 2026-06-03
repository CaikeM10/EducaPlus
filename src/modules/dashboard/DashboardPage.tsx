import { BookOpen, Sparkles, ShieldCheck } from "lucide-react";

import { useMemo } from "react";

import { useAuth } from "../../app/context/AuthContext";

import { ErrorState } from "../../shared/components/ErrorState";
import { LoadingState } from "../../shared/components/LoadingState";
import { PageHeader } from "../../shared/components/PageHeader";

import { DashboardStats } from "./components/DashboardStats";
import { RecentActivityList } from "./components/RecentActivityList";
import { RecommendationsSection } from "./components/RecommendationsSection";

import { useDashboard } from "./hooks/useDashboard";

export default function DashboardPage() {
  const { user } = useAuth();

  const { data, loading, error } = useDashboard();

  const isSpecialEd = user?.role === "SPECIAL_ED";

  const roleMessages = useMemo(() => {
    return {
      ADMIN:
        "Gerencie usuários, acompanhe indicadores e monitore a plataforma.",

      TEACHER:
        "Acompanhe suas trilhas, organize planos de aula e fortaleça práticas inclusivas.",

      COORDINATOR:
        "Monitore progresso pedagógico e acompanhe o desenvolvimento educacional.",

      SPECIAL_ED:
        "Supervisione acompanhamentos pedagógicos, estratégias inclusivas e práticas educacionais adaptadas.",
    };
  }, []);

  if (loading) {
    return <LoadingState label="Carregando painel..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!data) {
    return null;
  }

  const userName = user?.name ?? "educador";

  const welcomeTitle = user?.isReturningUser
    ? `Bem-vindo de volta, ${userName}`
    : `Bem-vindo, ${userName}`;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow={
          isSpecialEd ? "Acompanhamento Educacional" : "Painel Educacional"
        }
        title={welcomeTitle}
        description={roleMessages[user?.role ?? "TEACHER"]}
        icon={
          isSpecialEd ? (
            <ShieldCheck className="h-10 w-10" />
          ) : (
            <BookOpen className="h-10 w-10" />
          )
        }
      />

      {/* DESTAQUE PRINCIPAL */}
      <div className="rounded-3xl bg-gradient-to-r from-primary to-primary/80 p-6 text-white shadow-lg">
        <div className="flex items-start gap-4">
          <div className="bg-white/20 rounded-2xl p-3">
            <Sparkles className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold">
              {isSpecialEd
                ? "Acompanhamento Inclusivo"
                : "Recomendações Inteligentes"}
            </h2>

            <p className="text-white/90 leading-7 max-w-3xl">
              {isSpecialEd
                ? "Acompanhe estratégias pedagógicas, observações educacionais e intervenções voltadas à educação inclusiva."
                : "O EDUCAPLUS utiliza informações pedagógicas para recomendar trilhas de aprendizagem e estratégias inclusivas alinhadas ao seu perfil profissional."}
            </p>
          </div>
        </div>
      </div>

      {/* ESTATÍSTICAS */}
      <DashboardStats
        overallProgress={isSpecialEd ? 0 : data.overallProgress}
        activeLearningPathCount={isSpecialEd ? 0 : data.activeLearningPathCount}
        lessonPlanCount={data.lessonPlanCount}
      />

      {/* RECOMENDAÇÕES APENAS PARA PROFESSOR */}
      {!isSpecialEd && (
        <RecommendationsSection
          recommendations={data.learningPathRecommendations}
        />
      )}

      {/* ATIVIDADES RECENTES */}
      <RecentActivityList activities={data.recentActivities} />
    </div>
  );
}
