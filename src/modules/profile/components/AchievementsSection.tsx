import {
  Award,
  BookOpenCheck,
  CalendarDays,
  Download,
  GraduationCap,
  NotebookPen,
} from "lucide-react";
import { Badge } from "../../../app/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../app/components/ui/card";
import { Progress } from "../../../app/components/ui/progress";
import { EmptyState } from "../../../shared/components/EmptyState";
import { ErrorState } from "../../../shared/components/ErrorState";
import { LoadingState } from "../../../shared/components/LoadingState";
import { AchievementType, AchievementViewModel } from "../types";

const ICONS: Record<AchievementType, typeof Award> = {
  FIRST_STEPS: BookOpenCheck,
  DEDICATED_LEARNER: CalendarDays,
  PLANNING_MASTER: GraduationCap,
  REFLECTIVE_PROFESSIONAL: NotebookPen,
  KNOWLEDGE_SEEKER: Download,
  MASTER_TEACHER: Award,
};

type AchievementsSectionProps = {
  achievements: AchievementViewModel[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
};

export function AchievementsSection({
  achievements,
  loading,
  error,
  onRetry,
}: AchievementsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conquistas</CardTitle>
        <CardDescription>
          Marcos calculados com base no seu uso real da plataforma.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading && <LoadingState label="Carregando conquistas..." />}
        {error && <ErrorState message={error} onRetry={onRetry} />}
        {!loading && !error && achievements.length === 0 && (
          <EmptyState
            title="Nenhuma conquista disponível"
            description="Continue usando a plataforma para desbloquear marcos."
          />
        )}
        {!loading && !error && achievements.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {achievements.map((achievement) => {
              const Icon = ICONS[achievement.type];

              return (
                <div
                  key={achievement.type}
                  className={`rounded-lg border p-5 transition-shadow ${
                    achievement.achieved
                      ? "border-primary/30 bg-primary/5 shadow-sm"
                      : "bg-muted/20"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`rounded-lg p-3 ${
                        achievement.achieved
                          ? "bg-primary text-primary-foreground"
                          : "bg-background text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <Badge variant={achievement.achieved ? "default" : "outline"}>
                            {achievement.statusLabel}
                          </Badge>
                        </div>
                        <p className="text-sm leading-6 text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>
                            {achievement.current}/{achievement.target}
                          </span>
                          <span>{achievement.percentage}%</span>
                        </div>
                        <Progress value={achievement.percentage} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
