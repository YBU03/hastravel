"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHome, IconTicket, IconWhatsapp } from "./icons";

export function BottomNav({ waHref }: { waHref: string }) {
  const path = usePathname();
  // Halaman pesan punya tombol lanjut sendiri di bawah layar.
  if (path.startsWith("/pesan") && !path.startsWith("/pesanan")) return null;
  const item = (active: boolean) =>
    `flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-medium ${active ? "text-brand-600" : "text-slate-500"}`;
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <Link href="/" className={item(path === "/")}>
        <IconHome /> Beranda
      </Link>
      <Link href="/cek-pesanan" className={item(path.startsWith("/cek-pesanan") || path.startsWith("/pesanan"))}>
        <IconTicket /> Pesanan
      </Link>
      <a href={waHref} target="_blank" rel="noopener noreferrer" className={item(false)}>
        <IconWhatsapp /> Chat
      </a>
    </nav>
  );
}
