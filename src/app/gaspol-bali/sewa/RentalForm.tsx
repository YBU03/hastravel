"use client";

import { useEffect, useState } from "react";
import { addDays, formatDate, rupiah } from "@/lib/format";
import { ScooterArt } from "../_components/ScooterArt";
import { ADDONS, AREAS, BIKES, DEPOSIT, GASPOL_WA, rentalPrice } from "../data";

const field = "w-full rounded-xl border-2 border-gaspol-line bg-black px-4 py-3 text-white outline-none focus:border-gaspol-pink [color-scheme:dark]";
const label = "mb-1.5 block font-display text-lg uppercase tracking-wide";

function daysBetween(a: string, b: string) {
  return Math.round((Date.parse(b + "T00:00:00Z") - Date.parse(a + "T00:00:00Z")) / 86400000);
}

export function RentalForm({ initialBike }: { initialBike?: string }) {
  const [bikeId, setBikeId] = useState(BIKES.some((b) => b.id === initialBike) ? initialBike! : "nmax");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [area, setArea] = useState("canggu");
  const [addons, setAddons] = useState<string[]>(["helmet"]);
  const [today, setToday] = useState("");
  const [done, setDone] = useState<string | null>(null);

  useEffect(() => {
    const d = new Date();
    const t = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    setToday(t);
    setStart(addDays(t, 1));
    setEnd(addDays(t, 4));
  }, []);

  const bike = BIKES.find((b) => b.id === bikeId)!;
  const days = start && end ? Math.max(1, daysBetween(start, end)) : 1;
  const { total: rent, rate } = rentalPrice(bike, days);
  const normal = bike.daily * days;
  const delivery = AREAS.find((a) => a.id === area)!.fee;
  const addonLines = ADDONS.filter((a) => addons.includes(a.id)).map((a) => ({
    name: a.name,
    cost: "perDay" in a ? a.perDay * days : a.once,
  }));
  const total = rent + delivery + addonLines.reduce((s, a) => s + a.cost, 0);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const text = [
      "Halo Gaspol Bali! Mau sewa motor ⚡",
      "",
      `Motor: ${bike.name} (${bike.cc} cc)`,
      `Ambil: ${formatDate(start)}`,
      `Kembali: ${formatDate(end)} (${days} hari, ${rate})`,
      `Antar ke: ${AREAS.find((a) => a.id === area)!.name} · ${fd.get("hotel")}`,
      addonLines.length ? `Tambahan: ${addonLines.map((a) => a.name).join(", ")}` : "",
      "",
      `Nama: ${fd.get("name")}`,
      `WhatsApp: ${fd.get("phone")}`,
      "",
      `*Total: ${rupiah(total)}* + deposit ${rupiah(DEPOSIT)} (kembali)`,
    ].filter(Boolean);
    const wa = `https://wa.me/${GASPOL_WA}?text=${encodeURIComponent(text.join("\n"))}`;
    setDone(wa);
    window.open(wa, "_blank", "noopener");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (done) {
    return (
      <div className="mx-auto mt-10 max-w-lg -rotate-1 rounded-2xl border-2 border-gaspol-pink bg-gaspol-coal p-8 text-center shadow-[0_0_40px_rgba(255,46,147,0.3)]">
        <div className="font-display text-6xl uppercase text-gaspol-pink">Siap gas!</div>
        <p className="mt-3 text-white/70">Pesanan terkirim. Admin konfirmasi dalam 10 menit via WhatsApp.</p>
        <a href={done} target="_blank" rel="noopener noreferrer" className="mt-6 block rounded-full bg-[#25D366] py-3 font-display text-xl uppercase text-black">
          Buka WhatsApp
        </a>
        <button type="button" onClick={() => setDone(null)} className="mt-4 text-sm underline">
          Ubah pesanan
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
      <div className="grid gap-8">
        <section>
          <h2 className={label}>1 · Pilih motor</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {BIKES.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setBikeId(b.id)}
                aria-pressed={b.id === bikeId}
                className={`rounded-2xl border-2 p-3 text-left transition ${
                  b.id === bikeId ? "border-gaspol-pink bg-gaspol-pink/10 shadow-[0_0_20px_rgba(255,46,147,0.3)]" : "border-gaspol-line hover:border-white"
                }`}
              >
                <ScooterArt kind={b.id === "klx" ? "trail" : "scooter"} className="w-full" />
                <div className="mt-2 font-display text-2xl uppercase">{b.name}</div>
                <div className="text-xs text-white/60">{rupiah(b.daily)}/hari</div>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className={label}>2 · Tanggal sewa</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className="mb-1 block text-xs uppercase text-white/50">Ambil</span>
              <input
                type="date"
                required
                min={today}
                value={start}
                onChange={(e) => {
                  setStart(e.target.value);
                  if (end <= e.target.value) setEnd(addDays(e.target.value, 1));
                }}
                className={field}
              />
            </label>
            <label>
              <span className="mb-1 block text-xs uppercase text-white/50">Kembali</span>
              <input type="date" required min={start ? addDays(start, 1) : today} value={end} onChange={(e) => setEnd(e.target.value)} className={field} />
            </label>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {[3, 7, 14, 30].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => start && setEnd(addDays(start, n))}
                className={`rounded-full border-2 px-4 py-1 text-sm font-bold ${days === n ? "border-gaspol-pink text-gaspol-pink" : "border-gaspol-line"}`}
              >
                {n === 30 ? "1 bulan" : n === 7 ? "1 minggu" : n === 14 ? "2 minggu" : `${n} hari`}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className={label}>3 · Antar ke mana?</h2>
          <div className="flex flex-wrap gap-2">
            {AREAS.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setArea(a.id)}
                className={`rounded-xl border-2 px-4 py-2 text-sm font-bold ${area === a.id ? "border-gaspol-pink bg-gaspol-pink text-black" : "border-gaspol-line"}`}
              >
                {a.name} · {a.fee ? rupiah(a.fee) : "gratis"}
              </button>
            ))}
          </div>
          <input name="hotel" required placeholder="Nama villa / hotel / alamat" className={`${field} mt-3`} />
        </section>

        <section>
          <h2 className={label}>4 · Tambahan</h2>
          <div className="flex flex-wrap gap-2">
            {ADDONS.map((a) => {
              const on = addons.includes(a.id);
              return (
                <button
                  key={a.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setAddons((c) => (on ? c.filter((x) => x !== a.id) : [...c, a.id]))}
                  className={`rounded-xl border-2 px-4 py-2 text-sm font-bold ${on ? "border-gaspol-acid bg-gaspol-acid text-black" : "border-gaspol-line"}`}
                >
                  {on ? "✓ " : "+ "}
                  {a.name} · {"perDay" in a ? `${rupiah(a.perDay)}/hari` : rupiah(a.once)}
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className={label}>5 · Kontak</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <input name="name" required placeholder="Nama" className={field} />
            <input name="phone" required type="tel" inputMode="tel" placeholder="WhatsApp" className={field} />
          </div>
        </section>
      </div>

      <aside className="lg:sticky lg:top-24">
        <div className="rotate-1 rounded-2xl border-2 border-white bg-gaspol-coal p-6">
          <div className="font-display text-3xl uppercase">Total sewa</div>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-2">
              <dt className="text-white/60">
                {bike.name} × {days} hari
              </dt>
              <dd>{rupiah(rent)}</dd>
            </div>
            {rent < normal && (
              <div className="flex justify-between gap-2 text-gaspol-acid">
                <dt>Hemat pakai {rate}</dt>
                <dd>− {rupiah(normal - rent)}</dd>
              </div>
            )}
            <div className="flex justify-between gap-2">
              <dt className="text-white/60">Antar-jemput</dt>
              <dd>{delivery ? rupiah(delivery) : "Gratis"}</dd>
            </div>
            {addonLines.map((a) => (
              <div key={a.name} className="flex justify-between gap-2">
                <dt className="text-white/60">{a.name}</dt>
                <dd>{rupiah(a.cost)}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 border-t-2 border-dashed border-gaspol-line pt-4">
            <div className="font-display text-5xl text-gaspol-pink">{rupiah(total)}</div>
            <div className="mt-1 text-xs text-white/50">+ deposit {rupiah(DEPOSIT)} (dikembalikan)</div>
          </div>
          <button type="submit" className="mt-5 hidden w-full rounded-full bg-gaspol-pink py-3 font-display text-2xl uppercase text-black hover:bg-white lg:block">
            Kirim ke WA
          </button>
        </div>
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t-2 border-gaspol-pink bg-black/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 lg:hidden">
        <div className="min-w-0 flex-1">
          <div className="text-xs uppercase text-white/50">
            {bike.name} · {days} hari
          </div>
          <div className="font-display text-3xl text-gaspol-pink">{rupiah(total)}</div>
        </div>
        <button type="submit" className="rounded-full bg-gaspol-pink px-6 py-3 font-display text-xl uppercase text-black">
          Kirim WA
        </button>
      </div>
    </form>
  );
}
