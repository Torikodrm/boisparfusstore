"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const FAMILY_OPTIONS = [
  { value: "", label: "Todas las familias" },
  { value: "Cítrica", label: "Cítrica" },
  { value: "Floral", label: "Floral" },
  { value: "Amaderada", label: "Amaderada" },
  { value: "Oriental", label: "Oriental" },
  { value: "Fougère", label: "Fougère" },
  { value: "Gourmand", label: "Gourmand" },
  { value: "Chipre", label: "Chipre" },
  { value: "Acuática", label: "Acuática" },
  { value: "Almizclada", label: "Almizclada" },
  { value: "Especiada", label: "Especiada" },
  { value: "Verde", label: "Verde" },
  { value: "Frutal", label: "Frutal" },
];

function matches(p, term) {
  return (
    p.name?.toLowerCase().includes(term) ||
    p.brand?.toLowerCase().includes(term) ||
    p.description?.toLowerCase().includes(term) ||
    p.olfactoryFamily?.toLowerCase().includes(term) ||
    [p.olfactoryNotes?.top, p.olfactoryNotes?.heart, p.olfactoryNotes?.base]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(term)
  );
}

export function ProductsContent({ initialProducts }) {
  const searchParams = useSearchParams();
  const initialFamily = searchParams.get("family") || "";
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [family, setFamily] = useState(initialFamily);

  const term = query.trim().toLowerCase();

  const filtered = initialProducts.filter((p) => {
    const okFamily = !family || p.olfactoryFamily === family;
    return okFamily && (!term || matches(p, term));
  });

  return (
    <div className="px-6 lg:px-8 pt-32 pb-28 lg:pb-40">
      <div className="mx-auto max-w-7xl">
        <header className="max-w-2xl">
          <p className="label-editorial">Catálogo</p>
          <h1 className="mt-7 font-serif-display text-5xl lg:text-6xl font-light leading-[1.05] text-pearl">
            La colección
          </h1>
          <p className="mt-6 text-sm font-light leading-[2] text-pearl-muted">
            {initialProducts.length} fragancias. Filtra por familia o busca entre
            nombres y notas.
          </p>
        </header>

        <div className="mt-16 flex flex-col sm:flex-row gap-4 sm:items-end">
          <div className="flex-1">
            <label htmlFor="search" className="label-editorial">
              Buscar
            </label>
            <Input
              id="search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nombre, marca o nota"
              className="mt-4"
            />
          </div>
          <div className="sm:w-64">
            <label htmlFor="family" className="label-editorial">
              Familia
            </label>
            <Select
              id="family"
              options={FAMILY_OPTIONS}
              placeholder="Todas"
              value={family}
              onChange={(e) => setFamily(e.target.value)}
              className="mt-4"
            />
          </div>
        </div>

        <div className="mt-16 rule-x" />

        <div className="mt-16">
          <ProductGrid products={filtered} emptyMessage="Sin resultados" />
        </div>
      </div>
    </div>
  );
}