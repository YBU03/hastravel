import { Instrument_Serif } from "next/font/google";
import Link from "next/link";
import { PORTFOLIO, STATUS_LABEL, type PortfolioItem } from "@/lib/portfolio";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-display" });

export default function PortfolioGallery() {
  const live = PORTFOLIO.filter((p) => p.status !== "soon").length;
  return (
    <div className={`${serif.variable} min-h-screen bg-[#f6f4ef] text-[#141414]`}>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6">
        <YubuMark />
        <a href="#tema" className="rounded-full bg-[#141414] px-4 py-2 text-sm font-semibold text-white hover:bg-[#ff6b4a]">
          Lihat tema
        </a>
      </header>

      <section className="mx-auto max-w-6xl px-4 pb-14 pt-10 md:pt-16">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#ff6b4a]">Yubu Travel Portfolio</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
          10 wajah website travel, <span className="italic text-[#ff6b4a]">satu</span> fondasi yang sama.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[#141414]/70">
          Dari travel antar kota sampai fast boat dan umroh. Setiap tema punya gaya visual dan alur pemesanan sendiri, semuanya
          terhubung ke WhatsApp dan siap dikembangkan dengan panel admin.
        </p>
        <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-[#141414]/15 pt-6">
          {[
            [String(PORTFOLIO.length), "Tema"],
            [String(live), "Sudah live"],
            ["1", "Dengan panel admin"],
          ].map(([n, label]) => (
            <div key={label}>
              <dt className="text-xs text-[#141414]/60">{label}</dt>
              <dd className="font-display text-4xl">{n}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="tema" className="mx-auto grid max-w-6xl scroll-mt-6 gap-6 px-4 pb-24 md:grid-cols-2">
        {PORTFOLIO.map((item) => (
          <ThemeCard key={item.slug} item={item} />
        ))}
      </section>

      <footer className="border-t border-[#141414]/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-[#141414]/60 md:flex-row md:items-center md:justify-between">
          <YubuMark small />
          <p>© {new Date().getFullYear()} Yubu Travel Portfolio · Semua nama brand di sini fiktif untuk keperluan demo.</p>
        </div>
      </footer>
    </div>
  );
}

function YubuMark({ small = false }: { small?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className={small ? "h-6 w-6" : "h-8 w-8"} aria-hidden>
        <circle cx="16" cy="6" r="3.2" fill="#ff6b4a" />
        <path d="M6 9l10 11v9M26 9L16 20" fill="none" stroke="#141414" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={`font-bold tracking-tight ${small ? "text-sm" : "text-base"}`}>
        yubu <span className="font-normal text-[#141414]/60">travel portfolio</span>
      </span>
    </Link>
  );
}

function ThemeCard({ item }: { item: PortfolioItem }) {
  const live = item.status !== "soon";
  const [bg, fg, accent, accent2] = item.palette;
  const className = `group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-[#141414]/10 transition ${
    live ? "hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#141414]/10" : ""
  }`;
  const body = (
    <>
      {/* Preview */}
      <div className="relative aspect-[16/10] overflow-hidden" style={{ background: bg }}>
        {item.preview ? (
          <>
            <div className="absolute inset-x-0 top-0 z-10 flex h-6 items-center gap-1.5 bg-[#141414]/80 px-3 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-white/30" />
              <span className="h-2 w-2 rounded-full bg-white/30" />
              <span className="h-2 w-2 rounded-full bg-white/30" />
              <span className="ml-2 text-[10px] text-white/50">/{item.slug}</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.preview}
              alt={`Tampilan ${item.name}`}
              loading="lazy"
              className="h-full w-full object-cover object-top pt-6 transition duration-700 group-hover:scale-[1.03]"
            />
          </>
        ) : (
          <MiniMock name={item.name} bg={bg} fg={fg} accent={accent} accent2={accent2} />
        )}
        <span
          className={`absolute right-3 z-10 rounded-full ${item.preview ? "top-9" : "top-3"} px-2.5 py-1 text-[11px] font-bold ${
            item.status === "full"
              ? "bg-[#ff6b4a] text-white"
              : item.status === "demo"
                ? "bg-[#141414] text-white"
                : "bg-white/90 text-[#141414]/70"
          }`}
        >
          {STATUS_LABEL[item.status]}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3 text-xs text-[#141414]/60">
          <span>
            No. {String(item.no).padStart(2, "0")} · {item.business}
          </span>
          <span className="flex items-center gap-1.5">
            {item.palette.map((c, i) => (
              <span key={i} className="h-3 w-3 rounded-full ring-1 ring-[#141414]/10" style={{ background: c }} />
            ))}
          </span>
        </div>
        <h2 className="mt-3 font-display text-3xl leading-none">{item.name}</h2>
        <p className="mt-1 text-sm font-semibold text-[#ff6b4a]">Tema {item.style}</p>
        <p className="mt-3 text-sm text-[#141414]/70">{item.description}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {item.features.map((f) => (
            <li key={f} className="rounded-full bg-[#f6f4ef] px-2.5 py-1 text-xs text-[#141414]/70">
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-6">
          {live ? (
            <span className="inline-flex items-center gap-2 text-sm font-bold group-hover:text-[#ff6b4a]">
              Lihat demo <span className="transition group-hover:translate-x-1">→</span>
            </span>
          ) : (
            <span className="text-sm font-semibold text-[#141414]/40">Dalam pengerjaan</span>
          )}
        </div>
      </div>
    </>
  );
  return live ? (
    <Link href={`/${item.slug}`} className={className}>
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  );
}

/** Mockup mini dari palet tema, untuk tema yang belum dibuat. */
function MiniMock({ name, bg, fg, accent, accent2 }: { name: string; bg: string; fg: string; accent: string; accent2: string }) {
  return (
    <div className="absolute inset-0 flex flex-col p-5" style={{ color: fg }}>
      <div className="flex items-center justify-between">
        <span className="h-3 w-20 rounded-full" style={{ background: fg, opacity: 0.85 }} />
        <span className="flex gap-2">
          <span className="h-2 w-8 rounded-full" style={{ background: fg, opacity: 0.35 }} />
          <span className="h-2 w-8 rounded-full" style={{ background: fg, opacity: 0.35 }} />
          <span className="h-5 w-14 rounded-full" style={{ background: accent }} />
        </span>
      </div>
      <div className="mt-auto grid grid-cols-[1.4fr_1fr] items-end gap-4">
        <div>
          <div className="font-display text-3xl leading-none md:text-4xl">{name}</div>
          <div className="mt-3 h-2 w-3/4 rounded-full" style={{ background: fg, opacity: 0.3 }} />
          <div className="mt-1.5 h-2 w-1/2 rounded-full" style={{ background: fg, opacity: 0.3 }} />
          <div className="mt-4 h-7 w-24 rounded-lg" style={{ background: accent }} />
        </div>
        <div className="grid h-full grid-cols-2 gap-2">
          <div className="rounded-xl" style={{ background: accent2 }} />
          <div className="rounded-xl" style={{ background: accent, opacity: 0.85 }} />
          <div className="col-span-2 h-12 rounded-xl" style={{ background: accent2, opacity: 0.7 }} />
        </div>
      </div>
    </div>
  );
}
