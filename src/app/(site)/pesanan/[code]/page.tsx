import Link from "next/link";
import { notFound } from "next/navigation";
import { Countdown } from "@/components/Countdown";
import { IconCheck, IconWhatsapp } from "@/components/icons";
import { StatusBadge } from "@/components/StatusBadge";
import { BlueBand, SiteHeader } from "@/components/SiteHeader";
import { city } from "@/lib/cities";
import { getBookingByCode, getSettings } from "@/lib/data";
import { formatDate, formatDateTime, maskPhone, rupiah } from "@/lib/format";
import { siteUrl } from "@/lib/site";
import { bookingMessage, waLink } from "@/lib/wa";

type Props = { params: Promise<{ code: string }>; searchParams: Promise<{ baru?: string }> };

export default async function BookingDetailPage({ params, searchParams }: Props) {
  const { code } = await params;
  const { baru } = await searchParams;
  const [b, settings, url] = await Promise.all([getBookingByCode(code), getSettings(), siteUrl()]);
  if (!b) notFound();
  const from = city(b.origin);
  const to = city(b.destination);
  const waHref = waLink(settings.wa_number, bookingMessage(b, url));
  const isNew = baru === "1" && b.status === "pending";

  return (
    <>
      <BlueBand className="pb-24">
        <SiteHeader waNumber={settings.wa_number} />
        <div className="mx-auto max-w-2xl px-4 pt-4 text-center text-white">
          {isNew ? (
            <>
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-600">
                <IconCheck width={28} height={28} />
              </span>
              <h1 className="mt-3 text-2xl font-extrabold">Kursi berhasil dipesan!</h1>
              <p className="mt-1 text-sm text-white/85">
                Langkah terakhir: kirim pesanan ke WhatsApp admin untuk konfirmasi & pembayaran.
              </p>
            </>
          ) : (
            <h1 className="text-2xl font-extrabold">Detail Pesanan</h1>
          )}
        </div>
      </BlueBand>

      <div className="mx-auto -mt-16 max-w-2xl px-4">
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-900/5">
          <div className="flex items-center justify-between gap-3 border-b border-dashed border-slate-200 p-5">
            <div>
              <div className="text-xs text-slate-500">Kode Booking</div>
              <div className="font-mono text-xl font-bold tracking-wider text-slate-900">{b.code}</div>
            </div>
            <StatusBadge status={b.status} />
          </div>

          {b.status === "pending" && b.expires_at && (
            <div className="bg-amber-50 px-5 py-3 text-sm text-amber-800">
              Selesaikan pembayaran dalam{" "}
              <b>
                <Countdown until={new Date(b.expires_at).toISOString()} />
              </b>{" "}
              agar kursi tidak dilepas.
            </div>
          )}

          <div className="p-5">
            <div className="flex items-center gap-4">
              <div>
                <div className="text-2xl font-extrabold">{b.depart_time}</div>
                <div className="text-xs text-slate-500">
                  {from.tzLabel} · {from.name}
                </div>
              </div>
              <div className="h-px flex-1 border-t-2 border-dashed border-brand-200" />
              <div className="text-right">
                <div className="text-lg font-bold">{to.name}</div>
              </div>
            </div>
            <div className="mt-2 text-sm font-medium text-brand-700">{formatDate(b.travel_date)}</div>

            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <div>
                <dt className="text-slate-500">Pemesan</dt>
                <dd className="font-medium">{b.customer_name}</dd>
              </div>
              <div>
                <dt className="text-slate-500">No. HP</dt>
                <dd className="font-medium">{maskPhone(b.phone)}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-slate-500">Penumpang</dt>
                <dd className="mt-1 flex flex-wrap gap-2">
                  {b.passengers.map((p) => (
                    <span key={p.seat} className="rounded-lg bg-brand-50 px-2.5 py-1 text-brand-800">
                      <b>Kursi {p.seat}</b> · {p.name}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-slate-500">Jemput</dt>
                <dd className="whitespace-pre-line">{b.pickup_address}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-slate-500">Antar</dt>
                <dd className="whitespace-pre-line">{b.dropoff_address}</dd>
              </div>
              {b.notes && (
                <div className="col-span-2">
                  <dt className="text-slate-500">Catatan</dt>
                  <dd>{b.notes}</dd>
                </div>
              )}
            </dl>

            <div className="mt-5 space-y-1.5 rounded-xl bg-slate-50 p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">
                  {rupiah(b.price_per_seat)} × {b.seats.length} kursi
                </span>
                <span>{rupiah(b.total)}</span>
              </div>
              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span className="text-brand-700">{rupiah(b.total)}</span>
              </div>
            </div>

            {b.status === "pending" && (
              <div className="mt-5 rounded-xl border border-brand-100 p-4 text-sm">
                <h2 className="font-semibold text-slate-900">Cara Pembayaran</h2>
                <p className="mt-2 whitespace-pre-line font-medium text-slate-800">{settings.bank_info}</p>
                <p className="mt-2 text-slate-500">{settings.payment_note}</p>
              </div>
            )}

            {(b.status === "pending" || b.status === "paid") && (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 font-semibold text-white shadow-lg shadow-green-600/20 hover:bg-[#1ebe5b]"
              >
                <IconWhatsapp /> {b.status === "pending" ? "Kirim Pesanan ke WhatsApp" : "Hubungi Admin"}
              </a>
            )}
            <p className="mt-3 text-center text-xs text-slate-400">Dipesan {formatDateTime(b.created_at)}</p>
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-slate-500">
          Simpan kode booking ini.{" "}
          <Link href="/" className="font-semibold text-brand-600">
            Kembali ke beranda
          </Link>
        </p>
      </div>
    </>
  );
}
