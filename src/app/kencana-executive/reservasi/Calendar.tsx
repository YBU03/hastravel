"use client";

import { useState } from "react";
import { addDays } from "@/lib/format";
import { isBooked } from "../data";

const MONTHS = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const DAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

const iso = (y: number, m: number, d: number) => `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

export function Calendar({
  unit,
  today,
  start,
  days,
  onSelect,
}: {
  unit: string;
  today: string;
  start: string;
  days: number;
  onSelect: (date: string) => void;
}) {
  const base = start || today;
  const [view, setView] = useState(() => ({ y: Number(base.slice(0, 4)), m: Number(base.slice(5, 7)) - 1 }));
  const first = new Date(Date.UTC(view.y, view.m, 1));
  const offset = (first.getUTCDay() + 6) % 7; // Senin = 0
  const count = new Date(Date.UTC(view.y, view.m + 1, 0)).getUTCDate();
  const end = start ? addDays(start, days - 1) : "";
  const thisMonth = today.slice(0, 7) === iso(view.y, view.m, 1).slice(0, 7);

  function move(delta: number) {
    setView((v) => {
      const m = v.m + delta;
      return { y: v.y + Math.floor(m / 12), m: ((m % 12) + 12) % 12 };
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => move(-1)}
          disabled={thisMonth}
          aria-label="Bulan sebelumnya"
          className="h-9 w-9 border border-kencana-line text-kencana-ivory hover:border-kencana-gold disabled:opacity-30"
        >
          ‹
        </button>
        <div className="font-display text-2xl text-kencana-ivory">
          {MONTHS[view.m]} {view.y}
        </div>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Bulan berikutnya"
          className="h-9 w-9 border border-kencana-line text-kencana-ivory hover:border-kencana-gold"
        >
          ›
        </button>
      </div>
      <div className="mt-5 grid grid-cols-7 gap-1 text-center">
        {DAYS.map((d) => (
          <div key={d} className="pb-2 text-[10px] font-semibold uppercase tracking-wider text-kencana-ivory/40">
            {d}
          </div>
        ))}
        {Array.from({ length: offset }, (_, i) => (
          <div key={`e${i}`} />
        ))}
        {Array.from({ length: count }, (_, i) => {
          const date = iso(view.y, view.m, i + 1);
          const past = !!today && date < today;
          const booked = !past && isBooked(unit, date);
          const inRange = !!start && date >= start && date <= end;
          const edge = date === start || date === end;
          return (
            <button
              key={date}
              type="button"
              disabled={past || booked}
              onClick={() => onSelect(date)}
              aria-pressed={inRange}
              aria-label={`${i + 1} ${MONTHS[view.m]}${booked ? " (sudah terpesan)" : ""}`}
              className={`relative h-11 text-sm transition ${
                edge
                  ? "bg-kencana-gold font-bold text-kencana-black"
                  : inRange
                    ? "bg-kencana-gold/25 text-kencana-ivory"
                    : booked
                      ? "cursor-not-allowed text-kencana-ivory/25 line-through"
                      : past
                        ? "cursor-not-allowed text-kencana-ivory/15"
                        : "text-kencana-ivory/80 hover:bg-kencana-gold/10 hover:text-kencana-gold"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-kencana-ivory/50">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 bg-kencana-gold" /> Dipilih
        </span>
        <span className="flex items-center gap-2">
          <span className="text-kencana-ivory/30 line-through">12</span> Sudah terpesan
        </span>
      </div>
    </div>
  );
}
