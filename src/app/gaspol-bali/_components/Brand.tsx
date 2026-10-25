import Link from "next/link";
import { GASPOL_WA } from "../data";

/** Tekstur bintik halus ala poster fotokopi. */
export const grain = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.07'/%3E%3C/svg%3E")`,
};

export function Sticker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-block rounded-md border-2 border-black bg-gaspol-pink px-3 py-1 font-display text-lg uppercase tracking-wide text-black shadow-[3px_3px_0_#000] ${className}`}
    >
      {children}
    </span>
  );
}

export function GaspolLogo() {
  return (
    <Link href="/gaspol-bali" className="group flex items-center gap-2" aria-label="Gaspol Bali - Beranda">
      <span className="flex h-10 w-10 -rotate-6 items-center justify-center rounded-full border-2 border-white bg-gaspol-pink font-display text-xl text-black transition group-hover:rotate-6">
        ⚡
      </span>
      <span className="font-display text-3xl uppercase italic leading-none tracking-wide">
        Gaspol<span className="text-gaspol-pink">Bali</span>
      </span>
    </Link>
  );
}

export function GaspolNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-gaspol-line bg-gaspol-ink/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <GaspolLogo />
        <nav className="hidden items-center gap-7 text-sm font-bold uppercase tracking-wider md:flex">
          <a href="/gaspol-bali#motor" className="hover:text-gaspol-pink">
            Motor
          </a>
          <a href="/gaspol-bali#area" className="hover:text-gaspol-pink">
            Area antar
          </a>
          <a href="/gaspol-bali#faq" className="hover:text-gaspol-pink">
            FAQ
          </a>
        </nav>
        <Link
          href="/gaspol-bali/sewa"
          className="rounded-full bg-gaspol-pink px-5 py-2 font-display text-lg uppercase tracking-wide text-black shadow-[0_0_24px_rgba(255,46,147,0.5)] hover:bg-white"
        >
          Sewa sekarang
        </Link>
      </div>
    </header>
  );
}

export function Marquee({ items }: { items: string[] }) {
  return (
    <div className="overflow-hidden border-y-2 border-black bg-gaspol-pink py-3 text-black">
      <div className="flex w-max animate-[riaMarquee_25s_linear_infinite] gap-8 whitespace-nowrap font-display text-2xl uppercase">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-8">
            {t} <span>⚡</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function GaspolFooter() {
  return (
    <footer className="border-t border-gaspol-line bg-black" style={grain}>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <GaspolLogo />
          <p className="mt-3 max-w-sm text-sm text-white/60">Sewa motor di Bali tanpa ribet. Diantar ke villa, dijemput lagi pas pulang.</p>
        </div>
        <p className="text-sm text-white/60 md:text-right">
          WA 24 jam +{GASPOL_WA}
          <br />
          Pool: Jl. Batu Bolong, Canggu
          <br />© {new Date().getFullYear()} Gaspol Bali · Demo dari{" "}
          <Link href="/" className="text-gaspol-pink underline">
            Yubu Travel Portfolio
          </Link>
        </p>
      </div>
    </footer>
  );
}
