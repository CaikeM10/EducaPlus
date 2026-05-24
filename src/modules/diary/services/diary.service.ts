import { api } from "../../../app/services/api";
import { PaginatedResponse, PaginationParams } from "../../../shared/types/api";
import { DiaryEntry } from "../types";

export async function listDiaryEntries(params: PaginationParams) {
  const response = await api.get<PaginatedResponse<DiaryEntry>>("/diary", {
    params,
  });

  return response.data;
}

export async function createDiaryEntry(input: {
  lessonPlanId: string;
  whatWorked: string;
}) {
  const response = await api.post<DiaryEntry>("/diary", input);
  return response.data;
}

export async function deleteDiaryEntry(id: string) {
  await api.delete(`/diary/${id}`);
}
