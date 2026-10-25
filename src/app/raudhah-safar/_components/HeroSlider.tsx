"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SLIDES } from "../data";

const INTERVAL = 6500;

export function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => setActive((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => clearTimeout(id);
  }, [active]);

  const slide = SLIDES[active];
  return (
    <section className="relative isolate flex min-h-[92svh] items-center overflow-hidden bg-raudhah-deep md:min-h-[720px]">
      {SLIDES.map((s, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={s.image}
          src={s.image}
          alt=""
          aria-hidden
          fetchPriority={i === 0 ? "high" : "low"}
          className={`absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center] transition-[opacity,transform] ease-out ${
            i === active ? "scale-105 opacity-100 duration-[1400ms,8000ms]" : "scale-100 opacity-0 duration-[1400ms,0ms]"
          }`}
        />
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-raudhah-deep via-raudhah-deep/80 to-raudhah-deep/10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-raudhah-deep/80 to-transparent" />

      <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-28">
        <div key={active} className="max-w-xl animate-[sayapIn_800ms_ease-out]">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-raudhah-gold">{slide.eyebrow}</p>
          <h1 className="mt-5 font-display text-5xl leading-[1.08] text-raudhah-ivory md:text-6xl">{slide.title}</h1>
          <p className="mt-5 max-w-md text-lg text-raudhah-ivory/80">{slide.text}</p>
        </div>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="#paket" className="rounded-full bg-raudhah-gold px-7 py-3.5 font-bold text-raudhah-deep hover:bg-raudhah-gold-soft">
            Lihat Paket
          </Link>
          <Link href="#jadwal" className="rounded-full border border-raudhah-ivory/40 px-7 py-3.5 font-bold text-raudhah-ivory hover:border-raudhah-gold hover:text-raudhah-gold">
            Jadwal Keberangkatan
          </Link>
        </div>
        <div className="mt-12 flex gap-2" role="tablist" aria-label="Pilih slide">
          {SLIDES.map((s, i) => (
            <button
              key={s.image}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-2.5 rotate-45 transition-all ${i === active ? "w-2.5 bg-raudhah-gold ring-4 ring-raudhah-gold/30" : "w-2.5 bg-raudhah-ivory/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
