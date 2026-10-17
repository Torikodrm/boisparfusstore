"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Input = forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "field w-full px-5 py-3.5 text-sm font-light tracking-wide",
        "transition-colors duration-500",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };