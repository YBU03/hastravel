import Link from "next/link";
import { waLink } from "@/lib/wa";
import { IconTicket, IconWhatsapp } from "./icons";

export function SiteHeader({ waNumber }: { waNumber: string }) {
  return (
    <header className="relative z-10">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/hastrans" className="shrink-0" aria-label="HasTrans - Beranda">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-white.png" alt="HasTrans Travel Antar Kota" className="h-10 w-auto" />
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-white/90 md:flex">
          <Link href="/hastrans" className="hover:text-white">
            Beranda
          </Link>
          <Link href="/hastrans#rute" className="hover:text-white">
            Rute & Harga
          </Link>
          <Link href="/hastrans#cara-pesan" className="hover:text-white">
            Cara Pesan
          </Link>
          <Link href="/hastrans/cek-pesanan" className="hover:text-white">
            Cek Pesanan
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/hastrans/cek-pesanan"
            className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-2 text-sm font-medium text-white hover:bg-white/25 md:hidden"
          >
            <IconTicket width={16} height={16} /> Pesanan
          </Link>
          <a
            href={waLink(waNumber, "Halo HasTrans, saya mau tanya travel.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm hover:bg-brand-50 md:flex"
          >
            <IconWhatsapp width={16} height={16} className="text-[#25D366]" /> Hubungi Kami
          </a>
        </div>
      </div>
    </header>
  );
}

/** Latar biru bergaya DayTrans: gradasi + lingkaran dekoratif. */
export function BlueBand({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-600 to-brand-800 ${className}`}>
      <div className="pointer-events-none absolute -right-24 -top-40 h-[28rem] w-[28rem] rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-brand-400/20" />
      <div className="relative">{children}</div>
    </div>
  );
}
