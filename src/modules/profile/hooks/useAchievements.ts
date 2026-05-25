import { useCallback, useEffect, useMemo, useState } from "react";
import { getProfileAchievements } from "../services/profile.service";
import { toAchievementViewModel } from "../transformers/achievements.transformer";
import { Achievement } from "../types";

export function useAchievements(enabled: boolean) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!enabled) return;

    try {
      setLoading(true);
      setError(null);
      setAchievements(await getProfileAchievements());
    } catch {
      setError("Não foi possível carregar as conquistas.");
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    void load();
  }, [load]);

  const viewModels = useMemo(
    () => achievements.map(toAchievementViewModel),
    [achievements],
  );

  return {
    achievements: viewModels,
    loading,
    error,
    refresh: load,
  };
}
