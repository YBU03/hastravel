import Link from "next/link";
import { CITIES, KENCANA_WA } from "../data";

export function KencanaLogo() {
  return (
    <Link href="/kencana-executive" className="flex flex-col items-center leading-none" aria-label="Kencana Executive - Beranda">
      <span className="font-display text-2xl font-medium tracking-[0.32em] text-kencana-ivory md:text-[1.7rem]">KENCANA</span>
      <span className="mt-1 flex items-center gap-2 text-[9px] font-semibold tracking-[0.5em] text-kencana-gold">
        <span className="h-px w-4 bg-kencana-gold/60" />
        EXECUTIVE
        <span className="h-px w-4 bg-kencana-gold/60" />
      </span>
    </Link>
  );
}

export function KencanaNav({ overlay = false }: { overlay?: boolean }) {
  const link = "hidden text-[11px] font-semibold uppercase tracking-[0.25em] text-kencana-ivory/70 hover:text-kencana-gold md:block";
  return (
    <header className={overlay ? "absolute inset-x-0 top-0 z-30" : "border-b border-kencana-line"}>
      <div className="mx-auto grid h-20 max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 md:h-24">
        <nav className="flex items-center gap-8">
          <a href="/kencana-executive#armada" className={link}>
            Armada
          </a>
          <a href="/kencana-executive#layanan" className={link}>
            Layanan
          </a>
        </nav>
        <KencanaLogo />
        <div className="flex items-center justify-end gap-8">
          <a href="/kencana-executive#acara" className={link}>
            Acara
          </a>
          <Link
            href="/kencana-executive/reservasi"
            className="border border-kencana-gold px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-kencana-gold transition hover:bg-kencana-gold hover:text-kencana-black"
          >
            Reservasi
          </Link>
        </div>
      </div>
    </header>
  );
}

export function KencanaFooter() {
  return (
    <footer className="border-t border-kencana-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-16 text-center">
        <KencanaLogo />
        <p className="mt-6 max-w-md text-sm text-kencana-ivory/50">
          Layanan chauffeur premium di {CITIES.join(" · ")}. Reservasi 24 jam via WhatsApp +{KENCANA_WA}.
        </p>
        <div className="mt-8 h-px w-16 bg-kencana-gold/40" />
        <p className="mt-6 text-xs text-kencana-ivory/40">
          © {new Date().getFullYear()} Kencana Executive · Website oleh{" "}
          <Link href="/" className="text-kencana-gold hover:underline">
            Yubu Travel Portfolio
          </Link>
        </p>
      </div>
    </footer>
  );
}
