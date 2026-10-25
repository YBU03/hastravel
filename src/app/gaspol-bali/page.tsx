import Link from "next/link";
import { rupiah } from "@/lib/format";
import { GaspolFooter, GaspolNav, grain, Marquee, Sticker } from "./_components/Brand";
import { ScooterArt } from "./_components/ScooterArt";
import { AREAS, BIKES, FAQ, FEED_IMAGES, HERO_IMAGES } from "./data";

const tilt = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

export default function GaspolHome() {
  return (
    <>
      <GaspolNav />

      {/* Hero */}
      <section className="relative overflow-hidden" style={grain}>
        {HERO_IMAGES[0] && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={HERO_IMAGES[0]} alt="" className="absolute inset-0 h-full w-full object-cover object-[70%_center]" />
            <div className="absolute inset-0 bg-gradient-to-r from-gaspol-ink via-gaspol-ink/80 to-transparent" />
          </>
        )}
        <div className="pointer-events-none absolute -right-40 top-10 h-[30rem] w-[30rem] rounded-full bg-gaspol-pink/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:py-24 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Sticker className="-rotate-3">Sewa motor Bali</Sticker>
            <h1 className="mt-6 font-display text-7xl uppercase leading-[0.9] md:text-[7.5rem]">
              Gas
              <span className="text-gaspol-pink [text-shadow:0_0_30px_rgba(255,46,147,0.6)]">pol</span>
              <br />
              keliling
              <br />
              <span className="relative inline-block">
                Bali.
                <span className="absolute -bottom-1 left-0 h-3 w-full -skew-x-12 bg-gaspol-acid/80 mix-blend-multiply" />
              </span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-white/75">
              Scoopy sampai KLX. Diantar ke villa, harga harian–bulanan, helm & jas hujan gratis. Tinggal gas.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/gaspol-bali/sewa"
                className="rounded-full bg-gaspol-pink px-8 py-4 font-display text-2xl uppercase tracking-wide text-black shadow-[0_0_30px_rgba(255,46,147,0.5)] hover:bg-white"
              >
                Sewa sekarang
              </Link>
              <a href="#motor" className="rounded-full border-2 border-white px-8 py-4 font-display text-2xl uppercase tracking-wide hover:border-gaspol-pink hover:text-gaspol-pink">
                Lihat motor
              </a>
            </div>
          </div>
          <div className="relative">
            <ScooterArt className="w-full" />
            <Sticker className="absolute -top-2 left-4 rotate-6 bg-gaspol-acid">Mulai 70rb/hari</Sticker>
            <Sticker className="absolute bottom-6 right-0 -rotate-6 bg-white">Antar gratis Canggu</Sticker>
          </div>
        </div>
      </section>

      <Marquee items={["Antar ke villa", "Helm gratis", "Tarif mingguan hemat", "Surf rack ready", "WA 24 jam"]} />

      {/* Motor */}
      <section id="motor" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
        <h2 className="font-display text-5xl uppercase md:text-6xl">
          Pilih <span className="text-gaspol-pink">tungganganmu</span>
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BIKES.map((b, i) => (
            <article key={b.id} className={`${tilt[i]} group relative flex flex-col rounded-2xl border-2 border-white bg-gaspol-coal p-5 transition hover:rotate-0 hover:border-gaspol-pink`}>
              <Sticker className="absolute -right-3 -top-4 rotate-6 text-sm">{b.tag}</Sticker>
              <div className="rounded-xl bg-black p-3">
                {b.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={b.image} alt={b.name} className="aspect-[4/3] w-full object-contain" />
                ) : (
                  <ScooterArt kind={b.id === "klx" ? "trail" : "scooter"} className="w-full" />
                )}
              </div>
              <h3 className="mt-4 font-display text-4xl uppercase">{b.name}</h3>
              <p className="text-sm text-white/60">
                {b.type} · {b.cc} cc
              </p>
              <ul className="mt-3 space-y-1 text-sm text-white/80">
                {b.perks.map((p) => (
                  <li key={p}>⚡ {p}</li>
                ))}
              </ul>
              <div className="mt-auto pt-5">
                <div className="font-display text-3xl text-gaspol-pink">
                  {rupiah(b.daily)}
                  <span className="font-sans text-sm text-white/50"> /hari</span>
                </div>
                <div className="text-xs text-white/50">
                  {rupiah(b.weekly)}/minggu · {rupiah(b.monthly)}/bulan
                </div>
                <Link
                  href={`/gaspol-bali/sewa?motor=${b.id}`}
                  className="mt-4 block rounded-full bg-white py-2 text-center font-display text-xl uppercase text-black hover:bg-gaspol-pink"
                >
                  Sewa {b.name}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Cara */}
      <section className="border-y border-gaspol-line bg-gaspol-coal py-20" style={grain}>
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-5xl uppercase md:text-6xl">Tiga langkah, langsung gas</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ["01", "Pilih motor & tanggal", "Tarif otomatis paling hemat: harian, mingguan, atau bulanan."],
              ["02", "Kirim via WhatsApp", "Konfirmasi dalam 10 menit. Bayar saat motor diantar."],
              ["03", "Motor diantar", "Full tank, 2 helm, jas hujan. Tunjukkan SIM & deposit, beres."],
            ].map(([n, t, d]) => (
              <div key={n} className="rounded-2xl border-2 border-gaspol-line p-6">
                <div className="font-display text-6xl text-gaspol-pink">{n}</div>
                <h3 className="mt-3 font-display text-2xl uppercase">{t}</h3>
                <p className="mt-2 text-sm text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Area */}
      <section id="area" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
        <h2 className="font-display text-5xl uppercase md:text-6xl">
          Area <span className="text-gaspol-pink">antar-jemput</span>
        </h2>
        <div className="mt-10 flex flex-wrap gap-3">
          {AREAS.map((a, i) => (
            <span
              key={a.id}
              className={`${tilt[i % 4]} rounded-xl border-2 px-5 py-3 font-display text-2xl uppercase ${
                a.fee === 0 ? "border-gaspol-pink bg-gaspol-pink text-black" : "border-white"
              }`}
            >
              {a.name} <span className="font-sans text-sm normal-case">{a.fee === 0 ? "· gratis" : `· ${rupiah(a.fee)}`}</span>
            </span>
          ))}
        </div>
      </section>

      {/* Feed */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <h2 className="font-display text-5xl uppercase md:text-6xl">#GaspolBali</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {FEED_IMAGES.map((src, i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-xl border-2 border-gaspol-line bg-gaspol-coal">
              {src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center" style={grain}>
                  <ScooterArt kind={i === 3 ? "trail" : "scooter"} className="w-3/4 opacity-80" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 border-t border-gaspol-line bg-black py-20" style={grain}>
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-display text-5xl uppercase">FAQ</h2>
          <div className="mt-8 divide-y divide-gaspol-line">
            {FAQ.map(([q, a]) => (
              <details key={q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between font-display text-2xl uppercase">
                  {q}
                  <span className="text-gaspol-pink transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 text-white/70">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gaspol-pink px-4 py-16 text-center text-black">
        <h2 className="font-display text-6xl uppercase md:text-8xl">Udah siap? Gas!</h2>
        <Link href="/gaspol-bali/sewa" className="mt-6 inline-block rounded-full bg-black px-10 py-4 font-display text-2xl uppercase text-white hover:bg-white hover:text-black">
          Sewa sekarang
        </Link>
      </section>

      <GaspolFooter />
    </>
  );
}
