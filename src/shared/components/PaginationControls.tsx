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
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        Página {meta.page} de {meta.totalPages} · {meta.total} registro(s)
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          disabled={!meta.hasPreviousPage}
          onClick={() => onPageChange(meta.page - 1)}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          disabled={!meta.hasNextPage}
          onClick={() => onPageChange(meta.page + 1)}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}
