import Link from "next/link";
import { AdminNav } from "@/components/admin/AdminNav";
import { requireAdmin } from "@/lib/session";
import { logoutAction } from "../actions";

export const metadata = { title: "Admin - HasTrans" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="min-h-screen">
      <header className="no-print bg-gradient-to-r from-brand-700 to-brand-600">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/hastrans/admin" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-white.png" alt="HasTrans" className="h-8 w-auto" />
            <span className="rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">Admin</span>
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/hastrans" target="_blank" className="hidden text-white/85 hover:text-white sm:inline">
              Lihat website ↗
            </Link>
            <form action={logoutAction}>
              <button className="rounded-lg bg-white/15 px-3 py-1.5 text-white hover:bg-white/25">Keluar</button>
            </form>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-3">
          <AdminNav />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
