export type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type PaginatedResponse<T> = {
  items: T[];
  meta: PaginationMeta;
};

export type PaginationParams = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
  category?: string;
  tags?: string;
  type?: string;
};
