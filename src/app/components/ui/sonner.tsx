"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "rounded-2xl border border-white/40 bg-white/90 backdrop-blur-xl shadow-xl",
          title: "font-semibold",
          description: "text-muted-foreground",
          success: "border-emerald-200",
          error: "border-red-200",
          warning: "border-amber-200",
          info: "border-blue-200",
        },
      }}
      style={
        {
          "--normal-bg": "rgba(255,255,255,0.9)",
          "--normal-text": "var(--foreground)",
          "--normal-border": "rgba(255,255,255,0.4)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
