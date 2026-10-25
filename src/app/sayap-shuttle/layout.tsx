import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { PortfolioBadge } from "@/components/PortfolioBadge";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"] });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Sayap Shuttle - Antar Jemput Bandara Bali & Surabaya",
  description: "Shuttle bandara Ngurah Rai & Juanda. Tarif pasti per zona, shared atau private, sopir menunggu dengan papan nama.",
  icons: { icon: "/sayap/logo.png" },
};

export const viewport: Viewport = { themeColor: "#0B1020" };

export default function SayapLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${sans.variable} min-h-screen bg-sayap-navy font-sans text-slate-200 antialiased`}>
      {children}
      <PortfolioBadge />
    </div>
  );
}
