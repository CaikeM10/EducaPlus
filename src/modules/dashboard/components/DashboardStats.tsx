import { BookOpen, Calendar } from "lucide-react";
import { StatCard } from "../../../shared/components/StatCard";
import { ProgressCard } from "./ProgressCard";

type DashboardStatsProps = {
  overallProgress: number;
  activeLearningPathCount: number;
  lessonPlanCount: number;
};

export function DashboardStats({
  overallProgress,
  activeLearningPathCount,
  lessonPlanCount,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <ProgressCard value={overallProgress} />
      <StatCard
        title="Trilhas Ativas"
        value={activeLearningPathCount}
        description="Trilhas iniciadas por você"
        icon={<BookOpen className="h-4 w-4 text-secondary" />}
      />
      <StatCard
        title="Planos"
        value={lessonPlanCount}
        description="Criados por você"
        icon={<Calendar className="h-4 w-4 text-primary" />}
      />
    </div>
  );
}
