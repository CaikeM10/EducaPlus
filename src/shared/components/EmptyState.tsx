import { ReactNode } from "react";
import { Card, CardContent } from "../../app/components/ui/card";

type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="relative py-20">
        {/* Glow */}
        <div className="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative flex flex-col items-center text-center">
          {icon && (
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-primary/10 bg-primary/5 text-primary">
              {icon}
            </div>
          )}

          <h3 className="text-2xl font-bold tracking-tight">{title}</h3>

          {description && (
            <p className="mt-3 max-w-lg text-sm leading-7 text-muted-foreground">
              {description}
            </p>
          )}

          {action && <div className="mt-8">{action}</div>}
        </div>
      </CardContent>
    </Card>
  );
}
