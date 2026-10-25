import { GaspolFooter, GaspolNav } from "../_components/Brand";
import { RentalForm } from "./RentalForm";

export const metadata = { title: "Sewa Motor - Gaspol Bali" };

export default async function GaspolRentPage({ searchParams }: { searchParams: Promise<{ motor?: string }> }) {
  const { motor } = await searchParams;
  return (
    <>
      <GaspolNav />
      <main className="mx-auto max-w-6xl px-4 pb-32 pt-10 lg:pb-20">
        <h1 className="font-display text-6xl uppercase">
          Sewa <span className="text-gaspol-pink">motor</span>
        </h1>
        <p className="mt-2 text-white/60">Tarif otomatis paling hemat sesuai lama sewa.</p>
        <RentalForm initialBike={motor} />
      </main>
      <GaspolFooter />
    </>
  );
}
