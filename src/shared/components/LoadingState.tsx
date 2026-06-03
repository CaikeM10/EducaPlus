export function LoadingState({ label = "Carregando..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-primary/10" />

        <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-primary" />
      </div>

      <p className="mt-6 text-sm font-medium text-muted-foreground animate-pulse">
        {label}
      </p>
    </div>
  );
}
