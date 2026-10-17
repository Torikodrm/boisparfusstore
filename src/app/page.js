import { Suspense } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { FamiliesSection } from "@/components/FamiliesSection";
import { ProductGrid } from "@/components/ProductGrid";
import { SprayEntrance } from "@/components/SprayEntrance";
import { getFeaturedProducts } from "@/lib/firestore";

async function FeaturedProducts() {
  const products = await getFeaturedProducts(8);

  return (
    <section className="px-6 lg:px-8 pb-28 lg:pb-40" aria-labelledby="featured-heading">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-8 mb-16 lg:mb-20">
          <div>
            <p className="label-editorial">La selección</p>
            <h2
              id="featured-heading"
              className="mt-7 font-serif-display text-4xl lg:text-5xl font-light leading-[1.15] text-pearl"
            >
              Piezas destacadas
            </h2>
          </div>
          <Link
            href="/productos"
            className="hidden lg:block label-editorial hover:text-champagne-light transition-colors duration-500"
            style={{ textDecoration: "none" }}
          >
            Ver todo →
          </Link>
        </div>

        <ProductGrid products={products} />
      </div>
    </section>
  );
}

function FeaturedSkeleton() {
  return (
    <section className="px-6 lg:px-8 pb-28 lg:pb-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <div className="h-2 w-32 bg-ink-lighter" />
          <div className="mt-7 h-8 w-64 bg-ink-lighter" />
        </div>
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-[4/5] bg-ink-lighter" />
              <div className="mt-6 space-y-3">
                <div className="h-2 w-24 bg-ink-lighter" />
                <div className="h-5 w-40 bg-ink-lighter" />
                <div className="h-2 w-28 bg-ink-lighter" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <SprayEntrance>
      <Header />
      <main>
        <Hero />
        <FamiliesSection />
        <Suspense fallback={<FeaturedSkeleton />}>
          <FeaturedProducts />
        </Suspense>
      </main>
      <Footer />
    </SprayEntrance>
  );
}