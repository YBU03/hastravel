import { city } from "@/lib/cities";
import type { listSchedules } from "@/lib/data";

/** Form GET untuk memilih jadwal + tanggal (dipakai di pesanan manual & manifest). */
export function TripPicker({
  schedules,
  scheduleId,
  date,
  submitLabel,
}: {
  schedules: Awaited<ReturnType<typeof listSchedules>>;
  scheduleId?: number;
  date: string;
  submitLabel: string;
}) {
  const sel = "rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm";
  return (
    <form className="no-print flex flex-wrap gap-2">
      <select name="schedule" defaultValue={scheduleId ?? ""} required className={`${sel} flex-1`}>
        <option value="" disabled>
          Pilih jadwal
        </option>
        {schedules.map((s) => (
          <option key={s.id} value={s.id}>
            {city(s.origin).name} → {city(s.destination).name} · {s.depart_time} {city(s.origin).tzLabel}
            {s.active ? "" : " (nonaktif)"}
          </option>
        ))}
      </select>
      <input type="date" name="date" defaultValue={date} required className={sel} />
      <button className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">{submitLabel}</button>
    </form>
  );
}
