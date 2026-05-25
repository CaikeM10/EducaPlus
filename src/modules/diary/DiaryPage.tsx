import { BookMarked, PenLine } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../app/components/ui/card";

import { DataToolbar } from "../../shared/components/DataToolbar";
import { EmptyState } from "../../shared/components/EmptyState";
import { ErrorState } from "../../shared/components/ErrorState";
import { LoadingState } from "../../shared/components/LoadingState";
import { PageHeader } from "../../shared/components/PageHeader";
import { PaginationControls } from "../../shared/components/PaginationControls";

import { DiaryEntryCard } from "./components/DiaryEntryCard";
import { DiaryEntryForm } from "./components/DiaryEntryForm";
import { useDiary } from "./hooks/useDiary";
import { DiaryEntry } from "./types";

export default function DiaryPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null);

  const params = useMemo(
    () => ({
      page,
      limit: 6,
      search,
    }),
    [page, search],
  );

  const {
    entries,
    lessonPlans,
    loading,
    saving,
    error,
    create,
    update,
    remove,
  } = useDiary(params);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Reflexão Profissional"
        title="Diário de Prática"
        description="Registre experiências vinculadas aos seus planos de aula."
        icon={<BookMarked className="h-10 w-10" />}
        metricLabel="Reflexões"
        metricValue={entries?.meta.total ?? 0}
      />

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PenLine className="h-5 w-5" />
            {editingEntry ? "Editar reflexão" : "Nova reflexão"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {lessonPlans.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Crie um plano antes de registrar uma reflexão.
            </p>
          ) : (
            <DiaryEntryForm
              key={editingEntry?.id ?? "create"}
              lessonPlans={lessonPlans}
              saving={saving}
              mode={editingEntry ? "edit" : "create"}
              initialValues={editingEntry ?? undefined}
              onCancel={editingEntry ? () => setEditingEntry(null) : undefined}
              onSubmit={async (input) => {
                if (editingEntry) {
                  try {
                    await update(editingEntry.id, input);
                    setEditingEntry(null);
                    toast.success("Reflexão atualizada com sucesso.");
                  } catch {
                    toast.error("Não foi possível atualizar a reflexão.");
                  }
                  return;
                }

                try {
                  await create(input);
                  toast.success("Reflexão criada com sucesso.");
                } catch {
                  toast.error("Não foi possível criar a reflexão.");
                }
              }}
            />
          )}
        </CardContent>
      </Card>

      <DataToolbar
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        placeholder="Buscar reflexões..."
      />

      {loading && (
        <LoadingState label="Carregando diário..." />
      )}

      {error && <ErrorState message={error} />}

      {!loading &&
        !error &&
        entries?.items.length === 0 && (
          <EmptyState
            icon={<BookMarked className="h-10 w-10" />}
            title="Nenhuma reflexão encontrada"
            description="Registre uma nova reflexão ou ajuste sua busca."
          />
        )}

      {!loading &&
        !error &&
        entries &&
        entries.items.length > 0 && (
          <>
            <div className="space-y-4">
              {entries.items.map((entry) => (
                <DiaryEntryCard
                  key={entry.id}
                  entry={entry}
                  onEdit={setEditingEntry}
                  onDelete={async (id) => {
                    try {
                      await remove(id);
                      toast.success("Reflexão excluída com sucesso.");
                    } catch {
                      toast.error("Não foi possível excluir a reflexão.");
                    }
                  }}
                />
              ))}
            </div>

            <PaginationControls
              meta={entries.meta}
              onPageChange={setPage}
            />
          </>
        )}
    </div>
  );
}
