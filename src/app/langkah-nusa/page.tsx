import { NusaFooter, NusaNav, Wave } from "./_components/Brand";
import { SceneArt } from "./_components/SceneArt";
import { TripGrid } from "./_components/TripGrid";
import { HERO_IMAGE, TESTIMONIALS } from "./data";

export default function NusaHome() {
  return (
    <>
      <NusaNav />

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-6 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-nusa-sand px-4 py-1.5 text-sm font-bold text-nusa-moss">
            🌿 Open trip · grup maks. 12 orang
          </p>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
            Jalan pelan, <em className="font-normal text-nusa-terra">lihat</em> lebih banyak.
          </h1>
          <p className="mt-6 max-w-md text-lg text-nusa-brown/75">
            Bromo, Ijen, Nusa Penida, Tumpak Sewu. Datang sendiri, pulang bawa teman baru dan cerita yang panjang.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#trip" className="rounded-full bg-nusa-terra px-7 py-3.5 font-bold text-nusa-cream shadow-lg shadow-nusa-terra/30 hover:bg-nusa-brown">
              Pilih Trip
            </a>
            <a href="#cara" className="rounded-full px-7 py-3.5 font-bold ring-2 ring-nusa-brown/20 hover:ring-nusa-brown">
              Cara Ikut
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-[3rem] rounded-tr-[8rem] shadow-2xl shadow-nusa-brown/20">
            {HERO_IMAGE ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={HERO_IMAGE} alt="Pemandangan trip Langkah Nusa" className="aspect-[5/4] w-full object-cover" />
            ) : (
              <SceneArt scene="mountain" className="aspect-[5/4] w-full" />
            )}
          </div>
          <div className="absolute -bottom-6 -left-4 rounded-3xl bg-nusa-cream p-4 shadow-xl ring-1 ring-nusa-brown/10">
            <div className="font-display text-3xl font-semibold text-nusa-terra">4.9★</div>
            <div className="text-xs font-bold">dari 1.200+ peserta</div>
          </div>
        </div>
      </section>

      <Wave />
      <section id="trip" className="scroll-mt-4 bg-nusa-sand py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-4xl font-semibold md:text-5xl">
            Trip <em className="font-normal text-nusa-terra">bulan ini</em>
          </h2>
          <p className="mt-2 text-nusa-brown/70">Kuota terbatas tiap keberangkatan supaya tetap nyaman.</p>
          <div className="mt-8">
            <TripGrid />
          </div>
        </div>
      </section>
      <Wave className="rotate-180" />

      {/* Cara ikut */}
      <section id="cara" className="mx-auto max-w-6xl scroll-mt-4 px-4 py-16">
        <h2 className="font-display text-4xl font-semibold md:text-5xl">Ikut trip itu gampang</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            ["🗓️", "Pilih trip & tanggal", "Lihat itinerary, cek sisa kuota, pilih tanggal yang cocok."],
            ["💬", "Daftar via WhatsApp", "Data peserta langsung terkirim, admin konfirmasi kursimu."],
            ["🎒", "DP 50%, siap berangkat", "Dapat grup WhatsApp peserta & checklist barang bawaan."],
          ].map(([icon, t, d]) => (
            <div key={t} className="rounded-[2rem] bg-white/60 p-6 ring-1 ring-nusa-brown/5">
              <div className="text-4xl">{icon}</div>
              <h3 className="mt-4 font-display text-2xl font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-nusa-brown/70">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cerita */}
      <section id="cerita" className="scroll-mt-4 bg-nusa-moss py-16 text-nusa-cream">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-4xl font-semibold md:text-5xl">
            Cerita <em className="font-normal text-nusa-sand">peserta</em>
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="rounded-[2rem] bg-nusa-cream/10 p-6 ring-1 ring-nusa-cream/15">
                <blockquote className="font-display text-xl italic leading-relaxed">“{t.text}”</blockquote>
                <figcaption className="mt-4 text-sm font-bold text-nusa-sand">{t.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h2 className="font-display text-4xl font-semibold md:text-6xl">
          Akhir pekan ini, <em className="font-normal text-nusa-terra">ke mana?</em>
        </h2>
        <a href="#trip" className="mt-8 inline-block rounded-full bg-nusa-terra px-8 py-4 font-bold text-nusa-cream hover:bg-nusa-brown">
          Lihat Semua Trip
        </a>
      </section>

      <NusaFooter />
    </>
  );
}
