import * as React from "react";

import { cn } from "./utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        [
          // BASE
          "relative flex flex-col gap-6 overflow-hidden",

          // VISUAL
          "rounded-[28px]",
          "border border-white/40",
          "bg-white/75 backdrop-blur-xl",

          // SHADOW
          "shadow-lg",
          "shadow-black/[0.04]",

          // TRANSITIONS
          "transition-all duration-300 ease-out",

          // HOVER
          "hover:-translate-y-1",
          "hover:border-primary/10",
          "hover:shadow-2xl",
          "hover:shadow-primary/[0.08]",

          // BEFORE GLOW
          "before:pointer-events-none",
          "before:absolute",
          "before:inset-0",
          "before:rounded-[28px]",
          "before:border",
          "before:border-white/20",

          // AFTER LIGHT
          "after:pointer-events-none",
          "after:absolute",
          "after:inset-x-0",
          "after:top-0",
          "after:h-px",
          "after:bg-white/40",
        ],
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        [
          "@container/card-header",
          "grid auto-rows-min",
          "grid-rows-[auto_auto]",
          "items-start",

          // SPACING
          "gap-2",
          "px-6 pt-6",

          // ACTION SUPPORT
          "has-data-[slot=card-action]:grid-cols-[1fr_auto]",

          // BORDER SUPPORT
          "[.border-b]:pb-6",
        ],
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <h4
      data-slot="card-title"
      className={cn(
        [
          // TYPOGRAPHY
          "text-lg font-semibold",
          "tracking-[-0.02em]",
          "text-foreground",

          // SPACING
          "leading-tight",
        ],
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <p
      data-slot="card-description"
      className={cn(
        ["text-sm", "leading-7", "text-muted-foreground"],
        className,
      )}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        [
          "col-start-2",
          "row-span-2",
          "row-start-1",

          "self-start",
          "justify-self-end",
        ],
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(["px-6", "[&:last-child]:pb-6"], className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        ["flex items-center", "px-6 pb-6", "[.border-t]:pt-6"],
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
