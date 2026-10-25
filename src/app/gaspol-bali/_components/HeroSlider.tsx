"use client";

import { useEffect, useState } from "react";
import { HERO_SLIDES } from "../data";

const INTERVAL = 5500;

/** Latar hero berganti otomatis; teks hero tetap di atasnya. */
export function HeroSlider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => setActive((i) => (i + 1) % HERO_SLIDES.length), INTERVAL);
    return () => clearTimeout(id);
  }, [active]);

  return (
    <section className="relative isolate overflow-hidden">
      {HERO_SLIDES.map((s, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={s.image}
          src={s.image}
          alt=""
          aria-hidden
          fetchPriority={i === 0 ? "high" : "low"}
          className={`absolute inset-0 -z-20 h-full w-full object-cover object-[75%_center] transition-[opacity,transform] ease-out ${
            i === active ? "scale-105 opacity-100 duration-[1000ms,6500ms]" : "scale-100 opacity-0 duration-[1000ms,0ms]"
          }`}
        />
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-gaspol-ink via-gaspol-ink/75 to-gaspol-ink/0" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-gaspol-ink to-transparent" />
      {children}
      <div className="absolute bottom-6 right-4 flex items-center gap-3 md:right-8">
        <span className="hidden rotate-2 rounded-md border-2 border-black bg-white px-2 py-0.5 font-display text-sm uppercase text-black md:inline-block">
          {HERO_SLIDES[active].caption}
        </span>
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.image}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
            aria-pressed={i === active}
            className={`h-3 rounded-full border-2 border-black transition-all ${i === active ? "w-10 bg-gaspol-pink" : "w-3 bg-white/70"}`}
          />
        ))}
      </div>
    </section>
  );
}
