import Link from "next/link";

export function SayapLogo({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <Link href="/sayap-shuttle" className="flex items-center gap-2.5" aria-label="Sayap Shuttle - Beranda">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/sayap/logo.png" alt="" className={size === "lg" ? "h-9 w-auto" : "h-7 w-auto"} />
      <span className="font-display leading-none">
        <span className={`block font-bold tracking-tight text-white ${size === "lg" ? "text-2xl" : "text-xl"}`}>SAYAP</span>
        <span className="block text-[9px] font-semibold tracking-[0.42em] text-sayap-lime">SHUTTLE</span>
      </span>
    </Link>
  );
}

export function SayapNav({ overlay = false }: { overlay?: boolean }) {
  return (
    <header className={overlay ? "absolute inset-x-0 top-0 z-30" : "border-b border-sayap-line bg-sayap-ink"}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:h-20">
        <SayapLogo />
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
          <a href="/sayap-shuttle#tarif" className="hover:text-sayap-lime">
            Tarif
          </a>
          <a href="/sayap-shuttle#armada" className="hover:text-sayap-lime">
            Armada
          </a>
          <a href="/sayap-shuttle#cara-kerja" className="hover:text-sayap-lime">
            Cara Kerja
          </a>
          <a href="/sayap-shuttle#faq" className="hover:text-sayap-lime">
            FAQ
          </a>
        </nav>
        <Link
          href="/sayap-shuttle/pesan"
          className="rounded-full bg-sayap-lime px-4 py-2 text-sm font-bold text-sayap-navy shadow-[0_0_24px_rgba(198,244,50,0.35)] hover:bg-white"
        >
          Pesan Shuttle
        </Link>
      </div>
    </header>
  );
}

export function SayapFooter() {
  return (
    <footer className="border-t border-sayap-line bg-sayap-ink pb-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <SayapLogo size="lg" />
          <p className="mt-4 max-w-sm text-sm text-slate-400">
            Antar-jemput bandara Ngurah Rai (Bali) dan Juanda (Surabaya). Tarif pasti, sopir profesional, 24 jam.
          </p>
        </div>
        <div>
          <h3 className="font-display font-semibold text-white">Bandara</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li>DPS · I Gusti Ngurah Rai, Bali</li>
            <li>SUB · Juanda, Surabaya</li>
          </ul>
        </div>
        <div>
          <h3 className="font-display font-semibold text-white">Kontak</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li>WhatsApp 24 jam: +62 812-3456-7890</li>
            <li>halo@sayapshuttle.id</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-sayap-line py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Sayap Shuttle · Demo dari{" "}
        <Link href="/" className="text-sayap-lime hover:underline">
          Yubu Travel Portfolio
        </Link>
      </div>
    </footer>
  );
}
