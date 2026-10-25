"use client";

import { useEffect, useState } from "react";
import { formatDate, isValidDate, rupiah } from "@/lib/format";
import { box, btn } from "../_components/Brand";
import { BusArt } from "../_components/BusArt";
import { BUSES, DISTANCES, EXTRAS, RIA_WA } from "../data";

const field = "w-full rounded-xl border-[3px] border-ria-ink bg-white px-3 py-2.5 font-medium outline-none focus:bg-ria-cream";
const label = "mb-1.5 block font-display text-sm font-bold";

export function QuoteForm({ initialBus }: { initialBus?: string }) {
  const [pax, setPax] = useState(45);
  const [busId, setBusId] = useState(BUSES.some((b) => b.id === initialBus) ? initialBus! : "big");
  const [distance, setDistance] = useState("dekat");
  const [days, setDays] = useState(2);
  const [date, setDate] = useState("");
  const [extras, setExtras] = useState<string[]>([]);
  const [today, setToday] = useState("");
  const [done, setDone] = useState<string | null>(null);

  useEffect(() => {
    const d = new Date();
    setToday(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
  }, []);

  const bus = BUSES.find((b) => b.id === busId)!;
  const count = Math.max(1, Math.ceil(pax / bus.seats));
  const factor = DISTANCES.find((d) => d.id === distance)!.factor;
  const busCost = Math.round(bus.perDay * count * days * factor);
  const extraLines = EXTRAS.filter((e) => extras.includes(e.id)).map((e) => ({
    name: e.name,
    cost: "perDay" in e ? e.perDay * days : e.perPax * pax * days,
  }));
  const total = busCost + extraLines.reduce((s, e) => s + e.cost, 0);
  const perPerson = Math.round(total / pax);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const text = [
      "Halo Armada Ria! Saya mau minta penawaran sewa bus 🚌",
      "",
      `Instansi / rombongan: ${get("org")}`,
      `PIC: ${get("name")} (${get("phone")})`,
      `Tujuan: ${get("destination")} (${DISTANCES.find((d) => d.id === distance)!.name})`,
      `Berangkat: ${isValidDate(date) ? formatDate(date) : "-"} · ${days} hari`,
      `Peserta: ${pax} orang → ${count} × ${bus.name} (${bus.seats} kursi)`,
      extraLines.length ? `Tambahan: ${extraLines.map((x) => x.name).join(", ")}` : "",
      "",
      `*Perkiraan: ${rupiah(total)}* (± ${rupiah(perPerson)}/orang)`,
    ].filter(Boolean);
    const wa = `https://wa.me/${RIA_WA}?text=${encodeURIComponent(text.join("\n"))}`;
    setDone(wa);
    window.open(wa, "_blank", "noopener");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (done) {
    return (
      <div className={`${box} mx-auto mt-10 max-w-lg -rotate-1 bg-ria-yellow p-8 text-center`}>
        <div className="text-6xl">🎉</div>
        <h2 className="mt-3 font-display text-3xl font-extrabold">Permintaan terkirim!</h2>
        <p className="mt-2">Admin akan membalas penawaran resmi via WhatsApp dalam 1 jam kerja.</p>
        <a href={done} target="_blank" rel="noopener noreferrer" className={`${btn} mt-6 w-full bg-[#25D366] text-white`}>
          Buka WhatsApp
        </a>
        <button type="button" onClick={() => setDone(null)} className="mt-4 font-bold underline">
          Ubah data
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
      <div className="grid gap-8">
        {/* Peserta */}
        <section className={`${box} bg-white p-6`}>
          <h2 className="font-display text-2xl font-extrabold">1. Berapa peserta?</h2>
          <div className="mt-5 flex items-center gap-4">
            <input
              type="range"
              min={5}
              max={300}
              value={pax}
              onChange={(e) => setPax(Number(e.target.value))}
              className="h-3 flex-1 cursor-pointer accent-[#ff5a1f]"
              aria-label="Jumlah peserta"
            />
            <input
              type="number"
              min={1}
              max={1000}
              value={pax}
              onChange={(e) => setPax(Math.max(1, Math.min(1000, Number(e.target.value) || 1)))}
              className={`${field} w-24 text-center font-display text-xl font-extrabold`}
              aria-label="Jumlah peserta"
            />
          </div>
        </section>

        {/* Bus */}
        <section className={`${box} bg-white p-6`}>
          <h2 className="font-display text-2xl font-extrabold">2. Pilih jenis bus</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {BUSES.map((b) => {
              const n = Math.max(1, Math.ceil(pax / b.seats));
              const active = b.id === busId;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBusId(b.id)}
                  aria-pressed={active}
                  className={`flex items-center gap-3 rounded-xl border-[3px] border-ria-ink p-3 text-left transition ${
                    active ? "-translate-y-1 shadow-[4px_4px_0_#1a1a1a]" : "opacity-80 hover:opacity-100"
                  }`}
                  style={{ background: active ? b.color : "#fff" }}
                >
                  <BusArt color={active ? "#fff" : b.color} className="w-20 shrink-0" />
                  <span>
                    <span className="block font-display text-lg font-extrabold">{b.name}</span>
                    <span className="block text-sm">{b.seats} kursi · {rupiah(b.perDay)}/hari</span>
                    <span className="mt-1 inline-block rounded-md bg-ria-ink px-2 py-0.5 text-xs font-bold text-white">butuh {n} unit</span>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-5 flex flex-wrap gap-2" aria-label={`${count} unit ${bus.name}`}>
            {Array.from({ length: Math.min(count, 12) }, (_, i) => (
              <span key={i} className="rounded-lg border-2 border-ria-ink px-1" style={{ background: bus.color }}>
                <BusArt color="#fff" className="w-12" />
              </span>
            ))}
            {count > 12 && <span className="self-center font-bold">+{count - 12} lagi</span>}
          </div>
        </section>

        {/* Perjalanan */}
        <section className={`${box} bg-white p-6`}>
          <h2 className="font-display text-2xl font-extrabold">3. Perjalanan</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className={label}>Tujuan</span>
              <input name="destination" required className={field} placeholder="Contoh: Malang → Bali (Kuta, Tanah Lot, GWK)" />
            </label>
            <div className="sm:col-span-2">
              <span className={label}>Jarak</span>
              <div className="flex flex-wrap gap-2">
                {DISTANCES.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDistance(d.id)}
                    className={`rounded-full border-[3px] border-ria-ink px-4 py-1.5 text-sm font-bold ${
                      distance === d.id ? "bg-ria-ink text-ria-yellow" : "bg-white"
                    }`}
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            </div>
            <label>
              <span className={label}>Tanggal berangkat</span>
              <input type="date" required min={today} value={date} onChange={(e) => setDate(e.target.value)} className={field} />
            </label>
            <div>
              <span className={label}>Lama perjalanan</span>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setDays((d) => Math.max(1, d - 1))} className={`${btn} h-11 w-11 bg-white p-0`} aria-label="Kurangi hari">
                  −
                </button>
                <span className="w-20 text-center font-display text-xl font-extrabold">{days} hari</span>
                <button type="button" onClick={() => setDays((d) => Math.min(14, d + 1))} className={`${btn} h-11 w-11 bg-white p-0`} aria-label="Tambah hari">
                  +
                </button>
              </div>
            </div>
          </div>
          <fieldset className="mt-6">
            <legend className={label}>Tambahan</legend>
            <div className="flex flex-wrap gap-2">
              {EXTRAS.map((x) => {
                const on = extras.includes(x.id);
                return (
                  <button
                    key={x.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setExtras((cur) => (on ? cur.filter((v) => v !== x.id) : [...cur, x.id]))}
                    className={`rounded-xl border-[3px] border-ria-ink px-3 py-2 text-sm font-bold ${on ? "bg-ria-orange text-white" : "bg-white"}`}
                  >
                    {on ? "✔ " : "+ "}
                    {x.name}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </section>

        {/* Kontak */}
        <section className={`${box} bg-white p-6`}>
          <h2 className="font-display text-2xl font-extrabold">4. Kontak</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className={label}>Nama instansi / rombongan</span>
              <input name="org" required className={field} placeholder="SMAN 1 Surabaya, PT ..., Keluarga Besar ..." />
            </label>
            <label>
              <span className={label}>Nama PIC</span>
              <input name="name" required className={field} />
            </label>
            <label>
              <span className={label}>WhatsApp</span>
              <input name="phone" required type="tel" inputMode="tel" pattern="[0-9+\s\-]{9,16}" className={field} placeholder="08xxxxxxxxxx" />
            </label>
          </div>
        </section>
      </div>

      {/* Ringkasan */}
      <aside className="lg:sticky lg:top-6">
        <div className={`${box} rotate-1 bg-ria-yellow p-6`}>
          <h2 className="font-display text-2xl font-extrabold">Perkiraan harga</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-2">
              <dt>
                {count} × {bus.name} × {days} hari
              </dt>
              <dd className="font-bold">{rupiah(busCost)}</dd>
            </div>
            {extraLines.map((x) => (
              <div key={x.name} className="flex justify-between gap-2">
                <dt>{x.name}</dt>
                <dd className="font-bold">{rupiah(x.cost)}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 rounded-xl border-[3px] border-ria-ink bg-white p-4">
            <div className="text-xs font-bold uppercase">Total perkiraan</div>
            <div className="font-display text-3xl font-extrabold">{rupiah(total)}</div>
            <div className="mt-1 inline-block rounded-md bg-ria-orange px-2 py-0.5 text-sm font-bold text-white">
              ± {rupiah(perPerson)} / orang
            </div>
          </div>
          <button type="submit" className={`${btn} mt-5 hidden w-full bg-ria-ink text-ria-yellow shadow-[4px_4px_0_#ff5a1f] lg:flex`}>
            Kirim ke WhatsApp
          </button>
          <p className="mt-3 text-xs">Sudah termasuk 2 sopir & BBM. Tol, parkir, dan kapal menyesuaikan rute.</p>
        </div>
      </aside>

      {/* Bar bawah (HP) */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t-[3px] border-ria-ink bg-ria-yellow px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 lg:hidden">
        <div className="min-w-0 flex-1">
          <div className="text-xs font-bold">Perkiraan · {count} bus</div>
          <div className="font-display text-xl font-extrabold">{rupiah(total)}</div>
        </div>
        <button type="submit" className={`${btn} bg-ria-ink py-2 text-ria-yellow`}>
          Kirim WA
        </button>
      </div>
    </form>
  );
}
