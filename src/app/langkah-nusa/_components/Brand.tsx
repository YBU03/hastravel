import Link from "next/link";
import { NUSA_WA } from "../data";

export function NusaLogo() {
  return (
    <Link href="/langkah-nusa" className="flex items-center gap-2" aria-label="Langkah Nusa - Beranda">
      <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
        <circle cx="20" cy="20" r="19" fill="#c8623d" />
        <path d="M6 28 L15 16 L21 23 L26 17 L34 28 Z" fill="#f4ead8" />
        <circle cx="28" cy="11" r="3" fill="#f4ead8" />
      </svg>
      <span className="font-display text-2xl font-semibold italic tracking-tight">Langkah Nusa</span>
    </Link>
  );
}

export function NusaNav() {
  return (
    <header className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4">
      <NusaLogo />
      <nav className="hidden items-center gap-7 text-sm font-bold md:flex">
        <a href="/langkah-nusa#trip" className="hover:text-nusa-terra">
          Trip
        </a>
        <a href="/langkah-nusa#cara" className="hover:text-nusa-terra">
          Cara Ikut
        </a>
        <a href="/langkah-nusa#cerita" className="hover:text-nusa-terra">
          Cerita
        </a>
      </nav>
      <a
        href={`https://wa.me/${NUSA_WA}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-nusa-brown px-5 py-2.5 text-sm font-bold text-nusa-cream hover:bg-nusa-terra"
      >
        Tanya Admin
      </a>
    </header>
  );
}

export function Wave({ className = "", fill = "#eadcc2" }: { className?: string; fill?: string }) {
  return (
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className={`block h-10 w-full ${className}`} aria-hidden>
      <path d="M0 30 C 240 0 480 60 720 30 S 1200 0 1440 30 V60 H0 Z" fill={fill} />
    </svg>
  );
}

export function NusaFooter() {
  return (
    <footer className="bg-nusa-brown text-nusa-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="font-display text-3xl italic">Langkah Nusa</span>
          <p className="mt-2 max-w-sm text-sm text-nusa-cream/70">Open trip grup kecil. Jalan pelan, lihat lebih banyak.</p>
        </div>
        <p className="text-sm text-nusa-cream/70 md:text-right">
          WhatsApp +{NUSA_WA}
          <br />© {new Date().getFullYear()} Langkah Nusa · Website oleh{" "}
          <Link href="/" className="text-nusa-sage underline">
            Yubu Travel Portfolio
          </Link>
        </p>
      </div>
    </footer>
  );
}
