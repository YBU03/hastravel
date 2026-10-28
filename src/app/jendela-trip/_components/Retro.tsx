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
      {p.image ? (
        <>
          <image href={p.image} width="300" height="400" preserveAspectRatio="xMidYMid slice" style={{ filter: "sepia(.35) saturate(1.2) contrast(1.05)" }} />
          <rect width="300" height="400" fill={p.bg} opacity=".22" style={{ mixBlendMode: "multiply" }} />
          <rect x="8" y="8" width="284" height="384" fill="none" stroke="#faf3e3" strokeWidth="3" opacity=".8" />
        </>
      ) : (
        <PosterScene p={p} />
      )}
    </svg>
  );
}

function PosterScene({ p }: { p: Poster }) {
  return (
    <>
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
    </>
  );
}

export type PostcardScene = "beach" | "plane" | "city";

/** Flat illustration on the front of each customer postcard. */
export function PostcardArt({ scene, className = "" }: { scene: PostcardScene; className?: string }) {
  const ink = "#2d1e12", red = "#d6452b", mustard = "#e2a72e", teal = "#2f7f7a", cream = "#faf3e3", paper = "#f3e7cf";
  return (
    <svg viewBox="0 0 300 180" className={className} aria-hidden>
      {scene === "beach" && (
        <>
          <rect width="300" height="180" fill={mustard} />
          <circle cx="225" cy="62" r="30" fill={red} />
          <path d="M0 105 C 60 95 120 112 180 102 S 270 98 300 104 V140 H0 Z" fill={teal} />
          <path d="M0 122 C 50 116 100 126 150 120 S 250 116 300 122" stroke={cream} strokeWidth="3" fill="none" opacity=".7" />
          <path d="M0 140 C 80 128 200 132 300 138 V180 H0 Z" fill={paper} />
          {/* palm */}
          <path d="M52 150 C 56 120 60 95 70 70" stroke={ink} strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M70 70 C 50 58 32 62 22 74 C 40 66 55 68 70 70 Z M70 70 C 82 52 100 48 114 54 C 98 56 84 62 70 70 Z M70 70 C 62 50 66 36 76 28 C 72 44 72 56 70 70 Z M70 70 C 90 64 106 72 112 84 C 98 74 84 72 70 70 Z" fill={teal} stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
          {/* umbrella + chair */}
          <path d="M150 112 L158 162" stroke={ink} strokeWidth="3" />
          <path d="M120 116 C 128 92 176 86 194 106 Z" fill={red} stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M138 112 C 150 102 160 100 172 104" stroke={cream} strokeWidth="2" fill="none" />
          <path d="M172 162 L186 146 H220 L210 162 M190 146 L182 132" stroke={ink} strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* suitcase */}
          <rect x="232" y="138" width="30" height="24" rx="3" fill={cream} stroke={ink} strokeWidth="2.5" />
          <path d="M241 138 V132 H253 V138 M232 150 H262" stroke={ink} strokeWidth="2.5" fill="none" />
        </>
      )}
      {scene === "plane" && (
        <>
          <rect width="300" height="180" fill={teal} />
          <g opacity=".2">
            {Array.from({ length: 10 }, (_, i) => (
              <path key={i} d="M150 200 L147 0 H153 Z" fill={cream} transform={`rotate(${i * 18 - 81} 150 200)`} />
            ))}
          </g>
          {[[40, 130, 1], [210, 140, 1.3], [120, 160, 1.1]].map(([x, y, k]) => (
            <path key={x} d={`M${x} ${y} h${70 * k} a${12 * k} ${12 * k} 0 0 0 -${14 * k} -${16 * k} a${16 * k} ${16 * k} 0 0 0 -${30 * k} -${6 * k} a${12 * k} ${12 * k} 0 0 0 -${26 * k} ${22 * k} Z`} fill={cream} stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
          ))}
          {/* plane */}
          <g transform="translate(150 78) rotate(-12)" stroke={ink} strokeWidth="2.5" strokeLinejoin="round">
            <path d="M-70 0 C -70 -10 -60 -14 -40 -14 H50 C 66 -14 76 -6 78 0 C 76 6 66 10 50 10 H-40 C -60 10 -70 8 -70 0 Z" fill={cream} />
            <path d="M-10 -2 L-34 -42 H-20 L18 -2 Z M-10 6 L-28 36 H-16 L14 6 Z M-58 -6 L-66 -30 H-56 L-42 -8 Z" fill={red} />
            <path d="M58 -8 C 64 -8 70 -4 72 0 H58 Z" fill={ink} />
            {[-30, -14, 2, 18, 34].map((x) => (
              <circle key={x} cx={x} cy="-3" r="2.6" fill={mustard} />
            ))}
          </g>
          {/* calendar with reschedule arrow */}
          <g transform="translate(232 18)">
            <rect width="52" height="50" rx="4" fill={cream} stroke={ink} strokeWidth="2.5" />
            <rect width="52" height="14" rx="4" fill={red} stroke={ink} strokeWidth="2.5" />
            <path d="M14 34 C 14 24 34 22 38 30 M38 30 L39 22 M38 30 L30 30" stroke={ink} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </g>
        </>
      )}
      {scene === "city" && (
        <>
          <rect width="300" height="180" fill={red} />
          <circle cx="70" cy="58" r="26" fill={mustard} />
          {[
            [20, 70, 40], [62, 50, 30], [96, 90, 44], [144, 40, 34], [182, 76, 40], [226, 56, 30], [260, 84, 40],
          ].map(([x, h, w], i) => (
            <g key={x}>
              <rect x={x} y={150 - h} width={w} height={h} fill={i % 2 ? ink : teal} stroke={ink} strokeWidth="2.5" />
              {Array.from({ length: Math.floor(h / 18) }, (_, r) => (
                <rect key={r} x={x + 8} y={150 - h + 10 + r * 18} width={w - 16} height="6" fill={cream} opacity=".75" />
              ))}
            </g>
          ))}
          <rect y="150" width="300" height="30" fill={paper} />
          {/* briefcase + invoice */}
          <rect x="112" y="128" width="54" height="38" rx="4" fill={mustard} stroke={ink} strokeWidth="2.5" />
          <path d="M128 128 V120 H150 V128 M112 142 H166" stroke={ink} strokeWidth="2.5" fill="none" />
          <g transform="translate(184 112) rotate(6)">
            <rect width="40" height="52" fill={cream} stroke={ink} strokeWidth="2.5" />
            <path d="M8 12 H32 M8 22 H32 M8 32 H24" stroke={ink} strokeWidth="2.5" />
            <path d="M22 40 L27 45 L36 35" stroke={teal} strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        </>
      )}
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
