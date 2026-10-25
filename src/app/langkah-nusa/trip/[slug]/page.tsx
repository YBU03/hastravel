import Link from "next/link";
import { notFound } from "next/navigation";
import { rupiah } from "@/lib/format";
import { NusaFooter, NusaNav } from "../../_components/Brand";
import { SceneArt } from "../../_components/SceneArt";
import { findTrip, TRIPS } from "../../data";
import { JoinBox } from "./JoinBox";

export function generateStaticParams() {
  return TRIPS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const trip = findTrip((await params).slug);
  return { title: trip ? `${trip.name} - Langkah Nusa` : "Trip - Langkah Nusa" };
}

export default async function TripPage({ params }: { params: Promise<{ slug: string }> }) {
  const trip = findTrip((await params).slug);
  if (!trip) notFound();

  return (
    <>
      <NusaNav />
      <main className="mx-auto max-w-6xl px-4 pb-32 lg:pb-20">
        <Link href="/langkah-nusa#trip" className="text-sm font-bold text-nusa-moss hover:text-nusa-terra">
          ← Semua trip
        </Link>
        <div className="mt-4 overflow-hidden rounded-[2.5rem]">
          {trip.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={trip.image} alt={trip.name} className="aspect-[21/9] w-full object-cover" />
          ) : (
            <SceneArt scene={trip.scene} className="aspect-[16/9] w-full md:aspect-[21/9]" />
          )}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-nusa-moss">{trip.location}</p>
            <h1 className="mt-2 font-display text-5xl font-semibold leading-tight">{trip.name}</h1>
            <p className="mt-4 text-lg text-nusa-brown/75">{trip.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2 text-sm font-bold">
              {[`⏱ ${trip.duration}`, `👥 Maks. ${trip.quota} orang`, `📍 ${trip.meetingPoint}`, `💰 ${rupiah(trip.price)} / orang`].map((c) => (
                <span key={c} className="rounded-full bg-nusa-sand px-4 py-2">
                  {c}
                </span>
              ))}
            </div>

            <h2 className="mt-14 font-display text-3xl font-semibold">Itinerary</h2>
            <div className="mt-6 space-y-8">
              {trip.itinerary.map((day, i) => (
                <div key={day.title} className="rounded-[2rem] bg-white/60 p-6 ring-1 ring-nusa-brown/5">
                  <h3 className="flex items-center gap-3 font-display text-xl font-semibold">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-nusa-terra text-sm text-nusa-cream">{i + 1}</span>
                    {day.title}
                  </h3>
                  <ol className="relative mt-5 space-y-4 border-l-2 border-dashed border-nusa-sage pl-6">
                    {day.items.map(([time, act]) => (
                      <li key={time + act} className="relative">
                        <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-nusa-sage ring-4 ring-nusa-cream" />
                        <span className="font-bold text-nusa-terra">{time}</span> <span className="text-nusa-brown/80">{act}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              <div className="rounded-[2rem] bg-nusa-sage/25 p-6">
                <h2 className="font-display text-2xl font-semibold">Termasuk</h2>
                <ul className="mt-4 space-y-2 text-sm">
                  {trip.include.map((x) => (
                    <li key={x}>✓ {x}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[2rem] bg-nusa-terra/10 p-6">
                <h2 className="font-display text-2xl font-semibold">Tidak termasuk</h2>
                <ul className="mt-4 space-y-2 text-sm">
                  {trip.exclude.map((x) => (
                    <li key={x}>✗ {x}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <JoinBox slug={trip.slug} />
        </div>
      </main>
      <NusaFooter />
    </>
  );
}
