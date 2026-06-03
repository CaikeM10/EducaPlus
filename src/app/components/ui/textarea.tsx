import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        [
          // BASE
          "flex w-full min-w-0",

          // SIZE
          "min-h-32 px-4 py-3",

          // TYPOGRAPHY
          "text-sm font-medium",
          "text-foreground",
          "leading-7",
          "placeholder:text-muted-foreground/70",

          // VISUAL
          "rounded-2xl",
          "border border-border/60",
          "bg-white/80 backdrop-blur-sm",

          // SHADOW
          "shadow-sm",
          "shadow-black/[0.02]",

          // RESIZE
          "resize-none",

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

          // INVALID
          "aria-invalid:border-destructive",
          "aria-invalid:ring-destructive/10",

          // DISABLED
          "disabled:pointer-events-none",
          "disabled:cursor-not-allowed",
          "disabled:opacity-50",

          // MOBILE
          "md:text-sm",
        ],
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
