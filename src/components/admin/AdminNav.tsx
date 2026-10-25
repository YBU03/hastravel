"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/pesanan", label: "Pesanan" },
  { href: "/admin/pesanan/baru", label: "+ Pesanan Manual" },
  { href: "/admin/pengaturan", label: "Pengaturan" },
];

export function AdminNav() {
  const path = usePathname();
  // Pilih link dengan awalan terpanjang yang cocok, supaya "/admin/pesanan/baru" tidak ikut menyalakan "Pesanan".
  const current = LINKS.filter((l) => path === l.href || path.startsWith(l.href + "/"))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;
  const active = (href: string) => href === current;
  return (
    <nav className="no-print flex gap-1 overflow-x-auto">
      {LINKS.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium ${
            active(l.href) ? "bg-white text-brand-700" : "text-white/85 hover:bg-white/15"
          }`}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
