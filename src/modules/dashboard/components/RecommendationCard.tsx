import { ArrowRight, BookOpen, Layers } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "../../../app/components/ui/badge";
import { Button } from "../../../app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../app/components/ui/card";
import { Progress } from "../../../app/components/ui/progress";
import { LearningPathRecommendationViewModel } from "../types";

type RecommendationCardProps = {
  recommendation: LearningPathRecommendationViewModel;
};

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  return (
    <Card className="border-0 shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="outline">{recommendation.badge}</Badge>
          {recommendation.totalLessons > 0 && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <BookOpen className="h-3.5 w-3.5" />
              {recommendation.totalLessons} aulas
            </span>
          )}
        </div>
        <CardTitle className="line-clamp-2 text-lg">{recommendation.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
          {recommendation.description}
        </p>

        {recommendation.totalLessons > 0 && (
          <div className="space-y-2 rounded-lg bg-muted/40 p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Layers className="h-3.5 w-3.5" />
                Progresso
              </span>
              <span className="font-medium">{recommendation.progress}%</span>
            </div>
            <Progress value={recommendation.progress} className="h-2" />
          </div>
        )}

        <Link to={recommendation.href}>
          <Button className="w-full">
            {recommendation.buttonLabel}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
