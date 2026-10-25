import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const font = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Yubu Travel Portfolio",
  description: "Koleksi website travel siap pakai: travel antar kota, shuttle bandara, sewa mobil, bus pariwisata, open trip, umroh, rental motor, fast boat, dan lainnya.",
  icons: { icon: "/yubu/icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={font.variable}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
