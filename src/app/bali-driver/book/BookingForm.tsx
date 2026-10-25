"use client";

import { useEffect, useState } from "react";
import { addDays, isValidDate, rupiah } from "@/lib/format";
import { AREAS, BALI_WA, CARS, DRIVERS, RATES, ROUTES, usd } from "../data";

const field =
  "w-full border-0 border-b border-editorial-ink/40 bg-transparent px-0 py-2.5 text-base outline-none transition focus:border-editorial-ink focus:ring-0";
const formatDate = (d: string) =>
  new Date(`${d}T00:00:00`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
const label = "block text-[11px] font-medium uppercase tracking-[0.18em] text-editorial-mute";

export function BookingForm({ initial }: { initial: Record<string, string | undefined> }) {
  const initialRoute = ROUTES.find((r) => r.id === initial.route);
  const [mode, setMode] = useState<"route" | "custom">(initialRoute ? "route" : "custom");
  const [route, setRoute] = useState(initialRoute?.id ?? ROUTES[0].id);
  const [rate, setRate] = useState(RATES.find((r) => r.id === initial.rate)?.id ?? "8h");
  const [car, setCar] = useState("avanza");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("08:00");
  const [area, setArea] = useState(AREAS[0]);
  const [pax, setPax] = useState(2);
  const [driver, setDriver] = useState(DRIVERS.find((d) => d.id === initial.driver)?.id ?? "any");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const d = new Date();
    const t = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    setDate((x) => (isValidDate(x) && x > t ? x : addDays(t, 1)));
  }, []);

  const selectedRoute = ROUTES.find((r) => r.id === route)!;
  const selectedRate = RATES.find((r) => r.id === (mode === "route" ? selectedRoute.rate : rate))!;
  const selectedCar = CARS.find((c) => c.id === car)!;
  const total = Math.round((selectedRate.price * selectedCar.factor) / 5000) * 5000;
  const tooMany = pax > selectedCar.seats;
  const driverName = driver === "any" ? "Any available driver" : DRIVERS.find((d) => d.id === driver)!.name;

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (tooMany) return;
    const fd = new FormData(e.currentTarget);
    const lines = [
      "Hello Bali Driver Co., I'd like to book a driver:",
      "",
      mode === "route" ? `Route: ${selectedRoute.name} (${selectedRate.hours}h)` : `Package: ${selectedRate.name} (${selectedRate.hours}h)`,
      `Date: ${formatDate(date)} · Pickup ${time}`,
      `Pickup area: ${area}`,
      `Passengers: ${pax} · Car: ${selectedCar.name}`,
      `Driver: ${driverName}`,
      "",
      `Name: ${fd.get("name")}`,
      `WhatsApp: ${fd.get("phone")}`,
      fd.get("hotel") ? `Hotel: ${fd.get("hotel")}` : "",
      fd.get("note") ? `Notes: ${fd.get("note")}` : "",
      "",
      `Estimate: ${rupiah(total)} (${usd(total)})`,
    ].filter((l, i, a) => l !== "" || a[i - 1] !== "");
    window.open(`https://wa.me/${BALI_WA}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
    setDone(true);
  }

  if (done) {
    return (
      <div className="mt-12 border-y border-editorial-ink py-16 text-center">
        <p className="font-display text-5xl leading-none md:text-6xl">
          Thank you. <em>We&rsquo;ll be in touch.</em>
        </p>
        <p className="mx-auto mt-5 max-w-md text-editorial-mute">
          Your request opened in WhatsApp. Send the message and we&rsquo;ll reply with your driver&rsquo;s name and the confirmed price.
        </p>
        <button type="button" onClick={() => setDone(false)} className="mt-8 border-b border-editorial-ink pb-0.5 text-sm">
          ← Edit request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-12 grid gap-12 lg:grid-cols-[1fr_22rem]">
      <div className="space-y-12">
        {/* 1. What */}
        <fieldset>
          <legend className="w-full border-t border-editorial-ink pt-3 text-[11px] font-medium uppercase tracking-[0.2em]">01 · The day</legend>
          <div className="mt-5 inline-flex border border-editorial-ink text-sm" role="tablist">
            {(
              [
                ["custom", "By the hour"],
                ["route", "Sample route"],
              ] as const
            ).map(([id, name]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={mode === id}
                onClick={() => setMode(id)}
                className={`px-5 py-2 ${mode === id ? "bg-editorial-ink text-editorial-paper" : "hover:bg-editorial-stone/40"}`}
              >
                {name}
              </button>
            ))}
          </div>
          {mode === "custom" ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {RATES.map((r) => (
                <label key={r.id} className={`flex cursor-pointer items-baseline gap-4 border p-4 ${rate === r.id ? "border-editorial-ink bg-editorial-stone/40" : "border-editorial-ink/20 hover:border-editorial-ink/60"}`}>
                  <input type="radio" name="rate" value={r.id} checked={rate === r.id} onChange={() => setRate(r.id)} className="sr-only" />
                  <span className="font-display text-4xl">{r.hours}h</span>
                  <span className="text-sm">
                    <span className="block font-medium">{r.name}</span>
                    <span className="text-editorial-mute">{rupiah(r.price)}</span>
                  </span>
                </label>
              ))}
            </div>
          ) : (
            <div className="mt-6 divide-y divide-editorial-ink/20 border-y border-editorial-ink/20">
              {ROUTES.map((r) => (
                <label key={r.id} className={`flex cursor-pointer items-baseline gap-4 px-2 py-4 ${route === r.id ? "bg-editorial-stone/40" : "hover:bg-editorial-stone/20"}`}>
                  <input type="radio" name="route" value={r.id} checked={route === r.id} onChange={() => setRoute(r.id)} className="sr-only" />
                  <span className="text-editorial-mute">{r.no}</span>
                  <span className="flex-1">
                    <span className="block font-display text-2xl">{r.name}</span>
                    <span className="block text-sm text-editorial-mute">{r.stops.join(" · ")}</span>
                  </span>
                  <span className="text-sm">{RATES.find((x) => x.id === r.rate)!.hours}h</span>
                </label>
              ))}
            </div>
          )}
        </fieldset>

        {/* 2. When & where */}
        <fieldset>
          <legend className="w-full border-t border-editorial-ink pt-3 text-[11px] font-medium uppercase tracking-[0.2em]">02 · When & where</legend>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            <label>
              <span className={label}>Date</span>
              <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className={field} />
            </label>
            <label>
              <span className={label}>Pickup time</span>
              <input type="time" required value={time} onChange={(e) => setTime(e.target.value)} className={field} />
            </label>
            <label>
              <span className={label}>Pickup area</span>
              <select value={area} onChange={(e) => setArea(e.target.value)} className={field}>
                {AREAS.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </label>
            <label>
              <span className={label}>Hotel or villa (optional)</span>
              <input name="hotel" placeholder="e.g. Alila Seminyak" className={field} />
            </label>
          </div>
        </fieldset>

        {/* 3. Car & driver */}
        <fieldset>
          <legend className="w-full border-t border-editorial-ink pt-3 text-[11px] font-medium uppercase tracking-[0.2em]">03 · Car & driver</legend>
          <div className="mt-6 flex items-center justify-between gap-4">
            <span className={label}>Passengers</span>
            <div className="flex items-center border border-editorial-ink">
              <button type="button" aria-label="Fewer passengers" onClick={() => setPax((p) => Math.max(1, p - 1))} className="h-10 w-10 hover:bg-editorial-stone/40">
                −
              </button>
              <span className="w-10 text-center tabular-nums">{pax}</span>
              <button type="button" aria-label="More passengers" onClick={() => setPax((p) => Math.min(12, p + 1))} className="h-10 w-10 hover:bg-editorial-stone/40">
                +
              </button>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {CARS.map((c) => (
              <label key={c.id} className={`cursor-pointer border p-4 ${car === c.id ? "border-editorial-ink bg-editorial-stone/40" : "border-editorial-ink/20 hover:border-editorial-ink/60"}`}>
                <input type="radio" name="car" value={c.id} checked={car === c.id} onChange={() => setCar(c.id)} className="sr-only" />
                <span className="block font-medium">{c.name}</span>
                <span className="block text-sm text-editorial-mute">Up to {c.seats} guests</span>
              </label>
            ))}
          </div>
          {tooMany && (
            <p className="mt-3 text-sm text-red-700" role="alert">
              The {selectedCar.name} seats {selectedCar.seats}. Please choose a bigger car.
            </p>
          )}
          <div className="mt-8">
            <span className={label}>Preferred driver</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {[{ id: "any", name: "Any available" }, ...DRIVERS].map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDriver(d.id)}
                  aria-pressed={driver === d.id}
                  className={`border px-4 py-2 text-sm ${driver === d.id ? "border-editorial-ink bg-editorial-ink text-editorial-paper" : "border-editorial-ink/30 hover:border-editorial-ink"}`}
                >
                  {d.name}
                </button>
              ))}
            </div>
          </div>
        </fieldset>

        {/* 4. You */}
        <fieldset>
          <legend className="w-full border-t border-editorial-ink pt-3 text-[11px] font-medium uppercase tracking-[0.2em]">04 · About you</legend>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            <label>
              <span className={label}>Full name</span>
              <input name="name" required autoComplete="name" className={field} />
            </label>
            <label>
              <span className={label}>WhatsApp number</span>
              <input name="phone" required type="tel" autoComplete="tel" placeholder="+44 7700 900123" className={field} />
            </label>
            <label className="sm:col-span-2">
              <span className={label}>Notes (optional)</span>
              <textarea name="note" rows={3} placeholder="Child seat, places you'd like to see, flight number…" className={field} />
            </label>
          </div>
        </fieldset>
      </div>

      {/* Summary */}
      <aside className="lg:sticky lg:top-6 lg:self-start">
        <div className="border border-editorial-ink bg-white p-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-editorial-mute">Your day</p>
          <p className="mt-3 font-display text-3xl leading-tight">
            {mode === "route" ? selectedRoute.name : `${selectedRate.name}, ${selectedRate.hours}h`}
          </p>
          <dl className="mt-6 space-y-2 border-t border-editorial-ink/20 pt-4 text-sm">
            {[
              ["Date", isValidDate(date) ? `${formatDate(date)} · ${time}` : "-"],
              ["Pickup", area],
              ["Car", `${selectedCar.name} · ${pax} pax`],
              ["Driver", driverName],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt className="text-editorial-mute">{k}</dt>
                <dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 border-t border-editorial-ink pt-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm">Estimate</span>
              <span className="font-display text-4xl tabular-nums">{rupiah(total)}</span>
            </div>
            <p className="mt-1 text-right text-xs text-editorial-mute">{usd(total)} · fuel & parking included</p>
          </div>
          <button type="submit" disabled={tooMany} className="mt-6 w-full bg-editorial-ink py-4 text-sm font-medium text-editorial-paper hover:bg-black disabled:opacity-40">
            Send request on WhatsApp
          </button>
          <p className="mt-3 text-center text-xs text-editorial-mute">Free cancellation up to 24 hours before pickup.</p>
        </div>
      </aside>
    </form>
  );
}
