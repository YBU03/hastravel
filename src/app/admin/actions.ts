"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { BookingPayload, BookingResult } from "@/components/BookingForm";
import { ADMIN_COOKIE, adminPassword, checkPassword, createSessionToken } from "@/lib/auth";
import { parseBookingPayload } from "@/lib/booking-input";
import {
  addSchedule,
  BookingError,
  createBooking,
  setBookingStatus,
  setScheduleActive,
  updateRoute,
  updateSettings,
  type BookingStatus,
} from "@/lib/data";
import { requireAdmin } from "@/lib/session";

export async function loginAction(_: string | null, fd: FormData): Promise<string | null> {
  if (!adminPassword()) return "ADMIN_PASSWORD belum di-set di environment server.";
  if (!(await checkPassword(String(fd.get("password") ?? "")))) {
    await new Promise((r) => setTimeout(r, 600));
    return "Password salah.";
  }
  const { token, maxAge } = await createSessionToken();
  (await cookies()).set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });
  redirect("/admin");
}

export async function logoutAction() {
  (await cookies()).delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

export async function setStatusAction(fd: FormData) {
  await requireAdmin();
  try {
    await setBookingStatus(Number(fd.get("id")), String(fd.get("status")) as BookingStatus);
  } catch (e) {
    if (!(e instanceof BookingError)) throw e;
  }
  revalidatePath("/admin", "layout");
}

export async function createManualBookingAction(payload: BookingPayload): Promise<BookingResult> {
  await requireAdmin();
  try {
    const b = await createBooking(parseBookingPayload(payload), {
      source: "admin",
      status: payload.status === "pending" ? "pending" : "paid",
    });
    return { ok: true, redirect: `/admin/pesanan?q=${b.code}` };
  } catch (e) {
    if (e instanceof BookingError) return { ok: false, error: e.message, taken: e.takenSeats };
    console.error(e);
    return { ok: false, error: "Gagal menyimpan pesanan." };
  }
}

export async function saveSettingsAction(fd: FormData) {
  await requireAdmin();
  const hold = Math.max(5, Math.min(1440, Number(fd.get("hold_minutes")) || 60));
  await updateSettings({
    wa_number: String(fd.get("wa_number") ?? "").replace(/\D/g, "").replace(/^0/, "62"),
    hold_minutes: String(hold),
    front_seats_open: fd.get("front_seats_open") ? "true" : "false",
    bank_info: String(fd.get("bank_info") ?? "").trim(),
    payment_note: String(fd.get("payment_note") ?? "").trim(),
    address: String(fd.get("address") ?? "").trim(),
    email: String(fd.get("email") ?? "").trim(),
  });
  revalidatePath("/", "layout");
  redirect("/admin/pengaturan?saved=1");
}

export async function saveRouteAction(fd: FormData) {
  await requireAdmin();
  const price = Number(fd.get("price"));
  const duration = Number(fd.get("duration_hours")) * 60;
  if (!(price > 0) || !(duration > 0)) return;
  await updateRoute(Number(fd.get("id")), {
    price: Math.round(price),
    duration_min: Math.round(duration),
    active: !!fd.get("active"),
  });
  revalidatePath("/", "layout");
}

export async function addScheduleAction(fd: FormData) {
  await requireAdmin();
  const time = String(fd.get("depart_time") ?? "");
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) return;
  await addSchedule(Number(fd.get("route_id")), time);
  revalidatePath("/", "layout");
}

export async function toggleScheduleAction(fd: FormData) {
  await requireAdmin();
  await setScheduleActive(Number(fd.get("id")), fd.get("active") === "true");
  revalidatePath("/", "layout");
}
