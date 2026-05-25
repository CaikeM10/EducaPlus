import { ReactNode } from "react";
import { Card, CardContent } from "../../app/components/ui/card";

type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="py-16 text-center">
        {icon && <div className="mb-4 flex justify-center text-muted-foreground">{icon}</div>}
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && (
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            {description}
          </p>
        )}
        {action && <div className="mt-6 flex justify-center">{action}</div>}
      </CardContent>
    </Card>
  );
}
