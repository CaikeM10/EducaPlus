import { useCallback, useEffect, useState } from "react";
import { getProfileSummary } from "../services/profile.service";
import { ProfileSummary } from "../types";

export function useProfileSummary(enabled: boolean) {
  const [summary, setSummary] = useState<ProfileSummary | null>(null);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  const loadSummary = useCallback(async () => {
    if (!enabled) return;

    try {
      setLoading(true);
      setError(null);
      setSummary(await getProfileSummary());
    } catch {
      setError("Não foi possível carregar os dados do perfil.");
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    void loadSummary();
  }, [loadSummary]);

  return {
    summary,
    loading,
    error,
    refresh: loadSummary,
  };
}
