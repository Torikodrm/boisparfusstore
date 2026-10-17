import { Suspense } from "react";
import { getProducts } from "@/lib/firestore";
import { ProductsContent } from "./ProductsContent";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Colección | Bois Parfums",
  description: "Perfumería de nicho reducida a lo esencial.",
};

async function ProductsWrapper() {
  const products = await getProducts();
  return <ProductsContent initialProducts={products} />;
}

function ProductsSkeleton() {
  return (
    <div className="px-6 lg:px-8 pt-32 pb-28">
      <div className="mx-auto max-w-7xl">
        <div className="h-2 w-24 bg-ink-lighter" />
        <div className="mt-7 h-10 w-72 bg-ink-lighter" />
        <div className="mt-16 rule-x" />
        <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-[4/5] bg-ink-lighter" />
              <div className="mt-6 space-y-3">
                <div className="h-2 w-24 bg-ink-lighter" />
                <div className="h-5 w-40 bg-ink-lighter" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<ProductsSkeleton />}>
          <ProductsWrapper />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}