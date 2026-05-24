import { api } from "../../../app/services/api";
import { PaginatedResponse, PaginationParams } from "../../../shared/types/api";
import { LearningPath } from "../types";

export async function listLearningPaths(params: PaginationParams) {
  const response = await api.get<PaginatedResponse<LearningPath>>(
    "/learning-paths/with-progress",
    { params },
  );

  return response.data;
}

export async function getLearningPath(id: string) {
  const response = await api.get<LearningPath>(`/learning-paths/${id}`);
  return response.data;
}

export async function updateProgress(stepId: string, completed: boolean) {
  await api.post("/learning-paths/progress", { stepId, completed });
}
