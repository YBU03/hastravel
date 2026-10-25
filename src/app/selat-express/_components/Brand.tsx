import Link from "next/link";
import { SELAT_WA } from "../data";

export function SelatLogo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/selat-express" className="flex items-center gap-2" aria-label="Selat Express - Beranda">
      <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
        <circle cx="20" cy="20" r="19" fill="#00a6b4" />
        <path d="M8 24 C 12 20 16 28 20 24 S 28 20 32 24" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M12 18 H26 L30 14 H16 Z" fill="#fff" />
      </svg>
      <span className={`font-display text-xl font-bold tracking-tight ${light ? "text-white" : "text-selat-deep"}`}>
        Selat<span className={light ? "text-selat-sand" : "text-selat-teal"}>Express</span>
      </span>
    </Link>
  );
}

export function SelatNav({ light = false }: { light?: boolean }) {
  return (
    <header className={light ? "absolute inset-x-0 top-0 z-30" : "bg-white/80 backdrop-blur"}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <SelatLogo light={light} />
        <nav className={`hidden items-center gap-7 text-sm font-semibold md:flex ${light ? "text-white/90" : "text-selat-deep/80"}`}>
          <a href="/selat-express#tujuan" className="hover:text-selat-teal">
            Tujuan
          </a>
          <a href="/selat-express#jadwal" className="hover:text-selat-teal">
            Jadwal
          </a>
          <a href="/selat-express#faq" className="hover:text-selat-teal">
            FAQ
          </a>
        </nav>
        <a
          href={`https://wa.me/${SELAT_WA}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-selat-coral px-5 py-2 text-sm font-bold text-white shadow-lg shadow-selat-coral/30 hover:bg-selat-deep"
        >
          Chat CS
        </a>
      </div>
    </header>
  );
}

export function SelatFooter() {
  return (
    <footer className="bg-selat-deep text-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <SelatLogo light />
          <p className="mt-3 max-w-sm text-sm">Fast boat harian dari Sanur & Padang Bai ke Nusa Penida, Lembongan, Gili, dan Lombok.</p>
        </div>
        <p className="text-sm md:text-right">
          WhatsApp +{SELAT_WA} · Loket: Pantai Sanur
          <br />© {new Date().getFullYear()} Selat Express · Demo dari{" "}
          <Link href="/" className="text-selat-aqua underline">
            Yubu Travel Portfolio
          </Link>
        </p>
      </div>
    </footer>
  );
}
