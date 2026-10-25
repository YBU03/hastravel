import Link from "next/link";
import type { Settings } from "@/lib/data";
import { waLink } from "@/lib/wa";
import { IconMail, IconPin, IconWhatsapp } from "./icons";

export function SiteFooter({ settings }: { settings: Settings }) {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white pb-24 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="HasTrans" className="h-12 w-auto" />
          <p className="mt-3 text-sm text-slate-500">
            Travel antar kota dengan ELF ber-AC. Jemput & antar sampai alamat tujuan.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">Hubungi Kami</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>
              <a href={waLink(settings.wa_number)} target="_blank" rel="noopener noreferrer" className="flex gap-2 hover:text-brand-600">
                <IconWhatsapp className="mt-0.5 shrink-0 text-[#25D366]" width={16} height={16} />
                <span>
                  WhatsApp
                  <br />+{settings.wa_number}
                </span>
              </a>
            </li>
            {settings.email && (
              <li className="flex gap-2">
                <IconMail className="mt-0.5 shrink-0" width={16} height={16} />
                <a href={`mailto:${settings.email}`} className="hover:text-brand-600">
                  {settings.email}
                </a>
              </li>
            )}
            {settings.address && (
              <li className="flex gap-2">
                <IconPin className="mt-0.5 shrink-0" width={16} height={16} />
                <span>{settings.address}</span>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">Rute</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>Denpasar ⇄ Surabaya</li>
            <li>Denpasar ⇄ Jember</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">Layanan</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>
              <Link href="/hastrans" className="hover:text-brand-600">
                Pesan Tiket
              </Link>
            </li>
            <li>
              <Link href="/hastrans/cek-pesanan" className="hover:text-brand-600">
                Cek Pesanan
              </Link>
            </li>
            <li>
              <Link href="/hastrans#cara-pesan" className="hover:text-brand-600">
                Cara Pesan
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-100 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} HasTrans. Travel Antar Kota. · Website oleh{" "}
        <Link href="/" className="text-brand-600 hover:underline">
          Yubu Travel Portfolio
        </Link>
      </div>
    </footer>
  );
}
