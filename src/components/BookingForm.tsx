"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { rupiah } from "@/lib/format";
import { MAX_SEATS_PER_BOOKING } from "@/lib/seats";
import { IconWhatsapp } from "./icons";
import { SeatMap } from "./SeatMap";

export type TripInfo = {
  scheduleId: number;
  date: string;
  dateLabel: string;
  originName: string;
  destinationName: string;
  departTime: string;
  departTz: string;
  arrivalTime: string;
  arrivalTz: string;
  arrivalDayOffset: number;
  price: number;
};

export type BookingPayload = {
  scheduleId: number;
  date: string;
  seats: number[];
  passengers: { seat: number; name: string }[];
  customerName: string;
  phone: string;
  pickupAddress: string;
  dropoffAddress: string;
  notes: string;
  status?: "pending" | "paid";
};

export type BookingResult = { ok: true; redirect: string } | { ok: false; error: string; taken?: number[] };

type Props = {
  trip: TripInfo;
  taken: number[];
  blocked: number[];
  pax: number;
  mode: "web" | "admin";
  action: (payload: BookingPayload) => Promise<BookingResult>;
};

const input =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

export function BookingForm({ trip, taken: initialTaken, blocked, pax: initialPax, mode, action }: Props) {
  const router = useRouter();
  const [taken, setTaken] = useState(initialTaken);
  const [pax, setPax] = useState(Math.min(initialPax, MAX_SEATS_PER_BOOKING));
  const [selected, setSelected] = useState<number[]>([]);
  const [names, setNames] = useState<Record<number, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function toggle(seat: number) {
    setError(null);
    setSelected((cur) => {
      if (cur.includes(seat)) return cur.filter((s) => s !== seat);
      // Sudah penuh: kursi pertama yang dipilih diganti kursi baru.
      const next = cur.length >= pax ? cur.slice(1) : cur;
      return [...next, seat];
    });
  }

  function changePax(n: number) {
    const v = Math.max(1, Math.min(MAX_SEATS_PER_BOOKING, n));
    setPax(v);
    setSelected((cur) => cur.slice(0, v));
  }

  const seats = [...selected].sort((a, b) => a - b);
  const total = seats.length * trip.price;
  const ready = seats.length === pax;

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ready) {
      setError(`Pilih ${pax} kursi terlebih dahulu (baru ${seats.length}).`);
      document.getElementById("pilih-kursi")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const fd = new FormData(e.currentTarget);
    const payload: BookingPayload = {
      scheduleId: trip.scheduleId,
      date: trip.date,
      seats,
      passengers: seats.map((seat) => ({ seat, name: names[seat] ?? "" })),
      customerName: String(fd.get("customerName") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      pickupAddress: String(fd.get("pickupAddress") ?? ""),
      dropoffAddress: String(fd.get("dropoffAddress") ?? ""),
      notes: String(fd.get("notes") ?? ""),
      status: mode === "admin" ? (String(fd.get("status")) as "pending" | "paid") : undefined,
    };
    startTransition(async () => {
      const res = await action(payload);
      if (res.ok) {
        router.push(res.redirect);
        return;
      }
      setError(res.error);
      if (res.taken?.length) {
        setTaken((t) => [...new Set([...t, ...res.taken!])]);
        setSelected((cur) => cur.filter((s) => !res.taken!.includes(s)));
        document.getElementById("pilih-kursi")?.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  return (
    <form onSubmit={submit} className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
      <div className="grid gap-5">
        {/* Kursi */}
        <section id="pilih-kursi" className="scroll-mt-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Pilih Kursi</h2>
              <p className="text-sm text-slate-500">
                Dipilih {seats.length} dari {pax} kursi
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-slate-100 p-1 text-sm">
              <button
                type="button"
                onClick={() => changePax(pax - 1)}
                className="h-7 w-7 rounded-full bg-white font-bold text-brand-700 shadow-sm"
                aria-label="Kurangi penumpang"
              >
                −
              </button>
              <span className="px-1 font-medium text-slate-700">{pax} penumpang</span>
              <button
                type="button"
                onClick={() => changePax(pax + 1)}
                className="h-7 w-7 rounded-full bg-white font-bold text-brand-700 shadow-sm"
                aria-label="Tambah penumpang"
              >
                +
              </button>
            </div>
          </div>
          <SeatMap taken={taken} blocked={blocked} selected={selected} onToggle={toggle} />
        </section>

        {/* Data pemesan */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Data Pemesan</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-medium text-slate-700">
              Nama lengkap
              <input name="customerName" required maxLength={80} className={input} placeholder="Nama sesuai KTP" />
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-slate-700">
              No. HP / WhatsApp
              <input
                name="phone"
                required
                type="tel"
                inputMode="tel"
                pattern="[0-9+\s\-]{9,16}"
                title="Nomor HP, contoh 081234567890"
                className={input}
                placeholder="08xxxxxxxxxx"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-slate-700 sm:col-span-2">
              Alamat jemput di {trip.originName}
              <textarea
                name="pickupAddress"
                required
                rows={2}
                maxLength={300}
                className={input}
                placeholder="Alamat lengkap / patokan / link Google Maps"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-slate-700 sm:col-span-2">
              Alamat antar di {trip.destinationName}
              <textarea
                name="dropoffAddress"
                required
                rows={2}
                maxLength={300}
                className={input}
                placeholder="Alamat tujuan / patokan"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-slate-700 sm:col-span-2">
              <span>
                Catatan <span className="font-normal text-slate-400">(opsional)</span>
              </span>
              <input name="notes" maxLength={300} className={input} placeholder="Misal: bawa bagasi besar, titip barang" />
            </label>
            {mode === "admin" && (
              <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                Status pembayaran
                <select name="status" defaultValue="paid" className={input}>
                  <option value="paid">Lunas</option>
                  <option value="pending">Belum bayar</option>
                </select>
              </label>
            )}
          </div>
        </section>

        {/* Penumpang */}
        {seats.length > 0 && (
          <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <h2 className="text-lg font-bold text-slate-900">Nama Penumpang</h2>
            <p className="text-sm text-slate-500">Kosongkan jika sama dengan nama pemesan.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {seats.map((seat) => (
                <label key={seat} className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
                    {seat}
                  </span>
                  <input
                    value={names[seat] ?? ""}
                    onChange={(e) => setNames((n) => ({ ...n, [seat]: e.target.value }))}
                    maxLength={80}
                    className={input}
                    placeholder={`Penumpang kursi ${seat}`}
                  />
                </label>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Ringkasan */}
      <aside className="lg:sticky lg:top-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Ringkasan</h2>
          <div className="mt-4 rounded-xl bg-brand-50 p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="text-xl font-bold text-slate-900">{trip.departTime}</div>
                <div className="text-xs text-slate-500">
                  {trip.departTz} · {trip.originName}
                </div>
              </div>
              <div className="h-px flex-1 border-t-2 border-dashed border-brand-200" />
              <div className="text-right">
                <div className="text-xl font-bold text-slate-900">
                  {trip.arrivalTime}
                  {trip.arrivalDayOffset > 0 && <sup className="ml-0.5 text-[10px] text-brand-600">+{trip.arrivalDayOffset}</sup>}
                </div>
                <div className="text-xs text-slate-500">
                  {trip.arrivalTz} · {trip.destinationName}
                </div>
              </div>
            </div>
            <div className="mt-3 text-sm font-medium text-brand-800">{trip.dateLabel}</div>
          </div>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Kursi</dt>
              <dd className="font-semibold text-slate-900">{seats.length ? seats.join(", ") : "-"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Harga per kursi</dt>
              <dd className="text-slate-900">{rupiah(trip.price)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Jumlah</dt>
              <dd className="text-slate-900">× {seats.length}</dd>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-3 text-base">
              <dt className="font-semibold text-slate-900">Total</dt>
              <dd className="font-bold text-brand-700">{rupiah(total)}</dd>
            </div>
          </dl>
          {error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          <SubmitButton pending={pending} mode={mode} className="mt-5 hidden lg:flex" />
          {mode === "web" && (
            <p className="mt-3 hidden text-center text-xs text-slate-500 lg:block">
              Pesanan akan dikirim ke WhatsApp admin untuk konfirmasi & pembayaran.
            </p>
          )}
        </div>
      </aside>

      {/* Bar bawah (HP) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] lg:hidden">
        {error && <p className="mb-2 text-xs text-red-600">{error}</p>}
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-xs text-slate-500">
              Total · {seats.length ? `Kursi ${seats.join(", ")}` : "belum pilih kursi"}
            </div>
            <div className="text-lg font-bold text-brand-700">{rupiah(total)}</div>
          </div>
          <SubmitButton pending={pending} mode={mode} className="flex" />
        </div>
      </div>
    </form>
  );
}

function SubmitButton({ pending, mode, className }: { pending: boolean; mode: "web" | "admin"; className: string }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className={`${className} w-auto items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white shadow-lg shadow-brand-600/25 hover:bg-brand-700 disabled:opacity-60 lg:w-full`}
    >
      {mode === "web" && <IconWhatsapp width={18} height={18} />}
      {pending ? "Memproses..." : mode === "web" ? "Pesan Sekarang" : "Simpan Pesanan"}
    </button>
  );
}
