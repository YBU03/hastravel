import Link from "next/link";
import { rupiah } from "@/lib/format";
import { KencanaFooter, KencanaNav } from "./_components/Brand";
import { CarLineArt, Photo } from "./_components/Photo";
import { CITIES, IMAGES, OCCASIONS, PACKAGES, UNITS } from "./data";

const eyebrow = "text-[11px] font-semibold uppercase tracking-[0.35em] text-kencana-gold";
const heading = "font-display text-4xl font-medium leading-tight text-kencana-ivory md:text-5xl";

export default function KencanaHome() {
  const reference = UNITS[0];
  return (
    <>
      <KencanaNav overlay />

      {/* Hero */}
      <section className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-32 text-center">
        {IMAGES.hero ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGES.hero} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-kencana-black/70 via-kencana-black/40 to-kencana-black" />
          </>
        ) : (
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_70%,#2a2418_0%,#0b0b0b_60%)]" />
        )}
        <p className={eyebrow}>Chauffeur Service · {CITIES.join(" · ")}</p>
        <h1 className="mt-6 font-display text-6xl font-normal leading-[0.95] text-kencana-ivory md:text-8xl">
          Tiba dengan
          <br />
          <em className="font-medium text-kencana-gold">anggun.</em>
        </h1>
        <p className="mt-6 max-w-lg text-base text-kencana-ivory/60 md:text-lg">
          Alphard, Lexus LM, dan Hiace Premio dengan chauffeur berpengalaman. Untuk hari-hari yang tidak boleh terlambat.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/kencana-executive/reservasi"
            className="bg-kencana-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-kencana-black transition hover:bg-kencana-gold-light"
          >
            Reservasi
          </Link>
          <a
            href="#armada"
            className="border border-kencana-ivory/30 px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-kencana-ivory transition hover:border-kencana-gold hover:text-kencana-gold"
          >
            Lihat Armada
          </a>
        </div>
        {!IMAGES.hero && <CarLineArt className="mt-14 w-full max-w-xl opacity-90" />}
        <dl className="mt-14 grid w-full max-w-3xl grid-cols-3 divide-x divide-kencana-line border-y border-kencana-line">
          {[
            ["24 jam", "Reservasi"],
            ["10+ th", "Pengalaman chauffeur"],
            ["100%", "Unit di bawah 3 tahun"],
          ].map(([n, t]) => (
            <div key={t} className="px-2 py-5">
              <dt className="font-display text-2xl text-kencana-gold md:text-3xl">{n}</dt>
              <dd className="mt-1 text-[10px] uppercase tracking-[0.2em] text-kencana-ivory/50 md:text-xs">{t}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Pernyataan */}
      <section className="mx-auto max-w-4xl px-4 py-24 text-center">
        <p className={eyebrow}>Filosofi kami</p>
        <p className="mt-8 font-display text-3xl font-normal leading-snug text-kencana-ivory md:text-[2.6rem]">
          Kami tidak sekadar menyewakan mobil. Kami menyiapkan perjalanan: pintu yang dibukakan,{" "}
          <em className="text-kencana-gold">kabin yang sudah sejuk</em>, dan rute yang sudah dipelajari sebelum Anda tiba.
        </p>
      </section>

      {/* Armada */}
      <section id="armada" className="scroll-mt-4 border-t border-kencana-line py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <p className={eyebrow}>Armada</p>
            <h2 className={`mt-4 ${heading}`}>Pilih kabin Anda</h2>
          </div>
          <div className="mt-16 grid gap-20">
            {UNITS.map((u, i) => (
              <article key={u.slug} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
                <div className={`relative ${i % 2 ? "md:order-2" : ""}`}>
                  <Photo src={u.image} alt={`${u.name} ${u.variant}`} className="aspect-[4/3] w-full" />
                  {u.tag && (
                    <span className="absolute left-0 top-6 bg-kencana-gold px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-kencana-black">
                      {u.tag}
                    </span>
                  )}
                </div>
                <div>
                  <span className="font-display text-6xl italic text-kencana-gold/30">0{i + 1}</span>
                  <h3 className="mt-2 font-display text-4xl font-medium text-kencana-ivory">{u.name}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.25em] text-kencana-gold">{u.variant}</p>
                  <div className="mt-6 flex gap-6 border-y border-kencana-line py-4 text-sm">
                    <span>
                      <b className="font-display text-xl font-medium text-kencana-ivory">{u.seats}</b> penumpang
                    </span>
                    <span>
                      <b className="font-display text-xl font-medium text-kencana-ivory">{u.luggage}</b> koper
                    </span>
                  </div>
                  <ul className="mt-6 grid gap-2 text-sm text-kencana-ivory/70 sm:grid-cols-2">
                    {u.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="text-kencana-gold">—</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-kencana-ivory/40">Mulai</div>
                      <div className="font-display text-3xl text-kencana-ivory">
                        {rupiah(u.prices.half)}
                        <span className="ml-1 font-sans text-xs text-kencana-ivory/40">/ 6 jam</span>
                      </div>
                    </div>
                    <Link
                      href={`/kencana-executive/reservasi?unit=${u.slug}`}
                      className="border-b border-kencana-gold pb-1 text-xs font-bold uppercase tracking-[0.25em] text-kencana-gold hover:text-kencana-gold-light"
                    >
                      Reservasi unit ini →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Layanan */}
      <section id="layanan" className="scroll-mt-4 bg-kencana-coal py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <p className={eyebrow}>Layanan</p>
            <h2 className={`mt-4 ${heading}`}>Paket sesuai agenda Anda</h2>
            <p className="mt-4 text-sm text-kencana-ivory/50">
              Contoh harga {reference.name}. Sudah termasuk chauffeur & BBM; tol dan parkir sesuai pemakaian.
            </p>
          </div>
          <div className="mt-14 grid border border-kencana-line md:grid-cols-3">
            {PACKAGES.map((p, i) => (
              <div
                key={p.id}
                className={`p-8 text-center md:p-10 ${i ? "border-t border-kencana-line md:border-l md:border-t-0" : ""}`}
              >
                <h3 className="font-display text-3xl text-kencana-ivory">{p.name}</h3>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-kencana-ivory/50">{p.detail}</p>
                <div className="mx-auto my-6 h-px w-10 bg-kencana-gold/50" />
                <p className="font-display text-4xl text-kencana-gold">{rupiah(reference.prices[p.id])}</p>
                <Link
                  href={`/kencana-executive/reservasi?unit=${reference.slug}&paket=${p.id}`}
                  className="mt-6 inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-kencana-ivory/70 hover:text-kencana-gold"
                >
                  Pilih paket →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Acara */}
      <section id="acara" className="mx-auto max-w-6xl scroll-mt-4 px-4 py-24">
        <div className="text-center">
          <p className={eyebrow}>Untuk setiap momen</p>
          <h2 className={`mt-4 ${heading}`}>Acara istimewa</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {OCCASIONS.map((o) => (
            <div key={o.id} className="group">
              <Photo src={IMAGES.occasions[o.id]} alt={o.title} variant="ornament" className="aspect-[3/4] w-full" />
              <h3 className="mt-5 font-display text-2xl text-kencana-ivory">{o.title}</h3>
              <p className="mt-2 text-sm text-kencana-ivory/60">{o.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimoni */}
      <section className="border-y border-kencana-line py-24">
        <figure className="mx-auto max-w-3xl px-4 text-center">
          <div className="font-display text-7xl leading-none text-kencana-gold">“</div>
          <blockquote className="font-display text-2xl italic leading-relaxed text-kencana-ivory md:text-3xl">
            Chauffeur sudah menunggu sebelum kami keluar dari terminal, kabin harum dan dingin. Tamu direksi kami sangat terkesan.
          </blockquote>
          <figcaption className="mt-8 text-[11px] font-semibold uppercase tracking-[0.3em] text-kencana-ivory/50">
            Corporate Secretary · Perusahaan Energi, Jakarta
          </figcaption>
        </figure>
      </section>

      {/* CTA */}
      <section className="px-4 py-24 text-center">
        <p className={eyebrow}>Reservasi</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl text-kencana-ivory md:text-6xl">
          Agenda Anda, <em className="text-kencana-gold">kami yang antar.</em>
        </h2>
        <Link
          href="/kencana-executive/reservasi"
          className="mt-10 inline-block bg-kencana-gold px-10 py-4 text-xs font-bold uppercase tracking-[0.25em] text-kencana-black hover:bg-kencana-gold-light"
        >
          Mulai Reservasi
        </Link>
      </section>

      <KencanaFooter />
    </>
  );
}
