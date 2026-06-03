import {
  BookOpen,
  FileText,
  Plus,
  Sparkles,
  ClipboardCheck,
} from "lucide-react";

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

import { LessonPlanCard } from "./components/LessonPlanCard";

import { LessonPlanForm } from "./components/LessonPlanForm";

import { useLessonPlans } from "./hooks/useLessonPlans";

import { LessonPlan } from "./types";
import { StatCard } from "../../shared/components/StatCard";

export default function PlannerPage() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [editingPlan, setEditingPlan] = useState<LessonPlan | null>(null);

  const params = useMemo(
    () => ({
      page,
      limit: 6,
      search,
    }),
    [page, search],
  );

  const { data, loading, saving, error, create, update, remove } =
    useLessonPlans(params);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <PageHeader
        eyebrow="Planejamento Pedagógico"
        title="Planejador de Aulas"
        description="Organize planos inclusivos, acompanhe estratégias pedagógicas e registre práticas educacionais."
        icon={<BookOpen className="h-10 w-10" />}
        metricLabel="Planos"
        metricValue={data?.meta.total ?? 0}
      />

      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary/80 p-6 text-white shadow-xl">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute left-0 bottom-0 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 rounded-xl p-2">
                <Sparkles className="h-5 w-5" />
              </div>

              <span className="font-medium">Planejamento Inteligente</span>
            </div>

            <div>
              <h2 className="text-4xl font-bold tracking-tight">
                {" "}
                Organize práticas pedagógicas inclusivas
              </h2>

              <p className="mt-3 text-lg leading-8 text-white/85">
                {" "}
                Crie planos estruturados, acompanhe conteúdos pedagógicos e
                fortaleça experiências educacionais alinhadas às necessidades da
                aprendizagem inclusiva.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-5 min-w-[240px]">
            <div className="space-y-2">
              <p className="text-sm text-white/80">Planejamentos ativos</p>

              <p className="text-5xl font-bold">{data?.meta.total ?? 0}</p>

              <p className="text-sm text-white/80">planos registrados</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Planos Criados"
          value={data?.meta.total ?? 0}
          icon={<FileText className="h-5 w-5" />}
        />

        <StatCard
          title="Planejamentos Ativos"
          value={data?.items.length ?? 0}
          icon={<ClipboardCheck className="h-5 w-5" />}
        />

        <StatCard
          title="Produtividade"
          value="100%"
          icon={<Sparkles className="h-5 w-5" />}
        />
      </div>
      {/* FORM */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="bg-primary/10 rounded-xl p-2">
              {editingPlan ? (
                <ClipboardCheck className="h-5 w-5 text-primary" />
              ) : (
                <Plus className="h-5 w-5 text-primary" />
              )}
            </div>

            {editingPlan
              ? "Editar plano pedagógico"
              : "Criar novo plano pedagógico"}
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

      {/* SEARCH */}
      <div className="rounded-2xl border border-border/50 bg-white/70 p-2 backdrop-blur-sm">
        <DataToolbar
          search={search}
          onSearchChange={(value: string) => {
            setPage(1);
            setSearch(value);
          }}
        />
      </div>

      {/* STATES */}
      {loading && <LoadingState label="Carregando planos..." />}

      {error && <ErrorState message={error} />}

      {!loading && !error && data?.items.length === 0 && (
        <EmptyState
          icon={<FileText className="h-10 w-10" />}
          title="Você ainda não possui planejamentos"
          description="Comece criando seu primeiro plano pedagógico inclusivo."
        />
      )}

      {/* CONTENT */}
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
