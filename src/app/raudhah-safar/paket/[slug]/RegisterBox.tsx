"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formatDate, rupiah } from "@/lib/format";
import { findPackage, RAUDHAH_WA, ROOMS, type Room } from "../../data";

const field = "w-full rounded-xl border border-raudhah-gold/40 bg-white px-4 py-3 text-sm outline-none focus:border-raudhah-gold focus:ring-2 focus:ring-raudhah-gold/20";

/** Jumlah bulan cicilan yang masih mungkin: pelunasan paling lambat 30 hari sebelum berangkat. */
function maxTenor(departure: string, today: string) {
  if (!today) return 0;
  const [y1, m1] = today.split("-").map(Number);
  const [y2, m2] = departure.split("-").map(Number);
  return Math.max(0, (y2 - y1) * 12 + (m2 - m1) - 1);
}

export function RegisterBox({ slug }: { slug: string }) {
  const p = findPackage(slug)!;
  const params = useSearchParams();
  const available = p.departures.filter((d) => d.seats > 0);
  const [date, setDate] = useState(available.find((d) => d.date === params.get("tanggal"))?.date ?? available[0]?.date ?? "");
  const [room, setRoom] = useState<Room>("quad");
  const [pax, setPax] = useState(2);
  const [tenor, setTenor] = useState(0);
  const [today, setToday] = useState("");
  const [done, setDone] = useState<string | null>(null);

  useEffect(() => {
    const d = new Date();
    setToday(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
  }, []);

  const seats = p.departures.find((d) => d.date === date)?.seats ?? 0;
  const total = p.prices[room] * pax;
  const dp = p.dp * pax;
  const limit = maxTenor(date, today);
  const tenors = [0, 3, 6, 12].filter((t) => t === 0 || t <= limit);
  const activeTenor = tenors.includes(tenor) ? tenor : 0;
  const monthly = activeTenor ? Math.ceil((total - dp) / activeTenor / 1000) * 1000 : 0;

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const text = [
      "Assalamu'alaikum Raudhah Safar, saya ingin mendaftar 🤲",
      "",
      `Paket: *${p.name} ${p.days} Hari*`,
      `Keberangkatan: ${formatDate(date)}`,
      `Kamar: ${ROOMS.find((r) => r.id === room)!.name} · ${pax} jamaah`,
      `Total: ${rupiah(total)}`,
      `DP: ${rupiah(dp)}`,
      activeTenor ? `Cicilan: ${activeTenor}× ${rupiah(monthly)} / bulan` : "Pelunasan: sekaligus",
      "",
      `Nama: ${fd.get("name")}`,
      `WhatsApp: ${fd.get("phone")}`,
      `Kota asal: ${fd.get("city")}`,
    ].join("\n");
    const wa = `https://wa.me/${RAUDHAH_WA}?text=${encodeURIComponent(text)}`;
    setDone(wa);
    window.open(wa, "_blank", "noopener");
  }

  if (done) {
    return (
      <aside className="rounded-3xl bg-raudhah-emerald p-8 text-center text-raudhah-ivory lg:sticky lg:top-6">
        <div className="font-display text-3xl text-raudhah-gold">Jazakallahu khairan</div>
        <p className="mt-3 text-sm text-raudhah-ivory/80">Pendaftaran terkirim. Tim kami akan menghubungi untuk konfirmasi seat & pembayaran DP.</p>
        <a href={done} target="_blank" rel="noopener noreferrer" className="mt-6 block rounded-full bg-raudhah-gold py-3 font-bold text-raudhah-deep">
          Buka WhatsApp
        </a>
        <button type="button" onClick={() => setDone(null)} className="mt-3 text-sm underline">
          Ubah data
        </button>
      </aside>
    );
  }

  return (
    <aside className="lg:sticky lg:top-6">
      <form onSubmit={submit} className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-raudhah-emerald/10 ring-1 ring-raudhah-gold/40">
        <div className="bg-raudhah-emerald px-6 py-4 text-center">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-raudhah-gold">Pendaftaran</div>
          <div className="font-display text-2xl text-raudhah-ivory">Simulasi biaya</div>
        </div>
        <div className="grid gap-5 p-6">
          <label className="grid gap-1.5 text-sm font-bold">
            Tanggal keberangkatan
            <select value={date} onChange={(e) => setDate(e.target.value)} className={field}>
              {p.departures.map((d) => (
                <option key={d.date} value={d.date} disabled={d.seats === 0}>
                  {formatDate(d.date)} {d.seats === 0 ? "(penuh)" : `· sisa ${d.seats}`}
                </option>
              ))}
            </select>
          </label>

          <div>
            <div className="mb-1.5 text-sm font-bold">Tipe kamar</div>
            <div className="grid grid-cols-3 gap-2">
              {ROOMS.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRoom(r.id)}
                  aria-pressed={room === r.id}
                  className={`rounded-xl border px-2 py-2.5 text-center transition ${
                    room === r.id ? "border-raudhah-gold bg-raudhah-emerald text-raudhah-ivory" : "border-raudhah-gold/30 hover:border-raudhah-gold"
                  }`}
                >
                  <div className="font-display text-lg">{r.name}</div>
                  <div className={`text-[10px] ${room === r.id ? "text-raudhah-gold" : "text-raudhah-deep/50"}`}>{r.detail}</div>
                  <div className="mt-1 text-xs font-bold">{(p.prices[r.id] / 1e6).toLocaleString("id-ID")} jt</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-bold">Jumlah jamaah</span>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setPax((n) => Math.max(1, n - 1))} className="h-9 w-9 rounded-full border border-raudhah-gold/50 font-bold" aria-label="Kurangi jamaah">
                −
              </button>
              <span className="w-8 text-center font-display text-xl">{pax}</span>
              <button
                type="button"
                onClick={() => setPax((n) => Math.min(Math.max(1, seats), n + 1))}
                className="h-9 w-9 rounded-full border border-raudhah-gold/50 font-bold"
                aria-label="Tambah jamaah"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <div className="mb-1.5 text-sm font-bold">Cara pelunasan</div>
            <div className="flex flex-wrap gap-2">
              {tenors.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTenor(t)}
                  aria-pressed={activeTenor === t}
                  className={`rounded-full border px-3 py-1.5 text-xs font-bold ${
                    activeTenor === t ? "border-raudhah-emerald bg-raudhah-emerald text-raudhah-gold" : "border-raudhah-gold/40"
                  }`}
                >
                  {t === 0 ? "Lunas sekaligus" : `Cicil ${t} bulan`}
                </button>
              ))}
            </div>
            {tenors.length === 1 && <p className="mt-1 text-xs text-raudhah-deep/50">Keberangkatan sudah dekat, pelunasan sekaligus.</p>}
          </div>

          <div className="rounded-2xl bg-raudhah-ivory p-4 text-sm">
            <div className="flex justify-between">
              <span>Total ({pax} jamaah)</span>
              <b>{rupiah(total)}</b>
            </div>
            <div className="mt-1 flex justify-between">
              <span>DP kunci seat</span>
              <b className="text-raudhah-leaf">{rupiah(dp)}</b>
            </div>
            {activeTenor > 0 && (
              <div className="mt-3 border-t border-raudhah-gold/30 pt-3 text-center">
                <div className="text-xs">Cicilan per bulan</div>
                <div className="font-display text-3xl text-raudhah-emerald">{rupiah(monthly)}</div>
                <div className="text-xs text-raudhah-deep/50">× {activeTenor} bulan, tanpa bunga</div>
              </div>
            )}
          </div>

          <input name="name" required placeholder="Nama lengkap (sesuai paspor)" className={field} />
          <input name="phone" required type="tel" inputMode="tel" placeholder="WhatsApp (08xxxxxxxxxx)" className={field} />
          <input name="city" required placeholder="Kota asal" className={field} />
          <button
            type="submit"
            disabled={!date}
            className="rounded-full bg-raudhah-gold py-3.5 font-bold text-raudhah-deep shadow-lg shadow-raudhah-gold/30 hover:bg-raudhah-gold-soft disabled:opacity-50"
          >
            Daftar via WhatsApp
          </button>
        </div>
      </form>
    </aside>
  );
}
