"use server";

import type { BookingPayload, BookingResult } from "@/components/BookingForm";
import { parseBookingPayload } from "@/lib/booking-input";
import { BookingError, createBooking } from "@/lib/data";

export async function createBookingAction(payload: BookingPayload): Promise<BookingResult> {
  try {
    const booking = await createBooking(parseBookingPayload(payload), { source: "web" });
    return { ok: true, redirect: `/pesanan/${booking.code}?baru=1` };
  } catch (e) {
    if (e instanceof BookingError) return { ok: false, error: e.message, taken: e.takenSeats };
    console.error(e);
    return { ok: false, error: "Terjadi kesalahan. Silakan coba lagi atau hubungi admin via WhatsApp." };
  }
}
