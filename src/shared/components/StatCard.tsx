import { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../app/components/ui/card";

type StatCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
};

export function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <Card
      className="
        group relative overflow-hidden
        border border-border/50
        bg-white/80
        backdrop-blur-sm
        transition-all duration-500
        hover:-translate-y-1
        hover:shadow-2xl
        hover:shadow-primary/10
      "
    >
      {/* GLOW */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* HEADER */}
      <CardHeader className="relative flex flex-row items-start justify-between pb-2">
        <div className="space-y-2">
          <CardTitle className="text-sm font-semibold tracking-wide text-muted-foreground">
            {title}
          </CardTitle>
        </div>

        {icon && (
          <div className="rounded-2xl border border-border/40 bg-white/70 p-3 shadow-sm backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
            {icon}
          </div>
        )}
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="relative">
        <div className="space-y-3">
          <div className="text-4xl font-bold tracking-tight">{value}</div>

          {description && (
            <p className="max-w-[220px] text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
