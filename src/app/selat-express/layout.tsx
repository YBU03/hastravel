import type { Metadata, Viewport } from "next";
import { Figtree, Sora } from "next/font/google";
import { PortfolioBadge } from "@/components/PortfolioBadge";

const display = Sora({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"] });
const sans = Figtree({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Selat Express - Fast Boat ke Nusa Penida, Lembongan, Gili & Lombok",
  description: "Tiket fast boat dari Sanur & Padang Bai. Jadwal setiap hari, tiket pulang-pergi, harga anak, paket snorkeling.",
};

export const viewport: Viewport = { themeColor: "#063b4c" };

export default function SelatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${sans.variable} min-h-screen bg-selat-foam font-sans text-selat-deep antialiased`}>
      {children}
      <PortfolioBadge />
    </div>
  );
}
