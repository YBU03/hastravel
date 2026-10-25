/** Ilustrasi kapal cepat & pemandangan laut (pengganti foto). */

export function BoatArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 160" className={className} aria-hidden>
      <path d="M20 110 H330 L300 138 H48 Z" fill="#ffffff" stroke="#063b4c" strokeWidth="4" strokeLinejoin="round" />
      <path d="M40 120 H318" stroke="#00a6b4" strokeWidth="6" />
      <path d="M70 110 V78 C70 70 76 64 84 64 H230 C250 64 266 74 276 90 L288 110 Z" fill="#ffffff" stroke="#063b4c" strokeWidth="4" strokeLinejoin="round" />
      {[92, 124, 156, 188].map((x) => (
        <rect key={x} x={x} y="74" width="24" height="16" rx="4" fill="#7fd6dd" stroke="#063b4c" strokeWidth="3" />
      ))}
      <path d="M222 74 H246 C254 74 262 80 266 90 H222 Z" fill="#7fd6dd" stroke="#063b4c" strokeWidth="3" strokeLinejoin="round" />
      <path d="M110 64 V48 H190 V64" fill="#ff7a59" stroke="#063b4c" strokeWidth="4" strokeLinejoin="round" />
      <path d="M0 146 C 30 136 60 156 90 146 S 150 136 180 146 S 240 156 270 146 S 330 136 360 146" stroke="#00a6b4" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M318 126 C 330 120 340 126 352 120" stroke="#7fd6dd" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export type Scene = "cliff" | "reef" | "island" | "mountain";

export function SeaScene({ scene, className = "" }: { scene: Scene; className?: string }) {
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label="Ilustrasi pemandangan laut">
      <defs>
        <linearGradient id={`sky-${scene}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bfe9ee" />
          <stop offset="1" stopColor="#f6e7c8" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#sky-${scene})`} />
      <circle cx="320" cy="60" r="26" fill="#ffd58a" />
      {scene === "cliff" && (
        <>
          <path d="M180 260 V120 C 200 90 240 80 270 100 C 300 80 340 90 360 120 V260 Z" fill="#6aa37a" />
          <path d="M230 260 C 230 190 250 150 270 140 C 290 150 300 190 300 260 Z" fill="#4f8a62" />
        </>
      )}
      {scene === "mountain" && <path d="M120 170 L230 60 L340 170 Z" fill="#6aa37a" />}
      {scene === "island" && (
        <>
          <ellipse cx="200" cy="168" rx="120" ry="18" fill="#f6e7c8" />
          <path d="M210 168 C 205 130 200 110 196 96" stroke="#7a5a3a" strokeWidth="6" fill="none" />
          <path d="M196 96 C 170 90 160 104 150 110 M196 96 C 220 84 238 96 246 104 M196 96 C 190 74 204 66 214 64" stroke="#4f8a62" strokeWidth="9" fill="none" strokeLinecap="round" />
        </>
      )}
      <rect y="168" width="400" height="92" fill="#00a6b4" />
      <rect y="200" width="400" height="60" fill="#0b6e80" />
      {scene === "reef" && [70, 140, 260, 330].map((x) => <circle key={x} cx={x} cy="230" r="12" fill="#ff7a59" opacity=".8" />)}
      <path d="M0 180 C 40 172 80 188 120 180 S 200 172 240 180 S 320 188 400 178" stroke="#e6f7f8" strokeWidth="4" fill="none" opacity=".8" />
      <path d="M30 212 C 70 204 110 220 150 212" stroke="#e6f7f8" strokeWidth="3" fill="none" opacity=".6" />
    </svg>
  );
}

export function Wave({ className = "", fill = "#e6f7f8" }: { className?: string; fill?: string }) {
  return (
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className={`block h-12 w-full md:h-20 ${className}`} aria-hidden>
      <path d="M0 40 C 180 80 360 0 540 30 S 900 80 1080 40 S 1320 0 1440 30 V80 H0 Z" fill={fill} />
    </svg>
  );
}
