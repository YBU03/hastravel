"use client";

import Link from "next/link";
import { useState } from "react";
import { rupiah } from "@/lib/format";
import { AIRPORTS } from "../data";

export function FareTable() {
  const [code, setCode] = useState(AIRPORTS[0].code);
  const airport = AIRPORTS.find((a) => a.code === code)!;
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {AIRPORTS.map((a) => (
          <button
            key={a.code}
            type="button"
            onClick={() => setCode(a.code)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ring-1 transition ${
              a.code === code
                ? "bg-sayap-lime text-sayap-navy ring-sayap-lime"
                : "text-slate-300 ring-sayap-line hover:ring-slate-500"
            }`}
          >
            {a.code} · {a.city}
          </button>
        ))}
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl ring-1 ring-sayap-line">
        <div className="hidden grid-cols-[1.4fr_1fr_1fr_1fr_auto] gap-4 bg-sayap-card px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 md:grid">
          <span>Zona</span>
          <span>Waktu tempuh</span>
          <span>Shared / orang</span>
          <span>Private / van</span>
          <span className="w-20" />
        </div>
        {airport.zones.map((z) => (
          <div
            key={z.id}
            className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-sayap-line px-5 py-4 first:border-t-0 md:grid-cols-[1.4fr_1fr_1fr_1fr_auto] md:items-center md:first:border-t"
          >
            <div className="col-span-2 md:col-span-1">
              <div className="font-display font-semibold text-white">{z.name}</div>
              <div className="text-xs text-slate-500">{z.areas}</div>
            </div>
            <div className="text-sm text-slate-400">
              <span className="text-xs text-slate-500 md:hidden">Tempuh </span>± {z.minutes} menit
            </div>
            <div>
              <div className="text-[11px] text-slate-500 md:hidden">Shared / orang</div>
              <div className="font-display text-lg font-bold text-sayap-lime">{rupiah(z.shared)}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500 md:hidden">Private / van</div>
              <div className="font-display text-lg font-bold text-white">{rupiah(z.private)}</div>
            </div>
            <Link
              href={`/sayap-shuttle/pesan?airport=${airport.code}&zone=${z.id}`}
              className="col-span-2 rounded-lg px-4 py-2 text-center text-sm font-semibold text-sayap-lime ring-1 ring-sayap-lime/40 hover:bg-sayap-lime hover:text-sayap-navy md:col-span-1 md:w-20"
            >
              Pesan
            </Link>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Sudah termasuk tol & parkir bandara. Private: 1 van maks. 14 penumpang. Jam {airport.tz}.
      </p>
    </div>
  );
}
