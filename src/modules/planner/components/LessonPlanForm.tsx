import { useState } from "react";

import { Save } from "lucide-react";

import { Button } from "../../../app/components/ui/button";
import { Input } from "../../../app/components/ui/input";
import { Label } from "../../../app/components/ui/label";
import { Textarea } from "../../../app/components/ui/textarea";

import { CreateLessonPlanInput, LessonPlan } from "../types";

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

  const textareaClass =
    "min-h-[150px] rounded-2xl border border-border bg-background px-4 py-3 text-sm shadow-sm transition-all duration-200 placeholder:text-muted-foreground/70 hover:border-primary/40 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20";

  const inputClass =
    "h-12 rounded-2xl border border-border bg-background px-4 shadow-sm transition-all duration-200 placeholder:text-muted-foreground/70 hover:border-primary/40 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* TÍTULO */}
        <div className="space-y-2 lg:col-span-2">
          <Label htmlFor="title" className="text-sm font-medium">
            Título da aula
          </Label>

          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Introdução à comunicação inclusiva"
            required
            className={inputClass}
          />
        </div>

        {/* OBJETIVO */}
        <div className="space-y-2">
          <Label htmlFor="objective" className="text-sm font-medium">
            Objetivo
          </Label>

          <Textarea
            id="objective"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            placeholder="Ex: Desenvolver habilidades de comunicação e participação inclusiva em sala de aula."
            required
            className={textareaClass}
          />
        </div>

        {/* ESTRATÉGIAS */}
        <div className="space-y-2">
          <Label htmlFor="strategies" className="text-sm font-medium">
            Estratégias inclusivas
          </Label>

          <Textarea
            id="strategies"
            value={strategies}
            onChange={(e) => setStrategies(e.target.value)}
            placeholder="Ex: Uso de recursos visuais, adaptação curricular, apoio individualizado..."
            required
            className={textareaClass}
          />
        </div>

        {/* CONTEÚDO */}
        <div className="space-y-2 lg:col-span-2">
          <Label htmlFor="content" className="text-sm font-medium">
            Conteúdo e recursos
          </Label>

          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Descreva conteúdos, atividades, materiais pedagógicos e recursos utilizados."
            required
            className={`${textareaClass} min-h-[180px]`}
          />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="h-11 rounded-2xl px-6"
          >
            Cancelar
          </Button>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={saving}
          className="min-w-44 rounded-2xl shadow-sm"
        >
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
