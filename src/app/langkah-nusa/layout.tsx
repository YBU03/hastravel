import type { Metadata, Viewport } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";
import { PortfolioBadge } from "@/components/PortfolioBadge";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", style: ["normal", "italic"], axes: ["SOFT", "opsz"] });
const sans = Nunito_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Langkah Nusa - Open Trip Bromo, Ijen, Nusa Penida",
  description: "Open trip grup kecil ke Bromo, Kawah Ijen, Nusa Penida, dan Tumpak Sewu. Itinerary jelas, kuota terbatas.",
};

export const viewport: Viewport = { themeColor: "#f4ead8" };

export default function NusaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${sans.variable} min-h-screen bg-nusa-cream font-sans text-nusa-brown antialiased`}>
      {children}
      <PortfolioBadge />
    </div>
  );
}
