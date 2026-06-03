import {
  ArrowRight,
  BookOpen,
  Layers,
  Sparkles,
  Target,
  CheckCircle2,
  Brain,
} from "lucide-react";

import { Link } from "react-router";

import { Badge } from "../../../app/components/ui/badge";

import { Button } from "../../../app/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../app/components/ui/card";

import { Progress } from "../../../app/components/ui/progress";

import { LearningPathRecommendationViewModel } from "../types";

type RecommendationCardProps = {
  recommendation: LearningPathRecommendationViewModel;
};

function getCompatibility(progress: number) {
  if (progress >= 80) {
    return {
      label: "Alta compatibilidade",
      className: "bg-secondary/15 text-secondary border-secondary/20",
    };
  }

  if (progress >= 40) {
    return {
      label: "Compatibilidade moderada",
      className: "bg-warning/15 text-warning border-warning/20",
    };
  }

  return {
    label: "Nova recomendação",
    className: "bg-accent/15 text-accent border-accent/20",
  };
}

export function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  const compatibility = getCompatibility(recommendation.progress);

  return (
    <Card className="group relative overflow-hidden border border-border/50 bg-white/80 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-2xl hover:shadow-primary/10">
      {/* GLOW */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
      </div>

      {/* HERO */}
      <div className="relative border-b border-border/40 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-accent">
              <div className="rounded-lg bg-accent/10 p-1.5">
                <Brain className="h-4 w-4" />
              </div>
              <div className="absolute inset-0 opacity-40">
                <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                <div className="absolute left-10 bottom-0 h-20 w-20 rounded-full bg-secondary/10 blur-2xl" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                Recomendação Inteligente
              </span>
            </div>

            <Badge variant="outline" className={compatibility.className}>
              <Target className="mr-1 h-3 w-3" />
              {compatibility.label}
            </Badge>
          </div>

          {recommendation.totalLessons > 0 && (
            <div className="rounded-xl border border-border/40 bg-white/70 px-3 py-2 text-xs text-muted-foreground shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5" />
                {recommendation.totalLessons} aulas
              </div>
            </div>
          )}
        </div>
      </div>

      <CardHeader className="relative space-y-5">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="purple">{recommendation.badge}</Badge>

            {recommendation.progress >= 100 && (
              <Badge variant="success">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Concluída
              </Badge>
            )}
          </div>

          <CardTitle className="line-clamp-2 text-2xl leading-9 tracking-tight">
            {recommendation.title}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-6">
        {/* DESCRIPTION */}
        <div className="space-y-4">
          <p className="line-clamp-3 text-sm leading-7 text-muted-foreground">
            {recommendation.description}
          </p>

          {/* IA INSIGHT */}
          <div className="rounded-2xl border border-accent/10 bg-gradient-to-r from-accent/5 to-accent/10 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-accent/10 p-2">
                <Sparkles className="h-4 w-4 text-accent" />
              </div>

              <div>
                <p className="text-sm font-semibold text-accent">
                  Insight Inteligente
                </p>

                <p className="mt-1 text-xs leading-6 text-muted-foreground">
                  Esta trilha foi selecionada com base no seu diagnóstico
                  pedagógico, perfil educacional e progresso em práticas
                  inclusivas.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PROGRESS */}
        {recommendation.totalLessons > 0 && (
          <div className="space-y-4 rounded-2xl border border-secondary/10 bg-secondary/5 p-4">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Layers className="h-3.5 w-3.5" />
                Progresso da trilha
              </span>

              <span className="font-bold text-secondary">
                {recommendation.progress}%
              </span>
            </div>
            <div className="relative">
              <Progress value={recommendation.progress} className="h-2.5" />

              <div
                className="absolute top-0 left-0 h-2.5 rounded-full bg-white/30 blur-sm"
                style={{
                  width: `${recommendation.progress}%`,
                }}
              />
            </div>{" "}
          </div>
        )}

        {/* CTA */}
        <Link to={recommendation.href}>
          <Button
            className="
    h-12
    w-full
    rounded-2xl
    shadow-md
    shadow-primary/20
    transition-all
    duration-300
    hover:-translate-y-0.5
    hover:shadow-xl
    hover:shadow-primary/25
  "
          >
            {recommendation.buttonLabel}

            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
