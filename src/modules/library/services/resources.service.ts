import { api } from "../../../app/services/api";
import { PaginatedResponse, PaginationParams } from "../../../shared/types/api";
import { Resource } from "../types";

export async function listResources(params: PaginationParams) {
  const response = await api.get<PaginatedResponse<Resource>>("/resources", {
    params,
  });

  return response.data;
}
