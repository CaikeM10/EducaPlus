import { useCallback, useEffect, useMemo, useState } from "react";
import { getLearningPath, updateProgress } from "../services/learning-paths.service";
import { LearningPath } from "../types";

export function useLearningPathDetail(id?: string) {
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingStepId, setSavingStepId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadLearningPath = useCallback(async () => {
    if (!id) {
      setLearningPath(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setLearningPath(await getLearningPath(id));
    } catch {
      setError("Não foi possível carregar a trilha.");
      setLearningPath(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void loadLearningPath();
  }, [loadLearningPath]);

  const progress = useMemo(() => {
    const steps = learningPath?.steps ?? [];
    const completed = steps.filter((step) => step.completed).length;
    const total = steps.length;

    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [learningPath]);

  const resources = useMemo(
    () => learningPath?.steps.flatMap((step) => step.resources ?? []) ?? [],
    [learningPath],
  );

  async function toggleStep(stepId: string, completed: boolean) {
    try {
      setSavingStepId(stepId);
      await updateProgress(stepId, completed);
      setLearningPath((current) => {
        if (!current) return current;

        return {
          ...current,
          steps: current.steps.map((step) =>
            step.id === stepId ? { ...step, completed } : step,
          ),
        };
      });
    } catch {
      setError("Não foi possível atualizar o progresso.");
    } finally {
      setSavingStepId(null);
    }
  }

  return {
    learningPath,
    progress,
    resources,
    loading,
    savingStepId,
    error,
    refresh: loadLearningPath,
    toggleStep,
  };
}
