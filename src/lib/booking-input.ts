import type { BookingPayload, TripInfo } from "@/components/BookingForm";
import { city } from "./cities";
import { BookingError, type NewBooking, type Trip } from "./data";
import { formatDate, isValidDate } from "./format";

export function tripInfo(t: Trip): TripInfo {
  const from = city(t.route.origin);
  const to = city(t.route.destination);
  return {
    scheduleId: t.schedule.id,
    date: t.date,
    dateLabel: formatDate(t.date),
    originName: from.name,
    destinationName: to.name,
    departTime: t.schedule.depart_time,
    departTz: from.tzLabel,
    arrivalTime: t.arrival.time,
    arrivalTz: to.tzLabel,
    arrivalDayOffset: t.arrival.dayOffset,
    price: t.route.price,
  };
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Validasi data dari browser sebelum disimpan. */
export function parseBookingPayload(p: BookingPayload): NewBooking {
  const phone = str(p.phone, 20);
  const digits = phone.replace(/\D/g, "");
  const out: NewBooking = {
    scheduleId: Number(p.scheduleId),
    date: str(p.date, 10),
    seats: Array.isArray(p.seats) ? p.seats.map(Number).filter(Number.isInteger) : [],
    passengers: Array.isArray(p.passengers)
      ? p.passengers.map((x) => ({ seat: Number(x?.seat), name: str(x?.name, 80) }))
      : [],
    customerName: str(p.customerName, 80),
    phone,
    pickupAddress: str(p.pickupAddress, 300),
    dropoffAddress: str(p.dropoffAddress, 300),
    notes: str(p.notes, 300),
  };
  if (!Number.isInteger(out.scheduleId) || !isValidDate(out.date)) throw new BookingError("Jadwal tidak valid.");
  if (!out.customerName) throw new BookingError("Nama pemesan wajib diisi.");
  if (digits.length < 9 || digits.length > 15) throw new BookingError("Nomor HP tidak valid.");
  if (!out.pickupAddress || !out.dropoffAddress) throw new BookingError("Alamat jemput dan antar wajib diisi.");
  return out;
}
