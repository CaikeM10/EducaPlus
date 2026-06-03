import * as React from "react";

import { Slot } from "@radix-ui/react-slot";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  [
    // BASE
    "inline-flex items-center justify-center gap-2",

    // TYPOGRAPHY
    "text-sm font-semibold tracking-[-0.01em]",

    // LAYOUT
    "whitespace-nowrap shrink-0",

    // VISUAL
    "rounded-2xl",

    // TRANSITIONS
    "transition-all duration-300 ease-out",

    // FOCUS
    "outline-none",
    "focus-visible:ring-4",
    "focus-visible:ring-primary/15",

    // DISABLED
    "disabled:pointer-events-none",
    "disabled:opacity-50",

    // ACTIVE
    "active:scale-[0.98]",

    // ICONS
    "[&_svg]:pointer-events-none",
    "[&_svg]:shrink-0",
    "[&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        default: [
          // COLORS
          "bg-primary text-primary-foreground",

          // SHADOW
          "shadow-lg shadow-primary/20",

          // HOVER
          "hover:-translate-y-0.5",
          "hover:bg-primary/95",
          "hover:shadow-xl",
          "hover:shadow-primary/30",
        ],

        destructive: [
          "bg-destructive text-white",

          "shadow-lg shadow-destructive/20",

          "hover:-translate-y-0.5",
          "hover:bg-destructive/90",
          "hover:shadow-xl",
          "hover:shadow-destructive/30",
        ],

        outline: [
          // VISUAL
          "border border-border/60",
          "bg-white/70 backdrop-blur-sm",
          "text-foreground",

          // SHADOW
          "shadow-sm shadow-black/[0.02]",

          // HOVER
          "hover:-translate-y-0.5",
          "hover:border-primary/20",
          "hover:bg-white",
          "hover:text-primary",
          "hover:shadow-md",
        ],

        secondary: [
          "bg-secondary text-secondary-foreground",

          "shadow-sm",

          "hover:-translate-y-0.5",
          "hover:bg-secondary/90",
          "hover:shadow-md",
        ],

        ghost: ["text-foreground", "hover:bg-primary/5", "hover:text-primary"],

        link: ["text-primary underline-offset-4", "hover:underline"],
      },

      size: {
        default: "h-11 px-5 py-2.5",

        sm: "h-9 px-4 text-xs",

        lg: "h-12 px-6 text-base",

        icon: "size-11",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({
          variant,
          size,
          className,
        }),
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
