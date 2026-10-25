import { SelatFooter, SelatNav } from "../_components/Brand";
import { BookingFlow } from "./BookingFlow";

export const metadata = { title: "Jadwal & Tiket - Selat Express" };

type SP = Promise<Record<string, string | undefined>>;

export default async function SelatSchedulePage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  return (
    <>
      <SelatNav />
      <main className="mx-auto max-w-6xl px-4 pb-32 pt-8 lg:pb-20">
        <BookingFlow initial={sp} />
      </main>
      <SelatFooter />
    </>
  );
}
