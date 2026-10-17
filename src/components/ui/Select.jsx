"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Select = forwardRef(({ className, options = [], placeholder = "Seleccionar", ...props }, ref) => {
  return (
    <div className="relative w-full" ref={ref}>
      <select
        className={cn(
          "field w-full px-5 py-3.5 text-sm font-light tracking-wide pr-12 appearance-none cursor-pointer",
          "transition-colors duration-500",
          className
        )}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <svg
        className="absolute right-5 top-1/2 -translate-y-1/2 h-3 w-3 text-champagne-dark pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
});

Select.displayName = "Select";

export { Select };