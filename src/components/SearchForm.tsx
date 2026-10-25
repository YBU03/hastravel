"use client";

import { useState } from "react";
import { MAX_SEATS_PER_BOOKING } from "@/lib/seats";
import { IconBus, IconCalendar, IconSearch, IconSwap, IconUser } from "./icons";

type Props = {
  routes: { origin: string; destination: string }[];
  cityNames: Record<string, string>;
  minDate: string;
  defaults: { from: string; to: string; date: string; pax: number };
};

const field =
  "flex h-12 items-center gap-3 rounded-xl bg-white/15 px-4 text-white ring-1 ring-inset ring-white/20 focus-within:bg-white/25 focus-within:ring-white/60";

export function SearchForm({ routes, cityNames, minDate, defaults }: Props) {
  const origins = [...new Set(routes.map((r) => r.origin))];
  const [from, setFrom] = useState(defaults.from);
  const [to, setTo] = useState(defaults.to);
  const [pax, setPax] = useState(defaults.pax);
  const destinations = routes.filter((r) => r.origin === from).map((r) => r.destination);

  function changeFrom(v: string) {
    setFrom(v);
    const dests = routes.filter((r) => r.origin === v).map((r) => r.destination);
    if (!dests.includes(to)) setTo(dests[0] ?? "");
  }

  const canSwap = routes.some((r) => r.origin === to && r.destination === from);

  return (
    <form action="/hastrans/cari" method="get" className="grid gap-3">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <label className={field}>
          <IconBus className="shrink-0 opacity-90" />
          <span className="sr-only">Keberangkatan</span>
          <select
            name="from"
            value={from}
            onChange={(e) => changeFrom(e.target.value)}
            className="w-full min-w-0 appearance-none bg-transparent text-sm font-medium outline-none sm:text-base"
          >
            {origins.map((c) => (
              <option key={c} value={c} className="text-slate-900">
                {cityNames[c]}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={() => {
            if (!canSwap) return;
            setFrom(to);
            setTo(from);
          }}
          disabled={!canSwap}
          aria-label="Tukar asal dan tujuan"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-brand-600 shadow transition hover:rotate-180 disabled:opacity-50"
        >
          <IconSwap width={18} height={18} />
        </button>
        <label className={field}>
          <IconBus className="shrink-0 opacity-90" />
          <span className="sr-only">Tujuan</span>
          <select
            name="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full min-w-0 appearance-none bg-transparent text-sm font-medium outline-none sm:text-base"
          >
            {destinations.map((c) => (
              <option key={c} value={c} className="text-slate-900">
                {cityNames[c]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid grid-cols-[1fr_auto] gap-2 sm:grid-cols-[1fr_auto_auto]">
        <label className={`${field} col-span-2 sm:col-span-1`}>
          <IconCalendar className="shrink-0 opacity-90" />
          <span className="sr-only">Tanggal berangkat</span>
          <input
            type="date"
            name="date"
            required
            min={minDate}
            defaultValue={defaults.date}
            className="w-full min-w-0 bg-transparent text-sm font-medium outline-none [color-scheme:dark] sm:text-base"
          />
        </label>
        <div className={`${field} gap-2 px-3`}>
          <IconUser className="shrink-0 opacity-90" width={18} height={18} />
          <button
            type="button"
            aria-label="Kurangi penumpang"
            onClick={() => setPax((p) => Math.max(1, p - 1))}
            className="h-6 w-6 rounded-full bg-white/25 leading-none"
          >
            −
          </button>
          <span className="w-4 text-center font-semibold" aria-live="polite">
            {pax}
          </span>
          <input type="hidden" name="pax" value={pax} />
          <button
            type="button"
            aria-label="Tambah penumpang"
            onClick={() => setPax((p) => Math.min(MAX_SEATS_PER_BOOKING, p + 1))}
            className="h-6 w-6 rounded-full bg-white/25 leading-none"
          >
            +
          </button>
        </div>
        <button
          type="submit"
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold text-brand-700 shadow-lg shadow-brand-900/20 hover:bg-brand-50"
        >
          <IconSearch width={18} height={18} /> Cari
        </button>
      </div>
    </form>
  );
}
