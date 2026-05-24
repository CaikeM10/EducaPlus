import { api } from "../../../app/services/api";
import { PaginatedResponse } from "../../../shared/types/api";
import { LessonPlan } from "../../planner/types";

type Diagnosis = {
  id: string;
};

type LearningPathSummary = {
  id: string;
  progress: number;
};

export type Recommendation = {
  id: string;
  reason: string;

  learningPath?: {
    id: string;
    title: string;
    description: string;
  } | null;

  resource?: {
    title: string;
    description?: string;
  } | null;
};

export async function getDashboardData() {
  const [plansResponse, pathsResponse, diagnosisResponse] = await Promise.all([
    api.get<PaginatedResponse<LessonPlan>>("/lesson-plans", {
      params: { limit: 1 },
    }),
    api.get<PaginatedResponse<LearningPathSummary>>(
      "/learning-paths/with-progress",
      { params: { limit: 100 } },
    ),
    api.get<PaginatedResponse<Diagnosis>>("/diagnosis/me", {
      params: { limit: 1 },
    }),
  ]);

  const paths = pathsResponse.data.items;
  const overallProgress =
    paths.length === 0
      ? 0
      : Math.round(
          paths.reduce((sum, path) => sum + (path.progress || 0), 0) /
            paths.length,
        );

  let recommendations: Recommendation[] = [];
  const diagnosis = diagnosisResponse.data.items[0];

  if (diagnosis) {
    const recommendationsResponse = await api.get<
      PaginatedResponse<Recommendation>
    >(`/recommendations/${diagnosis.id}`, { params: { limit: 3 } });
    recommendations = recommendationsResponse.data.items;
  }

  return {
    lessonPlanCount: plansResponse.data.meta.total,
    learningPathCount: pathsResponse.data.meta.total,
    overallProgress,
    recommendations,
  };
}
