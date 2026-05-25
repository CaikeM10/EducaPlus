import { useState } from "react";
import { Button } from "../../../app/components/ui/button";
import { Input } from "../../../app/components/ui/input";
import { Label } from "../../../app/components/ui/label";
import { Textarea } from "../../../app/components/ui/textarea";
import { CreateLessonPlanInput, LessonPlan } from "../types";
import { Save } from "lucide-react";

function splitLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function LessonPlanForm({
  saving,
  initialValues,
  mode = "create",
  onCancel,
  onSubmit,
}: {
  saving: boolean;
  initialValues?: LessonPlan;
  mode?: "create" | "edit";
  onCancel?: () => void;
  onSubmit: (input: CreateLessonPlanInput) => Promise<void>;
}) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [objective, setObjective] = useState(initialValues?.description ?? "");
  const [strategies, setStrategies] = useState(
    initialValues?.strategies.join("\n") ?? "",
  );
  const [content, setContent] = useState(initialValues?.content ?? "");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    await onSubmit({
      title,
      description: objective,
      content,
      objectives: [objective],
      strategies: splitLines(strategies),
      inclusions: splitLines(strategies),
    });

    if (mode === "create") {
      setTitle("");
      setObjective("");
      setStrategies("");
      setContent("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-2 lg:col-span-2">
        <Label htmlFor="title">Título da aula</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="h-11"
        />
        </div>
        <div className="space-y-2">
        <Label htmlFor="objective">Objetivo</Label>
        <Textarea
          id="objective"
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          required
          className="min-h-28"
        />
        </div>
        <div className="space-y-2">
        <Label htmlFor="strategies">Estratégias inclusivas</Label>
        <Textarea
          id="strategies"
          value={strategies}
          onChange={(e) => setStrategies(e.target.value)}
          required
          className="min-h-28"
        />
        </div>
        <div className="space-y-2 lg:col-span-2">
        <Label htmlFor="content">Conteúdo e recursos</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="min-h-32"
        />
        </div>
      </div>
      <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} className="h-11 sm:w-auto">
            Cancelar
          </Button>
        )}
        <Button type="submit" size="lg" disabled={saving} className="min-w-44 shadow-sm sm:flex-none">
          <Save className="h-4 w-4" />
          {saving
            ? "Salvando..."
            : mode === "edit"
              ? "Atualizar Plano"
              : "Salvar Plano de Aula"}
        </Button>
      </div>
    </form>
  );
}
