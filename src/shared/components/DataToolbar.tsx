import { Search, Sparkles } from "lucide-react";

import { Input } from "../../app/components/ui/input";

type DataToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  children?: React.ReactNode;
};

export function DataToolbar({
  search,
  onSearchChange,
  placeholder = "Buscar...",
  children,
}: DataToolbarProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
      {/* Glow */}
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Busca */}
        <div className="w-full md:max-w-lg">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Pesquisa inteligente
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={placeholder}
              className="h-12 rounded-xl border-border/60 bg-background/80 pl-11 shadow-sm"
            />
          </div>
        </div>

        {/* Filtros / Botões */}
        {children && (
          <div className="flex flex-wrap items-center gap-2">{children}</div>
        )}
      </div>
    </div>
  );
}
