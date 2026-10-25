import type { Metadata, Viewport } from "next";
import { Anton, Archivo } from "next/font/google";
import { PortfolioBadge } from "@/components/PortfolioBadge";

const display = Anton({ subsets: ["latin"], variable: "--font-display", weight: "400" });
const sans = Archivo({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Gaspol Bali - Sewa Motor Harian & Mingguan, Antar ke Hotel",
  description: "Sewa Scoopy, NMax, PCX, KLX di Bali. Harga harian, mingguan, bulanan. Gratis antar Canggu & Seminyak.",
};

export const viewport: Viewport = { themeColor: "#0d0d0d" };

export default function GaspolLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${sans.variable} min-h-screen bg-gaspol-ink font-sans text-white antialiased`}>
      {children}
      <PortfolioBadge />
    </div>
  );
}
