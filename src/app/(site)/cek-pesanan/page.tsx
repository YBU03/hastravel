import { redirect } from "next/navigation";
import { BlueBand, SiteHeader } from "@/components/SiteHeader";
import { getBookingByCode, getSettings } from "@/lib/data";
import { normalizePhone } from "@/lib/format";

type SP = Promise<{ code?: string; phone?: string }>;

export default async function CheckBookingPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const settings = await getSettings();
  let error = "";
  if (sp.code) {
    const b = await getBookingByCode(sp.code);
    if (b && sp.phone && normalizePhone(b.phone) === normalizePhone(sp.phone)) redirect(`/pesanan/${b.code}`);
    error = "Pesanan tidak ditemukan. Periksa kembali kode booking dan nomor HP.";
  }
  const input =
    "w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";
  return (
    <>
      <BlueBand className="pb-24">
        <SiteHeader waNumber={settings.wa_number} />
        <div className="mx-auto max-w-md px-4 pt-4 text-center text-white">
          <h1 className="text-2xl font-extrabold">Cek Pesanan</h1>
          <p className="mt-1 text-sm text-white/80">Masukkan kode booking dan nomor HP pemesan.</p>
        </div>
      </BlueBand>
      <div className="mx-auto -mt-16 max-w-md px-4">
        <form className="grid gap-4 rounded-2xl bg-white p-6 shadow-lg shadow-slate-900/5">
          <label className="grid gap-1.5 text-sm font-medium">
            Kode booking
            <input
              name="code"
              required
              defaultValue={sp.code}
              className={`${input} font-mono uppercase`}
              placeholder="HT261025XXXXX"
            />
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            No. HP pemesan
            <input name="phone" required type="tel" defaultValue={sp.phone} className={input} placeholder="08xxxxxxxxxx" />
          </label>
          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          <button className="rounded-xl bg-brand-600 py-3 font-semibold text-white hover:bg-brand-700">Cek Pesanan</button>
        </form>
      </div>
    </>
  );
}
