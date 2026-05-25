import { ArrowRight, BookOpen, CheckCircle2, Clock3, GraduationCap } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "../../../app/components/ui/badge";
import { Button } from "../../../app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../app/components/ui/card";
import { Progress } from "../../../app/components/ui/progress";
import { LearningPath } from "../types";

function getCtaLabel(progress: number) {
  if (progress >= 100) return "Concluir";
  if (progress > 0) return "Continuar";
  return "Começar";
}

export function LearningPathCard({ path }: { path: LearningPath }) {
  const totalLessons = path.steps?.length ?? 0;

  return (
    <Card className="flex h-full flex-col border-0 shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="space-y-4">
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
        <div>
          <CardTitle className="line-clamp-2 text-xl">{path.title}</CardTitle>
          <CardDescription className="mt-2 line-clamp-3 leading-6">
            {path.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-auto space-y-5">
        <div className="rounded-lg bg-muted/40 p-4">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              {totalLessons} aulas
            </span>
            <span className="font-semibold">{path.progress}%</span>
          </div>
          <Progress value={path.progress} className="h-2.5" />
        </div>

        <Link to={`/app/learning-paths/${path.id}`}>
          <Button
            className="h-11 w-full shadow-sm"
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
