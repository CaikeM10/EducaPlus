import { BookMarked, Calendar, PenLine, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "../../app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../app/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../app/components/ui/select";
import { Textarea } from "../../app/components/ui/textarea";

import { DataToolbar } from "../../shared/components/DataToolbar";
import { EmptyState } from "../../shared/components/EmptyState";
import { ErrorState } from "../../shared/components/ErrorState";
import { LoadingState } from "../../shared/components/LoadingState";
import { PageHeader } from "../../shared/components/PageHeader";
import { PaginationControls } from "../../shared/components/PaginationControls";

import { useDiary } from "./hooks/useDiary";

export default function DiaryPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [lessonPlanId, setLessonPlanId] = useState("");
  const [whatWorked, setWhatWorked] = useState("");

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
    remove,
  } = useDiary(params);

  useEffect(() => {
    if (!lessonPlanId && lessonPlans.length > 0) {
      setLessonPlanId(lessonPlans[0].id);
    }
  }, [lessonPlans, lessonPlanId]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();

    if (!lessonPlanId) {
      return;
    }

    await create({
      lessonPlanId,
      whatWorked,
    });

    setWhatWorked("");
  }

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
            Nova reflexão
          </CardTitle>
        </CardHeader>

        <CardContent>
          {lessonPlans.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Crie um plano antes de registrar uma reflexão.
            </p>
          ) : (
            <form className="space-y-4" onSubmit={submit}>
              <Select
                value={lessonPlanId}
                onValueChange={setLessonPlanId}
              >
                <SelectTrigger>
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
                placeholder="Quais estratégias funcionaram?"
                required
              />

              <Button
                type="submit"
                disabled={
                  saving ||
                  !whatWorked.trim() ||
                  !lessonPlanId
                }
              >
                {saving ? "Salvando..." : "Salvar Reflexão"}
              </Button>
            </form>
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
                <Card
                  key={entry.id}
                  className="border-0 shadow-sm"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium">
                          {entry.lessonPlan?.title ??
                            "Plano de aula"}
                        </p>

                        <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />

                          {new Date(
                            entry.createdAt,
                          ).toLocaleString("pt-BR")}
                        </p>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(entry.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="whitespace-pre-wrap text-sm leading-6">
                      {entry.whatWorked}
                    </p>
                  </CardContent>
                </Card>
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