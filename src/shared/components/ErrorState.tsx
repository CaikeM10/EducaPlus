import { AlertTriangle, RefreshCcw } from "lucide-react";

import { Button } from "../../app/components/ui/button";

type ErrorStateProps = {
  message: string;
  onRetry?: () => void;
};

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-destructive/20 bg-gradient-to-br from-destructive/5 to-destructive/10 p-6">
      {/* Glow */}
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-destructive/10 blur-3xl" />

      <div className="relative flex flex-col gap-5 md:flex-row md:items-start">
        <div className="rounded-2xl bg-destructive/10 p-4">
          <AlertTriangle className="h-7 w-7 text-destructive" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold">Ocorreu um problema</h3>

          <p className="mt-2 leading-7 text-muted-foreground">{message}</p>

          {onRetry && (
            <Button variant="outline" onClick={onRetry} className="mt-5 gap-2">
              <RefreshCcw className="h-4 w-4" />
              Tentar novamente
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
