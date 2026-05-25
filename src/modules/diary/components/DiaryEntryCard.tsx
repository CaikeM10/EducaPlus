import { Calendar, Edit2, Trash2 } from "lucide-react";
import { Button } from "../../../app/components/ui/button";
import { Card, CardContent, CardHeader } from "../../../app/components/ui/card";
import { DiaryEntry } from "../types";

type DiaryEntryCardProps = {
  entry: DiaryEntry;
  onEdit: (entry: DiaryEntry) => void;
  onDelete: (id: string) => void;
};

export function DiaryEntryCard({ entry, onEdit, onDelete }: DiaryEntryCardProps) {
  return (
    <Card className="border-0 shadow-sm transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-medium">{entry.lessonPlan?.title ?? "Plano de aula"}</p>
            <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {new Date(entry.createdAt).toLocaleString("pt-BR")}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(entry)}>
              <Edit2 className="h-4 w-4" />
              Editar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                if (window.confirm("Excluir esta reflexão?")) {
                  onDelete(entry.id);
                }
              }}
            >
              <Trash2 className="h-4 w-4" />
              Excluir
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 text-sm leading-6">
        <p className="whitespace-pre-wrap">{entry.whatWorked}</p>
        {entry.whatFailed && (
          <p className="whitespace-pre-wrap text-muted-foreground">
            <strong>Ajustes:</strong> {entry.whatFailed}
          </p>
        )}
        {entry.inclusionReflection && (
          <p className="whitespace-pre-wrap text-muted-foreground">
            <strong>Inclusão:</strong> {entry.inclusionReflection}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
