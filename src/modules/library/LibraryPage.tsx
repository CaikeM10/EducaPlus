import { BookOpen, FileText, Filter, Sparkles, Library } from "lucide-react";

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
  {
    label: "Todos",
    value: "",
  },
  {
    label: "Guias",
    value: "guides",
  },
  {
    label: "Vídeos",
    value: "videos",
  },
  {
    label: "Estratégias",
    value: "strategies",
  },
  {
    label: "Atividades",
    value: "activities",
  },
];

export default function LibraryPage() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const params = useMemo(
    () => ({
      page,
      limit: 9,
      search,
      category: category || undefined,
    }),
    [page, search, category],
  );

  const { data, loading, error } = useResources(params);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <PageHeader
        eyebrow="Central de Recursos"
        title="Biblioteca Educacional"
        description="Explore conteúdos, estratégias e materiais voltados para práticas pedagógicas inclusivas."
        icon={<BookOpen className="h-10 w-10" />}
        metricLabel="Recursos"
        metricValue={data?.meta.total ?? 0}
      />

      {/* HERO */}
      <div className="rounded-3xl bg-gradient-to-r from-primary to-primary/80 p-6 text-white shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 rounded-xl p-2">
                <Sparkles className="h-5 w-5" />
              </div>

              <span className="font-medium">Curadoria Inteligente</span>
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                Recursos para fortalecer práticas inclusivas
              </h2>

              <p className="mt-3 text-white/90 leading-7">
                Acesse materiais pedagógicos, estratégias educacionais e
                conteúdos selecionados para apoiar o desenvolvimento de
                experiências inclusivas em sala de aula.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-5 min-w-[240px]">
            <div className="space-y-2">
              <p className="text-sm text-white/80">Recursos disponíveis</p>

              <p className="text-5xl font-bold">{data?.meta.total ?? 0}</p>

              <p className="text-sm text-white/80">materiais catalogados</p>
            </div>
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <DataToolbar
        search={search}
        onSearchChange={(value) => {
          setSearch(value);

          setPage(1);
        }}
        placeholder="Buscar recursos pedagógicos..."
      >
        <div className="flex w-full flex-col gap-3 md:w-auto">
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Filter className="h-3.5 w-3.5" />
            Categorias
          </span>

          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((filter) => {
              const active = category === filter.value;

              return (
                <Button
                  key={filter.label}
                  variant={active ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setCategory(filter.value);

                    setPage(1);
                  }}
                  className="min-w-[100px] rounded-xl"
                >
                  {filter.label}
                </Button>
              );
            })}
          </div>
        </div>
      </DataToolbar>

      {/* STATES */}
      {loading && <LoadingState label="Carregando recursos..." />}

      {error && <ErrorState message={error} />}

      {!loading && !error && data?.items.length === 0 && (
        <EmptyState
          icon={<FileText className="h-10 w-10" />}
          title="Nenhum recurso encontrado"
          description="Ajuste os filtros ou explore outras categorias para encontrar novos materiais pedagógicos."
        />
      )}

      {/* CONTENT */}
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
