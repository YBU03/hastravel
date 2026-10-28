import Link from "next/link";
import { rupiah } from "@/lib/format";
import { BaliFooter, BaliNav, Plate, Rule } from "./_components/Editorial";
import { DRIVERS, IMAGES, INCLUDED, RATES, ROUTES, TESTIMONIALS, usd } from "./data";

export default function BaliDriverHome() {
  return (
    <>
      <BaliNav />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-10 md:pt-16">
        <div className="flex flex-wrap items-baseline justify-between gap-2 text-[11px] uppercase tracking-[0.2em] text-editorial-mute">
          <span>Private drivers · Bali, Indonesia</span>
          <span>Issue no. 14 · Since 2011</span>
        </div>
        <h1 className="mt-6 font-display text-[3.4rem] leading-[0.92] tracking-tight md:text-[8.5rem]">
          The island,
          <br />
          <em>at your pace.</em>
        </h1>
        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_2fr]">
          <div className="flex flex-col justify-between gap-8">
            <p className="text-lg leading-relaxed">
              One car, one local driver, your whole day. Tell us where you want to go, or let us show you the Bali we grew up in.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/bali-driver/book" className="bg-editorial-ink px-6 py-3.5 text-sm font-medium text-editorial-paper hover:bg-black">
                Book a driver
              </Link>
              <a href="#rates" className="border border-editorial-ink px-6 py-3.5 text-sm font-medium hover:bg-editorial-ink hover:text-editorial-paper">
                See rates
              </a>
            </div>
          </div>
          <Plate src={IMAGES.hero} alt="A driver waiting by the car on a rice-field road" caption="Tegallalang, Ubud" className="aspect-[16/10] w-full" />
        </div>
      </section>

      {/* Facts */}
      <section className="mx-auto mt-16 max-w-6xl px-4">
        <dl className="grid grid-cols-2 border-y border-editorial-ink md:grid-cols-4">
          {[
            ["14", "years on the road"],
            ["23", "local drivers"],
            ["4.9", "average review"],
            ["0", "hidden fees"],
          ].map(([n, t], i) => (
            <div key={t} className={`py-6 ${i % 2 ? "pl-6" : ""} ${i ? "md:border-l md:border-editorial-ink/20 md:pl-6" : ""}`}>
              <dt className="font-display text-5xl">{n}</dt>
              <dd className="mt-1 text-sm text-editorial-mute">{t}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Rates */}
      <section id="rates" className="mx-auto max-w-6xl scroll-mt-4 px-4 py-24">
        <Rule no="I." label="Rates" />
        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="font-display text-5xl leading-none md:text-6xl">
              Priced by the hour, <em>not the stop.</em>
            </h2>
            <p className="mt-6 text-editorial-mute">Rates for a Toyota Avanza. Bigger cars are quoted on the booking page.</p>
            <ul className="mt-6 space-y-2 text-sm">
              {INCLUDED.map((x) => (
                <li key={x} className="flex gap-3">
                  <span aria-hidden>—</span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="divide-y divide-editorial-ink/20 border-y border-editorial-ink">
            {RATES.map((r) => (
              <Link
                key={r.id}
                href={`/bali-driver/book?rate=${r.id}`}
                className="group grid grid-cols-[4.5rem_1fr_auto] items-baseline gap-4 py-6 transition hover:bg-editorial-stone/30 md:grid-cols-[6rem_1fr_auto]"
              >
                <span className="font-display text-4xl md:text-5xl">{r.hours}h</span>
                <span>
                  <span className="block font-medium">{r.name}</span>
                  <span className="block text-sm text-editorial-mute">{r.note}</span>
                </span>
                <span className="text-right">
                  <span className="block font-medium tabular-nums">{rupiah(r.price)}</span>
                  <span className="block text-xs text-editorial-mute">{usd(r.price)}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Routes */}
      <section id="routes" className="scroll-mt-4 bg-editorial-ink py-24 text-editorial-paper">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-baseline gap-4 border-t border-editorial-paper pt-3 text-[11px] font-medium uppercase tracking-[0.2em]">
            <span>II.</span>
            <span>Sample routes</span>
          </div>
          <h2 className="mt-8 max-w-3xl font-display text-5xl leading-none md:text-6xl">
            Four days we never <em>get tired of.</em>
          </h2>
          <div className="mt-14 grid gap-x-10 gap-y-16 md:grid-cols-2">
            {ROUTES.map((r) => {
              const rate = RATES.find((x) => x.id === r.rate)!;
              return (
                <article key={r.id}>
                  <Plate src={IMAGES.routes[r.id]} alt={r.name} caption={r.region} tone="ink" className="aspect-[4/3] w-full border border-editorial-paper/20" />
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-3xl">
                      <span className="mr-3 text-editorial-paper/40">{r.no}</span>
                      {r.name}
                    </h3>
                    <span className="whitespace-nowrap text-sm text-editorial-paper/60">{rate.hours}h · {rupiah(rate.price)}</span>
                  </div>
                  <p className="mt-3 text-editorial-paper/70">{r.text}</p>
                  <p className="mt-4 text-sm text-editorial-paper/50">{r.stops.join("  ·  ")}</p>
                  <Link href={`/bali-driver/book?route=${r.id}`} className="mt-5 inline-block border-b border-editorial-paper pb-0.5 text-sm hover:opacity-70">
                    Book this route →
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Drivers */}
      <section id="drivers" className="mx-auto max-w-6xl scroll-mt-4 px-4 py-24">
        <Rule no="III." label="The drivers" />
        <h2 className="mt-8 max-w-3xl font-display text-5xl leading-none md:text-6xl">
          Not a car service. <em>A person you&rsquo;ll remember.</em>
        </h2>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {DRIVERS.map((d) => (
            <article key={d.id}>
              <Plate src={IMAGES.drivers[d.id]} alt={`Portrait of ${d.name}`} caption={d.trait} className="aspect-[3/4] w-full" />
              <h3 className="mt-5 font-display text-3xl">{d.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-editorial-mute">
                Driving since {d.since} · {d.languages.join(", ")}
              </p>
              <p className="mt-3 text-sm leading-relaxed">{d.bio}</p>
              <Link href={`/bali-driver/book?driver=${d.id}`} className="mt-4 inline-block border-b border-editorial-ink pb-0.5 text-sm hover:opacity-60">
                Request {d.name.split(" ")[0]} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-editorial-ink/15 bg-editorial-stone/40 py-24">
        <div className="mx-auto max-w-6xl px-4">
          <Rule no="IV." label="Letters from guests" />
          <div className="mt-12 grid gap-12 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name}>
                <blockquote className="font-display text-2xl italic leading-snug md:text-3xl">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-5 text-sm">
                  {t.name} <span className="text-editorial-mute">· {t.from}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-24 text-center">
        <h2 className="font-display text-6xl leading-none md:text-8xl">
          Where to, <em>tomorrow?</em>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-editorial-mute">Send us your plan. We reply on WhatsApp within the hour, with a driver&rsquo;s name and a fixed price.</p>
        <Link href="/bali-driver/book" className="mt-10 inline-block bg-editorial-ink px-8 py-4 text-sm font-medium text-editorial-paper hover:bg-black">
          Book a driver
        </Link>
      </section>

      <BaliFooter />
    </>
  );
}
