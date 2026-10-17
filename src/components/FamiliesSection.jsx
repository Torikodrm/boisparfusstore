"use client";

import Link from "next/link";

const FAMILIES = [
  { id: "Cítrica", name: "Cítrica", note: "Luminosa" },
  { id: "Floral", name: "Floral", note: "Etérea" },
  { id: "Amaderada", name: "Amaderada", note: "Cálida" },
  { id: "Oriental", name: "Oriental", note: "Sensible" },
  { id: "Fougère", name: "Fougère", note: "Verde" },
  { id: "Gourmand", name: "Gourmand", note: "Suave" },
  { id: "Chipre", name: "Chipre", note: "Compleja" },
  { id: "Acuática", name: "Acuática", note: "Pura" },
];

export function FamiliesSection() {
  return (
    <section id="familias" className="px-6 lg:px-8 py-28 lg:py-40" aria-labelledby="families-heading">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:gap-20 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
          <div>
            <p className="label-editorial">Familias olfativas</p>
            <h2
              id="families-heading"
              className="mt-8 font-serif-display text-4xl lg:text-5xl font-light leading-[1.15] text-pearl text-balance"
            >
              Ocho territorios
              <br />
              <span className="text-champagne-gradient">una sola firma</span>
            </h2>
            <div className="gold-hairline w-24 mt-10" />
          </div>

          <div className="grid sm:grid-cols-2">
            {FAMILIES.map((family, i) => (
              <Link
                key={family.id}
                href={`/productos?family=${encodeURIComponent(family.id)}`}
                style={{ textDecoration: "none" }}
                className={`group flex items-baseline gap-5 py-6 hairline-b transition-colors duration-500 ${
                  i % 2 === 0 ? "sm:pr-8 sm:border-r sm:border-hairline-soft" : "sm:pl-8"
                }`}
              >
                <span className="text-[10px] tabular-nums text-champagne-dark/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-serif-display text-2xl font-light text-pearl-dim transition-colors duration-500 group-hover:text-pearl">
                  {family.name}
                </span>
                <span className="text-[10px] uppercase tracking-[0.24em] text-pearl-muted/70">
                  {family.note}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}