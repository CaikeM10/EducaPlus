import { BookOpen, FileText } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "../../app/components/ui/button";
import { DataToolbar } from "../../shared/components/DataToolbar";
import { EmptyState } from "../../shared/components/EmptyState";
import { ErrorState } from "../../shared/components/ErrorState";
import { LoadingState } from "../../shared/components/LoadingState";
import { PageHeader } from "../../shared/components/PageHeader";
import { PaginationControls } from "../../shared/components/PaginationControls";
import { ResourceCard } from "./components/ResourceCard";
import { useResources } from "./hooks/useResources";

const categoryFilters = [
  { label: "Todos", value: "" },
  { label: "Guias", value: "guides" },
  { label: "Vídeos", value: "videos" },
  { label: "Estratégias", value: "strategies" },
  { label: "Atividades", value: "activities" },
];

export default function LibraryPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const params = useMemo(
    () => ({ page, limit: 9, search, category: category || undefined }),
    [page, search, category],
  );
  const { data, loading, error } = useResources(params);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Central de Recursos"
        title="Biblioteca Educacional"
        description="Explore materiais, estratégias e conteúdos para fortalecer o ensino inclusivo."
        icon={<BookOpen className="h-10 w-10" />}
        metricLabel="Recursos"
        metricValue={data?.meta.total ?? 0}
      />
      <DataToolbar
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        placeholder="Buscar recursos..."
      >
        <div className="flex flex-wrap gap-2">
          {categoryFilters.map((filter) => (
            <Button
              key={filter.label}
              variant={category === filter.value ? "default" : "outline"}
              onClick={() => {
                setCategory(filter.value);
                setPage(1);
              }}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </DataToolbar>
      {loading && <LoadingState label="Carregando recursos..." />}
      {error && <ErrorState message={error} />}
      {!loading && !error && data?.items.length === 0 && (
        <EmptyState
          icon={<FileText className="h-10 w-10" />}
          title="Nenhum recurso encontrado"
          description="Ajuste a busca ou filtros para encontrar outros materiais."
        />
      )}
      {!loading && !error && data && data.items.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {data.items.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
          <PaginationControls meta={data.meta} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
