import { JendelaFooter, JendelaNav } from "../_components/Retro";
import { RequestForm } from "./RequestForm";

export const metadata = { title: "Pesan Tiket & Hotel - Jendela Trip" };

export default async function JendelaRequestPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  return (
    <>
      <JendelaNav />
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-10">
        <h1 className="font-display text-4xl uppercase md:text-5xl">Permintaan pesanan</h1>
        <p className="mt-2">Lengkapi detail, agen kami kirim pilihan jadwal & harga final via WhatsApp.</p>
        <RequestForm initial={sp} />
      </main>
      <JendelaFooter />
    </>
  );
}
