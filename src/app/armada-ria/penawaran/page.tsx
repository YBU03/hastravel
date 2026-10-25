import { RiaFooter, RiaNav } from "../_components/Brand";
import { QuoteForm } from "./QuoteForm";

export const metadata = { title: "Minta Penawaran - Armada Ria" };

export default async function RiaQuotePage({ searchParams }: { searchParams: Promise<{ bus?: string }> }) {
  const { bus } = await searchParams;
  return (
    <>
      <RiaNav />
      <main className="mx-auto max-w-6xl px-4 pb-32 pt-10 lg:pb-20">
        <h1 className="font-display text-4xl font-extrabold md:text-5xl">
          Kalkulator <span className="bg-ria-yellow px-2">rombongan</span>
        </h1>
        <p className="mt-3 max-w-xl">Isi data perjalananmu, perkiraan harga langsung muncul. Penawaran resmi dikirim admin via WhatsApp.</p>
        <QuoteForm initialBus={bus} />
      </main>
      <RiaFooter />
    </>
  );
}
