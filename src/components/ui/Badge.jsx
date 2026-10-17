"use client";

import { cn } from "@/lib/utils";

export function Badge({ className, variant = "default", children, ...props }) {
  const variants = {
    default: "border border-hairline text-champagne-dark px-3 py-1 text-[9px] uppercase tracking-[0.24em]",
    outline: "border border-hairline text-champagne-dark px-3 py-1 text-[9px] uppercase tracking-[0.24em]",
    quiet: "text-pearl-muted px-0 py-0 text-[9px] uppercase tracking-[0.24em] border-0",
  };

  return (
    <span className={cn("inline-flex items-center font-light", variants[variant], className)} {...props}>
      {children}
    </span>
  );
}