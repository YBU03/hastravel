import { BookingForm } from "@/components/BookingForm";
import { TripPicker } from "@/components/admin/TripPicker";
import { tripInfo } from "@/lib/booking-input";
import { getTakenSeats, getTrip, listSchedules } from "@/lib/data";
import { isValidDate, todayWita } from "@/lib/format";
import { createManualBookingAction } from "../../../actions";

type SP = Promise<Record<string, string | undefined>>;

export default async function ManualBookingPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const date = isValidDate(sp.date) ? sp.date : todayWita();
  const scheduleId = Number(sp.schedule) || undefined;
  const schedules = await listSchedules();
  const [trip, taken] = scheduleId
    ? await Promise.all([getTrip(scheduleId, date), getTakenSeats(scheduleId, date)])
    : [null, []];

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900">Pesanan Manual</h1>
      <p className="mb-4 text-sm text-slate-500">
        Untuk pelanggan yang pesan lewat telepon / WhatsApp langsung, supaya kursinya ikut terkunci.
      </p>
      <TripPicker schedules={schedules} scheduleId={scheduleId} date={date} submitLabel="Pilih" />
      {trip && (
        <div className="mt-5 pb-28 lg:pb-0">
          <BookingForm
            key={`${trip.schedule.id}-${date}`}
            trip={tripInfo(trip)}
            taken={taken}
            blocked={[]}
            pax={1}
            mode="admin"
            action={createManualBookingAction}
          />
        </div>
      )}
    </div>
  );
}
