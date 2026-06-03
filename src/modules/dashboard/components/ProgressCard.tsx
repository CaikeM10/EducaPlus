import { TrendingUp, Sparkles } from "lucide-react";

import { Card, CardContent } from "../../../app/components/ui/card";
import { Progress } from "../../../app/components/ui/progress";

import { AnimatedCounter } from "../../../shared/components/AnimatedCounter";

type ProgressCardProps = {
  value: number;
};

export function ProgressCard({ value }: ProgressCardProps) {
  return (
    <Card className="relative overflow-hidden">
      {/* Glow */}
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />

      <CardContent className="relative p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">
                Progresso Geral
              </span>
            </div>

            <div className="mt-4">
              <div className="text-4xl font-bold tracking-tight">
                <AnimatedCounter value={value} suffix="%" />
              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                Média das trilhas iniciadas
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-primary/10 p-3">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Evolução pedagógica</span>

            <span className="font-semibold text-primary">{value}%</span>
          </div>

          <div className="relative">
            <Progress value={value} className="h-3" />

            <div
              className="absolute top-0 left-0 h-3 rounded-full bg-white/30 blur-sm"
              style={{
                width: `${value}%`,
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
