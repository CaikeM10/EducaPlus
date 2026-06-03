import { cn } from "./utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        [
          "relative overflow-hidden rounded-xl",

          "bg-gradient-to-r",
          "from-slate-100",
          "via-slate-50",
          "to-slate-100",

          "animate-pulse",

          "before:absolute",
          "before:inset-0",
          "before:-translate-x-full",
          "before:bg-gradient-to-r",
          "before:from-transparent",
          "before:via-white/60",
          "before:to-transparent",
          "before:animate-[shimmer_2s_infinite]",
        ],
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
