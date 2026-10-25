import Link from "next/link";
import { ElfIllustration } from "@/components/ElfIllustration";
import {
  IconArrowRight,
  IconClock,
  IconPin,
  IconSeat,
  IconShield,
  IconSnow,
  IconTicket,
  IconWallet,
  IconWhatsapp,
} from "@/components/icons";
import { SearchForm } from "@/components/SearchForm";
import { BlueBand, SiteHeader } from "@/components/SiteHeader";
import { CITIES, city } from "@/lib/cities";
import { getSettings, listRoutes } from "@/lib/data";
import { formatDuration, rupiah, todayWita } from "@/lib/format";
import { waLink } from "@/lib/wa";

const cityNames = Object.fromEntries(Object.values(CITIES).map((c) => [c.key, c.name]));

export default async function HomePage() {
  const [routes, settings] = await Promise.all([listRoutes({ activeOnly: true }), getSettings()]);
  const today = todayWita();
  const first = routes[0];

  return (
    <>
      <BlueBand className="pb-20">
        <SiteHeader waNumber={settings.wa_number} />
        <div className="mx-auto max-w-6xl px-4 pt-6 md:pt-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_22rem]">
            <div>
              <h1 className="text-2xl font-extrabold text-white md:text-4xl">Mau pergi ke mana hari ini?</h1>
              <p className="mt-2 text-sm text-white/80 md:text-base">
                Travel ELF antar kota · pilih kursi sendiri · dijemput & diantar sampai alamat.
              </p>
              <div className="mt-6">
                {first ? (
                  <SearchForm
                    routes={routes}
                    cityNames={cityNames}
                    minDate={today}
                    defaults={{ from: first.origin, to: first.destination, date: today, pax: 1 }}
                  />
                ) : (
                  <p className="rounded-xl bg-white/15 p-4 text-white">Belum ada rute aktif.</p>
                )}
              </div>
            </div>
            <ElfIllustration className="hidden w-full drop-shadow-xl lg:block" />
          </div>
        </div>
      </BlueBand>

      <div className="mx-auto max-w-6xl px-4">
        {/* Kartu melayang */}
        <div className="relative z-10 -mt-10 grid grid-cols-2 divide-x divide-slate-100 rounded-2xl bg-white p-4 shadow-lg shadow-slate-900/5">
          <Link href="/hastrans/cek-pesanan" className="flex items-center gap-3 pr-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <IconTicket />
            </span>
            <span>
              <span className="block text-xs text-slate-500">Sudah pesan?</span>
              <span className="text-sm font-semibold text-brand-700">Cek Pesanan</span>
            </span>
          </Link>
          <a
            href={waLink(settings.wa_number, "Halo HasTrans, saya mau tanya travel.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 pl-4"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#25D366]">
              <IconWhatsapp />
            </span>
            <span>
              <span className="block text-xs text-slate-500">Butuh bantuan?</span>
              <span className="text-sm font-semibold text-brand-700">Chat Admin</span>
            </span>
          </a>
        </div>

        {/* Rute */}
        <section id="rute" className="scroll-mt-4 pt-12">
          <h2 className="text-xl font-bold text-slate-900 md:text-2xl">Rute & Harga</h2>
          <p className="mt-1 text-sm text-slate-500">Harga per kursi, sudah termasuk jemput & antar.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {routes.map((r) => (
              <Link
                key={r.id}
                href={`/hastrans/cari?from=${r.origin}&to=${r.destination}&date=${today}&pax=1`}
                className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-brand-200"
              >
                <div className="flex items-center gap-2 text-base font-bold text-slate-900">
                  {city(r.origin).name}
                  <IconArrowRight width={16} height={16} className="text-brand-500" />
                  {city(r.destination).name}
                </div>
                <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                  <IconClock width={14} height={14} /> ± {formatDuration(r.duration_min)}
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <div className="text-xs text-slate-500">Mulai</div>
                    <div className="text-lg font-extrabold text-brand-700">{rupiah(r.price)}</div>
                  </div>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 group-hover:bg-brand-600 group-hover:text-white">
                    Pesan
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Keunggulan */}
        <section className="pt-12">
          <h2 className="text-xl font-bold text-slate-900 md:text-2xl">Kenapa HasTrans?</h2>
          <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { icon: IconSnow, title: "ELF Full AC", text: "Armada ELF bersih & nyaman, 19 kursi." },
              { icon: IconSeat, title: "Pilih Kursi Sendiri", text: "Lihat kursi kosong & pilih yang kamu suka." },
              { icon: IconPin, title: "Jemput & Antar", text: "Dijemput dan diantar sampai alamat tujuan." },
              { icon: IconWallet, title: "Bayar Mudah", text: "Transfer bank / QRIS, konfirmasi via WhatsApp." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <f.icon />
                </span>
                <h3 className="mt-3 font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Banner */}
        <section className="pt-12">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-950 via-brand-900 to-brand-600 px-6 py-10 md:px-12">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
            <div className="relative grid items-center gap-6 md:grid-cols-[1fr_18rem]">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-300">Denpasar · Surabaya · Jember</p>
                <h2 className="mt-3 text-2xl font-extrabold leading-tight text-white md:text-4xl">
                  Pulang kampung lebih tenang,
                  <br className="hidden md:block" /> kursi sudah pasti.
                </h2>
                <Link
                  href="#"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-brand-700 hover:bg-brand-50"
                >
                  Pesan Sekarang <IconArrowRight width={18} height={18} />
                </Link>
              </div>
              <ElfIllustration className="w-full" />
            </div>
          </div>
        </section>

        {/* Cara pesan */}
        <section id="cara-pesan" className="scroll-mt-4 pt-12">
          <h2 className="text-xl font-bold text-slate-900 md:text-2xl">Cara Pesan</h2>
          <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Cari jadwal", "Pilih kota asal, tujuan, tanggal & jumlah penumpang."],
              ["Pilih kursi", "Klik kursi yang masih kosong di denah ELF."],
              ["Isi data & pesan", "Isi nama, nomor HP, alamat jemput & antar, lalu kirim ke WhatsApp."],
              ["Bayar & berangkat", `Transfer sesuai total dalam ${settings.hold_minutes} menit, kirim bukti, tunggu dijemput.`],
            ].map(([title, text], i) => (
              <li key={title} className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <IconShield width={16} height={16} className="text-brand-600" /> Kursi dikunci untukmu selama{" "}
            {settings.hold_minutes} menit setelah pesan.
          </p>
        </section>
      </div>
    </>
  );
}
