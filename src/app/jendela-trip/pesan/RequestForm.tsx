"use client";

import { useEffect, useState } from "react";
import { addDays, formatDate, isValidDate, rupiah } from "@/lib/format";
import { retroField, retroLabel } from "../_components/SearchBox";
import { baseFare, CABINS, CITIES, HOTEL_CLASSES, JENDELA_WA } from "../data";

const cityName = (code: string) => CITIES.find((c) => c.code === code)?.name ?? code;
const nights = (a: string, b: string) => Math.max(1, Math.round((Date.parse(b) - Date.parse(a)) / 86400000) || 1);

export function RequestForm({ initial }: { initial: Record<string, string | undefined> }) {
  const [type, setType] = useState<"flight" | "hotel">(initial.type === "hotel" ? "hotel" : "flight");
  const [from, setFrom] = useState(initial.from ?? "CGK");
  const [to, setTo] = useState(initial.to ?? "DPS");
  const [date, setDate] = useState(initial.date ?? "");
  const [back, setBack] = useState(initial.back ?? "");
  const [pax, setPax] = useState(Math.max(1, Number(initial.pax) || 1));
  const [cabin, setCabin] = useState("lcc");
  const [city, setCity] = useState(initial.city ?? initial.to ?? "DPS");
  const [checkin, setCheckin] = useState(initial.checkin ?? "");
  const [checkout, setCheckout] = useState(initial.checkout ?? "");
  const [rooms, setRooms] = useState(Math.max(1, Number(initial.rooms) || 1));
  const [hotelClass, setHotelClass] = useState("4");
  const [withHotel, setWithHotel] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  useEffect(() => {
    const d = new Date();
    const t = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    setDate((x) => (isValidDate(x) && x >= t ? x : addDays(t, 7)));
    setCheckin((x) => (isValidDate(x) && x >= t ? x : addDays(t, 7)));
    setCheckout((x) => (isValidDate(x) && x > t ? x : addDays(t, 9)));
  }, []);

  const factor = CABINS.find((c) => c.id === cabin)!.factor;
  const flightEst = Math.round((baseFare(from, to) * factor * pax * (back ? 2 : 1)) / 1000) * 1000;
  const hc = HOTEL_CLASSES.find((h) => h.id === hotelClass)!;
  const hotelOn = type === "hotel" || withHotel;
  const hotelNights =
    type === "hotel"
      ? nights(checkin, checkout)
      : isValidDate(date)
        ? nights(date, back || addDays(date, 2))
        : 2;
  const hotelEst = hotelOn ? hc.perNight * hotelNights * rooms : 0;
  const total = (type === "flight" ? flightEst : 0) + hotelEst;
  const bundleDiscount = type === "flight" && withHotel ? Math.round(total * 0.05) : 0;

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const lines = [
      "Halo Jendela Trip, saya mau minta dicarikan:",
      "",
      type === "flight"
        ? `✈ Tiket ${cityName(from)} (${from}) → ${cityName(to)} (${to})\nPergi: ${formatDate(date)}${back ? `\nPulang: ${formatDate(back)}` : ""}\nPenumpang: ${pax} · Kelas: ${CABINS.find((c) => c.id === cabin)!.name}`
        : "",
      hotelOn ? `🏨 Hotel ${hc.name} di ${cityName(type === "hotel" ? city : to)} · ${hotelNights} malam · ${rooms} kamar` : "",
      "",
      `Nama: ${fd.get("name")}`,
      `WhatsApp: ${fd.get("phone")}`,
      fd.get("note") ? `Catatan: ${fd.get("note")}` : "",
      "",
      `Estimasi: ${rupiah(total - bundleDiscount)}`,
    ].filter((l, i, a) => l !== "" || a[i - 1] !== "");
    const wa = `https://wa.me/${JENDELA_WA}?text=${encodeURIComponent(lines.join("\n"))}`;
    setDone(wa);
    window.open(wa, "_blank", "noopener");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (done) {
    return (
      <div className="mx-auto mt-10 max-w-lg -rotate-1 border-[3px] border-jendela-ink bg-jendela-cream p-8 text-center shadow-[8px_8px_0_#2d1e12]">
        <div className="font-display text-4xl uppercase text-jendela-red">Terkirim!</div>
        <p className="mt-3">Agen kami akan membalas dengan pilihan jadwal & harga final.</p>
        <a href={done} target="_blank" rel="noopener noreferrer" className="mt-6 block border-[3px] border-jendela-ink bg-[#25D366] py-3 font-display uppercase text-white">
          Buka WhatsApp
        </a>
        <button type="button" onClick={() => setDone(null)} className="mt-4 text-sm font-semibold underline">
          Ubah permintaan
        </button>
      </div>
    );
  }

  const code = type === "flight" ? `${from}-${to}` : `HTL-${city}`;

  return (
    <form onSubmit={submit} className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
      <div className="grid gap-6">
        <div className="flex border-[3px] border-jendela-ink">
          {(
            [
              ["flight", "✈ Pesawat"],
              ["hotel", "🏨 Hotel saja"],
            ] as const
          ).map(([v, l]) => (
            <button key={v} type="button" onClick={() => setType(v)} className={`flex-1 py-3 font-display uppercase ${type === v ? "bg-jendela-ink text-jendela-mustard" : "bg-jendela-cream"}`}>
              {l}
            </button>
          ))}
        </div>

        <section className="border-[3px] border-jendela-ink bg-jendela-cream p-5 shadow-[6px_6px_0_#2d1e12]">
          {type === "flight" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span className={retroLabel}>Dari</span>
                <select value={from} onChange={(e) => setFrom(e.target.value)} className={retroField}>
                  {CITIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} · {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span className={retroLabel}>Ke</span>
                <select value={to} onChange={(e) => setTo(e.target.value)} className={retroField}>
                  {CITIES.filter((c) => c.code !== from).map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} · {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span className={retroLabel}>Pergi</span>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={retroField} />
              </label>
              <label>
                <span className={retroLabel}>Pulang (opsional)</span>
                <input type="date" min={date} value={back} onChange={(e) => setBack(e.target.value)} className={retroField} />
              </label>
              <label>
                <span className={retroLabel}>Penumpang</span>
                <input type="number" min={1} max={30} value={pax} onChange={(e) => setPax(Math.max(1, Number(e.target.value) || 1))} className={retroField} />
              </label>
              <div className="sm:col-span-2">
                <span className={retroLabel}>Kelas</span>
                <div className="grid gap-2 sm:grid-cols-3">
                  {CABINS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCabin(c.id)}
                      aria-pressed={cabin === c.id}
                      className={`border-[3px] border-jendela-ink p-3 text-left ${cabin === c.id ? "bg-jendela-mustard" : "bg-white"}`}
                    >
                      <div className="font-display text-sm uppercase">{c.name}</div>
                      <div className="text-xs">{c.note}</div>
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-3 border-[3px] border-dashed border-jendela-red bg-white p-3 sm:col-span-2">
                <input type="checkbox" checked={withHotel} onChange={(e) => setWithHotel(e.target.checked)} className="h-5 w-5 accent-[#d6452b]" />
                <span className="text-sm font-semibold">Sekalian hotel di {cityName(to)} (paket hemat 5%)</span>
              </label>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span className={retroLabel}>Kota</span>
                <select value={city} onChange={(e) => setCity(e.target.value)} className={retroField}>
                  {CITIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span className={retroLabel}>Kamar</span>
                <input type="number" min={1} max={20} value={rooms} onChange={(e) => setRooms(Math.max(1, Number(e.target.value) || 1))} className={retroField} />
              </label>
              <label>
                <span className={retroLabel}>Check-in</span>
                <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} className={retroField} />
              </label>
              <label>
                <span className={retroLabel}>Check-out</span>
                <input type="date" min={checkin} value={checkout} onChange={(e) => setCheckout(e.target.value)} className={retroField} />
              </label>
            </div>
          )}
          {hotelOn && (
            <div className="mt-4">
              <span className={retroLabel}>Kelas hotel</span>
              <div className="grid gap-2 sm:grid-cols-3">
                {HOTEL_CLASSES.map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => setHotelClass(h.id)}
                    aria-pressed={hotelClass === h.id}
                    className={`border-[3px] border-jendela-ink p-3 text-left ${hotelClass === h.id ? "bg-jendela-mustard" : "bg-white"}`}
                  >
                    <div className="font-display text-sm uppercase">{h.name}</div>
                    <div className="text-xs">± {rupiah(h.perNight)}/malam</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="border-[3px] border-jendela-ink bg-jendela-cream p-5 shadow-[6px_6px_0_#2d1e12]">
          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className={retroLabel}>Nama</span>
              <input name="name" required className={retroField} />
            </label>
            <label>
              <span className={retroLabel}>WhatsApp</span>
              <input name="phone" required type="tel" inputMode="tel" className={retroField} />
            </label>
            <label className="sm:col-span-2">
              <span className={retroLabel}>Catatan (opsional)</span>
              <input name="note" placeholder="Jam terbang favorit, maskapai tertentu, dekat pantai, dll." className={retroField} />
            </label>
          </div>
        </section>
      </div>

      {/* Boarding pass */}
      <aside className="lg:sticky lg:top-6">
        <div className="border-[3px] border-jendela-ink bg-jendela-cream shadow-[8px_8px_0_#2d1e12]">
          <div className="flex items-center justify-between bg-jendela-ink px-5 py-3 font-display uppercase text-jendela-mustard">
            <span>Boarding pass</span>
            <span className="text-xs">Jendela Trip</span>
          </div>
          <div className="p-5">
            {type === "flight" ? (
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-display text-4xl">{from}</div>
                  <div className="text-xs">{cityName(from)}</div>
                </div>
                <div className="text-2xl">✈</div>
                <div className="text-right">
                  <div className="font-display text-4xl">{to}</div>
                  <div className="text-xs">{cityName(to)}</div>
                </div>
              </div>
            ) : (
              <div className="font-display text-3xl uppercase">Hotel · {cityName(city)}</div>
            )}
            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-jendela-ink/60">{type === "flight" ? "Tanggal" : "Check-in"}</dt>
                <dd className="font-semibold">{isValidDate(type === "flight" ? date : checkin) ? formatDate(type === "flight" ? date : checkin, { weekday: false }) : "-"}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-jendela-ink/60">{type === "flight" ? "Penumpang" : "Malam"}</dt>
                <dd className="font-semibold">{type === "flight" ? pax : hotelNights}</dd>
              </div>
            </dl>
          </div>
          <div className="relative border-t-[3px] border-dashed border-jendela-ink p-5">
            <span className="absolute -left-[14px] -top-[14px] h-6 w-6 rounded-full border-[3px] border-jendela-ink bg-jendela-paper" />
            <span className="absolute -right-[14px] -top-[14px] h-6 w-6 rounded-full border-[3px] border-jendela-ink bg-jendela-paper" />
            <dl className="space-y-1 text-sm">
              {type === "flight" && (
                <div className="flex justify-between">
                  <dt>Tiket{back ? " PP" : ""}</dt>
                  <dd>{rupiah(flightEst)}</dd>
                </div>
              )}
              {hotelOn && (
                <div className="flex justify-between">
                  <dt>Hotel {hotelNights} malam</dt>
                  <dd>{rupiah(hotelEst)}</dd>
                </div>
              )}
              {bundleDiscount > 0 && (
                <div className="flex justify-between text-jendela-teal">
                  <dt>Paket hemat 5%</dt>
                  <dd>− {rupiah(bundleDiscount)}</dd>
                </div>
              )}
            </dl>
            <div className="mt-3 text-[10px] uppercase tracking-wider text-jendela-ink/60">Estimasi</div>
            <div className="font-display text-3xl text-jendela-red">{rupiah(total - bundleDiscount)}</div>
            <div className="mt-3 h-10 bg-[repeating-linear-gradient(90deg,#2d1e12_0_2px,transparent_2px_5px,#2d1e12_5px_6px,transparent_6px_9px)]" aria-hidden />
            <div className="mt-1 text-center font-mono text-[10px] tracking-[0.3em]">{code}</div>
            <button
              type="submit"
              className="mt-4 w-full border-[3px] border-jendela-ink bg-jendela-red py-3 font-display uppercase text-jendela-cream shadow-[4px_4px_0_#2d1e12] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#2d1e12]"
            >
              Kirim ke agen
            </button>
            <p className="mt-2 text-center text-xs">Harga final dikonfirmasi agen sebelum pembayaran.</p>
          </div>
        </div>
      </aside>
    </form>
  );
}
