import type { Scene } from "../data";

/** Ilustrasi pemandangan bergaya flat/hangat (pengganti foto). */
export function SceneArt({ scene, className = "" }: { scene: Scene; className?: string }) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label="Ilustrasi pemandangan">
      <rect width="400" height="300" fill={scene === "sea" ? "#cfe3d9" : "#f1d9b5"} />
      <circle cx={scene === "crater" ? 90 : 300} cy="80" r="34" fill={scene === "crater" ? "#f4ead8" : "#e8a25e"} />
      {scene === "mountain" && (
        <>
          <path d="M-20 230 L110 90 L200 190 L270 120 L420 250 V300 H-20 Z" fill="#8fa382" />
          <path d="M80 300 L190 150 L260 220 L330 170 L420 260 V300 Z" fill="#5d6e52" />
          <path d="M150 190 C 175 170 205 170 230 190 L230 200 L150 200 Z" fill="#c8623d" opacity=".7" />
          <path d="M-20 270 C 100 240 250 290 420 255 V300 H-20 Z" fill="#c8a37a" />
        </>
      )}
      {scene === "crater" && (
        <>
          <path d="M-20 300 L60 140 L150 180 L250 120 L420 300 Z" fill="#5d6e52" />
          <ellipse cx="200" cy="215" rx="90" ry="26" fill="#7fc8b8" />
          <path d="M140 210 C 160 190 175 205 190 190 C 205 205 225 185 245 205" stroke="#5a8fd8" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M-20 300 C 120 250 280 260 420 290 V300 Z" fill="#3b2a20" opacity=".5" />
        </>
      )}
      {scene === "sea" && (
        <>
          <rect y="170" width="400" height="130" fill="#7fb8b0" />
          <path d="M250 300 L250 150 C 270 110 330 100 380 140 L400 160 V300 Z" fill="#8fa382" />
          <path d="M250 150 C 270 120 300 112 330 120 L310 150 Z" fill="#5d6e52" />
          <path d="M0 200 C 50 190 90 210 140 200 S 230 190 260 200" stroke="#f4ead8" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M20 240 C 70 230 110 250 160 240" stroke="#f4ead8" strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      )}
      {scene === "waterfall" && (
        <>
          <path d="M-20 300 L-20 60 C 60 80 100 120 120 300 Z" fill="#5d6e52" />
          <path d="M420 300 V50 C 340 70 300 120 280 300 Z" fill="#5d6e52" />
          <path d="M120 300 C 140 160 160 110 200 100 C 240 110 260 160 280 300 Z" fill="#8fa382" />
          {[150, 175, 200, 225, 250].map((x) => (
            <path key={x} d={`M${x} 110 V280`} stroke="#f4ead8" strokeWidth="5" strokeLinecap="round" opacity=".85" />
          ))}
          <ellipse cx="200" cy="285" rx="110" ry="18" fill="#cfe3d9" />
        </>
      )}
    </svg>
  );
}
