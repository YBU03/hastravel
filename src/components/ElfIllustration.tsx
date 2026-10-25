/** Ilustrasi sederhana ELF tampak samping (pengganti foto armada). */
export function ElfIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 150" className={className} role="img" aria-label="Ilustrasi mobil ELF HasTrans">
      <ellipse cx="160" cy="136" rx="140" ry="8" fill="#000" opacity=".15" />
      <path
        d="M24 112V44c0-11 9-20 20-20h196c12 0 22 6 28 16l26 42c3 5 4 10 4 15v15c0 6-4 10-10 10H34c-6 0-10-4-10-10Z"
        fill="#fff"
      />
      <path d="M24 92h274v20c0 6-4 10-10 10H34c-6 0-10-4-10-10Z" fill="#0064e7" />
      <path d="M24 86h274v6H24z" fill="#5999ff" />
      <rect x="36" y="36" width="44" height="34" rx="6" fill="#0a264d" />
      <rect x="86" y="36" width="44" height="34" rx="6" fill="#0a264d" />
      <rect x="136" y="36" width="44" height="34" rx="6" fill="#0a264d" />
      <rect x="186" y="36" width="36" height="50" rx="5" fill="#0a264d" />
      <path d="M230 36h12c6 0 11 3 14 8l20 34c1 3 0 8-5 8h-41Z" fill="#0a264d" />
      <rect x="182" y="34" width="44" height="78" rx="6" fill="none" stroke="#bcd7ff" strokeWidth="2" />
      <rect x="286" y="96" width="10" height="6" rx="2" fill="#ffd34d" />
      <text x="40" y="108" fill="#fff" fontSize="12" fontWeight="700" fontFamily="sans-serif">
        HasTrans
      </text>
      <circle cx="70" cy="122" r="17" fill="#1e293b" />
      <circle cx="70" cy="122" r="7" fill="#cbd5e1" />
      <circle cx="248" cy="122" r="17" fill="#1e293b" />
      <circle cx="248" cy="122" r="7" fill="#cbd5e1" />
    </svg>
  );
}
