import { redirect } from "next/navigation";
import { IconPhone, IconSearch, IconTicket, IconWhatsapp } from "@/components/icons";
import { BlueBand, SiteHeader } from "@/components/SiteHeader";
import { getBookingByCode, getSettings } from "@/lib/data";
import { normalizePhone } from "@/lib/format";
import { waLink } from "@/lib/wa";

type SP = Promise<{ code?: string; phone?: string }>;

const field =
  "flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3.5 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100";

export default async function CheckBookingPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const settings = await getSettings();
  let error = "";
  if (sp.code) {
    const b = await getBookingByCode(sp.code);
    if (b && sp.phone && normalizePhone(b.phone) === normalizePhone(sp.phone)) redirect(`/pesanan/${b.code}`);
    error = "Pesanan tidak ditemukan. Periksa kembali kode booking dan nomor HP yang dipakai saat memesan.";
  }

  return (
    <>
      <BlueBand className="pb-28">
        <SiteHeader waNumber={settings.wa_number} />
        <div className="mx-auto max-w-md px-4 pt-6 text-center text-white">
          <h1 className="text-2xl font-extrabold md:text-3xl">Cek Pesanan</h1>
          <p className="mt-1 text-sm text-white/85">Lihat status pembayaran, kursi, dan detail perjalananmu.</p>
        </div>
      </BlueBand>

      <div className="relative z-10 mx-auto -mt-20 max-w-md px-4">
        <form className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10 ring-1 ring-slate-100">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <IconTicket />
            </span>
            <div>
              <h2 className="font-bold text-slate-900">Data Pesanan</h2>
              <p className="text-xs text-slate-500">Isi sesuai data saat memesan.</p>
            </div>
          </div>

          <div className="grid gap-4">
            <label className="grid gap-1.5 text-sm font-medium text-slate-700">
              Kode booking
              <span className={field}>
                <IconTicket width={18} height={18} className="shrink-0 text-slate-400" />
                <input
                  name="code"
                  required
                  defaultValue={sp.code}
                  autoCapitalize="characters"
                  autoComplete="off"
                  spellCheck={false}
                  className="w-full bg-transparent py-3 font-mono text-sm uppercase tracking-wider outline-none placeholder:font-sans placeholder:normal-case placeholder:tracking-normal placeholder:text-slate-400"
                  placeholder="Contoh: HT261027ABCDE"
                />
              </span>
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-slate-700">
              No. HP pemesan
              <span className={field}>
                <IconPhone width={18} height={18} className="shrink-0 text-slate-400" />
                <input
                  name="phone"
                  required
                  type="tel"
                  inputMode="tel"
                  defaultValue={sp.phone}
                  className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-400"
                  placeholder="Contoh: 081234567890"
                />
              </span>
            </label>

            {error && (
              <div role="alert" className="flex gap-2.5 rounded-xl bg-red-50 px-3.5 py-3 text-sm text-red-700 ring-1 ring-red-100">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                  !
                </span>
                {error}
              </div>
            )}

            <button className="flex items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 font-semibold text-white shadow-lg shadow-brand-600/25 hover:bg-brand-700">
              <IconSearch width={18} height={18} /> Cek Pesanan
            </button>
          </div>
        </form>

        <div className="mt-4 grid gap-3">
          <div className="rounded-2xl bg-white p-4 text-sm shadow-sm ring-1 ring-slate-100">
            <h3 className="font-semibold text-slate-900">Di mana kode booking saya?</h3>
            <p className="mt-1 text-slate-500">
              Kode booking (diawali <b className="font-mono text-slate-700">HT</b>) muncul setelah kamu memesan dan ada di pesan
              WhatsApp yang kamu kirim ke admin.
            </p>
          </div>
          <a
            href={waLink(settings.wa_number, "Halo HasTrans, saya lupa kode booking. Nama saya: ")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl bg-white p-4 text-sm shadow-sm ring-1 ring-slate-100 hover:ring-green-200"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#25D366]">
              <IconWhatsapp />
            </span>
            <span className="flex-1">
              <span className="block font-semibold text-slate-900">Lupa kode booking?</span>
              <span className="text-slate-500">Chat admin via WhatsApp, kami bantu cek.</span>
            </span>
            <span className="text-slate-300">›</span>
          </a>
        </div>
      </div>
    </>
  );
}
