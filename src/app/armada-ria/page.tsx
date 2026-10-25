import Link from "next/link";
import { rupiah } from "@/lib/format";
import { box, btn, RiaFooter, RiaNav } from "./_components/Brand";
import { BusArt } from "./_components/BusArt";
import { BUSES, CLIENTS, IMAGES, TESTIMONIALS } from "./data";

const tilt = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

export default function RiaHome() {
  return (
    <>
      <RiaNav />

      {/* Hero */}
      <section className="relative overflow-hidden border-b-[3px] border-ria-ink bg-ria-yellow">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:py-20 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className={`${box} inline-block -rotate-2 bg-white px-3 py-1 text-sm font-bold shadow-[3px_3px_0_#1a1a1a]`}>
              🚌 Sewa bus pariwisata
            </span>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
              Rombongan <span className="text-ria-orange">senang</span>, perjalanan lancar!
            </h1>
            <p className="mt-6 max-w-lg text-lg">
              Study tour, gathering kantor, ziarah, sampai liburan keluarga besar. Hitung perkiraan harga sendiri, penawaran resmi
              dikirim dalam 1 jam.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/armada-ria/penawaran" className={`${btn} bg-ria-orange text-lg text-white`}>
                Hitung Harga →
              </Link>
              <a href="#armada" className={`${btn} bg-white text-lg`}>
                Lihat Armada
              </a>
            </div>
          </div>
          <div className="relative">
            {IMAGES.hero ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={IMAGES.hero} alt="Bus Armada Ria" className={`${box} aspect-[4/3] w-full rotate-1 object-cover`} />
            ) : (
              <div className={`${box} rotate-1 bg-ria-sky p-6`}>
                <BusArt className="w-full" />
              </div>
            )}
            <span className={`${box} absolute -bottom-5 -left-3 -rotate-6 bg-white px-4 py-2 font-display text-lg font-extrabold`}>
              500+ trip / tahun
            </span>
            <span className={`${box} absolute -right-2 -top-4 rotate-6 bg-ria-orange px-4 py-2 font-display text-lg font-extrabold text-white`}>
              Sopir 2 orang!
            </span>
          </div>
        </div>
      </section>

      {/* Marquee klien */}
      <section id="klien" className="scroll-mt-4 overflow-hidden border-b-[3px] border-ria-ink bg-ria-ink py-4 text-ria-yellow">
        <div className="flex w-max animate-[riaMarquee_30s_linear_infinite] gap-10 whitespace-nowrap font-display text-2xl font-extrabold">
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <span key={i} className="flex items-center gap-10">
              {c} <span className="text-ria-orange">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* Armada */}
      <section id="armada" className="mx-auto max-w-6xl scroll-mt-4 px-4 py-20">
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">
          Pilih bus <span className="bg-ria-yellow px-2">sesuai rombongan</span>
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {BUSES.map((b, i) => (
            <article key={b.id} className={`${box} ${tilt[i]} flex flex-col bg-white p-5 transition hover:rotate-0`}>
              <div className="rounded-xl border-[3px] border-ria-ink p-3" style={{ background: b.color }}>
                {b.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={b.image} alt={b.name} className="aspect-[4/3] w-full rounded-lg object-cover" />
                ) : (
                  <BusArt color="#fff" className="w-full" />
                )}
              </div>
              <h3 className="mt-4 font-display text-2xl font-extrabold">{b.name}</h3>
              <p className="font-bold text-ria-orange">{b.seats} kursi</p>
              <ul className="mt-3 space-y-1 text-sm">
                {b.features.map((f) => (
                  <li key={f}>✔ {f}</li>
                ))}
              </ul>
              <div className="mt-auto pt-4">
                <div className="text-xs font-bold uppercase">Mulai</div>
                <div className="font-display text-2xl font-extrabold">{rupiah(b.perDay)}</div>
                <div className="text-xs">per hari, termasuk sopir & BBM</div>
                <Link href={`/armada-ria/penawaran?bus=${b.id}`} className={`${btn} mt-4 w-full bg-ria-yellow py-2`}>
                  Pilih
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Langkah */}
      <section className="border-y-[3px] border-ria-ink bg-ria-orange py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-4xl font-extrabold md:text-5xl">Gampang banget, cuma 3 langkah</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ["1", "Isi jumlah peserta & tujuan", "Kalkulator langsung kasih perkiraan harga & jumlah bus."],
              ["2", "Terima penawaran resmi", "Admin kirim penawaran lengkap via WhatsApp dalam 1 jam."],
              ["3", "DP 30%, bus siap!", "Bus dicek, dicuci, dan datang 30 menit sebelum berangkat."],
            ].map(([n, t, d]) => (
              <div key={n} className={`${box} bg-white p-6 text-ria-ink`}>
                <span className="font-display text-6xl font-extrabold text-ria-orange">{n}</span>
                <h3 className="mt-2 font-display text-xl font-extrabold">{t}</h3>
                <p className="mt-2 text-sm">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeri */}
      <section id="galeri" className="mx-auto max-w-6xl scroll-mt-4 px-4 py-20">
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">Galeri perjalanan</h2>
        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
          {IMAGES.gallery.map((src, i) => (
            <div key={i} className={`${box} ${tilt[i]} overflow-hidden bg-white p-2`}>
              {src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt="" loading="lazy" className="aspect-square w-full rounded-lg object-cover" />
              ) : (
                <div className="flex aspect-square items-center justify-center rounded-lg" style={{ background: BUSES[i].color }}>
                  <BusArt color="#fff" className="w-4/5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Testimoni */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">Kata mereka</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure key={t.name} className={`${box} ${tilt[i]} p-6`} style={{ background: t.color }}>
              <blockquote className="font-display text-xl font-bold leading-snug">“{t.text}”</blockquote>
              <figcaption className="mt-4 text-sm font-bold">— {t.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-[3px] border-ria-ink bg-ria-yellow px-4 py-20 text-center">
        <h2 className="mx-auto max-w-3xl font-display text-4xl font-extrabold md:text-6xl">Berapa orang yang ikut? Yuk hitung!</h2>
        <Link href="/armada-ria/penawaran" className={`${btn} mt-8 bg-ria-ink px-8 py-4 text-xl text-ria-yellow shadow-[5px_5px_0_#ff5a1f]`}>
          Buka Kalkulator →
        </Link>
      </section>

      <RiaFooter />
    </>
  );
}
