"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AIRPORTS, MAX_PAX, SHARED_TIMES, type Direction } from "../data";

export const sayapField =
  "flex h-12 w-full items-center rounded-xl bg-white/[0.06] px-3.5 text-sm font-medium text-white ring-1 ring-inset ring-white/10 outline-none transition focus-within:ring-sayap-lime/70 focus:ring-sayap-lime/70";
export const sayapLabel = "mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-400";

export function localToday() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function BookingWidget() {
  const router = useRouter();
  const [dir, setDir] = useState<Direction>("from");
  const [airport, setAirport] = useState(AIRPORTS[0].code);
  const zones = AIRPORTS.find((a) => a.code === airport)!.zones;
  const [zone, setZone] = useState(zones[0].id);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [pax, setPax] = useState(1);
  const [today, setToday] = useState("");

  useEffect(() => {
    const t = localToday();
    setToday(t);
    setDate(t);
  }, []);

  function changeAirport(code: string) {
    setAirport(code);
    setZone(AIRPORTS.find((a) => a.code === code)!.zones[0].id);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams({ dir, airport, zone, date, time, pax: String(pax) });
    router.push(`/sayap-shuttle/pesan?${q}`);
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl bg-sayap-navy/70 p-4 shadow-2xl shadow-black/40 ring-1 ring-white/10 backdrop-blur-xl md:p-5"
    >
      <div className="mb-4 inline-flex rounded-full bg-white/[0.06] p-1 ring-1 ring-white/10">
        {(
          [
            ["from", "Dari Bandara"],
            ["to", "Ke Bandara"],
          ] as const
        ).map(([v, label]) => (
          <button
            key={v}
            type="button"
            onClick={() => setDir(v)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              dir === v ? "bg-sayap-lime text-sayap-navy" : "text-slate-300 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.1fr_1.3fr_1fr_0.8fr_0.8fr_auto] lg:items-end">
        <label>
          <span className={sayapLabel}>Bandara</span>
          <select value={airport} onChange={(e) => changeAirport(e.target.value)} className={sayapField}>
            {AIRPORTS.map((a) => (
              <option key={a.code} value={a.code} className="bg-sayap-navy">
                {a.code} · {a.city}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className={sayapLabel}>{dir === "from" ? "Tujuan (zona)" : "Jemput dari (zona)"}</span>
          <select value={zone} onChange={(e) => setZone(e.target.value)} className={sayapField}>
            {zones.map((z) => (
              <option key={z.id} value={z.id} className="bg-sayap-navy">
                {z.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className={sayapLabel}>Tanggal</span>
          <input
            type="date"
            required
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`${sayapField} [color-scheme:dark]`}
          />
        </label>
        <label>
          <span className={sayapLabel}>{dir === "from" ? "Jam mendarat" : "Jam jemput"}</span>
          <select value={time} onChange={(e) => setTime(e.target.value)} className={sayapField}>
            {SHARED_TIMES.map((t) => (
              <option key={t} value={t} className="bg-sayap-navy">
                {t}
              </option>
            ))}
          </select>
        </label>
        <div>
          <span className={sayapLabel}>Penumpang</span>
          <div className={`${sayapField} justify-between px-2`}>
            <button
              type="button"
              aria-label="Kurangi penumpang"
              onClick={() => setPax((p) => Math.max(1, p - 1))}
              className="h-8 w-8 rounded-lg bg-white/10 text-lg leading-none hover:bg-white/20"
            >
              −
            </button>
            <span className="font-display text-base font-bold">{pax}</span>
            <button
              type="button"
              aria-label="Tambah penumpang"
              onClick={() => setPax((p) => Math.min(MAX_PAX, p + 1))}
              className="h-8 w-8 rounded-lg bg-white/10 text-lg leading-none hover:bg-white/20"
            >
              +
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="h-12 rounded-xl bg-sayap-lime px-6 font-display font-bold text-sayap-navy shadow-[0_0_30px_rgba(198,244,50,0.35)] transition hover:bg-white sm:col-span-2 lg:col-span-1"
        >
          Cek Harga →
        </button>
      </div>
    </form>
  );
}
