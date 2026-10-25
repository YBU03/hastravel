/** Foto dari pengguna, atau ilustrasi garis emas selama foto belum tersedia. */
export function Photo({
  src,
  alt,
  className = "",
  variant = "car",
}: {
  src: string | null;
  alt: string;
  className?: string;
  variant?: "car" | "ornament";
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} loading="lazy" className={`object-cover ${className}`} />;
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,#2a2418_0%,#141312_55%,#0b0b0b_100%)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-3 border border-kencana-gold/15" />
      {variant === "car" ? <CarLineArt className="w-4/5 max-w-md" /> : <Ornament className="w-20" />}
    </div>
  );
}

export function CarLineArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 160" className={className} fill="none" stroke="#c9a96e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {/* MPV tampak samping */}
      <path d="M22 118 V92 C22 84 26 79 34 77 L84 66 C100 44 118 30 150 26 L300 24 C318 24 330 30 340 44 L366 82 C374 86 378 92 378 100 V118" />
      <path d="M22 118 H52 M108 118 H286 M342 118 H378" />
      <path d="M96 66 L124 34 H214 V66 Z" opacity=".8" />
      <path d="M222 34 H296 C306 34 314 40 318 48 L330 66 H222 Z" opacity=".8" />
      <path d="M218 30 V114" opacity=".5" />
      <path d="M150 74 H170 M250 74 H270" opacity=".6" />
      <path d="M360 90 H376" strokeWidth="3" opacity=".7" />
      <circle cx="80" cy="118" r="24" />
      <circle cx="80" cy="118" r="10" opacity=".6" />
      <circle cx="314" cy="118" r="24" />
      <circle cx="314" cy="118" r="10" opacity=".6" />
      <path d="M6 144 H394" opacity=".25" />
    </svg>
  );
}

export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" stroke="#c9a96e" strokeWidth="1.2" aria-hidden>
      <rect x="20" y="20" width="40" height="40" transform="rotate(45 40 40)" />
      <rect x="28" y="28" width="24" height="24" transform="rotate(45 40 40)" opacity=".6" />
      <circle cx="40" cy="40" r="3" fill="#c9a96e" />
    </svg>
  );
}
