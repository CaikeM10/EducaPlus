import {
  ActivityItem,
  ActivityType,
  ActivityViewModel,
  DashboardViewModel,
  LearningPathRecommendation,
  LearningPathSummary,
  Recommendation,
  LearningPathRecommendationViewModel,
  ResourceRecommendation,
  ResourceRecommendationViewModel,
} from "../types";

const ACTIVITY_LABELS: Record<ActivityType, string> = {
  LEARNING_PATH_STARTED: "Você iniciou a trilha",
  LEARNING_PATH_COMPLETED: "Você concluiu a trilha",
  LESSON_PLAN_CREATED: "Plano de aula criado",
  LESSON_PLAN_UPDATED: "Plano de aula atualizado",
  DIARY_CREATED: "Diário pedagógico criado",
  DIARY_UPDATED: "Diário pedagógico atualizado",
};

export function buildDashboardViewModel(input: {
  lessonPlanCount: number;
  learningPaths: LearningPathSummary[];
  recommendations: Recommendation[];
  recentActivities: ActivityItem[];
}): DashboardViewModel {
  const activePaths = input.learningPaths.filter((path) => path.progress > 0);
  const pathLookup = new Map(input.learningPaths.map((path) => [path.id, path]));

  const overallProgress =
    activePaths.length === 0
      ? 0
      : Math.round(
          activePaths.reduce((sum, path) => sum + path.progress, 0) /
            activePaths.length,
        );

  return {
    lessonPlanCount: input.lessonPlanCount,
    activeLearningPathCount: activePaths.length,
    overallProgress,
    learningPathRecommendations: getRecommendationsWithLearningPaths(
      input.recommendations,
    )
      .map((recommendation) =>
        toLearningPathRecommendationViewModel(recommendation, pathLookup),
      )
      .slice(0, 3),
    resourceRecommendations: getRecommendationsWithResources(input.recommendations)
      .map(toResourceRecommendationViewModel)
      .slice(0, 3),
    recentActivities: input.recentActivities.map(toActivityViewModel),
  };
}

function getRecommendationsWithLearningPaths(
  recommendations: Recommendation[],
): LearningPathRecommendation[] {
  return recommendations.filter(
    (recommendation): recommendation is LearningPathRecommendation =>
      Boolean(recommendation.learningPath?.id),
  );
}

function getRecommendationsWithResources(
  recommendations: Recommendation[],
): ResourceRecommendation[] {
  return recommendations.filter(
    (recommendation): recommendation is ResourceRecommendation =>
      Boolean(recommendation.resource && !recommendation.learningPath),
  );
}

function toLearningPathRecommendationViewModel(
  recommendation: LearningPathRecommendation,
  pathLookup: Map<string, LearningPathSummary>,
): LearningPathRecommendationViewModel {
  const path = pathLookup.get(recommendation.learningPath.id);
  const progress = path?.progress ?? 0;

  return {
    id: recommendation.id,
    title: recommendation.learningPath.title,
    description: recommendation.learningPath.description,
    href: `/app/learning-paths/${recommendation.learningPath.id}`,
    badge: path?.category ?? "Trilha",
    totalLessons: path?.steps?.length ?? 0,
    progress,
    buttonLabel: progress > 0 ? "Continuar" : "Começar",
  };
}

function toResourceRecommendationViewModel(
  recommendation: ResourceRecommendation,
): ResourceRecommendationViewModel {
  return {
    id: recommendation.id,
    title: recommendation.resource.title,
    description:
      recommendation.resource.description ??
      "Material selecionado para apoiar sua prática pedagógica.",
    href: "/app/library",
  };
}

function toActivityViewModel(activity: ActivityItem): ActivityViewModel {
  return {
    id: activity.id,
    type: activity.type,
    label: ACTIVITY_LABELS[activity.type],
    title: activity.title,
    relativeDate: formatRelativeDate(activity.occurredAt),
    status: activity.status,
  };
}

function formatRelativeDate(value: string | Date) {
  const date = value instanceof Date ? value : new Date(value);
  const diffInSeconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));

  if (diffInSeconds < 60) return "agora";

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `há ${diffInMinutes} min`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `há ${diffInHours} h`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "ontem";
  if (diffInDays < 30) return `há ${diffInDays} dias`;

  return date.toLocaleDateString("pt-BR");
}
