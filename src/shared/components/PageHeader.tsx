import { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  metricLabel?: string;
  metricValue?: string | number;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  icon,
  action,
  metricLabel,
  metricValue,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/20 bg-gradient-to-br from-primary via-primary to-violet-500 px-6 py-8 shadow-2xl shadow-primary/10 md:px-8 md:py-10">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0">
        {/* glow top */}
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        {/* glow bottom */}
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl" />

        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
        {/* LEFT */}
        <div className="flex items-start gap-5">
          {/* ICON */}
          {icon && (
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg">
              {icon}
            </div>
          )}

          {/* TEXT */}
          <div className="space-y-4">
            {eyebrow && (
              <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
                {eyebrow}
              </div>
            )}

            <div className="space-y-3">
              <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-[-0.04em] text-white md:text-5xl">
                {title}
              </h1>

              {description && (
                <p className="max-w-3xl text-sm leading-8 text-white/80 md:text-base">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* ACTION */}
          {action && <div className="flex items-center">{action}</div>}

          {/* METRIC */}
          {metricLabel && (
            <div className="min-w-[180px] rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-md shadow-xl">
              <p className="text-sm font-medium text-white/70">{metricLabel}</p>

              <p className="mt-2 text-4xl font-bold tracking-tight text-white">
                {metricValue}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
