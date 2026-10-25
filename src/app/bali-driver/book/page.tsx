import { BaliFooter, BaliNav } from "../_components/Editorial";
import { BookingForm } from "./BookingForm";

export const metadata = { title: "Book a Driver - Bali Driver Co." };

export default async function BaliBookPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  return (
    <>
      <BaliNav />
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-12">
        <p className="text-[11px] uppercase tracking-[0.2em] text-editorial-mute">Booking request</p>
        <h1 className="mt-3 font-display text-5xl leading-none md:text-7xl">
          Plan your <em>day out.</em>
        </h1>
        <p className="mt-4 max-w-xl text-editorial-mute">Nothing is charged here. We confirm your driver and the final price on WhatsApp; you pay the driver in cash or by card on the day.</p>
        <BookingForm initial={sp} />
      </main>
      <BaliFooter />
    </>
  );
}
