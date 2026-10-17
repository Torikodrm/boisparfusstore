"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function LogoMark({
  className,
  size = "md",
  showBottle = true,
}) {
  const wordSizes = {
    sm: "text-[13px]",
    md: "text-base",
    lg: "text-xl",
    xl: "text-2xl",
  };

  const bottleSizes = {
    sm: "w-6 h-9",
    md: "w-8 h-12",
    lg: "w-10 h-15",
    xl: "w-12 h-18",
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif-display font-medium text-pearl tracking-[0.34em]",
            wordSizes[size]
          )}
        >
          BOI
        </span>
        <span
          className={cn(
            "font-sans font-light uppercase text-champagne-dark tracking-[0.42em] mt-[0.35em]",
            size === "sm" ? "text-[8px]" : size === "md" ? "text-[9px]" : "text-[10px]"
          )}
        >
          Parfums
        </span>
      </div>

      {showBottle && (
        <svg
          viewBox="0 0 40 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("shrink-0 text-gold/70", bottleSizes[size])}
          aria-hidden="true"
        >
          <rect x="15" y="4" width="10" height="10" rx="1" />
          <path d="M17 14v4h6v-4" />
          <rect x="8" y="18" width="24" height="36" rx="1.5" />
          <path d="M8 31h24" />
        </svg>
      )}
    </div>
  );
}

export function LogoAnimation({ onComplete, className }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), 2500);
    const doneTimer = setTimeout(() => onComplete?.(), 3500);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-ink transition-opacity duration-[900ms] ease-out",
        exiting ? "opacity-0" : "opacity-100",
        className
      )}
      role="img"
      aria-label="Bois Parfums"
    >
      <div className="flex flex-col items-center">
        <span
          className="logo-word font-serif-display font-medium text-pearl tracking-[0.34em] text-5xl sm:text-6xl lg:text-7xl"
        >
          BOI
        </span>

        <span
          className="logo-word font-sans font-light uppercase text-champagne-dark tracking-[0.5em] text-[10px] sm:text-[11px] mt-[1.6em]"
        >
          Parfums
        </span>

        <div className="logo-rule mt-10 h-px w-0 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        <svg
          viewBox="0 0 40 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="logo-bottle mt-10 h-24 w-16 text-gold/80"
          aria-hidden="true"
        >
          <rect pathLength="1" x="15" y="4" width="10" height="10" rx="1" />
          <path pathLength="1" d="M17 14v4h6v-4" />
          <rect pathLength="1" x="8" y="18" width="24" height="36" rx="1.5" />
          <path pathLength="1" d="M8 31h24" />
        </svg>
      </div>
    </div>
  );
}