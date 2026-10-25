import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { PortfolioBadge } from "@/components/PortfolioBadge";

const display = Instrument_Serif({ subsets: ["latin"], variable: "--font-display", weight: "400", style: ["normal", "italic"] });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Bali Driver Co. - Private Drivers in Bali",
  description: "Hire a private English-speaking driver in Bali by the hour or the day. Clear rates, local drivers, booked over WhatsApp.",
};

export const viewport: Viewport = { themeColor: "#fafaf7" };

export default function BaliDriverLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${sans.variable} min-h-screen bg-editorial-paper font-sans text-editorial-ink antialiased`}>
      {children}
      <PortfolioBadge />
    </div>
  );
}
