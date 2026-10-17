import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const serif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  title: "Bois Parfums | Perfumería de Nicho",
  description:
    "Perfumería de nicho reducida a lo esencial. Fragancias seleccionadas una a una.",
  keywords: ["perfumes", "perfumería de nicho", "fragancias exclusivas", "parfum originals"],
  authors: [{ name: "Bois Parfums" }],
  creator: "Bois Parfums",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://boisparfums.com",
    title: "Bois Parfums | Perfumería de Nicho",
    description: "Perfumería de nicho reducida a lo esencial.",
    siteName: "Bois Parfums",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060505",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${sans.variable} ${serif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ink text-pearl font-light">
        {children}
      </body>
    </html>
  );
}