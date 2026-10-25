import Link from "next/link";
import { BookingWidget } from "./_components/BookingWidget";
import { SayapFooter, SayapNav } from "./_components/Brand";
import { FareTable } from "./_components/FareTable";
import { HeroSlider } from "./_components/HeroSlider";
import { FAQ, TESTIMONIALS } from "./data";

const STATS = [
  ["24/7", "Private van kapan saja"],
  ["2", "Bandara: DPS & SUB"],
  ["11", "Zona tujuan"],
  ["60 mnt", "Gratis waktu tunggu"],
];

const STEPS = [
  ["Pesan & isi nomor penerbangan", "Pilih zona, jam, dan jumlah penumpang. Pesanan dikirim ke WhatsApp admin."],
  ["Kami pantau jadwal pesawat", "Delay atau mendarat lebih cepat? Jam jemput otomatis kami sesuaikan."],
  ["Sopir menunggu dengan papan nama", "Keluar pintu kedatangan, cari namamu, langsung berangkat ke tujuan."],
];

const FLEET = [
  "Hiace Premio high-roof, 14 kursi",
  "Kursi kulit + sabuk pengaman",
  "AC dingin & lampu kabin",
  "USB charger di setiap baris",
  "Bagasi: 1 koper + 1 kabin / orang",
  "Sopir berlisensi & berpengalaman",
];

export default function SayapHome() {
  return (
    <>
      <SayapNav overlay />
      <HeroSlider>
        <BookingWidget />
      </HeroSlider>

      {/* Angka */}
      <section className="border-y border-sayap-line bg-sayap-ink">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-sayap-line px-4 md:grid-cols-4 md:divide-x">
          {STATS.map(([n, t]) => (
            <div key={t} className="px-2 py-7 text-center md:px-6">
              <div className="font-display text-3xl font-bold text-sayap-lime">{n}</div>
              <div className="mt-1 text-xs text-slate-400 md:text-sm">{t}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Cara kerja */}
      <section id="cara-kerja" className="mx-auto max-w-6xl scroll-mt-4 px-4 py-20">
        <SectionTitle eyebrow="Cara kerja" title="Tiga langkah, tanpa drama di bandara." />
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {STEPS.map(([title, text], i) => (
            <li key={title} className="group relative rounded-2xl bg-sayap-card p-6 ring-1 ring-sayap-line transition hover:ring-sayap-lime/50">
              <span className="font-display text-5xl font-bold text-sayap-lime/20 transition group-hover:text-sayap-lime/60">
                0{i + 1}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-400">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Tarif */}
      <section id="tarif" className="scroll-mt-4 bg-sayap-ink py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle
            eyebrow="Tarif per zona"
            title="Harga pasti, sebelum kamu mendarat."
            text="Shared: berangkat tiap jam bersama penumpang lain. Private: satu van khusus untukmu, jam bebas."
          />
          <div className="mt-10">
            <FareTable />
          </div>
        </div>
      </section>

      {/* Armada */}
      <section id="armada" className="mx-auto grid max-w-6xl scroll-mt-4 items-center gap-10 px-4 py-20 lg:grid-cols-[1.3fr_1fr]">
        <div className="relative overflow-hidden rounded-3xl ring-1 ring-sayap-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/sayap/armada.jpg" alt="Armada van Sayap Shuttle" loading="lazy" className="aspect-[16/10] w-full object-cover" />
          <span className="absolute left-4 top-4 rounded-full bg-sayap-lime px-3 py-1 text-xs font-bold text-sayap-navy">
            Premium Van
          </span>
        </div>
        <div>
          <SectionTitle eyebrow="Armada" title="Lega, bersih, dan dingin." />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {FLEET.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sayap-lime/15 text-xs text-sayap-lime">
                  ✓
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Promo */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-3xl bg-sayap-lime px-6 py-10 text-sayap-navy md:px-12 md:py-14">
          <div className="pointer-events-none absolute -right-10 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border-[40px] border-sayap-navy/10" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em]">Promo pulang-pergi</p>
              <h2 className="mt-2 font-display text-3xl font-bold leading-tight md:text-4xl">
                Hemat 10% kalau pesan jemput & antar sekaligus.
              </h2>
            </div>
            <Link
              href="/sayap-shuttle/pesan"
              className="justify-self-start rounded-full bg-sayap-navy px-6 py-3 font-display font-bold text-sayap-lime hover:bg-black md:justify-self-end"
            >
              Pesan Sekarang →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimoni */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionTitle eyebrow="Kata penumpang" title="Mendarat tenang, sampai senang." />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="rounded-2xl bg-sayap-card p-6 ring-1 ring-sayap-line">
              <div className="text-sayap-lime" aria-label="Bintang 5">
                ★★★★★
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-slate-300">“{t.text}”</blockquote>
              <figcaption className="mt-4 text-xs font-semibold text-slate-500">{t.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-4 bg-sayap-ink py-20">
        <div className="mx-auto max-w-3xl px-4">
          <SectionTitle eyebrow="FAQ" title="Yang sering ditanyakan." />
          <div className="mt-10 divide-y divide-sayap-line rounded-2xl bg-sayap-card ring-1 ring-sayap-line">
            {FAQ.map(([q, a]) => (
              <details key={q} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-semibold text-white">
                  {q}
                  <span className="text-xl text-sayap-lime transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-slate-400">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h2 className="font-display text-3xl font-bold text-white md:text-5xl">
          Sudah punya tiket pesawat?
          <br />
          <span className="text-sayap-lime">Amankan jemputanmu.</span>
        </h2>
        <Link
          href="/sayap-shuttle/pesan"
          className="mt-8 inline-block rounded-full bg-sayap-lime px-8 py-4 font-display text-lg font-bold text-sayap-navy shadow-[0_0_40px_rgba(198,244,50,0.35)] hover:bg-white"
        >
          Pesan Shuttle
        </Link>
      </section>

      <SayapFooter />
    </>
  );
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-sayap-lime">
        <span className="h-px w-8 bg-sayap-lime" /> {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">{title}</h2>
      {text && <p className="mt-3 text-slate-400">{text}</p>}
    </div>
  );
}
