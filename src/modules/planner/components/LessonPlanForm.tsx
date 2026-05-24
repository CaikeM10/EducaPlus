import { useState } from "react";
import { Button } from "../../../app/components/ui/button";
import { Input } from "../../../app/components/ui/input";
import { Label } from "../../../app/components/ui/label";
import { Textarea } from "../../../app/components/ui/textarea";
import { CreateLessonPlanInput } from "../types";

function splitLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function LessonPlanForm({
  saving,
  onSubmit,
}: {
  saving: boolean;
  onSubmit: (input: CreateLessonPlanInput) => Promise<void>;
}) {
  const [title, setTitle] = useState("");
  const [objective, setObjective] = useState("");
  const [strategies, setStrategies] = useState("");
  const [content, setContent] = useState("");

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

    setTitle("");
    setObjective("");
    setStrategies("");
    setContent("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="title">Título da aula</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="objective">Objetivo</Label>
        <Textarea id="objective" value={objective} onChange={(e) => setObjective(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="strategies">Estratégias inclusivas</Label>
        <Textarea id="strategies" value={strategies} onChange={(e) => setStrategies(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Conteúdo e recursos</Label>
        <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required />
      </div>
      <Button type="submit" disabled={saving} className="w-full">
        {saving ? "Salvando..." : "Salvar Plano de Aula"}
      </Button>
    </form>
  );
}
