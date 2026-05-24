import { Calendar, Trash2 } from "lucide-react";
import { Badge } from "../../../app/components/ui/badge";
import { Button } from "../../../app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../app/components/ui/card";
import { LessonPlan } from "../types";

export function LessonPlanCard({
  plan,
  onDelete,
}: {
  plan: LessonPlan;
  onDelete: (id: string) => void;
}) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>{plan.title}</CardTitle>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {new Date(plan.createdAt).toLocaleDateString("pt-BR")}
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => onDelete(plan.id)}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <Badge variant="outline">Objetivo</Badge>
          <p className="mt-2 text-sm leading-6">{plan.description}</p>
        </div>
        <div>
          <Badge variant="outline">Estratégias</Badge>
          <p className="mt-2 text-sm leading-6">
            {plan.strategies.join(", ") || "Sem estratégias"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
