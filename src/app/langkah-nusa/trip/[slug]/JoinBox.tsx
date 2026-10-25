"use client";

import { useEffect, useState } from "react";
import { addDays, formatDate, rupiah, shortDay } from "@/lib/format";
import { findTrip, NUSA_WA, seatsLeft } from "../../data";

const field = "w-full rounded-2xl bg-white px-4 py-3 text-sm outline-none ring-1 ring-nusa-brown/15 focus:ring-2 focus:ring-nusa-terra";

export function JoinBox({ slug }: { slug: string }) {
  const trip = findTrip(slug)!;
  const [dates, setDates] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [pax, setPax] = useState(1);
  const [done, setDone] = useState<string | null>(null);

  // Tanggal keberangkatan dihitung dari hari ini di browser (6 jadwal berikutnya).
  useEffect(() => {
    const d = new Date();
    let cur = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const list: string[] = [];
    for (let i = 1; list.length < 6 && i < 60; i++) {
      cur = addDays(cur, 1);
      const day = new Date(cur + "T00:00:00Z").getUTCDay();
      if (trip.departDays.includes(day)) list.push(cur);
    }
    setDates(list);
    setDate(list.find((x) => seatsLeft(trip, x) > 0) ?? "");
  }, [trip]);

  const left = date ? seatsLeft(trip, date) : 0;
  const total = trip.price * pax;

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const text = [
      `Halo Langkah Nusa! Saya mau ikut trip *${trip.name}* 🌿`,
      "",
      `Tanggal: ${formatDate(date)}`,
      `Peserta: ${pax} orang`,
      `Nama: ${fd.get("name")}`,
      `WhatsApp: ${fd.get("phone")}`,
      `Titik kumpul: ${trip.meetingPoint}`,
      "",
      `*Total: ${rupiah(total)}* (DP 50%: ${rupiah(total / 2)})`,
    ].join("\n");
    const wa = `https://wa.me/${NUSA_WA}?text=${encodeURIComponent(text)}`;
    setDone(wa);
    window.open(wa, "_blank", "noopener");
  }

  return (
    <aside className="lg:sticky lg:top-6">
      <form onSubmit={submit} className="rounded-[2rem] bg-white/70 p-6 shadow-[0_20px_40px_-20px_rgba(59,42,32,0.45)] ring-1 ring-nusa-brown/10">
        {done ? (
          <div className="text-center">
            <div className="text-5xl">🎒</div>
            <h2 className="mt-3 font-display text-2xl font-semibold">Pendaftaran terkirim!</h2>
            <p className="mt-2 text-sm text-nusa-brown/70">Admin akan konfirmasi kursi & info DP via WhatsApp.</p>
            <a href={done} target="_blank" rel="noopener noreferrer" className="mt-5 block rounded-full bg-[#25D366] py-3 font-bold text-white">
              Buka WhatsApp
            </a>
            <button type="button" onClick={() => setDone(null)} className="mt-3 text-sm font-bold underline">
              Ubah data
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-2xl font-semibold">Ikut trip</h2>
              <span className="font-display text-xl font-semibold text-nusa-terra">{rupiah(trip.price)}</span>
            </div>
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-nusa-moss">Pilih keberangkatan</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {dates.map((d) => {
                const n = seatsLeft(trip, d);
                const s = shortDay(d);
                return (
                  <button
                    key={d}
                    type="button"
                    disabled={n === 0}
                    onClick={() => {
                      setDate(d);
                      setPax((p) => Math.min(p, n));
                    }}
                    className={`rounded-2xl px-2 py-2 text-center text-xs transition ${
                      d === date
                        ? "bg-nusa-terra text-nusa-cream"
                        : n === 0
                          ? "cursor-not-allowed bg-nusa-sand/50 text-nusa-brown/40 line-through"
                          : "bg-nusa-sand hover:bg-nusa-sage/40"
                    }`}
                  >
                    <div className="font-bold">
                      {s.day}, {s.date}
                    </div>
                    <div className={d === date ? "" : n <= 3 && n > 0 ? "font-bold text-nusa-terra" : ""}>{n === 0 ? "Penuh" : `sisa ${n}`}</div>
                  </button>
                );
              })}
            </div>
            {date && (
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-nusa-sand" aria-label={`Sisa ${left} dari ${trip.quota} kursi`}>
                <div className="h-full rounded-full bg-nusa-sage" style={{ width: `${((trip.quota - left) / trip.quota) * 100}%` }} />
              </div>
            )}
            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm font-bold">Peserta</span>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setPax((p) => Math.max(1, p - 1))} className="h-9 w-9 rounded-full bg-nusa-sand font-bold" aria-label="Kurangi peserta">
                  −
                </button>
                <span className="w-8 text-center font-display text-lg font-semibold">{pax}</span>
                <button
                  type="button"
                  onClick={() => setPax((p) => Math.min(Math.max(1, left), p + 1))}
                  className="h-9 w-9 rounded-full bg-nusa-sand font-bold"
                  aria-label="Tambah peserta"
                >
                  +
                </button>
              </div>
            </div>
            <div className="mt-4 grid gap-3">
              <input name="name" required placeholder="Nama lengkap" className={field} />
              <input name="phone" required type="tel" inputMode="tel" placeholder="WhatsApp (08xxxxxxxxxx)" className={field} />
            </div>
            <div className="mt-5 flex items-end justify-between border-t border-nusa-brown/10 pt-4">
              <span className="text-sm">Total ({pax} orang)</span>
              <span className="font-display text-2xl font-semibold text-nusa-terra">{rupiah(total)}</span>
            </div>
            <button
              type="submit"
              disabled={!date}
              className="mt-4 w-full rounded-full bg-nusa-terra py-3.5 font-bold text-nusa-cream shadow-lg shadow-nusa-terra/30 hover:bg-nusa-brown disabled:opacity-50"
            >
              Daftar via WhatsApp
            </button>
            <p className="mt-2 text-center text-xs text-nusa-brown/60">DP 50% setelah kursi dikonfirmasi</p>
          </>
        )}
      </form>
    </aside>
  );
}
