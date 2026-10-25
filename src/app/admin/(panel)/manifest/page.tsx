import { PrintButton } from "@/components/admin/PrintButton";
import { TripPicker } from "@/components/admin/TripPicker";
import { SeatMap } from "@/components/SeatMap";
import { StatusBadge } from "@/components/StatusBadge";
import { city } from "@/lib/cities";
import { getTrip, listBookings, listSchedules } from "@/lib/data";
import { formatDate, isValidDate, rupiah, todayWita } from "@/lib/format";
import { TOTAL_SEATS } from "@/lib/seats";

type SP = Promise<Record<string, string | undefined>>;

export default async function ManifestPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const date = isValidDate(sp.date) ? sp.date : todayWita();
  const scheduleId = Number(sp.schedule) || undefined;
  const schedules = await listSchedules();
  const [trip, bookings] = scheduleId
    ? await Promise.all([getTrip(scheduleId, date), listBookings({ scheduleId, date, status: "active" })])
    : [null, []];

  const rows = bookings
    .flatMap((b) => b.passengers.map((p) => ({ ...p, b })))
    .sort((a, b) => a.seat - b.seat);
  const labels = Object.fromEntries(rows.map((r) => [r.seat, r.name.split(" ")[0]]));

  return (
    <div>
      <div className="no-print">
        <h1 className="text-xl font-bold text-slate-900">Manifest Penumpang</h1>
        <p className="mb-4 text-sm text-slate-500">Daftar penumpang per keberangkatan untuk sopir.</p>
        <TripPicker schedules={schedules} scheduleId={scheduleId} date={date} submitLabel="Tampilkan" />
      </div>
      {trip && (
        <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 print:p-0 print:shadow-none print:ring-0">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="HasTrans" className="hidden h-10 print:block" />
              <h2 className="text-lg font-bold">
                {city(trip.route.origin).name} → {city(trip.route.destination).name}
              </h2>
              <p className="text-sm text-slate-600">
                {formatDate(date)} · {trip.schedule.depart_time} {city(trip.route.origin).tzLabel} ·{" "}
                {rows.length}/{TOTAL_SEATS} penumpang
              </p>
            </div>
            <PrintButton />
          </div>
          <div className="mt-5 grid gap-6 lg:grid-cols-[16rem_1fr]">
            <div className="print:hidden">
              <SeatMap taken={[]} selected={rows.map((r) => r.seat)} labels={labels} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="py-2 pr-3">Kursi</th>
                    <th className="py-2 pr-3">Penumpang</th>
                    <th className="py-2 pr-3">Pemesan / HP</th>
                    <th className="py-2 pr-3">Jemput</th>
                    <th className="py-2 pr-3">Antar</th>
                    <th className="py-2 pr-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.seat} className="border-b border-slate-100 align-top">
                      <td className="py-2 pr-3 font-bold">{r.seat}</td>
                      <td className="py-2 pr-3">{r.name}</td>
                      <td className="py-2 pr-3">
                        {r.b.customer_name}
                        <br />
                        <span className="text-slate-500">{r.b.phone}</span>
                      </td>
                      <td className="max-w-48 whitespace-pre-line py-2 pr-3">{r.b.pickup_address}</td>
                      <td className="max-w-48 whitespace-pre-line py-2 pr-3">{r.b.dropoff_address}</td>
                      <td className="py-2 pr-3">
                        <StatusBadge status={r.b.status} />
                        {r.b.status === "pending" && (
                          <div className="mt-1 text-xs text-slate-500">{rupiah(r.b.price_per_seat)}</div>
                        )}
                      </td>
                    </tr>
                  ))}
                  {rows.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-slate-500">
                        Belum ada penumpang.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
