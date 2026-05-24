import { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  metricLabel?: string;
  metricValue?: string | number;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  icon,
  metricLabel,
  metricValue,
}: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary p-6 md:p-8 text-white shadow-md">
      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          {icon && (
            <div className="rounded-xl border border-white/20 bg-white/15 p-4">
              {icon}
            </div>
          )}
          <div>
            {eyebrow && <p className="text-sm text-white/75">{eyebrow}</p>}
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {title}
            </h1>
            {description && (
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/80 md:text-base">
                {description}
              </p>
            )}
          </div>
        </div>
        {metricLabel && (
          <div className="min-w-36 rounded-xl border border-white/20 bg-white/10 p-4">
            <p className="text-sm text-white/70">{metricLabel}</p>
            <p className="mt-1 text-3xl font-bold">{metricValue}</p>
          </div>
        )}
      </div>
    </div>
  );
}
