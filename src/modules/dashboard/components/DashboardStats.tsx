import { BookOpen, Calendar, TrendingUp, Brain } from "lucide-react";

import { Badge } from "../../../app/components/ui/badge";

import { StatCard } from "../../../shared/components/StatCard";

import { ProgressCard } from "./ProgressCard";

import { AnimatedCounter } from "../../../shared/components/AnimatedCounter";

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
    <section className="space-y-6">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/5 via-primary/10 to-accent/10 p-8 shadow-sm">
        {/* Glow Direito */}
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

        {/* Glow Esquerdo */}
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* TEXTO */}
          <div className="space-y-4">
            <Badge
              variant="purple"
              className="gap-2 rounded-full px-4 py-2 shadow-sm"
            >
              <Brain className="h-4 w-4" />
              Inteligência Pedagógica
            </Badge>

            <div className="space-y-3">
              <h2 className="max-w-2xl bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-4xl font-bold tracking-tight text-transparent">
                Sua evolução no EDUCAPLUS
              </h2>

              <p className="max-w-2xl leading-8 text-muted-foreground">
                Acompanhe seu progresso em aprendizagem inclusiva,
                desenvolvimento pedagógico e construção de práticas educacionais
                mais acessíveis.
              </p>
            </div>
          </div>

          {/* CARD LATERAL */}
          <div className="relative min-w-[260px] rounded-3xl border border-secondary/20 bg-white/70 p-6 shadow-xl backdrop-blur-md">
            {/* Glow interno */}
            <div className="absolute inset-0">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-secondary/10 blur-2xl" />
            </div>

            <div className="relative flex items-center gap-4">
              <div className="rounded-2xl bg-secondary/15 p-4">
                <TrendingUp className="h-7 w-7 text-secondary" />
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Evolução geral
                </p>

                <div className="text-5xl font-bold text-secondary">
                  <AnimatedCounter value={overallProgress} suffix="%" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MÉTRICAS */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 [&>*]:transition-all [&>*]:duration-300">
        <ProgressCard value={overallProgress} />

        <StatCard
          title="Trilhas Ativas"
          value={activeLearningPathCount}
          description="Trilhas iniciadas por você"
          icon={
            <div className="rounded-xl bg-accent/15 p-2">
              <BookOpen className="h-5 w-5 text-accent" />
            </div>
          }
        />

        <StatCard
          title="Planos Pedagógicos"
          value={lessonPlanCount}
          description="Planejamentos criados"
          icon={
            <div className="rounded-xl bg-primary/10 p-2">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
          }
        />
      </div>
    </section>
  );
}
