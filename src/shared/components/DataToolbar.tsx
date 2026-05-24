import { Search } from "lucide-react";
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
    <div className="flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={placeholder}
          className="pl-10"
        />
      </div>
      {children}
    </div>
  );
}
