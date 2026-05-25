import { api } from "../../../app/services/api";
import { PaginatedResponse } from "../../../shared/types/api";
import { Achievement, ProfileSummary } from "../types";

type LearningPathSummary = {
  id: string;
  title: string;
  progress: number;
};

export async function getProfileSummary(): Promise<ProfileSummary> {
  const [learningPathsResponse, lessonPlansResponse, diaryResponse] =
    await Promise.all([
      api.get<PaginatedResponse<LearningPathSummary>>(
        "/learning-paths/with-progress",
        { params: { page: 1, limit: 100 } },
      ),
      api.get<PaginatedResponse<unknown>>("/lesson-plans", {
        params: { page: 1, limit: 1 },
      }),
      api.get<PaginatedResponse<unknown>>("/diary", {
        params: { page: 1, limit: 1 },
      }),
    ]);

  const learningPaths = learningPathsResponse.data.items;

  return {
    learningPathsCompleted: learningPaths.filter((path) => path.progress === 100)
      .length,
    learningPathsInProgress: learningPaths.filter(
      (path) => path.progress > 0 && path.progress < 100,
    ).length,
    lessonPlansCount: lessonPlansResponse.data.meta.total,
    diaryEntriesCount: diaryResponse.data.meta.total,
    activeLearningPaths: learningPaths.filter(
      (path) => path.progress > 0 && path.progress < 100,
    ),
  };
}

export async function getProfileAchievements() {
  const response = await api.get<Achievement[]>("/users/me/achievements");
  return response.data;
}
