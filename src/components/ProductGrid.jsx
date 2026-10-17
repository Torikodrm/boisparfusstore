"use client";

import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, emptyMessage = "No se encontraron fragancias" }) {
  if (!products?.length) {
    return (
      <div className="py-24 lg:py-32">
        <div className="gold-hairline w-16 mx-auto mb-10" />
        <p className="text-center text-[10px] uppercase tracking-[0.32em] text-pearl-muted">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      role="list"
    >
      {products.map((product, index) => (
        <div
          key={product.id}
          className="animate-rise"
          style={{
            animationDelay: `${Math.min(index * 90, 540)}ms`,
          }}
        >
          <ProductCard product={product} priority={index < 4} />
        </div>
      ))}
    </div>
  );
}