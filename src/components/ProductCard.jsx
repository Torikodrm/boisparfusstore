"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

const NOTE_SUMMARY = (notes) => {
  if (!notes) return null;
  return [notes.top, notes.heart, notes.base].filter(Boolean).join(" · ");
};

export function ProductCard({ product, priority = false }) {
  const imageUrl = product.imageUrl || product.images?.[0]?.url;
  const isOutOfStock = product.stock === 0;
  const notes = NOTE_SUMMARY(product.olfactoryNotes);

  return (
    <article className="group">
      <Link href={`/productos/${product.id}`} style={{ textDecoration: "none" }}>
        <div className="image-reveal relative aspect-[4/5]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              priority={priority}
              className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-[0.3em] text-champagne-dark/40">
              Sin imagen
            </div>
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-ink/75">
              <span className="text-[10px] uppercase tracking-[0.34em] text-pearl-dim">
                Agotado
              </span>
            </div>
          )}
        </div>

        <div className="pt-6">
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-[10px] uppercase tracking-[0.26em] text-champagne-dark">
              {product.brand}
            </p>
            {product.olfactoryFamily && (
              <p className="text-[10px] uppercase tracking-[0.26em] text-pearl-muted/70">
                {product.olfactoryFamily}
              </p>
            )}
          </div>

          <h3 className="mt-3 font-serif-display text-xl lg:text-[1.4rem] font-light leading-snug text-pearl transition-colors duration-500 group-hover:text-champagne-light">
            {product.name}
          </h3>

          {notes && (
            <p className="mt-3 text-xs font-light leading-relaxed text-pearl-muted line-clamp-2">
              {notes}
            </p>
          )}

          <div className="mt-6 flex items-baseline justify-between gap-4">
            <span className="text-sm font-light tracking-wide text-pearl">
              {formatPrice(product.price)}
            </span>
            <span className="text-[10px] uppercase tracking-[0.24em] text-pearl-muted/70">
              {product.size}
              {product.concentration ? ` · ${product.concentration}` : ""}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}