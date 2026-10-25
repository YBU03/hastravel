"use client";

import Link from "next/link";
import { useState } from "react";
import { rupiah } from "@/lib/format";
import { CATEGORIES, TRIPS, type Category } from "../data";
import { SceneArt } from "./SceneArt";

export function TripGrid() {
  const [cat, setCat] = useState<Category | "semua">("semua");
  const trips = cat === "semua" ? TRIPS : TRIPS.filter((t) => t.category === cat);
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCat(c.id)}
            aria-pressed={cat === c.id}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${
              cat === c.id ? "bg-nusa-terra text-nusa-cream" : "bg-nusa-sand text-nusa-brown hover:bg-nusa-sage/40"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trips.map((t) => (
          <Link
            key={t.slug}
            href={`/langkah-nusa/trip/${t.slug}`}
            className="group overflow-hidden rounded-[2rem] bg-white/60 shadow-[0_10px_30px_-15px_rgba(59,42,32,0.4)] ring-1 ring-nusa-brown/5 transition hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
              {t.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.image} alt={t.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              ) : (
                <SceneArt scene={t.scene} className="h-full w-full transition duration-700 group-hover:scale-105" />
              )}
              <span className="absolute left-4 top-4 rounded-full bg-nusa-cream/90 px-3 py-1 text-xs font-bold">{t.duration}</span>
            </div>
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-nusa-moss">{t.location}</p>
              <h3 className="mt-1 font-display text-2xl font-semibold">{t.name}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-nusa-brown/70">{t.summary}</p>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <span className="text-xs text-nusa-brown/60">mulai</span>
                  <div className="font-display text-xl font-semibold text-nusa-terra">{rupiah(t.price)}</div>
                </div>
                <span className="rounded-full bg-nusa-brown px-4 py-2 text-xs font-bold text-nusa-cream group-hover:bg-nusa-terra">Lihat trip →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
