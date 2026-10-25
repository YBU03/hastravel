/** Ilustrasi bus kartun (pengganti foto). */
export function BusArt({ color = "#ff5a1f", className = "" }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 320 170" className={className} aria-hidden>
      <g stroke="#1a1a1a" strokeWidth="5" strokeLinejoin="round">
        <rect x="14" y="26" width="290" height="108" rx="22" fill={color} />
        <path d="M14 96 H304" fill="none" />
        <rect x="34" y="42" width="44" height="38" rx="8" fill="#fff4c2" />
        <rect x="88" y="42" width="44" height="38" rx="8" fill="#fff4c2" />
        <rect x="142" y="42" width="44" height="38" rx="8" fill="#fff4c2" />
        <rect x="196" y="42" width="44" height="38" rx="8" fill="#fff4c2" />
        <path d="M252 42 H280 C290 42 296 50 296 58 V80 H252 Z" fill="#7fd3ff" />
        <rect x="252" y="88" width="24" height="44" rx="4" fill="#fff4c2" />
        <circle cx="76" cy="136" r="20" fill="#1a1a1a" />
        <circle cx="76" cy="136" r="8" fill="#fff4c2" />
        <circle cx="238" cy="136" r="20" fill="#1a1a1a" />
        <circle cx="238" cy="136" r="8" fill="#fff4c2" />
        <rect x="296" y="104" width="12" height="14" rx="3" fill="#ffcc00" />
      </g>
      <path d="M40 112 H120" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" opacity=".25" />
    </svg>
  );
}
