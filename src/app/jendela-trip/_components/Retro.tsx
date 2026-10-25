import Link from "next/link";
import { JENDELA_WA, type Poster } from "../data";

/** Latar kertas bergaris halus ala poster lama. */
export const paperTexture = {
  backgroundImage: "repeating-linear-gradient(0deg, rgba(45,30,18,0.035) 0 1px, transparent 1px 4px)",
};

export function Stamp({ text, sub, className = "", color = "#d6452b" }: { text: string; sub?: string; className?: string; color?: string }) {
  return (
    <div
      className={`inline-flex flex-col items-center justify-center rounded-full border-[3px] border-dashed px-4 py-3 text-center font-display uppercase leading-none ${className}`}
      style={{ borderColor: color, color }}
    >
      <span className="text-xs tracking-widest">{text}</span>
      {sub && <span className="mt-1 text-[9px] tracking-[0.25em]">{sub}</span>}
    </div>
  );
}

export function Sunburst({ color = "#e2a72e", className = "" }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      {Array.from({ length: 24 }, (_, i) => (
        <path key={i} d="M100 100 L96 0 H104 Z" fill={color} transform={`rotate(${i * 15} 100 100)`} opacity={i % 2 ? 0.5 : 1} />
      ))}
    </svg>
  );
}

export function PosterArt({ p, className = "" }: { p: Poster; className?: string }) {
  return (
    <svg viewBox="0 0 300 400" className={className} role="img" aria-label={`Poster ${p.city}`}>
      <rect width="300" height="400" fill={p.bg} />
      <g opacity=".25">
        {Array.from({ length: 18 }, (_, i) => (
          <path key={i} d="M150 230 L146 0 H154 Z" fill="#faf3e3" transform={`rotate(${i * 20 - 170} 150 230)`} />
        ))}
      </g>
      <circle cx="150" cy="230" r="70" fill={p.sun} />
      {p.id === "bali" && <path d="M0 300 L60 250 L95 270 L150 200 L210 270 L250 240 L300 280 V400 H0 Z" fill={p.land} />}
      {p.id === "bajo" && (
        <>
          <path d="M0 290 C 50 240 90 250 120 280 C 160 230 220 240 300 290 V400 H0 Z" fill={p.land} />
          <path d="M0 330 H300 V400 H0 Z" fill="#faf3e3" opacity=".25" />
        </>
      )}
      {p.id === "jogja" && (
        <>
          <path d="M60 300 L150 180 L240 300 Z" fill={p.land} />
          <path d="M100 300 V250 H200 V300 M120 250 V230 H180 V250 M140 230 V205 H160 V230" stroke={p.sun} strokeWidth="4" fill="none" />
          <rect y="300" width="300" height="100" fill={p.land} />
        </>
      )}
      {p.id === "rajaampat" && (
        <>
          {[60, 140, 220].map((x, i) => (
            <path key={x} d={`M${x - 35} 300 C ${x - 30} ${250 - i * 10} ${x + 30} ${250 - i * 10} ${x + 35} 300 Z`} fill={p.land} />
          ))}
          <rect y="300" width="300" height="100" fill="#2f7f7a" />
        </>
      )}
      <path d="M0 340 C 50 330 100 350 150 340 S 250 330 300 340" stroke="#faf3e3" strokeWidth="3" fill="none" opacity=".6" />
    </svg>
  );
}

export function JendelaLogo() {
  return (
    <Link href="/jendela-trip" className="flex items-center gap-2" aria-label="Jendela Trip - Beranda">
      <span className="grid h-10 w-10 grid-cols-2 gap-0.5 rounded-t-full border-[3px] border-jendela-ink bg-jendela-ink p-1">
        <span className="rounded-tl-full bg-jendela-mustard" />
        <span className="rounded-tr-full bg-jendela-red" />
        <span className="bg-jendela-teal" />
        <span className="bg-jendela-cream" />
      </span>
      <span className="font-display text-2xl leading-none">
        Jendela<span className="text-jendela-red">Trip</span>
      </span>
    </Link>
  );
}

export function JendelaNav() {
  return (
    <header className="border-b-[3px] border-jendela-ink bg-jendela-cream">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4">
        <JendelaLogo />
        <nav className="hidden items-center gap-7 text-sm font-semibold uppercase tracking-wider md:flex">
          <a href="/jendela-trip#promo" className="hover:text-jendela-red">
            Promo
          </a>
          <a href="/jendela-trip#kenapa" className="hover:text-jendela-red">
            Kenapa kami
          </a>
          <a href="/jendela-trip#cerita" className="hover:text-jendela-red">
            Cerita
          </a>
        </nav>
        <a
          href={`https://wa.me/${JENDELA_WA}`}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap border-[3px] border-jendela-ink bg-jendela-red px-4 py-2 font-display text-sm uppercase text-jendela-cream shadow-[4px_4px_0_#2d1e12] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#2d1e12]"
        >
          Tanya agen
        </a>
      </div>
    </header>
  );
}

export function JendelaFooter() {
  return (
    <footer className="border-t-[3px] border-jendela-ink bg-jendela-ink text-jendela-cream/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="font-display text-3xl text-jendela-cream">
            Jendela<span className="text-jendela-mustard">Trip</span>
          </span>
          <p className="mt-2 max-w-sm text-sm">Agen tiket pesawat & hotel. Buka jendela, lihat Indonesia.</p>
        </div>
        <p className="text-sm md:text-right">
          WhatsApp +{JENDELA_WA} · 07.00–22.00 WIB
          <br />© {new Date().getFullYear()} Jendela Trip · Website oleh{" "}
          <Link href="/" className="text-jendela-mustard underline">
            Yubu Travel Portfolio
          </Link>
        </p>
      </div>
    </footer>
  );
}
