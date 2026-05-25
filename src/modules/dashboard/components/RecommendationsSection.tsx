import { Target } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../../../app/components/ui/button";
import { EmptyState } from "../../../shared/components/EmptyState";
import { LearningPathRecommendationViewModel } from "../types";
import { RecommendationCard } from "./RecommendationCard";

type RecommendationsSectionProps = {
  recommendations: LearningPathRecommendationViewModel[];
};

export function RecommendationsSection({ recommendations }: RecommendationsSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Trilhas Recomendadas</h2>
          <p className="text-sm text-muted-foreground">
            Sugestões organizadas a partir do seu diagnóstico.
          </p>
        </div>

        <Link to="/app/learning-paths">
          <Button variant="outline">Ver todas</Button>
        </Link>
      </div>

      {recommendations.length === 0 ? (
        <EmptyState
          icon={<Target className="h-10 w-10" />}
          title="Nenhuma recomendação encontrada"
          description="Finalize ou refaça o diagnóstico para gerar recomendações."
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {recommendations.map((recommendation) => (
            <RecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
            />
          ))}
        </div>
      )}
    </section>
  );
}
