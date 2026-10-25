import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "HasTrans - Travel Antar Kota Denpasar, Surabaya, Jember",
  description:
    "Pesan travel ELF Denpasar ⇄ Surabaya dan Denpasar ⇄ Jember. Pilih kursi sendiri, jemput & antar sampai alamat.",
};

export const viewport: Viewport = { themeColor: "#0064e7" };

// Semua halaman HasTrans membaca data terbaru (kursi, jadwal) dari database.
export const dynamic = "force-dynamic";

export default function HasTransLayout({ children }: { children: React.ReactNode }) {
  return children;
}
