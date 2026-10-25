import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { rupiah } from "@/lib/format";
import { Divider, RaudhahFooter, RaudhahNav, starPattern } from "../../_components/Brand";
import { findPackage, PACKAGES } from "../../data";
import { RegisterBox } from "./RegisterBox";

export function generateStaticParams() {
  return PACKAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = findPackage((await params).slug);
  return { title: p ? `${p.name} ${p.days} Hari - Raudhah Safar` : "Paket - Raudhah Safar" };
}

export default async function PackagePage({ params }: { params: Promise<{ slug: string }> }) {
  const p = findPackage((await params).slug);
  if (!p) notFound();

  return (
    <>
      <RaudhahNav />
      <section className="bg-raudhah-emerald pb-16 pt-8" style={starPattern}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-[1.2fr_1fr]">
          <div>
            <Link href="/raudhah-safar#paket" className="text-sm font-bold text-raudhah-gold hover:underline">
              ← Semua paket
            </Link>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-raudhah-gold">{p.kind}</p>
            <h1 className="mt-3 font-display text-5xl text-raudhah-ivory md:text-6xl">
              {p.name} <span className="text-raudhah-gold">{p.days} Hari</span>
            </h1>
            <div className="mt-6 flex flex-wrap gap-2 text-sm">
              {[`✈ ${p.airline}`, `🏨 Hotel ${"★".repeat(Math.max(...p.hotels.map((h) => h.stars)))}`, `💳 DP ${rupiah(p.dp)}`].map((c) => (
                <span key={c} className="rounded-full border border-raudhah-gold/40 px-4 py-1.5 text-raudhah-ivory/90">
                  {c}
                </span>
              ))}
            </div>
            <ul className="mt-6 space-y-2 text-raudhah-ivory/85">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span className="text-raudhah-gold">✦</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto flex aspect-[4/5] w-full max-w-sm items-end justify-center rounded-t-full border-2 border-raudhah-gold/60 bg-raudhah-deep/50 px-6 pb-8">
            <div className="absolute inset-3 rounded-t-full border border-raudhah-gold/25" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt={p.name} className="relative max-h-[65%] w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]" />
          </div>
        </div>
      </section>

      <main className="mx-auto grid max-w-6xl gap-10 px-4 pb-32 pt-14 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start lg:pb-20">
        <div className="grid gap-12">
          <section>
            <h2 className="font-display text-3xl text-raudhah-emerald">Rencana perjalanan</h2>
            <Divider className="mt-3" align="start" />
            <ol className="mt-6 space-y-4">
              {p.itinerary.map(([day, text]) => (
                <li key={day} className="flex gap-4 rounded-2xl bg-white p-4 ring-1 ring-raudhah-gold/20">
                  <span className="w-20 shrink-0 font-display text-lg text-raudhah-leaf">{day}</span>
                  <span className="text-raudhah-deep/80">{text}</span>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="font-display text-3xl text-raudhah-emerald">Hotel</h2>
            <Divider className="mt-3" align="start" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {p.hotels.map((h) => (
                <div key={h.city} className="rounded-2xl bg-raudhah-emerald p-5 text-raudhah-ivory" style={starPattern}>
                  <div className="text-xs font-bold uppercase tracking-[0.25em] text-raudhah-gold">{h.city}</div>
                  <div className="mt-2 font-display text-xl">{h.name}</div>
                  <div className="mt-1 text-raudhah-gold">{"★".repeat(h.stars)}</div>
                  <div className="mt-2 text-sm text-raudhah-ivory/70">{h.distance}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 ring-1 ring-raudhah-gold/30">
              <h2 className="font-display text-2xl text-raudhah-emerald">Termasuk</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {p.include.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="text-raudhah-leaf">✓</span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-white p-6 ring-1 ring-raudhah-gold/30">
              <h2 className="font-display text-2xl text-raudhah-emerald">Tidak termasuk</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {p.exclude.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="text-red-700">✗</span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <Suspense>
          <RegisterBox slug={p.slug} />
        </Suspense>
      </main>
      <RaudhahFooter />
    </>
  );
}
