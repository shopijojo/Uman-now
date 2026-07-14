import type { Metadata } from "next";
import { Archivo, Space_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

const archivo = Archivo({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });
const spaceMono = Space_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Uman Now — Transferts privés vers Ouman",
  description: "Réservez votre transfert privé vers Ouman (Uman) pour Rosh Hashana. Taxi, van, sprinter, bus — départ depuis tous les aéroports d'Europe.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${archivo.variable} ${spaceMono.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased bg-[#e6e2d8]">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
