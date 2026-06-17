import { useState } from "react";
import { Save } from "lucide-react";

import { Button } from "../../../app/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../app/components/ui/select";
import { Textarea } from "../../../app/components/ui/textarea";

import { LessonPlan } from "../../planner/types";
import { DiaryEntry, DiaryEntryInput } from "../types";

type DiaryEntryFormProps = {
  lessonPlans: LessonPlan[];
  saving: boolean;
  initialValues?: DiaryEntry;
  mode?: "create" | "edit";
  onCancel?: () => void;
  onSubmit: (input: DiaryEntryInput) => Promise<void>;
};

export function DiaryEntryForm({
  lessonPlans,
  saving,
  initialValues,
  mode = "create",
  onCancel,
  onSubmit,
}: DiaryEntryFormProps) {
  const [lessonPlanId, setLessonPlanId] = useState(
    initialValues?.lessonPlanId ?? lessonPlans[0]?.id ?? "",
  );

  const [whatWorked, setWhatWorked] = useState(initialValues?.whatWorked ?? "");

  const [whatFailed, setWhatFailed] = useState(initialValues?.whatFailed ?? "");

  const [studentResponse, setStudentResponse] = useState(
    initialValues?.studentResponse ?? "",
  );

  const [inclusionReflection, setInclusionReflection] = useState(
    initialValues?.inclusionReflection ?? "",
  );

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!lessonPlanId) return;

    await onSubmit({
      lessonPlanId,
      whatWorked,
      whatFailed: whatFailed.trim() || undefined,
      studentResponse: studentResponse.trim() || undefined,
      inclusionReflection: inclusionReflection.trim() || undefined,
    });

    if (mode === "create") {
      setWhatWorked("");
      setWhatFailed("");
      setStudentResponse("");
      setInclusionReflection("");
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Select value={lessonPlanId} onValueChange={setLessonPlanId}>
        <SelectTrigger className="h-11">
          <SelectValue placeholder="Selecione um plano" />
        </SelectTrigger>

        <SelectContent>
          {lessonPlans.map((plan) => (
            <SelectItem key={plan.id} value={plan.id}>
              {plan.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Textarea
        value={whatWorked}
        onChange={(event) => setWhatWorked(event.target.value)}
        placeholder="O que deve ser melhorado no sistema?"
        required
        className="min-h-28"
      />

      <Textarea
        value={whatFailed}
        onChange={(event) => setWhatFailed(event.target.value)}
        placeholder="Qual nova descoberta você teve em relação às deficiências neurodivergentes?"
        className="min-h-24"
      />

      <Textarea
        value={studentResponse}
        onChange={(event) => setStudentResponse(event.target.value)}
        placeholder="O que os alunos mais aprenderam com as trilhas aplicadas em sala de aula?"
        className="min-h-24"
      />

      <Textarea
        value={inclusionReflection}
        onChange={(event) => setInclusionReflection(event.target.value)}
        placeholder="Reflexões adicionais sobre inclusão, acessibilidade e práticas pedagógicas."
        className="min-h-24"
      />

      <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="h-11"
          >
            Cancelar
          </Button>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={saving || !whatWorked.trim() || !lessonPlanId}
          className="min-w-44 shadow-sm sm:flex-none"
        >
          <Save className="h-4 w-4" />

          {saving
            ? "Salvando..."
            : mode === "edit"
              ? "Atualizar Reflexão"
              : "Salvar Reflexão"}
        </Button>
      </div>
    </form>
  );
}
