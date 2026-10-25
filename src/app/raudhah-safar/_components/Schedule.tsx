"use client";

import Link from "next/link";
import { useState } from "react";
import { formatDate, rupiah } from "@/lib/format";
import { PACKAGES } from "../data";

const MONTHS = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

const rows = PACKAGES.flatMap((p) => p.departures.map((d) => ({ pkg: p, ...d }))).sort((a, b) => a.date.localeCompare(b.date));
const months = [...new Set(rows.map((r) => r.date.slice(0, 7)))];

export function Schedule() {
  const [month, setMonth] = useState(months[0]);
  const list = rows.filter((r) => r.date.startsWith(month));
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {months.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMonth(m)}
            aria-pressed={m === month}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${
              m === month ? "bg-raudhah-gold text-raudhah-deep" : "bg-raudhah-ivory/10 text-raudhah-ivory/80 hover:bg-raudhah-ivory/20"
            }`}
          >
            {MONTHS[Number(m.slice(5)) - 1]} {m.slice(0, 4)}
          </button>
        ))}
      </div>
      <div className="mt-8 overflow-hidden rounded-3xl border border-raudhah-gold/30 bg-raudhah-deep/40">
        {list.map((r) => (
          <div
            key={r.pkg.slug + r.date}
            className="grid grid-cols-2 items-center gap-3 border-b border-raudhah-gold/15 px-5 py-4 last:border-0 md:grid-cols-[1.4fr_1fr_1fr_1fr_auto]"
          >
            <div className="col-span-2 md:col-span-1">
              <div className="font-display text-xl text-raudhah-ivory">{r.pkg.name}</div>
              <div className="text-xs text-raudhah-ivory/60">
                {r.pkg.days} hari · {r.pkg.airline.split(" · ")[0]}
              </div>
            </div>
            <div className="text-sm text-raudhah-ivory/85">{formatDate(r.date)}</div>
            <div className={`text-sm font-bold ${r.seats === 0 ? "text-red-300" : r.seats <= 6 ? "text-raudhah-gold" : "text-raudhah-ivory/85"}`}>
              {r.seats === 0 ? "Penuh" : `Sisa ${r.seats} seat`}
            </div>
            <div className="font-display text-lg text-raudhah-gold">{rupiah(r.pkg.prices.quad)}</div>
            {r.seats > 0 ? (
              <Link
                href={`/raudhah-safar/paket/${r.pkg.slug}?tanggal=${r.date}`}
                className="col-span-2 rounded-full bg-raudhah-gold px-5 py-2 text-center text-sm font-bold text-raudhah-deep hover:bg-raudhah-gold-soft md:col-span-1"
              >
                Daftar
              </Link>
            ) : (
              <span className="col-span-2 rounded-full border border-raudhah-ivory/20 px-5 py-2 text-center text-sm text-raudhah-ivory/40 md:col-span-1">
                Waiting list
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-raudhah-ivory/50">Harga per jamaah, kamar quad. Triple & double tersedia.</p>
    </div>
  );
}
