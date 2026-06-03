"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "./utils";

function Select(props: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup(
  props: React.ComponentProps<typeof SelectPrimitive.Group>,
) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue(
  props: React.ComponentProps<typeof SelectPrimitive.Value>,
) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        [
          // BASE
          "group flex w-full items-center justify-between gap-3",

          // SIZE
          "h-12 px-4 py-3",

          // TYPOGRAPHY
          "text-sm font-medium",
          "text-foreground",
          "data-[placeholder]:text-muted-foreground/70",

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

          // INVALID
          "aria-invalid:border-destructive",
          "aria-invalid:ring-destructive/10",

          // DISABLED
          "disabled:pointer-events-none",
          "disabled:cursor-not-allowed",
          "disabled:opacity-50",

          // VALUE
          "*:data-[slot=select-value]:line-clamp-1",
          "*:data-[slot=select-value]:flex",
          "*:data-[slot=select-value]:items-center",
          "*:data-[slot=select-value]:gap-2",

          // ICON
          "[&_svg]:pointer-events-none",
          "[&_svg]:shrink-0",
          "[&_svg:not([class*='size-'])]:size-4",

          // MOBILE
          "md:text-sm",
        ],
        className,
      )}
      {...props}
    >
      {children}

      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-60 transition-transform duration-300 group-data-[state=open]:rotate-180" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        className={cn(
          [
            // BASE
            "relative z-50 overflow-hidden",

            // SIZE
            "max-h-[320px] min-w-[10rem]",

            // VISUAL
            "rounded-2xl",
            "border border-white/40",
            "bg-white/90 backdrop-blur-xl",

            // SHADOW
            "shadow-2xl",
            "shadow-black/10",

            // ANIMATION
            "data-[state=open]:animate-in",
            "data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0",
            "data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95",
            "data-[state=open]:zoom-in-95",
            "duration-200",

            // POSITION
            position === "popper" &&
              "data-[side=bottom]:translate-y-2 data-[side=top]:-translate-y-2",
          ],
          className,
        )}
        {...props}
      >
        <SelectScrollUpButton />

        <SelectPrimitive.Viewport
          className={cn(
            "p-2",
            position === "popper" &&
              "w-full min-w-[var(--radix-select-trigger-width)]",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>

        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn(
        "px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        [
          // BASE
          "relative flex w-full cursor-pointer items-center gap-3",

          // SIZE
          "px-3 py-3 pr-8",

          // TYPOGRAPHY
          "text-sm font-medium",

          // VISUAL
          "rounded-xl",
          "outline-none",
          "select-none",

          // TRANSITIONS
          "transition-all duration-200",

          // HOVER
          "hover:bg-primary/5",
          "focus:bg-primary/5",

          // ACTIVE
          "data-[state=checked]:bg-primary/10",
          "data-[state=checked]:text-primary",

          // DISABLED
          "data-[disabled]:pointer-events-none",
          "data-[disabled]:opacity-50",

          // ICON
          "[&_svg]:pointer-events-none",
          "[&_svg]:shrink-0",
          "[&_svg:not([class*='size-'])]:size-4",
        ],
        className,
      )}
      {...props}
    >
      <span className="absolute right-3 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>

      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border/60 my-2 h-px", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex h-8 items-center justify-center text-muted-foreground",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex h-8 items-center justify-center text-muted-foreground",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
