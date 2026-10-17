"use client";

import Link from "next/link";
import { LogoMark } from "./LogoAnimation";

const EXPLORAR = [
  { href: "/productos", label: "Colección" },
  { href: "/#familias", label: "Familias olfativas" },
  { href: "/nosotros", label: "Nosotros" },
];

export function Footer() {
  return (
    <footer className="hairline-t">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid gap-14 md:grid-cols-2">
          <div>
            <Link href="/" style={{ textDecoration: "none" }}>
              <LogoMark size="md" />
            </Link>
            <p className="mt-8 max-w-sm text-sm font-light leading-[2] text-pearl-muted">
              Perfumería de nicho reducida a lo esencial. Cada fragancia ha sido
              seleccionada por su carácter.
            </p>
          </div>

          <nav className="md:justify-self-end" aria-label="Explorar">
            <h2 className="label-editorial">Explorar</h2>
            <ul className="mt-8 space-y-4">
              {EXPLORAR.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-fine text-sm"
                    style={{ textDecoration: "none" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-20 pt-8 hairline-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] uppercase tracking-[0.24em] text-pearl-muted/60">
            © 2026 Bois Parfums
          </p>
          <p className="text-[10px] uppercase tracking-[0.24em] text-pearl-muted/60">
            Perfumería de nicho
          </p>
        </div>
      </div>
    </footer>
  );
}