"use client";

import { useEffect, useState } from "react";
import { addDays, formatDate, rupiah } from "@/lib/format";
import { Photo } from "../_components/Photo";
import { ADDONS, CITIES, findUnit, isBooked, KENCANA_WA, PACKAGES, UNITS, type PackageId } from "../data";
import { Calendar } from "./Calendar";

const section = "border border-kencana-line p-6 md:p-8";
const label = "mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-kencana-ivory/50";
const field =
  "w-full border-0 border-b border-kencana-line bg-transparent px-0 py-2.5 text-kencana-ivory outline-none placeholder:text-kencana-ivory/25 focus:border-kencana-gold";

function Step({ n, title }: { n: string; title: string }) {
  return (
    <h2 className="mb-6 flex items-baseline gap-4">
      <span className="font-display text-3xl italic text-kencana-gold/60">{n}</span>
      <span className="font-display text-2xl text-kencana-ivory md:text-3xl">{title}</span>
    </h2>
  );
}

function localToday() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function ReservationFlow({ initialUnit, initialPackage }: { initialUnit?: string; initialPackage?: string }) {
  const [unitSlug, setUnitSlug] = useState(findUnit(initialUnit).slug);
  const unit = findUnit(unitSlug);
  const [pkg, setPkg] = useState<PackageId>(PACKAGES.some((p) => p.id === initialPackage) ? (initialPackage as PackageId) : "full");
  const [days, setDays] = useState(1);
  const [today, setToday] = useState("");
  const [start, setStart] = useState("");
  const [addons, setAddons] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [done, setDone] = useState<{ code: string; wa: string } | null>(null);

  useEffect(() => setToday(localToday()), []);

  const span = pkg === "full" ? days : 1;
  const dates = start ? Array.from({ length: span }, (_, i) => addDays(start, i)) : [];
  const clash = dates.filter((d) => isBooked(unit.slug, d));
  const base = unit.prices[pkg] * span;
  const addonTotal = ADDONS.filter((a) => addons.includes(a.id)).reduce((s, a) => s + a.price, 0);
  const total = base + addonTotal;

  function chooseUnit(slug: string) {
    setUnitSlug(slug);
    setError("");
    // Tanggal yang dipilih mungkin sudah terpesan untuk unit lain.
    if (start && isBooked(slug, start)) setStart("");
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!start) return setError("Pilih tanggal di kalender terlebih dahulu.");
    if (clash.length) return setError(`Unit sudah terpesan pada ${clash.map((d) => formatDate(d, { weekday: false })).join(", ")}.`);
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    if (get("phone").replace(/\D/g, "").length < 9) return setError("Nomor WhatsApp tidak valid.");
    setError("");
    const code = "KE" + Math.random().toString(36).slice(2, 8).toUpperCase();
    const pack = PACKAGES.find((p) => p.id === pkg)!;
    const text = [
      "Selamat siang Kencana Executive, saya ingin melakukan reservasi.",
      "",
      `*Kode: ${code}*`,
      `Unit: ${unit.name} ${unit.variant}`,
      `Paket: ${pack.name}${pkg === "full" ? ` × ${days} hari` : ""}`,
      `Tanggal: ${formatDate(start)}${span > 1 ? ` s/d ${formatDate(dates[dates.length - 1])}` : ""}`,
      `Jam jemput: ${get("time")}`,
      `Kota: ${get("city")}`,
      `Lokasi jemput: ${get("pickup")}`,
      `Tujuan / agenda: ${get("agenda") || "-"}`,
      `Acara: ${get("occasion")}`,
      addons.length ? `Tambahan: ${ADDONS.filter((a) => addons.includes(a.id)).map((a) => a.name).join(", ")}` : "",
      "",
      `Nama: ${get("name")}`,
      `WhatsApp: ${get("phone")}`,
      "",
      `*Estimasi total: ${rupiah(total)}*`,
    ].filter((l, i, a) => l !== "" || a[i - 1] !== "");
    const wa = `https://wa.me/${KENCANA_WA}?text=${encodeURIComponent(text.join("\n"))}`;
    setDone({ code, wa });
    window.open(wa, "_blank", "noopener");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (done) {
    return (
      <div className="mx-auto mt-12 max-w-lg border border-kencana-gold/40 p-10 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-kencana-gold">Terima kasih</p>
        <h2 className="mt-4 font-display text-4xl text-kencana-ivory">Reservasi siap dikirim</h2>
        <p className="mt-3 text-sm text-kencana-ivory/60">Concierge kami akan mengonfirmasi ketersediaan & pembayaran via WhatsApp.</p>
        <div className="my-8 font-display text-3xl tracking-[0.2em] text-kencana-gold">{done.code}</div>
        <a
          href={done.wa}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-kencana-gold py-4 text-xs font-bold uppercase tracking-[0.25em] text-kencana-black hover:bg-kencana-gold-light"
        >
          Buka WhatsApp
        </a>
        <button type="button" onClick={() => setDone(null)} className="mt-4 text-xs uppercase tracking-[0.2em] text-kencana-ivory/50 hover:text-kencana-ivory">
          ← Ubah reservasi
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
      <div className="grid gap-6">
        {/* Unit */}
        <section className={section}>
          <Step n="I" title="Pilih unit" />
          <div className="grid gap-3 sm:grid-cols-2">
            {UNITS.map((u) => (
              <button
                key={u.slug}
                type="button"
                onClick={() => chooseUnit(u.slug)}
                aria-pressed={u.slug === unitSlug}
                className={`flex gap-4 border p-3 text-left transition ${
                  u.slug === unitSlug ? "border-kencana-gold bg-kencana-gold/5" : "border-kencana-line hover:border-kencana-ivory/30"
                }`}
              >
                <Photo src={u.image} alt={u.name} className="h-16 w-24 shrink-0" />
                <span className="min-w-0">
                  <span className="block font-display text-xl leading-tight text-kencana-ivory">{u.name}</span>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-kencana-gold">{u.variant}</span>
                  <span className="mt-1 block text-xs text-kencana-ivory/50">
                    {u.seats} penumpang · {u.luggage} koper
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Paket */}
        <section className={section}>
          <Step n="II" title="Paket" />
          <div className="grid gap-3 sm:grid-cols-3">
            {PACKAGES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPkg(p.id)}
                aria-pressed={pkg === p.id}
                className={`border p-4 text-left transition ${
                  pkg === p.id ? "border-kencana-gold bg-kencana-gold/5" : "border-kencana-line hover:border-kencana-ivory/30"
                }`}
              >
                <span className="block font-display text-xl text-kencana-ivory">{p.name}</span>
                <span className="block text-xs text-kencana-ivory/50">{p.detail}</span>
                <span className="mt-3 block font-display text-xl text-kencana-gold">{rupiah(unit.prices[p.id])}</span>
              </button>
            ))}
          </div>
          {pkg === "full" && (
            <div className="mt-5 flex items-center gap-4">
              <span className={`${label} mb-0`}>Durasi</span>
              <div className="flex items-center border border-kencana-line">
                <button type="button" onClick={() => setDays((d) => Math.max(1, d - 1))} className="h-9 w-9 text-kencana-ivory hover:text-kencana-gold" aria-label="Kurangi hari">
                  −
                </button>
                <span className="w-16 text-center font-display text-lg text-kencana-ivory">{days} hari</span>
                <button type="button" onClick={() => setDays((d) => Math.min(14, d + 1))} className="h-9 w-9 text-kencana-ivory hover:text-kencana-gold" aria-label="Tambah hari">
                  +
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Tanggal */}
        <section className={section}>
          <Step n="III" title="Tanggal" />
          {today && (
            <Calendar
              key={unit.slug}
              unit={unit.slug}
              today={today}
              start={start}
              days={span}
              onSelect={(d) => {
                setStart(d);
                setError("");
              }}
            />
          )}
          {clash.length > 0 && (
            <p className="mt-4 text-sm text-red-300">
              Rentang tanggal bertabrakan dengan jadwal terpesan. Pilih tanggal lain atau kurangi durasi.
            </p>
          )}
        </section>

        {/* Detail */}
        <section className={section}>
          <Step n="IV" title="Detail perjalanan" />
          <div className="grid gap-6 sm:grid-cols-2">
            <label>
              <span className={label}>Kota</span>
              <select name="city" className={`${field} [&>option]:bg-kencana-coal`}>
                {CITIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label>
              <span className={label}>Jam jemput</span>
              <input name="time" type="time" required defaultValue="09:00" className={`${field} [color-scheme:dark]`} />
            </label>
            <label className="sm:col-span-2">
              <span className={label}>Lokasi jemput</span>
              <input name="pickup" required maxLength={200} className={field} placeholder="Hotel, rumah, atau terminal bandara" />
            </label>
            <label className="sm:col-span-2">
              <span className={label}>Tujuan / agenda</span>
              <input name="agenda" maxLength={300} className={field} placeholder="Misal: rapat di SCBD, lalu makan malam di Senopati" />
            </label>
            <label>
              <span className={label}>Acara</span>
              <select name="occasion" className={`${field} [&>option]:bg-kencana-coal`}>
                {["Bisnis / korporat", "Pernikahan", "Liburan keluarga", "Tamu VIP", "Lainnya"].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
          </div>
          <fieldset className="mt-8">
            <legend className={label}>Layanan tambahan</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {ADDONS.map((a) => (
                <label
                  key={a.id}
                  className={`flex cursor-pointer items-center justify-between gap-3 border px-4 py-3 text-sm transition ${
                    addons.includes(a.id) ? "border-kencana-gold text-kencana-ivory" : "border-kencana-line"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={addons.includes(a.id)}
                      onChange={(e) => setAddons((cur) => (e.target.checked ? [...cur, a.id] : cur.filter((x) => x !== a.id)))}
                      className="h-4 w-4 accent-[#c9a96e]"
                    />
                    {a.name}
                  </span>
                  <span className="shrink-0 text-xs text-kencana-gold">+{rupiah(a.price)}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </section>

        {/* Kontak */}
        <section className={section}>
          <Step n="V" title="Data pemesan" />
          <div className="grid gap-6 sm:grid-cols-2">
            <label>
              <span className={label}>Nama lengkap</span>
              <input name="name" required maxLength={80} className={field} placeholder="Bapak / Ibu ..." />
            </label>
            <label>
              <span className={label}>WhatsApp</span>
              <input name="phone" required type="tel" inputMode="tel" className={field} placeholder="08xxxxxxxxxx" />
            </label>
          </div>
        </section>
      </div>

      {/* Ringkasan */}
      <aside className="lg:sticky lg:top-6">
        <div className="border border-kencana-gold/40 bg-kencana-coal p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-kencana-gold">Ringkasan</p>
          <h3 className="mt-3 font-display text-2xl text-kencana-ivory">{unit.name}</h3>
          <p className="text-[10px] uppercase tracking-[0.2em] text-kencana-ivory/50">{unit.variant}</p>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-kencana-ivory/50">Tanggal</dt>
              <dd className="text-right text-kencana-ivory">
                {start ? formatDate(start, { weekday: false }) : "—"}
                {span > 1 && start && ` – ${formatDate(dates[dates.length - 1], { weekday: false })}`}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-kencana-ivory/50">
                {PACKAGES.find((p) => p.id === pkg)!.name}
                {span > 1 && ` × ${span}`}
              </dt>
              <dd className="text-kencana-ivory">{rupiah(base)}</dd>
            </div>
            {ADDONS.filter((a) => addons.includes(a.id)).map((a) => (
              <div key={a.id} className="flex justify-between gap-3">
                <dt className="text-kencana-ivory/50">{a.name}</dt>
                <dd className="text-kencana-ivory">{rupiah(a.price)}</dd>
              </div>
            ))}
            <div className="flex items-end justify-between border-t border-kencana-line pt-4">
              <dt className="text-[10px] uppercase tracking-[0.25em] text-kencana-ivory/50">Estimasi total</dt>
              <dd className="font-display text-3xl text-kencana-gold">{rupiah(total)}</dd>
            </div>
          </dl>
          {error && <p className="mt-4 border border-red-400/30 px-3 py-2 text-sm text-red-300">{error}</p>}
          <button
            type="submit"
            className="mt-6 hidden w-full bg-kencana-gold py-4 text-xs font-bold uppercase tracking-[0.25em] text-kencana-black hover:bg-kencana-gold-light lg:block"
          >
            Kirim via WhatsApp
          </button>
          <p className="mt-4 text-center text-[11px] text-kencana-ivory/40">Termasuk chauffeur & BBM · Tol dan parkir sesuai pemakaian</p>
        </div>
      </aside>

      {/* Bar bawah (HP) */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-kencana-line bg-kencana-black/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur lg:hidden">
        <div className="min-w-0 flex-1">
          <div className="text-[10px] uppercase tracking-[0.2em] text-kencana-ivory/50">Estimasi total</div>
          <div className="font-display text-2xl text-kencana-gold">{rupiah(total)}</div>
        </div>
        <button type="submit" className="bg-kencana-gold px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-kencana-black">
          Kirim via WA
        </button>
      </div>
    </form>
  );
}
