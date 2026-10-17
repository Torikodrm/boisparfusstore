"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Card = forwardRef(({ className, variant = "veil", children, ...props }, ref) => {
  const variants = {
    veil: "veil rounded-none",
    plain: "bg-transparent",
  };

  return (
    <div ref={ref} className={cn(variants[variant], className)} {...props}>
      {children}
    </div>
  );
});

Card.displayName = "Card";

export { Card };