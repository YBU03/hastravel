"use client";

import { useEffect, useState } from "react";
import { formatDate, isValidDate, rupiah } from "@/lib/format";
import { localToday, sayapField, sayapLabel } from "../_components/BookingWidget";
import {
  AIRPORTS,
  findAirport,
  findZone,
  MAX_PAX,
  priceFor,
  SAYAP_WA,
  SHARED_TIMES,
  type Direction,
  type Service,
} from "../data";

const card = "rounded-2xl bg-sayap-card p-5 ring-1 ring-sayap-line md:p-6";

function StepTitle({ n, title }: { n: number; title: string }) {
  return (
    <h2 className="mb-5 flex items-center gap-3 font-display text-lg font-semibold text-white">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sayap-lime text-sm font-bold text-sayap-navy">{n}</span>
      {title}
    </h2>
  );
}

function makeCode() {
  const a = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return "SY" + Array.from({ length: 6 }, () => a[Math.floor(Math.random() * a.length)]).join("");
}

export function BookingFlow({ initial }: { initial: Record<string, string | undefined> }) {
  const [dir, setDir] = useState<Direction>(initial.dir === "to" ? "to" : "from");
  const [airportCode, setAirportCode] = useState(findAirport(initial.airport).code);
  const airport = findAirport(airportCode);
  const [zoneId, setZoneId] = useState(findZone(airport, initial.zone).id);
  const zone = findZone(airport, zoneId);
  const [service, setService] = useState<Service>("shared");
  const [date, setDate] = useState(initial.date ?? "");
  const [time, setTime] = useState(SHARED_TIMES.includes(initial.time ?? "") ? initial.time! : "10:00");
  const [pax, setPax] = useState(Math.min(MAX_PAX, Math.max(1, Number(initial.pax) || 1)));
  const [roundTrip, setRoundTrip] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<{ code: string; wa: string } | null>(null);
  const [today, setToday] = useState("");

  useEffect(() => {
    const t = localToday();
    setToday(t);
    setDate((d) => (d && d >= t ? d : t));
  }, []);

  const base = priceFor(zone, service, pax);
  const subtotal = roundTrip ? base * 2 : base;
  const discount = roundTrip ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount;
  const vans = Math.ceil(pax / MAX_PAX);

  function changeAirport(code: string) {
    setAirportCode(code);
    setZoneId(findAirport(code).zones[0].id);
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const phone = get("phone").replace(/[^\d+]/g, "");
    if (phone.replace(/\D/g, "").length < 9) return setError("Nomor WhatsApp tidak valid.");
    setError("");
    const code = makeCode();
    const lines = [
      "Halo Sayap Shuttle, saya mau pesan antar-jemput bandara ✈️",
      "",
      `*Kode: ${code}*`,
      `Layanan: ${service === "shared" ? "Shared shuttle" : `Private van (${vans} unit)`}`,
      `Arah: ${dir === "from" ? `Dari bandara ${airport.code} ke ${zone.name}` : `Dari ${zone.name} ke bandara ${airport.code}`}`,
      `Tanggal: ${isValidDate(date) ? formatDate(date) : date}`,
      `${dir === "from" ? "Jam mendarat" : "Jam jemput"}: ${time} ${airport.tz}`,
      `No. penerbangan: ${get("flight") || "-"}`,
      `Penumpang: ${pax} orang · Bagasi: ${get("luggage") || "-"} koper`,
      roundTrip ? "Pulang-pergi: Ya (diskon 10%)" : "",
      "",
      `Nama: ${get("name")}`,
      `WhatsApp: ${phone}`,
      `${dir === "from" ? "Alamat / hotel tujuan" : "Alamat / hotel jemput"}: ${get("address")}`,
      get("notes") ? `Catatan: ${get("notes")}` : "",
      "",
      `*Total: ${rupiah(total)}*`,
    ].filter((l, i, arr) => l !== "" || arr[i - 1] !== "");
    const wa = `https://wa.me/${SAYAP_WA}?text=${encodeURIComponent(lines.join("\n"))}`;
    setDone({ code, wa });
    window.open(wa, "_blank", "noopener");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (done) {
    return (
      <div className={`${card} mx-auto mt-8 max-w-lg text-center`}>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sayap-lime text-2xl text-sayap-navy">✓</div>
        <h2 className="mt-4 font-display text-2xl font-bold text-white">Pesanan siap dikirim!</h2>
        <p className="mt-2 text-sm text-slate-400">Kirim pesan WhatsApp yang sudah terisi ke admin untuk konfirmasi & pembayaran.</p>
        <div className="mt-5 rounded-xl bg-sayap-navy p-4 ring-1 ring-sayap-line">
          <div className="text-xs text-slate-500">Kode pesanan</div>
          <div className="font-display text-2xl font-bold tracking-widest text-sayap-lime">{done.code}</div>
        </div>
        <a
          href={done.wa}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 block rounded-xl bg-[#25D366] py-3.5 font-semibold text-white hover:bg-[#1ebe5b]"
        >
          Buka WhatsApp
        </a>
        <button type="button" onClick={() => setDone(null)} className="mt-3 text-sm text-slate-400 hover:text-white">
          ← Ubah pesanan
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
      <div className="grid gap-5">
        {/* 1. Layanan */}
        <section className={card}>
          <StepTitle n={1} title="Pilih layanan" />
          <div className="grid gap-3 sm:grid-cols-2">
            {(
              [
                ["shared", "Shared Shuttle", "Berangkat tiap jam, bersama penumpang lain.", `${rupiah(zone.shared)} / orang`],
                ["private", "Private Van", "Satu van khusus rombonganmu, jam bebas 24/7.", `${rupiah(zone.private)} / van`],
              ] as const
            ).map(([v, title, text, price]) => (
              <button
                key={v}
                type="button"
                onClick={() => {
                  setService(v);
                  // Shared hanya berangkat tiap jam: bulatkan ke jadwal terdekat.
                  if (v === "shared" && !SHARED_TIMES.includes(time)) {
                    const h = Math.min(22, Math.max(6, Number(time.slice(0, 2)) || 10));
                    setTime(`${String(h).padStart(2, "0")}:00`);
                  }
                }}
                aria-pressed={service === v}
                className={`rounded-xl p-4 text-left ring-1 transition ${
                  service === v ? "bg-sayap-lime/10 ring-2 ring-sayap-lime" : "ring-sayap-line hover:ring-slate-500"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-semibold text-white">{title}</span>
                  <span
                    className={`h-4 w-4 rounded-full border-2 ${service === v ? "border-sayap-lime bg-sayap-lime" : "border-slate-500"}`}
                  />
                </div>
                <p className="mt-1 text-xs text-slate-400">{text}</p>
                <p className="mt-3 font-display text-lg font-bold text-sayap-lime">{price}</p>
              </button>
            ))}
          </div>
        </section>

        {/* 2. Perjalanan */}
        <section className={card}>
          <StepTitle n={2} title="Detail perjalanan" />
          <div className="mb-4 inline-flex rounded-full bg-white/[0.06] p-1 ring-1 ring-white/10">
            {(
              [
                ["from", "Dari Bandara"],
                ["to", "Ke Bandara"],
              ] as const
            ).map(([v, label]) => (
              <button
                key={v}
                type="button"
                onClick={() => setDir(v)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold ${dir === v ? "bg-sayap-lime text-sayap-navy" : "text-slate-300"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className={sayapLabel}>Bandara</span>
              <select value={airportCode} onChange={(e) => changeAirport(e.target.value)} className={sayapField}>
                {AIRPORTS.map((a) => (
                  <option key={a.code} value={a.code} className="bg-sayap-navy">
                    {a.code} · {a.name}, {a.city}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className={sayapLabel}>{dir === "from" ? "Zona tujuan" : "Zona jemput"}</span>
              <select value={zoneId} onChange={(e) => setZoneId(e.target.value)} className={sayapField}>
                {airport.zones.map((z) => (
                  <option key={z.id} value={z.id} className="bg-sayap-navy">
                    {z.name} (± {z.minutes} mnt)
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className={sayapLabel}>Tanggal</span>
              <input
                type="date"
                required
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`${sayapField} [color-scheme:dark]`}
              />
            </label>
            <label>
              <span className={sayapLabel}>
                {dir === "from" ? "Jam mendarat" : "Jam jemput"} ({airport.tz})
              </span>
              {service === "shared" ? (
                <select value={time} onChange={(e) => setTime(e.target.value)} className={sayapField}>
                  {SHARED_TIMES.map((t) => (
                    <option key={t} value={t} className="bg-sayap-navy">
                      {t}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={`${sayapField} [color-scheme:dark]`}
                />
              )}
            </label>
            <div>
              <span className={sayapLabel}>Penumpang</span>
              <div className={`${sayapField} justify-between px-2`}>
                <button
                  type="button"
                  aria-label="Kurangi penumpang"
                  onClick={() => setPax((p) => Math.max(1, p - 1))}
                  className="h-8 w-8 rounded-lg bg-white/10 text-lg leading-none"
                >
                  −
                </button>
                <span className="font-display font-bold">{pax} orang</span>
                <button
                  type="button"
                  aria-label="Tambah penumpang"
                  onClick={() => setPax((p) => Math.min(MAX_PAX * 3, p + 1))}
                  className="h-8 w-8 rounded-lg bg-white/10 text-lg leading-none"
                >
                  +
                </button>
              </div>
            </div>
            <label>
              <span className={sayapLabel}>No. penerbangan {dir === "to" && "(opsional)"}</span>
              <input
                name="flight"
                required={dir === "from"}
                placeholder="Contoh: GA 404"
                className={`${sayapField} uppercase placeholder:normal-case placeholder:text-slate-500`}
              />
            </label>
          </div>
          <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-xl bg-sayap-lime/5 p-3 ring-1 ring-sayap-lime/20">
            <input
              type="checkbox"
              checked={roundTrip}
              onChange={(e) => setRoundTrip(e.target.checked)}
              className="h-4 w-4 accent-[#C6F432]"
            />
            <span className="text-sm">
              <b className="text-white">Pulang-pergi</b> <span className="text-slate-400">— hemat 10%, jadwal pulang dikonfirmasi admin.</span>
            </span>
          </label>
        </section>

        {/* 3. Penumpang */}
        <section className={card}>
          <StepTitle n={3} title="Data pemesan" />
          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className={sayapLabel}>Nama lengkap</span>
              <input name="name" required maxLength={80} className={sayapField} placeholder="Nama sesuai identitas" />
            </label>
            <label>
              <span className={sayapLabel}>WhatsApp</span>
              <input name="phone" required type="tel" inputMode="tel" className={sayapField} placeholder="08xxxxxxxxxx" />
            </label>
            <label className="sm:col-span-2">
              <span className={sayapLabel}>{dir === "from" ? "Alamat / hotel tujuan" : "Alamat / hotel jemput"}</span>
              <input name="address" required maxLength={200} className={sayapField} placeholder="Nama hotel atau alamat lengkap" />
            </label>
            <label>
              <span className={sayapLabel}>Jumlah koper</span>
              <input name="luggage" type="number" min={0} max={40} defaultValue={pax} className={sayapField} />
            </label>
            <label>
              <span className={sayapLabel}>Catatan (opsional)</span>
              <input name="notes" maxLength={200} className={sayapField} placeholder="Kursi bayi, papan selancar, dll." />
            </label>
          </div>
        </section>
      </div>

      {/* Ringkasan */}
      <aside className="lg:sticky lg:top-6">
        <div className={card}>
          <h2 className="font-display text-lg font-semibold text-white">Ringkasan</h2>
          <div className="mt-4 rounded-xl bg-sayap-navy p-4 ring-1 ring-sayap-line">
            <div className="text-xs text-slate-500">{dir === "from" ? "Dari bandara" : "Ke bandara"}</div>
            <div className="mt-1 font-display font-semibold text-white">
              {dir === "from" ? `${airport.code} → ${zone.name}` : `${zone.name} → ${airport.code}`}
            </div>
            <div className="mt-2 text-sm text-slate-400">
              {isValidDate(date) ? formatDate(date) : "-"} · {time} {airport.tz}
            </div>
          </div>
          <dl className="mt-4 space-y-2 text-sm">
            <Row label="Layanan" value={service === "shared" ? "Shared" : `Private · ${vans} van`} />
            <Row
              label={service === "shared" ? `${rupiah(zone.shared)} × ${pax} orang` : `${rupiah(zone.private)} × ${vans} van`}
              value={rupiah(base)}
            />
            {roundTrip && <Row label="Pulang-pergi × 2" value={rupiah(subtotal)} />}
            {roundTrip && <Row label="Diskon 10%" value={`− ${rupiah(discount)}`} accent />}
            <div className="flex items-center justify-between border-t border-sayap-line pt-3">
              <dt className="font-semibold text-white">Total</dt>
              <dd className="font-display text-2xl font-bold text-sayap-lime">{rupiah(total)}</dd>
            </div>
          </dl>
          {error && <p className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>}
          <button
            type="submit"
            className="mt-5 hidden w-full rounded-xl bg-sayap-lime py-3.5 font-display font-bold text-sayap-navy shadow-[0_0_30px_rgba(198,244,50,0.3)] hover:bg-white lg:block"
          >
            Pesan via WhatsApp
          </button>
          <p className="mt-3 text-center text-xs text-slate-500">Termasuk tol & parkir · Gratis tunggu 60 menit</p>
        </div>
      </aside>

      {/* Bar bawah (HP) */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-sayap-line bg-sayap-ink/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur lg:hidden">
        <div className="min-w-0 flex-1">
          <div className="text-xs text-slate-500">Total</div>
          <div className="font-display text-xl font-bold text-sayap-lime">{rupiah(total)}</div>
        </div>
        <button type="submit" className="rounded-xl bg-sayap-lime px-5 py-3 font-display font-bold text-sayap-navy">
          Pesan via WA
        </button>
      </div>
    </form>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-slate-400">{label}</dt>
      <dd className={accent ? "text-sayap-lime" : "text-white"}>{value}</dd>
    </div>
  );
}
