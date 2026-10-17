import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Nosotros | Bois Parfums",
  description: "Perfumería de nicho reducida a lo esencial.",
};

const PRINCIPLES = [
  {
    title: "Selección",
    body: "No ampliamos catálogo por volumen. Cada fragancia entra porque su composición lo merece y porque ocupa un lugar distinto en la estantería.",
  },
  {
    title: "Originalidad",
    body: "Todo procede de casas perfumistas y distribuidores oficiales. Sin reformulaciones, sin imitaciones, sin atajos.",
  },
  {
    title: "Claridad",
    body: "Las notas se informan tal como las declara la casa. Sin exageraciones, sin promesas que el frasco no pueda cumplir.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="px-6 lg:px-8 pt-32 pb-28 lg:pb-40">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:gap-20 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
            <div>
              <p className="label-editorial">Nosotros</p>
              <h1 className="mt-8 font-serif-display text-5xl lg:text-6xl font-light leading-[1.05] text-pearl text-balance">
                Menos, pero
                <br />
                <span className="text-champagne-gradient">mejor</span>
              </h1>
              <div className="gold-hairline w-24 mt-10" />
            </div>

            <div className="max-w-2xl">
              <p className="font-serif-display text-2xl lg:text-3xl font-light leading-[1.45] text-pearl-dim">
                Bois Parfums existe para quien ya tiene un frasco favorito y
                busca el siguiente con criterio, no con ruido.
              </p>

              <div className="mt-14 space-y-0">
                {PRINCIPLES.map((p, i) => (
                  <div key={p.title} className="grid gap-4 py-8 hairline-b sm:grid-cols-[4rem_1fr] sm:gap-8">
                    <span className="text-[10px] tabular-nums text-champagne-dark/60 pt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="font-serif-display text-xl font-light text-pearl">
                        {p.title}
                      </h2>
                      <p className="mt-3 text-sm font-light leading-[2] text-pearl-muted">
                        {p.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-14">
                <Link
                  href="/productos"
                  style={{ textDecoration: "none" }}
                  className="label-editorial hover:text-champagne-light transition-colors duration-500"
                >
                  Ver la colección →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}