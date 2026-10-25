import Link from "next/link";
import { IconArrowRight, IconChevronLeft, IconChevronRight, IconClock, IconSeat } from "@/components/icons";
import { SearchForm } from "@/components/SearchForm";
import { BlueBand, SiteHeader } from "@/components/SiteHeader";
import { CITIES, city, isCity } from "@/lib/cities";
import { getSettings, listRoutes, searchTrips } from "@/lib/data";
import { addDays, formatDate, formatDuration, isValidDate, rupiah, shortDay, todayWita } from "@/lib/format";
import { MAX_SEATS_PER_BOOKING } from "@/lib/seats";

const cityNames = Object.fromEntries(Object.values(CITIES).map((c) => [c.key, c.name]));

type SP = Promise<Record<string, string | undefined>>;

export default async function SearchPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const today = todayWita();
  const [routes, settings] = await Promise.all([listRoutes({ activeOnly: true }), getSettings()]);
  const from = isCity(sp.from) ? sp.from : (routes[0]?.origin ?? "denpasar");
  const to = isCity(sp.to) ? sp.to : (routes.find((r) => r.origin === from)?.destination ?? "surabaya");
  const date = isValidDate(sp.date) && sp.date >= today ? sp.date : today;
  const pax = Math.min(MAX_SEATS_PER_BOOKING, Math.max(1, Number(sp.pax) || 1));
  const trips = await searchTrips(from, to, date);

  const qs = (d: string) => `/hastrans/cari?from=${from}&to=${to}&date=${d}&pax=${pax}`;
  const start = addDays(date, -2) < today ? today : addDays(date, -2);
  const days = Array.from({ length: 5 }, (_, i) => addDays(start, i));

  return (
    <>
      <BlueBand className="pb-6">
        <SiteHeader waNumber={settings.wa_number} />
        <div className="mx-auto max-w-6xl px-4 pt-2">
          <details className="group rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 open:bg-white/5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-white">
              <div>
                <div className="flex items-center gap-2 text-lg font-bold">
                  {city(from).name} <IconArrowRight width={18} height={18} /> {city(to).name}
                </div>
                <div className="text-sm text-white/80">
                  {formatDate(date)} · {pax} penumpang
                </div>
              </div>
              <span className="rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-brand-700 group-open:hidden">
                Ubah
              </span>
            </summary>
            <div className="mt-4">
              <SearchForm routes={routes} cityNames={cityNames} minDate={today} defaults={{ from, to, date, pax }} />
            </div>
          </details>
        </div>
      </BlueBand>

      <div className="mx-auto max-w-3xl px-4">
        {/* Strip tanggal */}
        <div className="mt-5 flex items-center gap-2">
          <Link
            href={qs(addDays(date, -1))}
            aria-label="Hari sebelumnya"
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-100 ${
              date <= today ? "pointer-events-none opacity-40" : ""
            }`}
          >
            <IconChevronLeft />
          </Link>
          <div className="grid flex-1 grid-cols-5 gap-2">
            {days.map((d) => {
              const s = shortDay(d);
              const active = d === date;
              return (
                <Link
                  key={d}
                  href={qs(d)}
                  className={`rounded-xl px-1 py-2 text-center text-xs shadow-sm ring-1 ${
                    active ? "bg-brand-600 text-white ring-brand-600" : "bg-white text-slate-600 ring-slate-100 hover:ring-brand-200"
                  }`}
                >
                  <div className="font-medium">{s.day}</div>
                  <div className="font-bold">{s.date}</div>
                </Link>
              );
            })}
          </div>
          <Link
            href={qs(addDays(date, 1))}
            aria-label="Hari berikutnya"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-100"
          >
            <IconChevronRight />
          </Link>
        </div>

        <h1 className="mt-6 text-lg font-bold text-slate-900">Jadwal Keberangkatan</h1>
        <div className="mt-3 grid gap-3">
          {trips.length === 0 && (
            <p className="rounded-2xl bg-white p-6 text-center text-slate-500 shadow-sm">
              Tidak ada jadwal untuk rute ini. Coba rute atau tanggal lain.
            </p>
          )}
          {trips.map((t) => {
            const enough = t.seatsLeft >= pax;
            const available = !t.departed && enough;
            const fromC = city(t.route.origin);
            const toC = city(t.route.destination);
            return (
              <div
                key={t.schedule.id}
                className={`rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 ${available ? "" : "opacity-60"}`}
              >
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-2xl font-extrabold text-slate-900">{t.schedule.depart_time}</div>
                    <div className="text-xs text-slate-500">
                      {fromC.tzLabel} · {fromC.name}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col items-center text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <IconClock width={12} height={12} /> {formatDuration(t.route.duration_min)}
                    </span>
                    <span className="mt-1 h-px w-full border-t-2 border-dashed border-slate-200" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold text-slate-900">
                      {t.arrival.time}
                      {t.arrival.dayOffset > 0 && <sup className="text-[10px] text-brand-600">+{t.arrival.dayOffset}</sup>}
                    </div>
                    <div className="text-xs text-slate-500">
                      {toC.tzLabel} · {toC.name}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-dashed border-slate-200 pt-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      ELF · <IconSeat width={14} height={14} />
                      <span className={t.seatsLeft <= 5 ? "font-semibold text-orange-600" : ""}>
                        {t.departed ? "Sudah berangkat" : t.seatsLeft === 0 ? "Penuh" : `Sisa ${t.seatsLeft} kursi`}
                      </span>
                    </div>
                    <div className="text-lg font-extrabold text-brand-700">
                      {rupiah(t.route.price)}
                      <span className="text-xs font-normal text-slate-500"> /kursi</span>
                    </div>
                  </div>
                  {available ? (
                    <Link
                      href={`/hastrans/pesan?schedule=${t.schedule.id}&date=${date}&pax=${pax}`}
                      className="rounded-xl bg-brand-600 px-5 py-2.5 font-semibold text-white shadow-md shadow-brand-600/20 hover:bg-brand-700"
                    >
                      Pilih Kursi
                    </Link>
                  ) : (
                    <span className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-500">
                      {t.departed ? "Tutup" : `Sisa ${t.seatsLeft} kursi`}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
