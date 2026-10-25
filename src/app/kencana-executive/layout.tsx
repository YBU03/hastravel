import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { PortfolioBadge } from "@/components/PortfolioBadge";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Kencana Executive - Sewa Mobil Premium dengan Chauffeur",
  description: "Sewa Alphard, Lexus LM, dan Hiace Premio dengan chauffeur profesional di Jakarta, Bali, dan Surabaya.",
};

export const viewport: Viewport = { themeColor: "#0b0b0b" };

export default function KencanaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${sans.variable} min-h-screen bg-kencana-black font-sans text-kencana-ivory/80 antialiased`}>
      {children}
      <PortfolioBadge />
    </div>
  );
}
