import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const font = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "HasTrans - Travel Antar Kota Denpasar, Surabaya, Jember",
  description:
    "Pesan travel ELF Denpasar ⇄ Surabaya dan Denpasar ⇄ Jember. Pilih kursi sendiri, jemput & antar sampai alamat.",
};

export const viewport: Viewport = { themeColor: "#0064e7" };

// Semua halaman membaca data terbaru (kursi, jadwal) dari database.
export const dynamic = "force-dynamic";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={font.variable}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
