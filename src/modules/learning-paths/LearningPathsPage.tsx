import { BookOpen, GraduationCap, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "../../app/components/ui/badge";

import { DataToolbar } from "../../shared/components/DataToolbar";
import { EmptyState } from "../../shared/components/EmptyState";
import { ErrorState } from "../../shared/components/ErrorState";
import { LoadingState } from "../../shared/components/LoadingState";
import { PageHeader } from "../../shared/components/PageHeader";
import { PaginationControls } from "../../shared/components/PaginationControls";

import { LearningPathCard } from "./components/LearningPathCard";
import { useLearningPaths } from "./hooks/useLearningPaths";

export default function LearningPathsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const params = useMemo(
    () => ({
      page,
      limit: 9,
      search,
    }),
    [page, search],
  );

  const { data, loading, error } = useLearningPaths(params);

  return (
    <div className="space-y-8">
      {/* HERO */}
      <PageHeader
        eyebrow="Aprendizado Personalizado"
        title="Trilhas de Aprendizado"
        description="Explore conteúdos estruturados em educação inclusiva, desenvolva novas competências e acompanhe sua evolução profissional."
        icon={<GraduationCap className="h-10 w-10" />}
        metricLabel="Trilhas"
        metricValue={data?.meta.total ?? 0}
      />

      {/* INTRO */}
      <div className="rounded-3xl border border-primary/10 bg-gradient-to-r from-primary/5 via-primary/10 to-accent/10 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <Badge variant="purple" className="gap-2 px-4 py-1.5">
              <Sparkles className="h-4 w-4" />
              Recomendações Inteligentes
            </Badge>

            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Trilhas recomendadas para seu desenvolvimento
              </h2>

              <p className="mt-2 max-w-3xl text-muted-foreground leading-7">
                Explore conteúdos alinhados ao seu perfil profissional,
                acompanhe sua evolução pedagógica e desenvolva práticas mais
                inclusivas em sala de aula.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-primary/10 bg-white/70 p-5 backdrop-blur-sm">
            <p className="text-sm text-muted-foreground">Trilhas disponíveis</p>

            <p className="mt-1 text-4xl font-bold text-primary">
              {data?.meta.total ?? 0}
            </p>
          </div>
        </div>
      </div>

      {/* BUSCA */}
      <div className="rounded-2xl border border-border/50 bg-white/70 p-2 backdrop-blur-sm">
        <DataToolbar
          search={search}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          placeholder="Buscar trilhas..."
        />
      </div>

      {/* LOADING */}
      {loading && <LoadingState label="Carregando trilhas..." />}

      {/* ERROR */}
      {error && <ErrorState message={error} />}

      {/* EMPTY */}
      {!loading && !error && data?.items.length === 0 && (
        <EmptyState
          icon={<BookOpen className="h-10 w-10" />}
          title="Nenhuma trilha encontrada"
          description="Ajuste sua busca ou tente novamente mais tarde."
        />
      )}

      {/* GRID */}
      {!loading && !error && data && data.items.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {data.items.map((path) => (
              <LearningPathCard key={path.id} path={path} />
            ))}
          </div>

          <PaginationControls meta={data.meta} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
