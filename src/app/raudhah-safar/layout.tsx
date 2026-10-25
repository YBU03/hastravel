import type { Metadata, Viewport } from "next";
import { Marcellus, Mulish } from "next/font/google";
import { PortfolioBadge } from "@/components/PortfolioBadge";

const display = Marcellus({ subsets: ["latin"], variable: "--font-display", weight: "400" });
const sans = Mulish({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Raudhah Safar - Umroh & Haji Khusus",
  description: "Paket umroh reguler, umroh plus Turki, umroh Ramadhan, dan haji khusus. Hotel dekat Haram, cicilan ringan.",
  icons: { icon: "/raudhah/logo.png" },
};

export const viewport: Viewport = { themeColor: "#0f3d2e" };

export default function RaudhahLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${sans.variable} min-h-screen bg-raudhah-ivory font-sans text-raudhah-deep antialiased`}>
      {children}
      <PortfolioBadge />
    </div>
  );
}
