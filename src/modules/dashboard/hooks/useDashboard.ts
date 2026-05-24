import { useEffect, useState } from "react";
import { getDashboardData, Recommendation } from "../services/dashboard.service";

export function useDashboard() {
  const [data, setData] = useState<{
    lessonPlanCount: number;
    learningPathCount: number;
    overallProgress: number;
    recommendations: Recommendation[];
  } | null>(null);
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
