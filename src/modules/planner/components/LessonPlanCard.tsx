import {
  Calendar,
  Edit2,
  Trash2,
  ClipboardCheck,
  Sparkles,
  Target,
} from "lucide-react";

import { Badge } from "../../../app/components/ui/badge";
import { Button } from "../../../app/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../app/components/ui/card";

import { LessonPlan } from "../types";

export function LessonPlanCard({
  plan,
  onDelete,
  onEdit,
}: {
  plan: LessonPlan;
  onDelete: (id: string) => void;
  onEdit: (plan: LessonPlan) => void;
}) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
      {/* HEADER VISUAL */}
      <div className="relative overflow-hidden border-b border-border/40 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 px-6 py-4">
        <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative flex items-center justify-between">
          <Badge variant="outline" className="gap-1">
            <ClipboardCheck className="h-3.5 w-3.5" />
            Planejamento
          </Badge>

          <div className="flex items-center gap-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Inclusivo
          </div>
        </div>
      </div>

      <CardHeader className="space-y-4">
        <div className="space-y-3">
          <CardTitle className="line-clamp-2 text-xl font-bold tracking-tight">
            {plan.title}
          </CardTitle>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />

            {new Date(plan.createdAt).toLocaleDateString("pt-BR")}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* OBJETIVO */}
        <div className="rounded-2xl border border-primary/10 bg-primary/[0.03] p-4">
          <div className="mb-2 flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />

            <span className="text-sm font-medium">Objetivo pedagógico</span>
          </div>

          <p className="text-sm leading-6 text-muted-foreground">
            {plan.description}
          </p>
        </div>

        {/* ESTRATÉGIAS */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Badge variant="outline">Estratégias inclusivas</Badge>
          </div>

          <div className="flex flex-wrap gap-2">
            {plan.strategies.length > 0 ? (
              plan.strategies.map((strategy, index) => (
                <Badge key={index} variant="secondary" className="rounded-full">
                  {strategy}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">
                Nenhuma estratégia cadastrada
              </span>
            )}
          </div>
        </div>

        {/* AÇÕES */}
        <div className="flex gap-2 border-t pt-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onEdit(plan)}
          >
            <Edit2 className="h-4 w-4" />
            Editar
          </Button>

          <Button
            variant="destructive"
            className="flex-1"
            onClick={() => {
              if (window.confirm("Excluir este plano pedagógico?")) {
                onDelete(plan.id);
              }
            }}
          >
            <Trash2 className="h-4 w-4" />
            Excluir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
