import Link from "next/link";
import { rupiah } from "@/lib/format";
import { JendelaFooter, JendelaNav, paperTexture, PosterArt, Stamp, Sunburst } from "./_components/Retro";
import { SearchBox } from "./_components/SearchBox";
import { PERKS, POSTERS } from "./data";

const STORIES = [
  { name: "Dewi, Bandung", text: "Tiket Bali + hotel 3 malam langsung beres di satu chat. Agennya sabar banget jawab pertanyaan." },
  { name: "Pak Rudi, Surabaya", text: "Pesawat di-reschedule maskapai, Jendela Trip yang urus semua. Saya tinggal terima tiket baru." },
  { name: "Tim HR PT Maju", text: "Langganan untuk dinas kantor. Invoice rapi, harga jelas, selalu cepat." },
];

export default function JendelaHome() {
  return (
    <>
      <JendelaNav />

      {/* Hero */}
      <section className="relative overflow-hidden border-b-[3px] border-jendela-ink" style={paperTexture}>
        <Sunburst className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] opacity-40" />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="inline-block -rotate-2 border-[3px] border-jendela-ink bg-jendela-mustard px-3 py-1 font-display text-sm uppercase">Agen tiket & hotel</p>
              <h1 className="mt-6 font-display text-5xl uppercase leading-[0.95] md:text-7xl">
                Ke mana pun,
                <br />
                <span className="text-jendela-red">kami carikan</span>
                <br />
                tiketnya.
              </h1>
              <p className="mt-6 max-w-md text-lg">Tiket pesawat ke seluruh Indonesia dan hotel di kota tujuan, dibantu agen sungguhan lewat WhatsApp.</p>
            </div>
            <div className="relative mx-auto hidden w-72 rotate-3 border-[3px] border-jendela-ink bg-jendela-cream p-3 shadow-[10px_10px_0_#2d1e12] lg:block">
              <PosterArt p={POSTERS[0]} className="w-full" />
              <div className="mt-2 text-center font-display text-2xl uppercase">Bali</div>
              <Stamp text="Promo" sub="mulai 650rb" className="absolute -left-10 -top-8 -rotate-12 bg-jendela-cream" />
            </div>
          </div>
          <div className="mt-12">
            <SearchBox />
          </div>
        </div>
      </section>

      {/* Promo */}
      <section id="promo" className="mx-auto max-w-6xl scroll-mt-4 px-4 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl uppercase md:text-5xl">Promo destinasi</h2>
          <Stamp text="Harga" sub="sekali jalan" color="#2f7f7a" className="rotate-6" />
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4">
          {POSTERS.map((p, i) => (
            <Link
              key={p.id}
              href={`/jendela-trip/pesan?type=flight&from=${p.from}&to=${p.to}`}
              className={`group border-[3px] border-jendela-ink bg-jendela-cream p-2 shadow-[6px_6px_0_#2d1e12] transition sm:p-3 hover:-translate-y-1 hover:rotate-0 ${i % 2 ? "rotate-1" : "-rotate-1"}`}
            >
              <PosterArt p={p} className="w-full border-[3px] border-jendela-ink" />
              <div className="mt-3 text-center">
                <div className="font-display text-lg uppercase sm:text-2xl">{p.city}</div>
                <div className="hidden text-xs uppercase tracking-[0.3em] text-jendela-ink/60 sm:block">{p.tagline}</div>
                <div className="mt-1 font-display text-sm text-jendela-red sm:mt-2 sm:text-lg">mulai {rupiah(p.price)}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Kenapa */}
      <section id="kenapa" className="scroll-mt-4 border-y-[3px] border-jendela-ink bg-jendela-teal py-20 text-jendela-cream">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-4xl uppercase md:text-5xl">Kenapa lewat agen?</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PERKS.map(([t, d], i) => (
              <div key={t} className="border-[3px] border-jendela-ink bg-jendela-cream p-6 text-jendela-ink shadow-[6px_6px_0_#2d1e12]">
                <Stamp text={`No. ${i + 1}`} color={["#d6452b", "#e2a72e", "#2f7f7a", "#2d1e12"][i]} className="h-16 w-16 px-0" />
                <h3 className="mt-4 font-display text-xl uppercase">{t}</h3>
                <p className="mt-2 text-sm">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cerita (kartu pos) */}
      <section id="cerita" className="mx-auto max-w-6xl scroll-mt-4 px-4 py-20">
        <h2 className="font-display text-4xl uppercase md:text-5xl">Kartu pos dari pelanggan</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {STORIES.map((s, i) => (
            <figure key={s.name} className={`relative border-[3px] border-jendela-ink bg-jendela-cream p-6 shadow-[6px_6px_0_#2d1e12] ${i === 1 ? "rotate-1" : "-rotate-1"}`}>
              <div className="absolute right-4 top-4 h-14 w-12 border-2 border-dashed border-jendela-red bg-jendela-mustard/40" aria-hidden />
              <blockquote className="pr-14 text-lg leading-relaxed">“{s.text}”</blockquote>
              <figcaption className="mt-5 border-t-2 border-dashed border-jendela-ink/30 pt-3 font-display text-sm uppercase">{s.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="border-t-[3px] border-jendela-ink bg-jendela-red px-4 py-16 text-center text-jendela-cream">
        <h2 className="font-display text-4xl uppercase md:text-6xl">Liburan berikutnya, ke mana?</h2>
        <Link
          href="/jendela-trip/pesan?type=flight"
          className="mt-8 inline-block border-[3px] border-jendela-ink bg-jendela-mustard px-8 py-4 font-display text-xl uppercase text-jendela-ink shadow-[6px_6px_0_#2d1e12]"
        >
          Cari tiket
        </Link>
      </section>

      <JendelaFooter />
    </>
  );
}
