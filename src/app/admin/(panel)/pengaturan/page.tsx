import { city } from "@/lib/cities";
import { getSettings, listRoutes, listSchedules } from "@/lib/data";
import { addScheduleAction, saveRouteAction, saveSettingsAction, toggleScheduleAction } from "../../actions";

const input = "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500";
const card = "rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100";

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const { saved } = await searchParams;
  const [settings, routes, schedules] = await Promise.all([getSettings(), listRoutes(), listSchedules()]);

  return (
    <div className="grid gap-6">
      <h1 className="text-xl font-bold text-slate-900">Pengaturan</h1>

      <section className={card}>
        <h2 className="font-bold text-slate-900">Rute & Harga</h2>
        <div className="mt-4 grid gap-3">
          {routes.map((r) => (
            <form key={r.id} action={saveRouteAction} className="grid items-end gap-3 rounded-xl bg-slate-50 p-3 sm:grid-cols-[1fr_9rem_7rem_auto_auto]">
              <input type="hidden" name="id" value={r.id} />
              <div className="font-semibold">
                {city(r.origin).name} → {city(r.destination).name}
              </div>
              <label className="grid gap-1 text-xs text-slate-500">
                Harga / kursi (Rp)
                <input name="price" type="number" min={1000} step={1000} defaultValue={r.price} className={input} />
              </label>
              <label className="grid gap-1 text-xs text-slate-500">
                Durasi (jam)
                <input name="duration_hours" type="number" min={1} step={0.5} defaultValue={r.duration_min / 60} className={input} />
              </label>
              <label className="flex items-center gap-2 pb-2 text-sm">
                <input type="checkbox" name="active" defaultChecked={r.active} /> Aktif
              </label>
              <button className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Simpan</button>
            </form>
          ))}
        </div>
      </section>

      <section className={card}>
        <h2 className="font-bold text-slate-900">Jadwal Keberangkatan</h2>
        <p className="text-sm text-slate-500">Jam mengikuti waktu kota asal (WITA untuk Denpasar, WIB untuk Surabaya/Jember).</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {routes.map((r) => (
            <div key={r.id} className="rounded-xl bg-slate-50 p-3">
              <div className="font-semibold">
                {city(r.origin).name} → {city(r.destination).name}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {schedules
                  .filter((s) => s.route_id === r.id)
                  .map((s) => (
                    <form key={s.id} action={toggleScheduleAction}>
                      <input type="hidden" name="id" value={s.id} />
                      <input type="hidden" name="active" value={String(!s.active)} />
                      <button
                        title={s.active ? "Klik untuk nonaktifkan" : "Klik untuk aktifkan"}
                        className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
                          s.active ? "bg-brand-600 text-white" : "bg-slate-200 text-slate-500 line-through"
                        }`}
                      >
                        {s.depart_time} {city(r.origin).tzLabel}
                      </button>
                    </form>
                  ))}
              </div>
              <form action={addScheduleAction} className="mt-3 flex gap-2">
                <input type="hidden" name="route_id" value={r.id} />
                <input type="time" name="depart_time" required className={`${input} w-32`} />
                <button className="rounded-lg px-3 py-2 text-sm font-medium text-brand-700 ring-1 ring-brand-200 hover:bg-brand-50">
                  + Tambah jam
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>

      <section className={card}>
        <h2 className="font-bold text-slate-900">Umum & Pembayaran</h2>
        {saved && <p className="mt-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">Pengaturan tersimpan.</p>}
        <form action={saveSettingsAction} className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1 text-sm font-medium">
            Nomor WhatsApp admin
            <input name="wa_number" defaultValue={settings.wa_number} required className={input} placeholder="6281234567890" />
            <span className="text-xs font-normal text-slate-500">Pesanan pelanggan dikirim ke nomor ini.</span>
          </label>
          <label className="grid gap-1 text-sm font-medium">
            Batas waktu bayar (menit)
            <input name="hold_minutes" type="number" min={5} max={1440} defaultValue={settings.hold_minutes} className={input} />
            <span className="text-xs font-normal text-slate-500">Lewat batas ini kursi dilepas otomatis.</span>
          </label>
          <label className="grid gap-1 text-sm font-medium sm:col-span-2">
            Rekening / info pembayaran
            <textarea name="bank_info" rows={3} defaultValue={settings.bank_info} className={input} />
          </label>
          <label className="grid gap-1 text-sm font-medium sm:col-span-2">
            Catatan pembayaran
            <textarea name="payment_note" rows={2} defaultValue={settings.payment_note} className={input} />
          </label>
          <label className="grid gap-1 text-sm font-medium">
            Alamat kantor
            <input name="address" defaultValue={settings.address} className={input} />
          </label>
          <label className="grid gap-1 text-sm font-medium">
            Email
            <input name="email" type="email" defaultValue={settings.email} className={input} />
          </label>
          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input type="checkbox" name="front_seats_open" defaultChecked={settings.front_seats_open} />
            Kursi depan (1 & 2, samping sopir) dijual online
          </label>
          <div className="sm:col-span-2">
            <button className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white">Simpan Pengaturan</button>
          </div>
        </form>
      </section>
    </div>
  );
}
