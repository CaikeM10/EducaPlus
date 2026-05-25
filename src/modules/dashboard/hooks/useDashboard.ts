import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboard.service";
import { DashboardViewModel } from "../types";

export function useDashboard() {
  const [data, setData] = useState<DashboardViewModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDashboardData()
      .then(setData)
      .catch(() => setError("Não foi possível carregar o painel."))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
