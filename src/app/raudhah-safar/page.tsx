import Link from "next/link";
import { rupiah } from "@/lib/format";
import { RaudhahFooter, RaudhahNav, SectionHead, starPattern } from "./_components/Brand";
import { HeroSlider } from "./_components/HeroSlider";
import { Schedule } from "./_components/Schedule";
import { GUIDES, PACKAGES, TESTIMONIALS } from "./data";

const VALUES = [
  ["15+", "Tahun melayani"],
  ["20.000+", "Jamaah diberangkatkan"],
  ["≤ 300 m", "Hotel ke Masjidil Haram"],
  ["0", "Biaya tersembunyi"],
];

const PROMISES = [
  ["Jadwal pasti", "Tanggal keberangkatan & maskapai dikunci sejak pendaftaran, tidak berubah-ubah."],
  ["Manasik terarah", "Dua kali manasik di tanah air, plus buku panduan doa & video tuntunan."],
  ["Pendampingan penuh", "Tim di Indonesia & Saudi, kursi roda untuk lansia, grup WhatsApp keluarga."],
];

export default function RaudhahHome() {
  return (
    <>
      <RaudhahNav overlay />
      <HeroSlider />

      {/* Angka */}
      <section className="bg-raudhah-emerald" style={starPattern}>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 px-4 py-10 md:grid-cols-4">
          {VALUES.map(([n, t]) => (
            <div key={t} className="text-center">
              <div className="font-display text-3xl text-raudhah-gold md:text-4xl">{n}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.2em] text-raudhah-ivory/70">{t}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Paket */}
      <section id="paket" className="mx-auto max-w-6xl scroll-mt-4 px-4 py-24">
        <SectionHead eyebrow="Pilihan paket" title="Paket Umroh & Haji" />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PACKAGES.map((p) => (
            <Link key={p.slug} href={`/raudhah-safar/paket/${p.slug}`} className="group flex flex-col">
              {/* Bingkai lengkung mihrab */}
              <div
                className="relative flex aspect-[3/4] items-end justify-center overflow-hidden rounded-t-full border-2 border-raudhah-gold/60 bg-raudhah-emerald px-4 pb-6 transition group-hover:border-raudhah-gold"
                style={starPattern}
              >
                <div className="absolute inset-2 rounded-t-full border border-raudhah-gold/25" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="relative max-h-[62%] w-auto max-w-[88%] object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.45)] transition duration-500 group-hover:-translate-y-2"
                />
                <span className="absolute left-1/2 top-[18%] -translate-x-1/2 rounded-full bg-raudhah-deep/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-raudhah-gold">
                  {p.kind}
                </span>
              </div>
              <div className="rounded-b-3xl border-2 border-t-0 border-raudhah-gold/30 bg-white px-5 pb-5 pt-4 text-center">
                <h3 className="font-display text-2xl text-raudhah-emerald">{p.name}</h3>
                <p className="text-xs text-raudhah-deep/60">
                  {p.days} hari · {"★".repeat(Math.max(...p.hotels.map((h) => h.stars)))}
                </p>
                <p className="mt-3 text-xs text-raudhah-deep/50">mulai</p>
                <p className="font-display text-2xl text-raudhah-leaf">{rupiah(p.prices.quad)}</p>
                <span className="mt-4 inline-block rounded-full bg-raudhah-emerald px-5 py-2 text-xs font-bold text-raudhah-gold group-hover:bg-raudhah-deep">
                  Lihat detail
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Jadwal */}
      <section id="jadwal" className="scroll-mt-4 bg-raudhah-emerald py-24" style={starPattern}>
        <div className="mx-auto max-w-5xl px-4">
          <SectionHead eyebrow="Jadwal keberangkatan" title="Pilih bulan berangkat" light />
          <div className="mt-12">
            <Schedule />
          </div>
        </div>
      </section>

      {/* Janji */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <SectionHead eyebrow="Amanah kami" title="Ibadah khusyuk, urusan kami yang atur" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PROMISES.map(([t, d], i) => (
            <div key={t} className="rounded-3xl border border-raudhah-gold/40 bg-white p-8 text-center">
              <div className="mx-auto flex h-14 w-14 rotate-45 items-center justify-center rounded-xl bg-raudhah-emerald">
                <span className="-rotate-45 font-display text-2xl text-raudhah-gold">{i + 1}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl text-raudhah-emerald">{t}</h3>
              <p className="mt-2 text-sm text-raudhah-deep/70">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pembimbing */}
      <section id="pembimbing" className="scroll-mt-4 bg-white py-24">
        <div className="mx-auto max-w-4xl px-4">
          <SectionHead eyebrow="Pembimbing" title="Didampingi yang berpengalaman" />
          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {GUIDES.map((g) => (
              <div key={g.name} className="flex items-center gap-5 rounded-3xl bg-raudhah-ivory p-5">
                <div
                  className="flex h-24 w-20 shrink-0 items-center justify-center rounded-t-full border-2 border-raudhah-gold bg-raudhah-emerald font-display text-2xl text-raudhah-gold"
                  style={starPattern}
                >
                  {g.name.replace(/^(Ust\.|Ustadzah)\s*/, "").split(" ").slice(0, 2).map((w) => w[0]).join("")}
                </div>
                <div>
                  <h3 className="font-display text-xl text-raudhah-emerald">{g.name}</h3>
                  <p className="text-sm font-bold text-raudhah-leaf">{g.role}</p>
                  <p className="text-sm text-raudhah-deep/60">{g.years}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimoni */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <SectionHead eyebrow="Kesan jamaah" title="Doa dan cerita mereka" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="relative rounded-3xl bg-raudhah-emerald p-8 text-raudhah-ivory" style={starPattern}>
              <div className="font-display text-6xl leading-none text-raudhah-gold">“</div>
              <blockquote className="-mt-4 leading-relaxed">{t.text}</blockquote>
              <figcaption className="mt-5 text-sm font-bold text-raudhah-gold">{t.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-raudhah-deep px-4 py-20 text-center" style={starPattern}>
        <h2 className="mx-auto max-w-2xl font-display text-4xl text-raudhah-ivory md:text-5xl">Niatkan dari sekarang, kami bantu wujudkan.</h2>
        <p className="mx-auto mt-4 max-w-lg text-raudhah-ivory/70">DP mulai Rp10 juta, sisanya bisa dicicil hingga sebelum keberangkatan.</p>
        <Link href="#jadwal" className="mt-8 inline-block rounded-full bg-raudhah-gold px-8 py-4 font-bold text-raudhah-deep hover:bg-raudhah-gold-soft">
          Pilih Jadwal
        </Link>
      </section>

      <RaudhahFooter />
    </>
  );
}
