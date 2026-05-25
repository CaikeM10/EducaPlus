import { api } from "../../../app/services/api";
import { PaginatedResponse, PaginationParams } from "../../../shared/types/api";
import { DiaryEntry, DiaryEntryInput } from "../types";

export async function listDiaryEntries(params: PaginationParams) {
  const response = await api.get<PaginatedResponse<DiaryEntry>>("/diary", {
    params,
  });

  return response.data;
}

export async function createDiaryEntry(input: DiaryEntryInput) {
  const response = await api.post<DiaryEntry>("/diary", input);
  return response.data;
}

export async function deleteDiaryEntry(id: string) {
  await api.delete(`/diary/${id}`);
}

export async function updateDiaryEntry(id: string, input: Partial<DiaryEntryInput>) {
  const response = await api.put<DiaryEntry>(`/diary/${id}`, input);
  return response.data;
}
