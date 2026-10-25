import Link from "next/link";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { IconWhatsapp } from "@/components/icons";
import { StatusBadge } from "@/components/StatusBadge";
import { city } from "@/lib/cities";
import { allowedTransitions, listBookings, listRoutes, STATUS_LABEL, type BookingStatus } from "@/lib/data";
import { formatDate, formatDateTime, isValidDate, rupiah } from "@/lib/format";
import { siteUrl } from "@/lib/site";
import { customerMessage, waLink } from "@/lib/wa";
import { setStatusAction } from "../../actions";

type SP = Promise<Record<string, string | undefined>>;

const ACTION_LABEL: Record<BookingStatus, string> = {
  paid: "Tandai Lunas",
  done: "Selesai",
  pending: "Belum Bayar",
  cancelled: "Batalkan",
  expired: "",
};

export default async function AdminBookingsPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const filter = {
    date: isValidDate(sp.date) ? sp.date : undefined,
    routeId: Number(sp.route) || undefined,
    scheduleId: Number(sp.schedule) || undefined,
    status: sp.status ?? "",
    q: sp.q?.trim() || undefined,
  };
  const [bookings, routes, url] = await Promise.all([listBookings(filter), listRoutes(), siteUrl()]);
  const sel = "rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm";

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900">Pesanan</h1>
      <form className="mt-4 flex flex-wrap gap-2">
        <input name="q" defaultValue={filter.q} placeholder="Cari kode / nama / HP" className={`${sel} min-w-48 flex-1`} />
        <input type="date" name="date" defaultValue={filter.date} className={sel} />
        <select name="route" defaultValue={sp.route ?? ""} className={sel}>
          <option value="">Semua rute</option>
          {routes.map((r) => (
            <option key={r.id} value={r.id}>
              {city(r.origin).name} → {city(r.destination).name}
            </option>
          ))}
        </select>
        <select name="status" defaultValue={filter.status} className={sel}>
          <option value="">Semua status</option>
          <option value="active">Aktif (belum bayar + lunas + selesai)</option>
          {Object.entries(STATUS_LABEL).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
        {filter.scheduleId && <input type="hidden" name="schedule" value={filter.scheduleId} />}
        <button className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Filter</button>
        <Link href="/admin/pesanan" className="rounded-lg px-3 py-2 text-sm text-slate-500 hover:text-slate-800">
          Reset
        </Link>
      </form>

      <p className="mt-4 text-sm text-slate-500">{bookings.length} pesanan</p>
      <div className="mt-2 grid gap-3">
        {bookings.map((b) => {
          const from = city(b.origin);
          return (
            <div key={b.id} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 md:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-900">{b.code}</span>
                  <StatusBadge status={b.status} />
                  {b.source === "admin" && <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">manual</span>}
                </div>
                <span className="text-xs text-slate-400">{formatDateTime(b.created_at)}</span>
              </div>
              <div className="mt-3 grid gap-x-6 gap-y-3 text-sm md:grid-cols-3">
                <div>
                  <div className="text-xs text-slate-500">Perjalanan</div>
                  <div className="font-semibold">
                    {from.name} → {city(b.destination).name}
                  </div>
                  <div>
                    {formatDate(b.travel_date)} · {b.depart_time} {from.tzLabel}
                  </div>
                  <div className="mt-1">
                    Kursi <b>{b.seats.join(", ")}</b> · {rupiah(b.price_per_seat)} × {b.seats.length} ={" "}
                    <b className="text-brand-700">{rupiah(b.total)}</b>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Pemesan</div>
                  <div className="font-semibold">{b.customer_name}</div>
                  <a
                    href={waLink(b.phone, customerMessage(b, url))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-green-700 hover:underline"
                  >
                    <IconWhatsapp width={14} height={14} /> {b.phone}
                  </a>
                  <div className="mt-1 text-xs text-slate-500">
                    {b.passengers.map((p) => `${p.seat}: ${p.name}`).join(" · ")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Jemput → Antar</div>
                  <div className="whitespace-pre-line">{b.pickup_address}</div>
                  <div className="text-slate-400">↓</div>
                  <div className="whitespace-pre-line">{b.dropoff_address}</div>
                  {b.notes && <div className="mt-1 text-xs italic text-slate-500">Catatan: {b.notes}</div>}
                </div>
              </div>
              {allowedTransitions(b.status).length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
                  {allowedTransitions(b.status).map((s) => (
                    <form key={s} action={setStatusAction}>
                      <input type="hidden" name="id" value={b.id} />
                      <input type="hidden" name="status" value={s} />
                      {s === "cancelled" ? (
                        <ConfirmButton
                          message={`Batalkan pesanan ${b.code}? Kursi akan dilepas.`}
                          className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 ring-1 ring-red-200 hover:bg-red-50"
                        >
                          {ACTION_LABEL[s]}
                        </ConfirmButton>
                      ) : (
                        <button
                          className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                            s === "paid" || s === "done"
                              ? "bg-brand-600 text-white hover:bg-brand-700"
                              : "text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          {ACTION_LABEL[s]}
                        </button>
                      )}
                    </form>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        {bookings.length === 0 && <p className="rounded-2xl bg-white p-6 text-center text-slate-500">Belum ada pesanan.</p>}
      </div>
    </div>
  );
}
