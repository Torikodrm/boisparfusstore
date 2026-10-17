"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const OCCASION_LABELS = {
  "Día a día": "Día a día",
  "Noche/Salida": "Noche",
  "Oficina/Trabajo": "Oficina",
  "Evento formal": "Formal",
  "Cita romántica": "Cita",
  "Gimnasio/Deporte": "Deporte",
  "Verano/Calor": "Verano",
  "Invierno/Frío": "Invierno",
  "Boda/Celebración": "Celebración",
  "Reunión familiar": "Familia",
};

const NOTE_ROWS = [
  { key: "top", label: "Salida" },
  { key: "heart", label: "Corazón" },
  { key: "base", label: "Fondo" },
];

export function ProductDetail({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const images = (product.images || []).filter((img) => img.url);
  const mainImage = product.imageUrl || images[0]?.url;
  const isOutOfStock = product.stock === 0;

  return (
    <>
      <div className="pt-32 pb-8 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="flex items-center gap-3 text-[10px] uppercase tracking-[0.24em]" aria-label="Ruta de navegación">
            <Link href="/" className="text-pearl-muted hover:text-pearl transition-colors duration-500" style={{ textDecoration: "none" }}>
              Inicio
            </Link>
            <span className="text-champagne-dark/50">/</span>
            <Link href="/productos" className="text-pearl-muted hover:text-pearl transition-colors duration-500" style={{ textDecoration: "none" }}>
              Colección
            </Link>
            <span className="text-champagne-dark/50">/</span>
            <span className="text-pearl-dim truncate" aria-current="page">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="px-6 lg:px-8 pb-28 lg:pb-40">
        <div className="mx-auto max-w-7xl grid gap-14 lg:gap-20 lg:grid-cols-2">
          {/* Imagen */}
          <div>
            <div className="relative aspect-[4/5] bg-ink-lighter">
              {mainImage ? (
                <Image
                  src={mainImage}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[10px] uppercase tracking-[0.3em] text-champagne-dark/40">
                  Sin imagen
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-4 flex gap-4 overflow-x-auto scrollbar-hide">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    aria-label={`Ver imagen ${i + 1}`}
                    className={cn(
                      "relative aspect-[4/5] w-20 shrink-0 transition-opacity duration-500",
                      i === selectedImage ? "opacity-100" : "opacity-40 hover:opacity-70"
                    )}
                  >
                    <Image src={img.url} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Detalle */}
          <div className="lg:pt-6">
            <p className="label-editorial">{product.brand}</p>

            <h1 className="mt-7 font-serif-display text-4xl lg:text-5xl font-light leading-[1.1] text-pearl text-balance">
              {product.name}
            </h1>

            {(product.size || product.concentration) && (
              <p className="mt-5 text-[10px] uppercase tracking-[0.26em] text-champagne-dark">
                {[product.size, product.concentration].filter(Boolean).join(" · ")}
              </p>
            )}

            <div className="mt-8 gold-hairline w-full" />

            <div className="mt-8 flex items-baseline gap-6">
              <span className="font-serif-display text-4xl font-light text-pearl">
                {formatPrice(product.price)}
              </span>
              <span className="text-[10px] uppercase tracking-[0.26em] text-pearl-muted">
                {isOutOfStock ? "Agotado" : "Disponible"}
              </span>
            </div>

            {product.description && (
              <p className="mt-10 text-sm font-light leading-[2.1] text-pearl-muted">
                {product.description}
              </p>
            )}

            {product.olfactoryNotes && (
              <div className="mt-14">
                <h2 className="label-editorial">Pirámide olfativa</h2>
                <dl className="mt-8 space-y-0">
                  {NOTE_ROWS.map(({ key, label }) => {
                    const value = product.olfactoryNotes[key];
                    if (!value) return null;
                    return (
                      <div key={key} className="grid grid-cols-[6rem_1fr] gap-6 py-4 hairline-b">
                        <dt className="text-[10px] uppercase tracking-[0.24em] text-champagne-dark pt-0.5">
                          {label}
                        </dt>
                        <dd className="text-sm font-light leading-relaxed text-pearl-dim">
                          {value}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            )}

            {product.occasions?.length > 0 && (
              <div className="mt-14">
                <h2 className="label-editorial">Momento</h2>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                  {product.occasions.map((occasion) => (
                    <li
                      key={occasion}
                      className="text-[10px] uppercase tracking-[0.24em] text-pearl-muted"
                    >
                      {OCCASION_LABELS[occasion] || occasion}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-14 flex flex-col sm:flex-row gap-5 items-stretch">
              <div className="flex items-center border border-hairline">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="px-5 py-4 text-pearl-muted hover:text-pearl disabled:opacity-25 transition-colors duration-400"
                  aria-label="Disminuir cantidad"
                >
                  −
                </button>
                <span className="px-2 text-sm font-light tabular-nums text-pearl" aria-live="polite">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock || 1, q + 1))}
                  disabled={quantity >= (product.stock || 1)}
                  className="px-5 py-4 text-pearl-muted hover:text-pearl disabled:opacity-25 transition-colors duration-400"
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>

              <Button
                variant="fill"
                size="lg"
                className="flex-1"
                disabled={isOutOfStock}
                onClick={() => console.log("Añadir al carrito:", product.id, quantity)}
              >
                {isOutOfStock ? "Agotado" : "Añadir a la bolsa"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}