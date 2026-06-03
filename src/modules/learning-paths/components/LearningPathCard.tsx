import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router";

import { Badge } from "../../../app/components/ui/badge";
import { Button } from "../../../app/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../app/components/ui/card";

import { Progress } from "../../../app/components/ui/progress";

import { LearningPath } from "../types";

function getCtaLabel(progress: number) {
  if (progress >= 100) return "Revisar";

  if (progress > 0) return "Continuar";

  return "Começar";
}

function getStatus(progress: number) {
  if (progress >= 100) {
    return {
      label: "Concluída",
      variant: "default",
    };
  }

  if (progress > 0) {
    return {
      label: "Em andamento",
      variant: "secondary",
    };
  }

  return {
    label: "Nova",
    variant: "outline",
  };
}

export function LearningPathCard({ path }: { path: LearningPath }) {
  const totalLessons = path.steps?.length ?? 0;

  const status = getStatus(path.progress);

  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10">
      {/* HEADER */}
      <div className="relative overflow-hidden border-b border-border/40 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 px-6 pt-6 pb-5">
        <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative flex items-center justify-between gap-2">
          <Badge variant={status.variant as any} className="gap-1 font-medium">
            {path.progress >= 100 ? (
              <CheckCircle2 className="h-3 w-3" />
            ) : (
              <Sparkles className="h-3 w-3" />
            )}

            {status.label}
          </Badge>

          <div className="flex items-center gap-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Recomendado
          </div>
        </div>
      </div>

      <CardHeader className="space-y-4">
        {/* TAGS */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <GraduationCap className="h-3.5 w-3.5" />
            {path.level}
          </Badge>

          <Badge variant="outline">{path.category}</Badge>

          {path.duration && (
            <Badge variant="outline" className="gap-1">
              <Clock3 className="h-3.5 w-3.5" />
              {path.duration}
            </Badge>
          )}
        </div>

        {/* TÍTULO */}
        <div className="space-y-3">
          <CardTitle className="line-clamp-2 text-xl font-bold leading-8 tracking-tight">
            {path.title}
          </CardTitle>

          <CardDescription className="line-clamp-3 leading-7">
            {path.description}
          </CardDescription>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <GraduationCap className="h-3.5 w-3.5" />
            Trilha estruturada para desenvolvimento profissional
          </div>
        </div>
      </CardHeader>

      <CardContent className="mt-auto space-y-5">
        {/* PROGRESSO */}
        <div className="rounded-2xl border border-primary/10 bg-gradient-to-r from-muted/50 to-muted/20 p-4">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              {totalLessons} aulas
            </span>

            <span className="font-semibold text-primary">{path.progress}%</span>
          </div>

          <div className="relative">
            <Progress value={path.progress} className="h-2.5" />

            <div
              className="absolute left-0 top-0 h-2.5 rounded-full bg-primary/30 blur-sm"
              style={{
                width: `${path.progress}%`,
              }}
            />
          </div>
        </div>

        {/* CTA */}
        <Link to={`/app/learning-paths/${path.id}`}>
          <Button
            className="h-12 w-full shadow-md transition-all duration-300 hover:scale-[1.02]"
            variant={path.progress >= 100 ? "secondary" : "default"}
          >
            {path.progress >= 100 && <CheckCircle2 className="h-4 w-4" />}

            {getCtaLabel(path.progress)}

            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
