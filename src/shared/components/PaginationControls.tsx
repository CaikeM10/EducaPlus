import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

import { Button } from "../../app/components/ui/button";

import { PaginationMeta } from "../types/api";

export function PaginationControls({
  meta,
  onPageChange,
}: {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="rounded-2xl border border-border/50 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-2">
            <BookOpen className="h-4 w-4 text-primary" />
          </div>

          <div>
            <p className="text-sm font-medium">
              Página {meta.page} de {meta.totalPages}
            </p>

            <p className="text-xs text-muted-foreground">
              {meta.total} registro(s) encontrados
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={!meta.hasPreviousPage}
            onClick={() => onPageChange(meta.page - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>

          <Button
            variant="outline"
            disabled={!meta.hasNextPage}
            onClick={() => onPageChange(meta.page + 1)}
          >
            Próxima
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
