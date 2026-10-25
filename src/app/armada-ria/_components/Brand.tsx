import Link from "next/link";
import { RIA_WA } from "../data";

/** Gaya "neo-brutal": garis hitam tebal + bayangan keras. */
export const box = "rounded-2xl border-[3px] border-ria-ink shadow-[5px_5px_0_#1a1a1a]";
export const btn =
  "inline-flex items-center justify-center gap-2 rounded-xl border-[3px] border-ria-ink px-5 py-3 font-display font-bold shadow-[4px_4px_0_#1a1a1a] transition active:translate-x-[3px] active:translate-y-[3px] active:shadow-none hover:-translate-y-0.5";

export function RiaLogo() {
  return (
    <Link href="/armada-ria" className="flex items-center gap-2" aria-label="Armada Ria - Beranda">
      <span className="flex h-10 w-10 -rotate-6 items-center justify-center rounded-xl border-[3px] border-ria-ink bg-ria-orange font-display text-xl font-extrabold text-white shadow-[3px_3px_0_#1a1a1a]">
        A
      </span>
      <span className="font-display text-2xl font-extrabold tracking-tight">
        Armada<span className="text-ria-orange">Ria</span>
      </span>
    </Link>
  );
}

export function RiaNav() {
  return (
    <header className="border-b-[3px] border-ria-ink bg-ria-yellow">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4">
        <RiaLogo />
        <nav className="hidden items-center gap-7 font-display font-bold md:flex">
          <a href="/armada-ria#armada" className="hover:text-ria-orange">
            Armada
          </a>
          <a href="/armada-ria#klien" className="hover:text-ria-orange">
            Untuk Siapa
          </a>
          <a href="/armada-ria#galeri" className="hover:text-ria-orange">
            Galeri
          </a>
        </nav>
        <Link href="/armada-ria/penawaran" className={`${btn} bg-ria-ink py-2 text-sm text-ria-yellow shadow-[3px_3px_0_#ff5a1f]`}>
          Minta Penawaran
        </Link>
      </div>
    </header>
  );
}

export function RiaFooter() {
  return (
    <footer className="border-t-[3px] border-ria-ink bg-ria-ink text-ria-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <span className="font-display text-2xl font-extrabold">
            Armada<span className="text-ria-yellow">Ria</span>
          </span>
          <p className="mt-3 text-sm text-ria-cream/70">Sewa bus pariwisata untuk rombongan. Berangkat ramai, pulang senang.</p>
        </div>
        <div className="text-sm text-ria-cream/70">
          <div className="font-display font-bold text-ria-yellow">Kontak</div>
          <p className="mt-2">WhatsApp +{RIA_WA}</p>
          <p>Pool: Surabaya · Malang · Denpasar</p>
        </div>
        <div className="text-sm text-ria-cream/70 md:text-right">
          © {new Date().getFullYear()} Armada Ria
          <br />
          Website oleh{" "}
          <Link href="/" className="text-ria-yellow underline">
            Yubu Travel Portfolio
          </Link>
        </div>
      </div>
    </footer>
  );
}
