import { Sparkles, Target, ArrowRight } from "lucide-react";

import { Link } from "react-router";

import { Button } from "../../../app/components/ui/button";

import { Card, CardContent } from "../../../app/components/ui/card";

import { EmptyState } from "../../../shared/components/EmptyState";

import { LearningPathRecommendationViewModel } from "../types";

import { RecommendationCard } from "./RecommendationCard";

type RecommendationsSectionProps = {
  recommendations: LearningPathRecommendationViewModel[];
};

export function RecommendationsSection({
  recommendations,
}: RecommendationsSectionProps) {
  const hasRecommendations = recommendations.length > 0;

  return (
    <section className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary font-medium">
            <Sparkles className="h-5 w-5" />

            <span>Recomendações Inteligentes</span>
          </div>

          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Trilhas Recomendadas
            </h2>

            <p className="mt-2 text-muted-foreground leading-7 max-w-2xl">
              O EDUCAPLUS analisa seu diagnóstico pedagógico e sugere conteúdos
              alinhados ao seu perfil profissional e às suas necessidades
              educacionais.
            </p>
          </div>
        </div>

        <Link to="/app/learning-paths">
          <Button variant="outline" className="gap-2">
            Ver todas
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* HERO */}
      {hasRecommendations && (
        <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-r from-primary to-primary/80 text-white">
          <CardContent className="p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3 max-w-3xl">
                <div className="flex items-center gap-2">
                  <div className="bg-white/20 rounded-xl p-2">
                    <Sparkles className="h-5 w-5" />
                  </div>

                  <span className="font-medium">Aprendizado Personalizado</span>
                </div>

                <div>
                  <h3 className="text-3xl font-bold">
                    Conteúdo adaptado ao seu perfil
                  </h3>

                  <p className="mt-3 text-white/90 leading-7">
                    As recomendações abaixo foram organizadas com base no seu
                    diagnóstico educacional, progresso pedagógico e interesses
                    de aprendizagem inclusiva.
                  </p>
                </div>
              </div>

              <div className="min-w-[220px] rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-5">
                <div className="space-y-2">
                  <p className="text-sm text-white/80">Recomendações ativas</p>

                  <p className="text-5xl font-bold">{recommendations.length}</p>

                  <p className="text-sm text-white/80">trilhas sugeridas</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* EMPTY */}
      {!hasRecommendations ? (
        <EmptyState
          icon={<Target className="h-10 w-10" />}
          title="Nenhuma recomendação encontrada"
          description="Finalize ou refaça o diagnóstico para gerar recomendações personalizadas."
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
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
