import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingForm } from "@/components/BookingForm";
import { IconChevronLeft } from "@/components/icons";
import { BlueBand, SiteHeader } from "@/components/SiteHeader";
import { tripInfo } from "@/lib/booking-input";
import { getSettings, getTakenSeats, getTrip } from "@/lib/data";
import { isValidDate } from "@/lib/format";
import { FRONT_SEATS } from "@/lib/seats";
import { createBookingAction } from "./actions";

type SP = Promise<Record<string, string | undefined>>;

export default async function BookingPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const scheduleId = Number(sp.schedule);
  if (!Number.isInteger(scheduleId) || !isValidDate(sp.date)) notFound();
  const [trip, taken, settings] = await Promise.all([
    getTrip(scheduleId, sp.date),
    getTakenSeats(scheduleId, sp.date),
    getSettings(),
  ]);
  if (!trip || !trip.schedule.active || !trip.route.active) notFound();
  const info = tripInfo(trip);
  const back = `/cari?from=${trip.route.origin}&to=${trip.route.destination}&date=${trip.date}&pax=${sp.pax ?? 1}`;

  return (
    <>
      <BlueBand className="pb-6">
        <SiteHeader waNumber={settings.wa_number} />
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 pt-2 text-white">
          <Link href={back} aria-label="Kembali" className="rounded-lg bg-white/15 p-2 hover:bg-white/25">
            <IconChevronLeft />
          </Link>
          <div>
            <div className="text-lg font-bold">
              {info.originName} → {info.destinationName}
            </div>
            <div className="text-sm text-white/80">
              {info.dateLabel} · {info.departTime} {info.departTz}
            </div>
          </div>
        </div>
      </BlueBand>
      <div className="mx-auto max-w-6xl px-4 pb-28 pt-5 lg:pb-0">
        {trip.departed ? (
          <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
            <p className="text-slate-600">Pemesanan online untuk jadwal ini sudah ditutup.</p>
            <Link href={back} className="mt-4 inline-block font-semibold text-brand-600">
              Pilih jadwal lain
            </Link>
          </div>
        ) : (
          <BookingForm
            trip={info}
            taken={taken}
            blocked={settings.front_seats_open ? [] : FRONT_SEATS}
            pax={Number(sp.pax) || 1}
            mode="web"
            action={createBookingAction}
          />
        )}
      </div>
    </>
  );
}
