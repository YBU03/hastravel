"use client";

import { useEffect, useState } from "react";
import { addDays, formatDate, formatDuration, rupiah } from "@/lib/format";
import { selatField, selatLabel } from "../_components/SearchWidget";
import { ADDONS, findRoute, PORTS, ROUTES, seatsLeft, SELAT_WA, type PortId, type Route } from "../data";

function TripPicker({
  title,
  route,
  date,
  value,
  pax,
  onChange,
}: {
  title: string;
  route: Route;
  date: string;
  value: string;
  pax: number;
  onChange: (t: string) => void;
}) {
  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-xl font-bold">
          {title}: {PORTS[route.from].name} → {PORTS[route.to].name}
        </h2>
        <span className="text-sm text-selat-deep/60">{date ? formatDate(date) : "-"}</span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {route.times.map((t) => {
          const seats = date ? seatsLeft(route, date, t) : 0;
          const ok = seats >= pax;
          const active = value === t;
          const [h, m] = t.split(":").map(Number);
          const arr = h * 60 + m + route.minutes;
          return (
            <button
              key={t}
              type="button"
              disabled={!ok}
              onClick={() => onChange(t)}
              aria-pressed={active}
              className={`flex items-center justify-between rounded-2xl border-2 p-4 text-left transition ${
                active ? "border-selat-teal bg-selat-foam" : ok ? "border-selat-deep/10 hover:border-selat-aqua" : "cursor-not-allowed border-dashed border-selat-deep/10 opacity-50"
              }`}
            >
              <div>
                <div className="font-display text-2xl font-bold">
                  {t} <span className="text-base font-normal text-selat-deep/40">→</span>{" "}
                  <span className="text-lg">
                    {String(Math.floor(arr / 60) % 24).padStart(2, "0")}:{String(arr % 60).padStart(2, "0")}
                  </span>
                </div>
                <div className="text-xs text-selat-deep/60">
                  {route.boat} · {formatDuration(route.minutes)}
                </div>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${seats === 0 ? "bg-red-100 text-red-600" : seats < 10 ? "bg-selat-coral/15 text-selat-coral" : "bg-selat-foam text-selat-sea"}`}>
                {seats === 0 ? "Penuh" : `${seats} kursi`}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export function BookingFlow({ initial }: { initial: Record<string, string | undefined> }) {
  const start = findRoute(initial.from, initial.to) ?? ROUTES[0];
  const [from, setFrom] = useState<PortId>(start.from);
  const [to, setTo] = useState<PortId>(start.to);
  const route = findRoute(from, to) ?? ROUTES[0];
  const backRoute = findRoute(to, from)!;
  const [date, setDate] = useState(initial.date ?? "");
  const [round, setRound] = useState(!!initial.back);
  const [back, setBack] = useState(initial.back ?? "");
  const [adult, setAdult] = useState(Math.max(1, Number(initial.adult) || 2));
  const [child, setChild] = useState(Math.max(0, Number(initial.child) || 0));
  const [goTime, setGoTime] = useState("");
  const [backTime, setBackTime] = useState("");
  const [addons, setAddons] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [done, setDone] = useState<string | null>(null);
  const [today, setToday] = useState("");

  useEffect(() => {
    const d = new Date();
    const t = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    setToday(t);
    setDate((x) => (x && x >= t ? x : addDays(t, 1)));
    setBack((x) => (x && x >= t ? x : addDays(t, 2)));
  }, []);

  const pax = adult + child;
  const legs = round ? 2 : 1;
  const tickets = (route.adult * adult + route.child * child) * legs;
  const addonLines = ADDONS.filter((a) => addons.includes(a.id)).map((a) => ({
    name: a.name,
    cost: "perPax" in a ? a.perPax * pax : a.perBooking,
  }));
  const total = tickets + addonLines.reduce((s, a) => s + a.cost, 0);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!goTime || (round && !backTime)) return setError("Pilih jam keberangkatan" + (round ? " pergi dan pulang." : "."));
    setError("");
    const fd = new FormData(e.currentTarget);
    const text = [
      "Halo Selat Express, saya mau pesan tiket fast boat 🚤",
      "",
      `Pergi: ${PORTS[from].name} → ${PORTS[to].name}, ${formatDate(date)} jam ${goTime}`,
      round ? `Pulang: ${PORTS[to].name} → ${PORTS[from].name}, ${formatDate(back)} jam ${backTime}` : "",
      `Penumpang: ${adult} dewasa${child ? `, ${child} anak` : ""}`,
      addonLines.length ? `Tambahan: ${addonLines.map((a) => a.name).join("; ")}` : "",
      "",
      `Nama: ${fd.get("name")}`,
      `WhatsApp: ${fd.get("phone")}`,
      `Negara/kota: ${fd.get("origin")}`,
      "",
      `*Total: ${rupiah(total)}*`,
    ].filter(Boolean);
    const wa = `https://wa.me/${SELAT_WA}?text=${encodeURIComponent(text.join("\n"))}`;
    setDone(wa);
    window.open(wa, "_blank", "noopener");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (done) {
    return (
      <div className="mx-auto mt-8 max-w-lg rounded-[2rem] bg-white p-8 text-center shadow-xl">
        <div className="text-6xl">🚤</div>
        <h1 className="mt-3 font-display text-3xl font-bold">Tiket siap dipesan!</h1>
        <p className="mt-2 text-selat-deep/70">CS kami akan mengirim e-tiket & info pembayaran via WhatsApp.</p>
        <a href={done} target="_blank" rel="noopener noreferrer" className="mt-6 block rounded-full bg-[#25D366] py-3.5 font-bold text-white">
          Buka WhatsApp
        </a>
        <button type="button" onClick={() => setDone(null)} className="mt-3 text-sm font-semibold underline">
          Ubah pesanan
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
      <div className="grid gap-6">
        {/* Ringkasan pencarian (bisa diubah) */}
        <section className="rounded-3xl bg-selat-deep p-5 text-white md:p-6">
          <h1 className="font-display text-2xl font-bold">Pilih kapal</h1>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <label>
              <span className={`${selatLabel} text-white/60`}>Rute</span>
              <select
                value={`${from}|${to}`}
                onChange={(e) => {
                  const [f, t] = e.target.value.split("|") as [PortId, PortId];
                  setFrom(f);
                  setTo(t);
                  setGoTime("");
                  setBackTime("");
                }}
                className={selatField}
              >
                {ROUTES.map((r) => (
                  <option key={r.from + r.to} value={`${r.from}|${r.to}`}>
                    {PORTS[r.from].name} → {PORTS[r.to].name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className={`${selatLabel} text-white/60`}>Berangkat</span>
              <input type="date" min={today} value={date} onChange={(e) => { setDate(e.target.value); setGoTime(""); }} className={selatField} />
            </label>
            <label>
              <span className={`${selatLabel} flex items-center gap-2 text-white/60`}>
                <input type="checkbox" checked={round} onChange={(e) => setRound(e.target.checked)} className="accent-[#00a6b4]" /> Pulang
              </span>
              <input type="date" disabled={!round} min={date} value={back} onChange={(e) => { setBack(e.target.value); setBackTime(""); }} className={`${selatField} disabled:opacity-40`} />
            </label>
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-sm">
            {(
              [
                ["Dewasa", adult, setAdult, 1],
                ["Anak (2–11 th)", child, setChild, 0],
              ] as const
            ).map(([l, v, set, min]) => (
              <div key={l} className="flex items-center gap-2">
                <span className="text-white/70">{l}</span>
                <button type="button" onClick={() => set(Math.max(min, v - 1))} className="h-8 w-8 rounded-lg bg-white/15" aria-label={`Kurangi ${l}`}>
                  −
                </button>
                <span className="w-5 text-center font-display font-bold">{v}</span>
                <button type="button" onClick={() => set(Math.min(20, v + 1))} className="h-8 w-8 rounded-lg bg-white/15" aria-label={`Tambah ${l}`}>
                  +
                </button>
              </div>
            ))}
          </div>
        </section>

        <TripPicker title="Pergi" route={route} date={date} value={goTime} pax={pax} onChange={setGoTime} />
        {round && <TripPicker title="Pulang" route={backRoute} date={back} value={backTime} pax={pax} onChange={setBackTime} />}

        <section className="rounded-3xl bg-white p-5 shadow-sm md:p-6">
          <h2 className="font-display text-xl font-bold">Tambahan</h2>
          <div className="mt-4 grid gap-2">
            {ADDONS.map((a) => {
              const on = addons.includes(a.id);
              return (
                <label key={a.id} className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border-2 p-4 ${on ? "border-selat-teal bg-selat-foam" : "border-selat-deep/10"}`}>
                  <span className="flex items-center gap-3 text-sm font-semibold">
                    <input type="checkbox" checked={on} onChange={() => setAddons((c) => (on ? c.filter((x) => x !== a.id) : [...c, a.id]))} className="h-4 w-4 accent-[#00a6b4]" />
                    {a.name}
                  </span>
                  <span className="shrink-0 text-sm font-bold text-selat-teal">
                    {"perPax" in a ? `${rupiah(a.perPax)}/orang` : rupiah(a.perBooking)}
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-sm md:p-6">
          <h2 className="font-display text-xl font-bold">Data pemesan</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <input name="name" required placeholder="Nama lengkap" className={selatField} />
            <input name="phone" required type="tel" inputMode="tel" placeholder="WhatsApp" className={selatField} />
            <input name="origin" placeholder="Negara / kota asal" className={selatField} />
          </div>
        </section>
      </div>

      <aside className="lg:sticky lg:top-6">
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-selat-deep/10">
          <div className="bg-gradient-to-r from-selat-sea to-selat-teal px-6 py-4 text-white">
            <div className="text-xs font-bold uppercase tracking-wider text-white/70">Ringkasan tiket</div>
            <div className="font-display text-lg font-bold">
              {PORTS[from].name} {round ? "⇄" : "→"} {PORTS[to].name}
            </div>
          </div>
          <dl className="space-y-2 p-6 text-sm">
            <div className="flex justify-between">
              <dt className="text-selat-deep/60">Pergi</dt>
              <dd className="font-semibold">{goTime || "pilih jam"}</dd>
            </div>
            {round && (
              <div className="flex justify-between">
                <dt className="text-selat-deep/60">Pulang</dt>
                <dd className="font-semibold">{backTime || "pilih jam"}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-selat-deep/60">
                {adult} dewasa × {rupiah(route.adult)}
                {legs > 1 && " × 2"}
              </dt>
              <dd>{rupiah(route.adult * adult * legs)}</dd>
            </div>
            {child > 0 && (
              <div className="flex justify-between">
                <dt className="text-selat-deep/60">
                  {child} anak × {rupiah(route.child)}
                  {legs > 1 && " × 2"}
                </dt>
                <dd>{rupiah(route.child * child * legs)}</dd>
              </div>
            )}
            {addonLines.map((a) => (
              <div key={a.name} className="flex justify-between gap-3">
                <dt className="text-selat-deep/60">{a.name.split(" (")[0]}</dt>
                <dd>{rupiah(a.cost)}</dd>
              </div>
            ))}
            <div className="flex items-end justify-between border-t border-dashed border-selat-deep/20 pt-3">
              <dt className="font-bold">Total</dt>
              <dd className="font-display text-3xl font-bold text-selat-teal">{rupiah(total)}</dd>
            </div>
            {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-red-600">{error}</p>}
            <button type="submit" className="mt-3 hidden w-full rounded-full bg-selat-coral py-3.5 font-display font-bold text-white shadow-lg shadow-selat-coral/30 hover:bg-selat-deep lg:block">
              Pesan via WhatsApp
            </button>
          </dl>
        </div>
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 bg-white px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-[0_-8px_24px_rgba(6,59,76,0.12)] lg:hidden">
        <div className="min-w-0 flex-1">
          <div className="text-xs text-selat-deep/60">{pax} penumpang</div>
          <div className="font-display text-2xl font-bold text-selat-teal">{rupiah(total)}</div>
        </div>
        <button type="submit" className="rounded-full bg-selat-coral px-6 py-3 font-display font-bold text-white">
          Pesan
        </button>
      </div>
    </form>
  );
}
