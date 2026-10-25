"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { addDays } from "@/lib/format";
import { CITIES } from "../data";

export const retroField = "h-12 w-full border-[3px] border-jendela-ink bg-jendela-cream px-3 text-sm font-semibold outline-none focus:bg-white";
export const retroLabel = "mb-1 block font-display text-xs uppercase tracking-wider";

export function SearchBox({ defaultTo = "DPS" }: { defaultTo?: string }) {
  const router = useRouter();
  const [tab, setTab] = useState<"flight" | "hotel">("flight");
  const [from, setFrom] = useState("CGK");
  const [to, setTo] = useState(defaultTo);
  const [date, setDate] = useState("");
  const [back, setBack] = useState("");
  const [pax, setPax] = useState(1);
  const [city, setCity] = useState("DPS");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [rooms, setRooms] = useState(1);
  const [today, setToday] = useState("");

  useEffect(() => {
    const d = new Date();
    const t = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    setToday(t);
    setDate(addDays(t, 7));
    setCheckin(addDays(t, 7));
    setCheckout(addDays(t, 9));
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q =
      tab === "flight"
        ? new URLSearchParams({ type: "flight", from, to, date, back, pax: String(pax) })
        : new URLSearchParams({ type: "hotel", city, checkin, checkout, rooms: String(rooms), pax: String(pax) });
    router.push(`/jendela-trip/pesan?${q}`);
  }

  return (
    <form onSubmit={submit} className="border-[3px] border-jendela-ink bg-jendela-cream shadow-[8px_8px_0_#2d1e12]">
      <div className="flex border-b-[3px] border-jendela-ink">
        {(
          [
            ["flight", "✈ Tiket pesawat"],
            ["hotel", "🏨 Hotel"],
          ] as const
        ).map(([v, l]) => (
          <button
            key={v}
            type="button"
            onClick={() => setTab(v)}
            aria-pressed={tab === v}
            className={`flex-1 px-4 py-3 font-display uppercase tracking-wide ${tab === v ? "bg-jendela-ink text-jendela-mustard" : "hover:bg-jendela-paper"}`}
          >
            {l}
          </button>
        ))}
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_0.7fr_auto] lg:items-end">
        {tab === "flight" ? (
          <>
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
              <input type="date" required min={today} value={date} onChange={(e) => setDate(e.target.value)} className={retroField} />
            </label>
            <label>
              <span className={retroLabel}>Pulang (opsional)</span>
              <input type="date" min={date} value={back} onChange={(e) => setBack(e.target.value)} className={retroField} />
            </label>
          </>
        ) : (
          <>
            <label>
              <span className={retroLabel}>Kota / area</span>
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
              <input type="date" required min={today} value={checkin} onChange={(e) => setCheckin(e.target.value)} className={retroField} />
            </label>
            <label>
              <span className={retroLabel}>Check-out</span>
              <input type="date" required min={checkin} value={checkout} onChange={(e) => setCheckout(e.target.value)} className={retroField} />
            </label>
          </>
        )}
        <label>
          <span className={retroLabel}>{tab === "flight" ? "Penumpang" : "Tamu"}</span>
          <input type="number" min={1} max={30} value={pax} onChange={(e) => setPax(Math.max(1, Number(e.target.value) || 1))} className={retroField} />
        </label>
        <button
          type="submit"
          className="h-12 border-[3px] border-jendela-ink bg-jendela-red px-6 font-display uppercase text-jendela-cream shadow-[4px_4px_0_#2d1e12] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#2d1e12] sm:col-span-2 lg:col-span-1"
        >
          Cari
        </button>
      </div>
    </form>
  );
}
