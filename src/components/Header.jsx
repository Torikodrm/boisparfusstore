"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { cn } from "@/lib/utils";
import { LogoMark } from "./LogoAnimation";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Colección" },
  { href: "/nosotros", label: "Nosotros" },
];

function DesktopNav() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex items-center gap-14">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "nav-link text-[10px] uppercase tracking-[0.28em] font-light",
            pathname === link.href && "active"
          )}
          aria-current={pathname === link.href ? "page" : undefined}
          style={{ textDecoration: "none" }}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

function MobileNav({ open, onClose }) {
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <div
      className={cn(
        "lg:hidden overflow-hidden transition-all duration-700 ease-out",
        open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}
    >
      <nav className="mx-auto max-w-7xl px-6 pt-10 pb-8" aria-label="Navegación móvil">
        {NAV_LINKS.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-baseline gap-6 py-4 hairline-b"
            style={{ textDecoration: "none" }}
          >
            <span className="text-[10px] text-champagne-dark tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={cn(
                "font-serif-display text-2xl font-light",
                pathname === link.href ? "text-pearl" : "text-pearl-muted"
              )}
            >
              {link.label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700",
        scrolled ? "bg-ink/95 backdrop-blur-md hairline-b py-4" : "bg-transparent py-7"
      )}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Navegación principal">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Bois Parfums — Inicio" style={{ textDecoration: "none" }}>
            <LogoMark size={scrolled ? "sm" : "md"} />
          </Link>

          <Suspense fallback={<div className="hidden lg:block" />}>
            <DesktopNav />
          </Suspense>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden label-editorial py-2"
            aria-expanded={open}
            aria-label="Menú"
          >
            {open ? "Cerrar" : "Menú"}
          </button>
        </div>
      </nav>

      <Suspense fallback={null}>
        <MobileNav open={open} onClose={() => setOpen(false)} />
      </Suspense>
    </header>
  );
}