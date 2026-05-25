import { BookOpen, CalendarCheck, CheckCircle2, ClipboardList, NotebookPen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../app/components/ui/card";
import { EmptyState } from "../../../shared/components/EmptyState";
import { ActivityType, ActivityViewModel } from "../types";

const ACTIVITY_ICONS: Record<ActivityType, typeof BookOpen> = {
  LEARNING_PATH_STARTED: BookOpen,
  LEARNING_PATH_COMPLETED: CheckCircle2,
  LESSON_PLAN_CREATED: ClipboardList,
  LESSON_PLAN_UPDATED: CalendarCheck,
  DIARY_CREATED: NotebookPen,
  DIARY_UPDATED: NotebookPen,
};

const STATUS_CLASS: Record<ActivityViewModel["status"], string> = {
  success: "bg-emerald-50 text-emerald-700",
  info: "bg-blue-50 text-blue-700",
  warning: "bg-amber-50 text-amber-700",
};

type RecentActivityListProps = {
  activities: ActivityViewModel[];
};

export function RecentActivityList({ activities }: RecentActivityListProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Atividade Recente</h2>
        <p className="text-sm text-muted-foreground">
          Últimas interações registradas na sua conta.
        </p>
      </div>

      {activities.length === 0 ? (
        <EmptyState
          icon={<CalendarCheck className="h-10 w-10" />}
          title="Nenhuma atividade recente"
          description="Suas trilhas, planos e registros de diário aparecerão aqui."
        />
      ) : (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Linha do tempo</CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {activities.map((activity) => {
              const Icon = ACTIVITY_ICONS[activity.type];

              return (
                <div
                  key={activity.id}
                  className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <div className={`rounded-full p-2 ${STATUS_CLASS[activity.status]}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.label}</p>
                      <p className="text-sm text-muted-foreground">{activity.title}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground sm:text-right">
                    {activity.relativeDate}
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </section>
  );
}
