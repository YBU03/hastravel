import Link from "next/link";
import { city } from "@/lib/cities";
import { dashboard } from "@/lib/data";
import { addDays, formatDate, isValidDate, rupiah, todayWita } from "@/lib/format";
import { TOTAL_SEATS } from "@/lib/seats";

export default async function AdminDashboard({ searchParams }: { searchParams: Promise<{ date?: string }> }) {
  const sp = await searchParams;
  const date = isValidDate(sp.date) ? sp.date : todayWita();
  const trips = await dashboard(date);
  const totals = trips.reduce(
    (a, t) => ({
      paid: a.paid + t.paidSeats,
      pending: a.pending + t.pendingSeats,
      revenue: a.revenue + t.revenue,
      bookings: a.bookings + t.bookings,
    }),
    { paid: 0, pending: 0, revenue: 0, bookings: 0 },
  );

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Keberangkatan</h1>
          <p className="text-sm text-slate-500">{formatDate(date)}</p>
        </div>
        <form className="flex items-center gap-2">
          <Link href={`/hastrans/admin?date=${addDays(date, -1)}`} className="rounded-lg bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200">
            ←
          </Link>
          <input type="date" name="date" defaultValue={date} className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
          <button className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white">Lihat</button>
          <Link href={`/hastrans/admin?date=${addDays(date, 1)}`} className="rounded-lg bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200">
            →
          </Link>
        </form>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Pesanan aktif" value={String(totals.bookings)} />
        <Stat label="Kursi lunas" value={String(totals.paid)} />
        <Stat label="Kursi belum bayar" value={String(totals.pending)} tone="amber" />
        <Stat label="Pendapatan (lunas)" value={rupiah(totals.revenue)} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {trips.map((t) => {
          const from = city(t.route.origin);
          const q = `schedule=${t.schedule.id}&date=${date}`;
          return (
            <div key={t.schedule.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-bold text-slate-900">
                    {from.name} → {city(t.route.destination).name}
                  </div>
                  <div className="text-sm text-slate-500">
                    {t.schedule.depart_time} {from.tzLabel}
                    {!t.schedule.active && " · jadwal nonaktif"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-brand-700">
                    {t.paidSeats + t.pendingSeats}
                    <span className="text-sm font-medium text-slate-400">/{TOTAL_SEATS}</span>
                  </div>
                  <div className="text-xs text-slate-500">kursi terisi</div>
                </div>
              </div>
              <div className="mt-3 flex h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div className="bg-brand-600" style={{ width: `${(t.paidSeats / TOTAL_SEATS) * 100}%` }} />
                <div className="bg-amber-400" style={{ width: `${(t.pendingSeats / TOTAL_SEATS) * 100}%` }} />
              </div>
              <div className="mt-2 flex flex-wrap gap-x-4 text-xs text-slate-500">
                <span>Lunas: {t.paidSeats}</span>
                <span>Belum bayar: {t.pendingSeats}</span>
                <span>Kosong: {t.seatsLeft}</span>
                <span>{rupiah(t.revenue)}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                <Link href={`/hastrans/admin/pesanan?${q}`} className="rounded-lg bg-brand-50 px-3 py-1.5 font-medium text-brand-700 hover:bg-brand-100">
                  Pesanan ({t.bookings})
                </Link>
                <Link href={`/hastrans/admin/manifest?${q}`} className="rounded-lg bg-brand-50 px-3 py-1.5 font-medium text-brand-700 hover:bg-brand-100">
                  Manifest
                </Link>
                <Link href={`/hastrans/admin/pesanan/baru?${q}`} className="rounded-lg bg-brand-50 px-3 py-1.5 font-medium text-brand-700 hover:bg-brand-100">
                  + Pesanan manual
                </Link>
              </div>
            </div>
          );
        })}
        {trips.length === 0 && <p className="text-slate-500">Tidak ada jadwal aktif.</p>}
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "amber" }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <div className="text-xs text-slate-500">{label}</div>
      <div className={`mt-1 text-xl font-extrabold ${tone === "amber" ? "text-amber-600" : "text-slate-900"}`}>{value}</div>
    </div>
  );
}
