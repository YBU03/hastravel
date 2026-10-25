"use client";

import { useEffect, useState } from "react";
import { SLIDES } from "../data";

const INTERVAL = 6000;

export function HeroSlider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => clearTimeout(id);
  }, [active, paused]);

  const slide = SLIDES[active];

  return (
    <section
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-sayap-ink md:min-h-[760px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Gambar */}
      {SLIDES.map((s, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={s.image}
          src={s.image}
          alt=""
          aria-hidden
          fetchPriority={i === 0 ? "high" : "low"}
          className={`absolute inset-0 -z-20 h-full w-full object-cover object-[72%_center] transition-[opacity,transform] ease-out ${
            i === active ? "scale-105 opacity-100 duration-[1200ms,7000ms]" : "scale-100 opacity-0 duration-[1200ms,0ms]"
          }`}
        />
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-sayap-navy via-sayap-navy/75 to-sayap-navy/0 md:via-sayap-navy/55" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-sayap-navy via-sayap-navy/70 to-transparent" />

      {/* Teks slide */}
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 pb-8 pt-28 md:pt-24">
        <div key={active} className="max-w-xl animate-[sayapIn_700ms_ease-out]">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-sayap-lime">
            <span className="h-px w-8 bg-sayap-lime" /> {slide.eyebrow}
          </p>
          <h1 className="mt-4 whitespace-pre-line font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
            {slide.title}
          </h1>
          <p className="mt-4 max-w-md text-base text-slate-300 md:text-lg">{slide.text}</p>
        </div>

        {/* Indikator */}
        <div className="mt-8 flex gap-2" role="tablist" aria-label="Pilih slide">
          {SLIDES.map((s, i) => (
            <button
              key={s.image}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setActive(i)}
              className="relative h-1.5 w-12 overflow-hidden rounded-full bg-white/20"
            >
              {i === active && (
                <span
                  key={`${active}-${paused}`}
                  className="absolute inset-y-0 left-0 rounded-full bg-sayap-lime"
                  style={{
                    animation: `sayapProgress ${INTERVAL}ms linear forwards`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                />
              )}
              {i < active && <span className="absolute inset-0 rounded-full bg-white/60" />}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pb-8 md:pb-12">{children}</div>
    </section>
  );
}
