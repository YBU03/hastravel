import Link from "next/link";

/** Tombol kecil di setiap demo untuk kembali ke galeri portfolio. */
export function PortfolioBadge({ className = "bottom-4" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`fixed left-4 z-50 hidden items-center gap-1.5 rounded-full bg-black/80 px-3 py-1.5 text-xs font-semibold text-white shadow-lg ring-1 ring-white/15 backdrop-blur hover:bg-black md:flex ${className}`}
    >
      <span aria-hidden>←</span> Yubu Travel Portfolio
    </Link>
  );
}
