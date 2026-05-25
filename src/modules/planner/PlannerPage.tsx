import { BookOpen, FileText, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../../app/components/ui/card";
import { DataToolbar } from "../../shared/components/DataToolbar";
import { EmptyState } from "../../shared/components/EmptyState";
import { ErrorState } from "../../shared/components/ErrorState";
import { LoadingState } from "../../shared/components/LoadingState";
import { PageHeader } from "../../shared/components/PageHeader";
import { PaginationControls } from "../../shared/components/PaginationControls";
import { LessonPlanCard } from "./components/LessonPlanCard";
import { LessonPlanForm } from "./components/LessonPlanForm";
import { useLessonPlans } from "./hooks/useLessonPlans";
import { LessonPlan } from "./types";

export default function PlannerPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editingPlan, setEditingPlan] = useState<LessonPlan | null>(null);
  const params = useMemo(() => ({ page, limit: 6, search }), [page, search]);
  const { data, loading, saving, error, create, update, remove } = useLessonPlans(params);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Planejamento"
        title="Planejador de Aulas"
        description="Crie e acompanhe planos inclusivos salvos na API."
        icon={<BookOpen className="h-10 w-10" />}
        metricLabel="Planos"
        metricValue={data?.meta.total ?? 0}
      />
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {editingPlan ? "Editar plano" : "Criar novo plano"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LessonPlanForm
            key={editingPlan?.id ?? "create"}
            saving={saving}
            mode={editingPlan ? "edit" : "create"}
            initialValues={editingPlan ?? undefined}
            onCancel={editingPlan ? () => setEditingPlan(null) : undefined}
            onSubmit={async (input) => {
              if (editingPlan) {
                try {
                  await update(editingPlan.id, input);
                  setEditingPlan(null);
                  toast.success("Plano atualizado com sucesso.");
                } catch {
                  toast.error("Não foi possível atualizar o plano.");
                }
                return;
              }

              try {
                await create(input);
                toast.success("Plano criado com sucesso.");
              } catch {
                toast.error("Não foi possível criar o plano.");
              }
            }}
          />
        </CardContent>
      </Card>
      <DataToolbar
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        placeholder="Buscar planos..."
      />
      {loading && <LoadingState label="Carregando planos..." />}
      {error && <ErrorState message={error} />}
      {!loading && !error && data?.items.length === 0 && (
        <EmptyState
          icon={<FileText className="h-10 w-10" />}
          title="Nenhum plano encontrado"
          description="Crie um novo plano ou ajuste sua busca."
        />
      )}
      {!loading && !error && data && data.items.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {data.items.map((plan) => (
              <LessonPlanCard
                key={plan.id}
                plan={plan}
                onDelete={async (id) => {
                  try {
                    await remove(id);
                    toast.success("Plano excluído com sucesso.");
                  } catch {
                    toast.error("Não foi possível excluir o plano.");
                  }
                }}
                onEdit={setEditingPlan}
              />
            ))}
          </div>
          <PaginationControls meta={data.meta} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
