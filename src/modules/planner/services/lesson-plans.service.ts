import { api } from "../../../app/services/api";
import { PaginatedResponse, PaginationParams } from "../../../shared/types/api";
import { CreateLessonPlanInput, LessonPlan } from "../types";

export async function listLessonPlans(params: PaginationParams) {
  const response = await api.get<PaginatedResponse<LessonPlan>>("/lesson-plans", {
    params,
  });

  return response.data;
}

export async function createLessonPlan(input: CreateLessonPlanInput) {
  const response = await api.post<LessonPlan>("/lesson-plans", input);
  return response.data;
}

export async function deleteLessonPlan(id: string) {
  await api.delete(`/lesson-plans/${id}`);
}
