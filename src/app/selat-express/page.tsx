import Link from "next/link";
import { formatDuration, rupiah } from "@/lib/format";
import { BoatArt, SeaScene, Wave } from "./_components/Art";
import { SelatFooter, SelatNav } from "./_components/Brand";
import { SearchWidget } from "./_components/SearchWidget";
import { DESTINATIONS, FAQ, IMAGES, PORTS, ROUTES } from "./data";

export default function SelatHome() {
  const fromBali = ROUTES.filter((r) => r.from === "sanur" || r.from === "padangbai");
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-selat-sea via-selat-teal to-selat-aqua pb-10 text-white">
        {IMAGES.hero && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGES.hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-selat-deep/70 via-selat-deep/30 to-selat-deep/60" />
          </>
        )}
        <SelatNav light />
        <div className="relative mx-auto max-w-6xl px-4 pt-28">
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="inline-flex rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold backdrop-blur">🌊 Fast boat harian dari Bali</p>
              <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
                Seberangi selat,
                <br />
                <span className="text-selat-sand">sampai lebih cepat.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg text-white/90">Nusa Penida 45 menit, Gili 2 jam. Tiket pulang-pergi, harga anak, dan paket snorkeling.</p>
            </div>
            {!IMAGES.hero && <BoatArt className="hidden w-full animate-[selatBob_4s_ease-in-out_infinite] drop-shadow-xl lg:block" />}
          </div>
          <div className="mt-10">
            <SearchWidget />
          </div>
        </div>
      </section>
      <Wave className="-mt-px rotate-180" fill="#7fd6dd" />

      {/* Tujuan */}
      <section id="tujuan" className="mx-auto max-w-6xl scroll-mt-4 px-4 py-16">
        <h2 className="font-display text-4xl font-bold">Mau nyebrang ke mana?</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DESTINATIONS.map((d) => {
            const r = ROUTES.find((x) => x.to === d.id)!;
            return (
              <Link
                key={d.id}
                href={`/selat-express/jadwal?from=${r.from}&to=${r.to}`}
                className="group overflow-hidden rounded-3xl bg-white shadow-lg shadow-selat-deep/5 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {d.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={d.image} alt={d.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  ) : (
                    <SeaScene scene={d.scene} className="h-full w-full transition duration-700 group-hover:scale-105" />
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold">⏱ {formatDuration(r.minutes)}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-bold">{d.name}</h3>
                  <p className="text-sm text-selat-deep/60">{d.text}</p>
                  <p className="mt-3 text-sm">
                    dari <b className="font-display text-lg text-selat-teal">{rupiah(r.adult)}</b>
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Jadwal */}
      <section id="jadwal" className="scroll-mt-4 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-4xl font-bold">Jadwal harian</h2>
          <p className="mt-2 text-selat-deep/60">Berangkat setiap hari, termasuk hari libur (kecuali Nyepi).</p>
          <div className="mt-8 overflow-x-auto rounded-3xl ring-1 ring-selat-deep/10">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-selat-deep text-white">
                <tr>
                  <th className="px-5 py-3">Rute</th>
                  <th className="px-5 py-3">Durasi</th>
                  <th className="px-5 py-3">Jam berangkat</th>
                  <th className="px-5 py-3">Dewasa / Anak</th>
                </tr>
              </thead>
              <tbody>
                {fromBali.map((r) => (
                  <tr key={r.from + r.to} className="border-t border-selat-deep/10">
                    <td className="px-5 py-4 font-display font-semibold">
                      {PORTS[r.from].name} → {PORTS[r.to].name}
                    </td>
                    <td className="px-5 py-4">{formatDuration(r.minutes)}</td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {r.times.map((t) => (
                          <span key={t} className="rounded-lg bg-selat-foam px-2 py-1 font-semibold">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <b>{rupiah(r.adult)}</b> / {rupiah(r.child)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Keunggulan */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
        {IMAGES.boat ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={IMAGES.boat} alt="Kapal Selat Express" className="w-full rounded-3xl object-cover" />
        ) : (
          <div className="rounded-3xl bg-gradient-to-br from-selat-aqua to-selat-teal p-10">
            <BoatArt className="w-full" />
          </div>
        )}
        <div>
          <h2 className="font-display text-4xl font-bold">Nyaman dari dermaga sampai pantai</h2>
          <ul className="mt-6 grid gap-4">
            {[
              ["🛟", "Jaket pelampung & kru bersertifikat di setiap kapal"],
              ["❄️", "Kabin AC dengan kursi empuk, dek atas untuk foto"],
              ["🧳", "Porter bantu angkat koper di dermaga"],
              ["🔁", "Reschedule gratis jika cuaca buruk"],
            ].map(([i, t]) => (
              <li key={t} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
                <span className="text-2xl">{i}</span>
                <span className="font-semibold">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Promo */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-[2rem] bg-selat-coral px-8 py-12 text-white md:px-14">
          <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/15" />
          <p className="text-sm font-bold uppercase tracking-widest text-white/80">Paket hemat</p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold md:text-4xl">Fast boat + snorkeling Manta Point mulai Rp425.000/orang</h2>
          <Link href="/selat-express/jadwal?from=sanur&to=penida" className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-display font-bold text-selat-coral hover:bg-selat-deep hover:text-white">
            Pesan paket
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-4 px-4 py-16">
        <h2 className="font-display text-4xl font-bold">Pertanyaan umum</h2>
        <div className="mt-8 grid gap-3">
          {FAQ.map(([q, a]) => (
            <details key={q} className="group rounded-2xl bg-white p-5 shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between font-display font-semibold">
                {q}
                <span className="text-xl text-selat-teal transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-sm text-selat-deep/70">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <Wave fill="#063b4c" />
      <SelatFooter />
    </>
  );
}
