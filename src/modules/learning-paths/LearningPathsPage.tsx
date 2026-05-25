import { BookOpen, GraduationCap } from "lucide-react";
import { useMemo, useState } from "react";
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
  const params = useMemo(() => ({ page, limit: 9, search }), [page, search]);
  const { data, loading, error } = useLearningPaths(params);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Aprendizado Personalizado"
        title="Trilhas de Aprendizado"
        description="Explore conteúdos estruturados em educação inclusiva."
        icon={<GraduationCap className="h-10 w-10" />}
        metricLabel="Trilhas"
        metricValue={data?.meta.total ?? 0}
      />
      <DataToolbar
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        placeholder="Buscar trilhas..."
      />
      {loading && <LoadingState label="Carregando trilhas..." />}
      {error && <ErrorState message={error} />}
      {!loading && !error && data?.items.length === 0 && (
        <EmptyState
          icon={<BookOpen className="h-10 w-10" />}
          title="Nenhuma trilha encontrada"
          description="Ajuste sua busca ou tente novamente mais tarde."
        />
      )}
      {!loading && !error && data && data.items.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
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
