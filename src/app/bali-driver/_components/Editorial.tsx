import Link from "next/link";

/** Editorial placeholder: a toned block with a caption, used until real photos arrive. */
export function Plate({
  src,
  alt,
  caption,
  tone = "stone",
  className = "",
}: {
  src: string | null;
  alt: string;
  caption?: string;
  tone?: "stone" | "ink";
  className?: string;
}) {
  if (src) {
    return (
      <figure className={`relative overflow-hidden ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </figure>
    );
  }
  const dark = tone === "ink";
  return (
    <figure
      role="img"
      aria-label={alt}
      className={`relative flex items-end overflow-hidden ${dark ? "bg-editorial-ink text-editorial-paper" : "bg-editorial-stone text-editorial-ink"} ${className}`}
    >
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full opacity-[0.18]" aria-hidden>
        <path d="M0 220 Q 80 170 160 200 T 320 180 T 400 190 V300 H0Z" fill="currentColor" />
        <path d="M0 250 Q 100 215 200 240 T 400 230 V300 H0Z" fill="currentColor" />
        <circle cx="300" cy="90" r="34" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      {caption && (
        <figcaption className="relative m-4 font-display text-xl italic leading-tight md:text-2xl">{caption}</figcaption>
      )}
    </figure>
  );
}

export function Rule({ label, no }: { label: string; no?: string }) {
  return (
    <div className="flex items-baseline gap-4 border-t border-editorial-ink pt-3 text-[11px] font-medium uppercase tracking-[0.2em]">
      {no && <span>{no}</span>}
      <span>{label}</span>
    </div>
  );
}

export function BaliNav() {
  return (
    <header className="border-b border-editorial-ink/15 bg-editorial-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/bali-driver" className="font-display text-2xl leading-none">
          Bali Driver <em>Co.</em>
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          <Link href="/bali-driver#rates" className="hover:underline">
            Rates
          </Link>
          <Link href="/bali-driver#routes" className="hover:underline">
            Routes
          </Link>
          <Link href="/bali-driver#drivers" className="hover:underline">
            Drivers
          </Link>
        </nav>
        <Link href="/bali-driver/book" className="whitespace-nowrap bg-editorial-ink px-5 py-2.5 text-sm font-medium text-editorial-paper hover:bg-black">
          Book a driver
        </Link>
      </div>
    </header>
  );
}

export function BaliFooter() {
  return (
    <footer className="border-t border-editorial-ink bg-editorial-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="font-display text-4xl leading-none">
            Bali Driver <em>Co.</em>
          </p>
          <p className="mt-4 max-w-sm text-sm text-editorial-mute">
            Private drivers across Bali since 2011. Licensed, insured, and genuinely local.
          </p>
        </div>
        <div className="text-sm">
          <p className="text-[11px] uppercase tracking-[0.2em] text-editorial-mute">Contact</p>
          <p className="mt-3">WhatsApp +62 812 3456 7890</p>
          <p>hello@balidriver.co</p>
        </div>
        <div className="text-sm">
          <p className="text-[11px] uppercase tracking-[0.2em] text-editorial-mute">Base</p>
          <p className="mt-3">Jl. Raya Ubud No. 18</p>
          <p>Gianyar, Bali</p>
        </div>
      </div>
      <div className="border-t border-editorial-ink/15">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-4 py-5 text-xs text-editorial-mute">
          <span>© {new Date().getFullYear()} Bali Driver Co.</span>
          <span>
            Website oleh{" "}
            <Link href="/" className="underline">
              Yubu Travel Portfolio
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
