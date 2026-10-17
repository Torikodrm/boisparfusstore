import { Suspense } from "react";
import { notFound } from "next/navigation";
import { fetchProductById, getProductById } from "@/lib/firestore";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductDetail } from "@/components/ProductDetail";

export async function generateMetadata({ params }) {
  "use cache";
  const { id } = await params;
  const product = await fetchProductById(id).catch(() => null);

  if (!product) {
    return { title: "Producto no encontrado | Bois Parfums" };
  }

  const image = product.imageUrl || product.images?.[0]?.url;
  const notes = [
    product.olfactoryNotes?.top,
    product.olfactoryNotes?.heart,
    product.olfactoryNotes?.base,
  ]
    .filter(Boolean)
    .join(", ");

  return {
    title: `${product.name} — ${product.brand} | Bois Parfums`,
    description:
      product.description ||
      `Fragrancia de nicho ${product.olfactoryFamily || ""}. Notas: ${notes}.`,
    openGraph: {
      title: `${product.name} — ${product.brand}`,
      description: product.description || `Fragrancia de nicho ${product.olfactoryFamily || ""}`,
      images: image ? [image] : [],
    },
  };
}

async function ProductContent({ params }) {
  const { id } = await params;
  const product = await getProductById(id).catch(() => null);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}

function DetailSkeleton() {
  return (
    <div className="px-6 lg:px-8 pt-32 pb-28">
      <div className="mx-auto max-w-7xl grid gap-14 lg:grid-cols-2">
        <div className="aspect-[4/5] bg-ink-lighter" />
        <div className="space-y-6 pt-6">
          <div className="h-2 w-24 bg-ink-lighter" />
          <div className="h-12 w-72 bg-ink-lighter" />
          <div className="h-px w-full bg-ink-lighter" />
          <div className="h-4 w-32 bg-ink-lighter" />
          <div className="h-24 w-full bg-ink-lighter" />
        </div>
      </div>
    </div>
  );
}

export default function ProductPage({ params }) {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<DetailSkeleton />}>
          <ProductContent params={params} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}