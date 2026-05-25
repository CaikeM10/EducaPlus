import { useEffect, useState } from "react";
import { PaginatedResponse, PaginationParams } from "../../../shared/types/api";
import { listLessonPlans } from "../../planner/services/lesson-plans.service";
import { LessonPlan } from "../../planner/types";
import {
  createDiaryEntry,
  deleteDiaryEntry,
  listDiaryEntries,
  updateDiaryEntry,
} from "../services/diary.service";
import { DiaryEntry, DiaryEntryInput } from "../types";

export function useDiary(params: PaginationParams) {
  const [entries, setEntries] = useState<PaginatedResponse<DiaryEntry> | null>(null);
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);

    try {
      const [entryResult, planResult] = await Promise.all([
        listDiaryEntries(params),
        listLessonPlans({ limit: 100 }),
      ]);
      setEntries(entryResult);
      setLessonPlans(planResult.items);
    } catch {
      setError("Não foi possível carregar o diário.");
    } finally {
      setLoading(false);
    }
  }

  async function create(input: DiaryEntryInput) {
    setSaving(true);

    try {
      await createDiaryEntry(input);
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    await deleteDiaryEntry(id);
    await load();
  }

  async function update(id: string, input: Partial<DiaryEntryInput>) {
    setSaving(true);

    try {
      await updateDiaryEntry(id, input);
      await load();
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    load();
  }, [params.page, params.search]);

  return { entries, lessonPlans, loading, saving, error, create, update, remove };
}
