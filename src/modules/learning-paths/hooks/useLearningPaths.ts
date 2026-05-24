import { useEffect, useState } from "react";
import { PaginatedResponse, PaginationParams } from "../../../shared/types/api";
import { listLearningPaths } from "../services/learning-paths.service";
import { LearningPath } from "../types";

export function useLearningPaths(params: PaginationParams) {
  const [data, setData] = useState<PaginatedResponse<LearningPath> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    listLearningPaths(params)
      .then(setData)
      .catch(() => setError("Não foi possível carregar as trilhas."))
      .finally(() => setLoading(false));
  }, [params.page, params.search, params.category]);

  return { data, loading, error };
}
