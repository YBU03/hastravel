import type { Metadata, Viewport } from "next";
import { Alfa_Slab_One, Work_Sans } from "next/font/google";
import { PortfolioBadge } from "@/components/PortfolioBadge";

const display = Alfa_Slab_One({ subsets: ["latin"], variable: "--font-display", weight: "400" });
const sans = Work_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Jendela Trip - Agen Tiket Pesawat & Hotel",
  description: "Pesan tiket pesawat dan hotel ke seluruh Indonesia, dibantu agen via WhatsApp. Harga transparan, reschedule dibantu.",
};

export const viewport: Viewport = { themeColor: "#2d1e12" };

export default function JendelaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${sans.variable} min-h-screen bg-jendela-paper font-sans text-jendela-ink antialiased`}>
      {children}
      <PortfolioBadge />
    </div>
  );
}
