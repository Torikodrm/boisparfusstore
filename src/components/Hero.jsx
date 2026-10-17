"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-6 lg:px-8"
      aria-labelledby="hero-heading"
    >
      <div className="relative w-full max-w-4xl text-center">
        <p className="label-editorial animate-fade-in">Perfumería de nicho</p>

        <h1
          id="hero-heading"
          className="font-serif-display font-normal text-[2.75rem] leading-[1.08] sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-pearl mt-10 text-balance animate-rise"
          style={{ animationDelay: "200ms" }}
        >
          Cada fragancia
          <br />
          es una <em className="text-champagne-gradient not-italic font-light">declaración</em>
        </h1>

        <div className="gold-hairline w-32 mx-auto my-12 animate-fade-in" style={{ animationDelay: "600ms" }} />

        <p
          className="text-[15px] lg:text-base font-light leading-[2] text-pearl-muted max-w-xl mx-auto text-balance animate-rise"
          style={{ animationDelay: "800ms" }}
        >
          Una colección reducida. Cada fragancia elegida con criterio para
          <span className="text-champagne-dark"> quienes no aceptan lo común</span>.
        </p>

        <div
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-5 animate-rise"
          style={{ animationDelay: "1000ms" }}
        >
          <Button asChild variant="fill" size="lg">
            <Link href="/productos" style={{ textDecoration: "none" }}>
              Explorar la colección
            </Link>
          </Button>
          <Link
            href="/nosotros"
            style={{ textDecoration: "none" }}
            className="label-editorial hover:text-champagne-light transition-colors duration-500 py-4"
          >
            Nuestra historia
          </Link>
        </div>
      </div>
    </section>
  );
}