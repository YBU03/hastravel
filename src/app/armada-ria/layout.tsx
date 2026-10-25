import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { PortfolioBadge } from "@/components/PortfolioBadge";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", weight: ["600", "700", "800"] });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Armada Ria - Sewa Bus Pariwisata untuk Rombongan",
  description: "Sewa big bus, medium bus, Elf, dan Hiace untuk study tour, gathering, dan ziarah. Hitung perkiraan harga langsung.",
};

export const viewport: Viewport = { themeColor: "#ffcc00" };

export default function RiaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${sans.variable} min-h-screen bg-ria-cream font-sans text-ria-ink antialiased`}>
      {children}
      <PortfolioBadge />
    </div>
  );
}
