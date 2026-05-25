import { BookOpen } from "lucide-react";

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
    ? `Bem-vindo de volta! ${userName}`
    : `Bem-vindo, ${userName}`;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Painel Educacional"
        title={welcomeTitle}
        description="Acompanhe seu progresso, recomendações e ferramentas de planejamento."
        icon={<BookOpen className="h-10 w-10" />}
      />

      <DashboardStats
        overallProgress={data.overallProgress}
        activeLearningPathCount={data.activeLearningPathCount}
        lessonPlanCount={data.lessonPlanCount}
      />

      <RecommendationsSection
        recommendations={data.learningPathRecommendations}
      />

      <RecentActivityList activities={data.recentActivities} />
    </div>
  );
}
