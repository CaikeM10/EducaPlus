import { useEffect, useState } from "react";
import { PaginatedResponse, PaginationParams } from "../../../shared/types/api";
import { listResources } from "../services/resources.service";
import { Resource } from "../types";

export function useResources(params: PaginationParams) {
  const [data, setData] = useState<PaginatedResponse<Resource> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError(null);

    listResources(params)
      .then((result) => {
        if (active) setData(result);
      })
      .catch(() => {
        if (active) setError("Não foi possível carregar os recursos.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [params.page, params.search, params.category, params.tags, params.type]);

  return { data, loading, error };
}
