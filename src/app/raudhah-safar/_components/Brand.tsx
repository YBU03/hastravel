import Link from "next/link";
import { RAUDHAH_WA } from "../data";

/** Pola bintang 8 (Rub el Hizb) sebagai latar, dalam warna emas tipis. */
export const starPattern = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Cg fill='none' stroke='%23d4af37' stroke-opacity='.18' stroke-width='1'%3E%3Crect x='16' y='16' width='24' height='24'/%3E%3Crect x='16' y='16' width='24' height='24' transform='rotate(45 28 28)'/%3E%3C/g%3E%3C/svg%3E")`,
};

export function RaudhahLogo({ light = true }: { light?: boolean }) {
  return (
    <Link href="/raudhah-safar" className="flex items-center gap-3" aria-label="Raudhah Safar - Beranda">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/raudhah/logo.png" alt="" className="h-11 w-11" />
      <span className="leading-none">
        <span className={`block font-display text-xl tracking-[0.12em] ${light ? "text-raudhah-ivory" : "text-raudhah-emerald"}`}>
          RAUDHAH SAFAR
        </span>
        <span className="mt-1 block text-[9px] font-bold tracking-[0.4em] text-raudhah-gold">UMROH & HAJI</span>
      </span>
    </Link>
  );
}

export function RaudhahNav({ overlay = false }: { overlay?: boolean }) {
  return (
    <header className={overlay ? "absolute inset-x-0 top-0 z-30" : "bg-raudhah-emerald"} style={overlay ? undefined : starPattern}>
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4">
        <RaudhahLogo />
        <nav className="hidden items-center gap-8 text-sm font-semibold text-raudhah-ivory/85 md:flex">
          <a href="/raudhah-safar#paket" className="hover:text-raudhah-gold">
            Paket
          </a>
          <a href="/raudhah-safar#jadwal" className="hover:text-raudhah-gold">
            Jadwal
          </a>
          <a href="/raudhah-safar#pembimbing" className="hover:text-raudhah-gold">
            Pembimbing
          </a>
        </nav>
        <a
          href={`https://wa.me/${RAUDHAH_WA}?text=${encodeURIComponent("Assalamu'alaikum, saya ingin konsultasi paket umroh.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-raudhah-gold px-5 py-2 text-sm font-bold text-raudhah-gold hover:bg-raudhah-gold hover:text-raudhah-deep"
        >
          Konsultasi
        </a>
      </div>
    </header>
  );
}

/** Pemisah ornamen: garis – bintang – garis. */
export function Divider({ className = "", align = "center" }: { className?: string; align?: "center" | "start" }) {
  return (
    <div className={`flex items-center gap-3 ${align === "start" ? "justify-start" : "justify-center"} ${className}`} aria-hidden>
      <span className="h-px w-12 bg-raudhah-gold/60" />
      <svg viewBox="0 0 20 20" className="h-4 w-4">
        <g fill="none" stroke="#d4af37" strokeWidth="1.4">
          <rect x="5" y="5" width="10" height="10" />
          <rect x="5" y="5" width="10" height="10" transform="rotate(45 10 10)" />
        </g>
      </svg>
      <span className="h-px w-12 bg-raudhah-gold/60" />
    </div>
  );
}

export function SectionHead({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <div className="text-center">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-raudhah-gold">{eyebrow}</p>
      <h2 className={`mt-3 font-display text-4xl md:text-5xl ${light ? "text-raudhah-ivory" : "text-raudhah-emerald"}`}>{title}</h2>
      <Divider className="mt-5" />
    </div>
  );
}

export function RaudhahFooter() {
  return (
    <footer className="bg-raudhah-deep text-raudhah-ivory/70" style={starPattern}>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-3">
        <div>
          <RaudhahLogo />
          <p className="mt-4 text-sm">Melayani tamu Allah dengan amanah sejak 2010.</p>
        </div>
        <div className="text-sm">
          <div className="font-display text-lg text-raudhah-gold">Kantor</div>
          <p className="mt-2">Jl. Contoh No. 10, Surabaya</p>
          <p>WhatsApp +{RAUDHAH_WA}</p>
        </div>
        <div className="text-sm md:text-right">
          © {new Date().getFullYear()} Raudhah Safar
          <br />
          Website oleh{" "}
          <Link href="/" className="text-raudhah-gold underline">
            Yubu Travel Portfolio
          </Link>
        </div>
      </div>
    </footer>
  );
}
