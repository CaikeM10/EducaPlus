import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        [
          // BASE
          "flex w-full min-w-0",

          // SIZE
          "h-12 px-4 py-3",

          // TYPOGRAPHY
          "text-sm font-medium",
          "text-foreground",
          "placeholder:text-muted-foreground/70",

          // VISUAL
          "rounded-2xl",
          "border border-border/60",
          "bg-white/80 backdrop-blur-sm",

          // SHADOW
          "shadow-sm",
          "shadow-black/[0.02]",

          // TRANSITIONS
          "transition-all duration-300 ease-out",

          // HOVER
          "hover:border-primary/30",
          "hover:bg-white",

          // FOCUS
          "focus-visible:outline-none",
          "focus-visible:border-primary/50",
          "focus-visible:ring-4",
          "focus-visible:ring-primary/10",
          "focus-visible:bg-white",

          // FILE INPUT
          "file:border-0",
          "file:bg-transparent",
          "file:text-sm",
          "file:font-medium",

          // DISABLED
          "disabled:pointer-events-none",
          "disabled:cursor-not-allowed",
          "disabled:opacity-50",

          // INVALID
          "aria-invalid:border-destructive",
          "aria-invalid:ring-destructive/10",

          // MOBILE
          "md:text-sm",
        ],
        className,
      )}
      {...props}
    />
  );
}

export { Input };
