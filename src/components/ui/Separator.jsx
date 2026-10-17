"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Separator = forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => {
  return (
    <hr
      ref={ref}
      decorative={decorative}
      className={cn(
        "bg-border-subtle border-0",
        orientation === "horizontal" ? "w-full h-px" : "h-full w-px",
        className
      )}
      {...props}
    />
  );
});

Separator.displayName = "Separator";

export { Separator };