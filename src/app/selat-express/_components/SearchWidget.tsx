"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { addDays } from "@/lib/format";
import { destinationsFrom, ORIGINS, PORTS, type PortId } from "../data";

export const selatField =
  "h-12 w-full rounded-xl bg-white px-3.5 text-sm font-semibold text-selat-deep outline-none ring-1 ring-selat-deep/10 focus:ring-2 focus:ring-selat-teal";
export const selatLabel = "mb-1 block text-[11px] font-bold uppercase tracking-wider text-selat-deep/60";

export function SearchWidget({ initialTo }: { initialTo?: PortId }) {
  const router = useRouter();
  const [from, setFrom] = useState<PortId>("sanur");
  const [to, setTo] = useState<PortId>(initialTo ?? "penida");
  const [round, setRound] = useState(true);
  const [date, setDate] = useState("");
  const [back, setBack] = useState("");
  const [adult, setAdult] = useState(2);
  const [child, setChild] = useState(0);
  const [today, setToday] = useState("");

  useEffect(() => {
    const d = new Date();
    const t = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    setToday(t);
    setDate(addDays(t, 1));
    setBack(addDays(t, 2));
  }, []);

  const dests = destinationsFrom(from);

  function changeFrom(v: PortId) {
    setFrom(v);
    const d = destinationsFrom(v);
    if (!d.includes(to)) setTo(d[0]);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams({ from, to, date, adult: String(adult), child: String(child) });
    if (round) q.set("back", back);
    router.push(`/selat-express/jadwal?${q}`);
  }

  const counter = (label: string, value: number, set: (n: number) => void, min: number) => (
    <div>
      <span className={selatLabel}>{label}</span>
      <div className={`${selatField} flex items-center justify-between px-2`}>
        <button type="button" onClick={() => set(Math.max(min, value - 1))} className="h-8 w-8 rounded-lg bg-selat-foam text-lg" aria-label={`Kurangi ${label}`}>
          −
        </button>
        <span className="font-display">{value}</span>
        <button type="button" onClick={() => set(Math.min(20, value + 1))} className="h-8 w-8 rounded-lg bg-selat-foam text-lg" aria-label={`Tambah ${label}`}>
          +
        </button>
      </div>
    </div>
  );

  return (
    <form onSubmit={submit} className="rounded-3xl bg-white/85 p-5 shadow-2xl shadow-selat-deep/20 ring-1 ring-white backdrop-blur-xl">
      <div className="mb-4 inline-flex rounded-full bg-selat-foam p-1">
        {[
          [false, "Sekali jalan"],
          [true, "Pulang-pergi"],
        ].map(([v, l]) => (
          <button
            key={String(v)}
            type="button"
            onClick={() => setRound(v as boolean)}
            className={`rounded-full px-4 py-1.5 text-sm font-bold ${round === v ? "bg-selat-deep text-white" : "text-selat-deep/70"}`}
          >
            {l as string}
          </button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_0.8fr_0.8fr_auto] lg:items-end">
        <label>
          <span className={selatLabel}>Dari</span>
          <select value={from} onChange={(e) => changeFrom(e.target.value as PortId)} className={selatField}>
            {ORIGINS.map((p) => (
              <option key={p} value={p}>
                {PORTS[p].name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className={selatLabel}>Ke</span>
          <select value={to} onChange={(e) => setTo(e.target.value as PortId)} className={selatField}>
            {dests.map((p) => (
              <option key={p} value={p}>
                {PORTS[p].name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className={selatLabel}>Berangkat</span>
          <input
            type="date"
            required
            min={today}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              if (back < e.target.value) setBack(e.target.value);
            }}
            className={selatField}
          />
        </label>
        <label className={round ? "" : "opacity-40"}>
          <span className={selatLabel}>Pulang</span>
          <input type="date" disabled={!round} required={round} min={date} value={back} onChange={(e) => setBack(e.target.value)} className={selatField} />
        </label>
        {counter("Dewasa", adult, setAdult, 1)}
        {counter("Anak", child, setChild, 0)}
        <button type="submit" className="h-12 rounded-xl bg-selat-coral px-6 font-display font-bold text-white shadow-lg shadow-selat-coral/30 hover:bg-selat-deep sm:col-span-2 lg:col-span-1">
          Cari Kapal
        </button>
      </div>
    </form>
  );
}
