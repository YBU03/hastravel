import { SayapFooter, SayapNav } from "../_components/Brand";
import { BookingFlow } from "./BookingFlow";

export const metadata = { title: "Pesan Shuttle - Sayap Shuttle" };

type SP = Promise<Record<string, string | undefined>>;

export default async function SayapBookingPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  return (
    <>
      <SayapNav />
      <main className="mx-auto max-w-6xl px-4 pb-32 pt-8 lg:pb-20">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sayap-lime">Pesan shuttle</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">Atur penjemputanmu</h1>
        <BookingFlow initial={sp} />
      </main>
      <SayapFooter />
    </>
  );
}
