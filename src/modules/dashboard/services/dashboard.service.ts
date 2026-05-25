import { api } from "../../../app/services/api";
import { PaginatedResponse } from "../../../shared/types/api";
import { LessonPlan } from "../../planner/types";
import {
  ActivityItem,
  LearningPathSummary,
  Recommendation,
} from "../types";
import { buildDashboardViewModel } from "../transformers/dashboard.transformer";

type Diagnosis = {
  id: string;
};

export async function getDashboardData() {
  const [plansResponse, pathsResponse, diagnosisResponse, activityResponse] =
    await Promise.all([
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
    api.get<ActivityItem[]>("/dashboard/recent-activity"),
  ]);

  const paths = pathsResponse.data.items;

  let recommendations: Recommendation[] = [];
  const diagnosis = diagnosisResponse.data.items[0];

  if (diagnosis) {
    const recommendationsResponse = await api.get<
      PaginatedResponse<Recommendation>
    >(`/recommendations/${diagnosis.id}`, { params: { limit: 20 } });
    recommendations = recommendationsResponse.data.items;
  }

  return buildDashboardViewModel({
    lessonPlanCount: plansResponse.data.meta.total,
    learningPaths: paths,
    recommendations,
    recentActivities: activityResponse.data,
  });
}
