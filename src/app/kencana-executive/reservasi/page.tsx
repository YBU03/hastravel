import { KencanaFooter, KencanaNav } from "../_components/Brand";
import { ReservationFlow } from "./ReservationFlow";

export const metadata = { title: "Reservasi - Kencana Executive" };

type SP = Promise<Record<string, string | undefined>>;

export default async function KencanaReservationPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  return (
    <>
      <KencanaNav />
      <main className="mx-auto max-w-6xl px-4 pb-32 pt-12 lg:pb-24">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-kencana-gold">Reservasi</p>
          <h1 className="mt-3 font-display text-4xl text-kencana-ivory md:text-5xl">Rancang perjalanan Anda</h1>
        </div>
        <ReservationFlow initialUnit={sp.unit} initialPackage={sp.paket} />
      </main>
      <KencanaFooter />
    </>
  );
}
