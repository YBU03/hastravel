/** Ilustrasi motor garis neon (pengganti foto). */
export function ScooterArt({ kind = "scooter", className = "" }: { kind?: "scooter" | "trail"; className?: string }) {
  return (
    <svg viewBox="0 0 320 200" className={className} fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g stroke="#ff2e93" strokeWidth="5" filter="url(#glow)">
        <circle cx="70" cy="150" r="32" />
        <circle cx="250" cy="150" r="32" />
        {kind === "scooter" ? (
          <>
            <path d="M70 150 L110 110 H190 C205 110 215 118 220 130 L250 150" />
            <path d="M110 110 C 105 85 120 75 145 75 H200 L215 60" />
            <path d="M215 60 L235 45 M228 40 L250 52" />
            <path d="M140 75 C 150 60 175 60 185 75" />
            <path d="M220 130 L232 75" />
          </>
        ) : (
          <>
            <path d="M70 150 L125 95 H195 L250 150" />
            <path d="M125 95 L150 70 H200 L230 50" />
            <path d="M230 50 L250 40 M222 38 L245 55" />
            <path d="M195 95 L230 60" />
            <path d="M100 120 H160" />
          </>
        )}
      </g>
      <g stroke="#fff" strokeWidth="2" opacity=".6">
        <circle cx="70" cy="150" r="8" />
        <circle cx="250" cy="150" r="8" />
        <path d="M10 186 H310" strokeDasharray="10 8" />
      </g>
    </svg>
  );
}
