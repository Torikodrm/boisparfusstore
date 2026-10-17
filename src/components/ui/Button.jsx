"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Button = forwardRef(
  ({ className, variant = "outline", size = "default", asChild = false, children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-3 font-light tracking-[0.16em] uppercase transition-all duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:opacity-30 disabled:pointer-events-none";

    const variants = {
      outline: "btn-outline",
      fill: "btn-fill",
      bare: "btn-bare",
    };

    const sizes = {
      default: "text-[11px] px-8 py-3.5",
      sm: "text-[10px] px-6 py-2.5",
      lg: "text-xs px-12 py-5",
      icon: "p-2.5 normal-case tracking-normal",
    };

    const Component = asChild ? "span" : "button";

    return (
      <Component ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props}>
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";

export { Button };