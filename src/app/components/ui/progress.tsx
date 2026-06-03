"use client";

import * as React from "react";

import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "./utils";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        `
        relative h-2.5 w-full overflow-hidden rounded-full
        bg-muted/70
        shadow-inner
        backdrop-blur-sm
        `,
        className,
      )}
      {...props}
    >
      {/* FUNDO SUAVE */}
      <div className="absolute inset-0 bg-gradient-to-r from-muted/40 to-muted/70" />

      {/* PROGRESSO */}
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="
          relative h-full w-full flex-1
          rounded-full
          bg-gradient-to-r
          from-secondary
          via-primary
          to-accent
          transition-all duration-700 ease-out
        "
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
        }}
      >
        {/* GLOW */}
        <div className="absolute inset-0 rounded-full bg-white/20 blur-[1px]" />

        {/* BRILHO */}
        <div className="absolute right-0 top-0 h-full w-8 bg-white/20 blur-sm" />
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  );
}

export { Progress };
