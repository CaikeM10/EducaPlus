import { useEffect, useState } from "react";
import { PaginatedResponse, PaginationParams } from "../../../shared/types/api";
import {
  createLessonPlan,
  deleteLessonPlan,
  listLessonPlans,
} from "../services/lesson-plans.service";
import { CreateLessonPlanInput, LessonPlan } from "../types";

export function useLessonPlans(params: PaginationParams) {
  const [data, setData] = useState<PaginatedResponse<LessonPlan> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);

    try {
      setData(await listLessonPlans(params));
    } catch {
      setError("Não foi possível carregar os planos.");
    } finally {
      setLoading(false);
    }
  }

  async function create(input: CreateLessonPlanInput) {
    setSaving(true);

    try {
      await createLessonPlan(input);
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    await deleteLessonPlan(id);
    await load();
  }

  useEffect(() => {
    load();
  }, [params.page, params.search]);

  return { data, loading, saving, error, create, remove, reload: load };
}
