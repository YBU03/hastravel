import { db, type Queryable } from "./db";
import { city } from "./cities";
import { arrival, nowAt, toMinutes } from "./format";
import { ALL_SEATS, FRONT_SEATS, MAX_SEATS_PER_BOOKING, TOTAL_SEATS } from "./seats";

export type Route = {
  id: number;
  origin: string;
  destination: string;
  price: number;
  duration_min: number;
  active: boolean;
  sort: number;
};

export type Schedule = {
  id: number;
  route_id: number;
  depart_time: string;
  active: boolean;
};

export type BookingStatus = "pending" | "paid" | "done" | "cancelled" | "expired";

export const STATUS_LABEL: Record<BookingStatus, string> = {
  pending: "Menunggu Pembayaran",
  paid: "Lunas",
  done: "Selesai",
  cancelled: "Dibatalkan",
  expired: "Kedaluwarsa",
};

export type Passenger = { seat: number; name: string };

export type Booking = {
  id: number;
  code: string;
  schedule_id: number;
  travel_date: string;
  origin: string;
  destination: string;
  depart_time: string;
  customer_name: string;
  phone: string;
  pickup_address: string;
  dropoff_address: string;
  notes: string;
  seats: number[];
  passengers: Passenger[];
  price_per_seat: number;
  total: number;
  status: BookingStatus;
  source: "web" | "admin";
  expires_at: Date | null;
  created_at: Date;
};

export type Settings = {
  wa_number: string;
  hold_minutes: number;
  front_seats_open: boolean;
  bank_info: string;
  payment_note: string;
  address: string;
  email: string;
};

// ---------- Settings ----------

export async function getSettings(): Promise<Settings> {
  const { rows } = await (await db()).query<{ key: string; value: string }>("SELECT key, value FROM settings");
  const m = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  return {
    wa_number: m.wa_number ?? "",
    hold_minutes: Number(m.hold_minutes ?? 60) || 60,
    front_seats_open: m.front_seats_open !== "false",
    bank_info: m.bank_info ?? "",
    payment_note: m.payment_note ?? "",
    address: m.address ?? "",
    email: m.email ?? "",
  };
}

export async function updateSettings(values: Partial<Record<keyof Settings, string>>) {
  const conn = await db();
  for (const [key, value] of Object.entries(values)) {
    if (value === undefined) continue;
    await conn.query(
      "INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value",
      [key, value],
    );
  }
}

// ---------- Routes & schedules ----------

export async function listRoutes(opts: { activeOnly?: boolean } = {}): Promise<Route[]> {
  const { rows } = await (await db()).query<Route>(
    `SELECT * FROM routes ${opts.activeOnly ? "WHERE active" : ""} ORDER BY sort, id`,
  );
  return rows;
}

export async function findRoute(origin: string, destination: string): Promise<Route | null> {
  const { rows } = await (await db()).query<Route>(
    "SELECT * FROM routes WHERE origin = $1 AND destination = $2",
    [origin, destination],
  );
  return rows[0] ?? null;
}

export async function updateRoute(id: number, values: { price: number; duration_min: number; active: boolean }) {
  await (await db()).query("UPDATE routes SET price = $2, duration_min = $3, active = $4 WHERE id = $1", [
    id,
    values.price,
    values.duration_min,
    values.active,
  ]);
}

export async function listSchedules(): Promise<(Schedule & { origin: string; destination: string })[]> {
  const { rows } = await (await db()).query<Schedule & { origin: string; destination: string }>(
    `SELECT s.*, r.origin, r.destination FROM schedules s JOIN routes r ON r.id = s.route_id
     ORDER BY r.sort, r.id, s.depart_time`,
  );
  return rows;
}

export async function addSchedule(routeId: number, departTime: string) {
  await (await db()).query(
    `INSERT INTO schedules (route_id, depart_time) VALUES ($1, $2)
     ON CONFLICT (route_id, depart_time) DO UPDATE SET active = TRUE`,
    [routeId, departTime],
  );
}

export async function setScheduleActive(id: number, active: boolean) {
  await (await db()).query("UPDATE schedules SET active = $2 WHERE id = $1", [id, active]);
}

export type Trip = {
  schedule: Schedule;
  route: Route;
  date: string;
  arrival: { time: string; dayOffset: number };
  seatsLeft: number;
  departed: boolean;
};

function hasDeparted(route: Route, date: string, departTime: string): boolean {
  const now = nowAt(city(route.origin).utcOffset);
  if (date < now.date) return true;
  // Pemesanan online ditutup 30 menit sebelum berangkat.
  return date === now.date && toMinutes(departTime) - 30 <= now.minutes;
}

function tripArrival(route: Route, departTime: string) {
  return arrival(departTime, route.duration_min, city(route.origin).utcOffset, city(route.destination).utcOffset);
}

export async function getTrip(scheduleId: number, date: string): Promise<Trip | null> {
  const conn = await db();
  await releaseExpired(conn);
  const { rows } = await conn.query<Schedule & { r: Route; taken: number }>(
    `SELECT s.*, row_to_json(r.*) AS r,
       (SELECT count(*)::int FROM booking_seats b WHERE b.schedule_id = s.id AND b.travel_date = $2) AS taken
     FROM schedules s JOIN routes r ON r.id = s.route_id WHERE s.id = $1`,
    [scheduleId, date],
  );
  const row = rows[0];
  if (!row) return null;
  const { r: route, taken, ...schedule } = row;
  return {
    schedule,
    route,
    date,
    arrival: tripArrival(route, schedule.depart_time),
    seatsLeft: TOTAL_SEATS - taken,
    departed: hasDeparted(route, date, schedule.depart_time),
  };
}

export async function searchTrips(origin: string, destination: string, date: string): Promise<Trip[]> {
  const route = await findRoute(origin, destination);
  if (!route || !route.active) return [];
  const conn = await db();
  await releaseExpired(conn);
  const { rows } = await conn.query<Schedule & { taken: number }>(
    `SELECT s.*,
       (SELECT count(*)::int FROM booking_seats b WHERE b.schedule_id = s.id AND b.travel_date = $2) AS taken
     FROM schedules s WHERE s.route_id = $1 AND s.active ORDER BY s.depart_time`,
    [route.id, date],
  );
  return rows.map(({ taken, ...schedule }) => ({
    schedule,
    route,
    date,
    arrival: tripArrival(route, schedule.depart_time),
    seatsLeft: TOTAL_SEATS - taken,
    departed: hasDeparted(route, date, schedule.depart_time),
  }));
}

export async function getTakenSeats(scheduleId: number, date: string): Promise<number[]> {
  const conn = await db();
  await releaseExpired(conn);
  const { rows } = await conn.query<{ seat_no: number }>(
    "SELECT seat_no FROM booking_seats WHERE schedule_id = $1 AND travel_date = $2 ORDER BY seat_no",
    [scheduleId, date],
  );
  return rows.map((r) => r.seat_no);
}

// ---------- Bookings ----------

/** Pesanan "pending" yang lewat batas waktu bayar -> kedaluwarsa, kursinya dilepas. */
export async function releaseExpired(conn: Queryable) {
  await conn.query(
    `WITH expired AS (
       UPDATE bookings SET status = 'expired', updated_at = now()
       WHERE status = 'pending' AND expires_at IS NOT NULL AND expires_at < now()
       RETURNING id
     )
     DELETE FROM booking_seats WHERE booking_id IN (SELECT id FROM expired)`,
  );
}

export class BookingError extends Error {
  constructor(
    message: string,
    public takenSeats?: number[],
  ) {
    super(message);
  }
}

export type NewBooking = {
  scheduleId: number;
  date: string;
  seats: number[];
  passengers: Passenger[];
  customerName: string;
  phone: string;
  pickupAddress: string;
  dropoffAddress: string;
  notes: string;
};

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function bookingCode(date: string): string {
  let rand = "";
  for (let i = 0; i < 5; i++) rand += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  return `HT${date.slice(2).replaceAll("-", "")}${rand}`;
}

export async function createBooking(
  input: NewBooking,
  opts: { source: "web" | "admin"; status?: "pending" | "paid" },
): Promise<Booking> {
  const seats = [...new Set(input.seats)].sort((a, b) => a - b);
  if (seats.length === 0) throw new BookingError("Pilih minimal 1 kursi.");
  if (seats.length > MAX_SEATS_PER_BOOKING)
    throw new BookingError(`Maksimal ${MAX_SEATS_PER_BOOKING} kursi per pesanan.`);
  if (seats.some((s) => !ALL_SEATS.includes(s))) throw new BookingError("Nomor kursi tidak valid.");

  const settings = await getSettings();
  if (opts.source === "web" && !settings.front_seats_open && seats.some((s) => FRONT_SEATS.includes(s)))
    throw new BookingError("Kursi depan (1 & 2) sedang tidak dijual online.");

  const trip = await getTrip(input.scheduleId, input.date);
  if (!trip || (opts.source === "web" && (!trip.schedule.active || !trip.route.active)))
    throw new BookingError("Jadwal tidak ditemukan.");
  if (opts.source === "web" && trip.departed)
    throw new BookingError("Jadwal ini sudah berangkat / pemesanan online sudah ditutup.");

  const passengers = seats.map((seat) => ({
    seat,
    name: input.passengers.find((p) => p.seat === seat)?.name.trim() || input.customerName.trim(),
  }));
  const status = opts.status ?? "pending";
  const expiresAt =
    opts.source === "web" && status === "pending" ? new Date(Date.now() + settings.hold_minutes * 60_000) : null;

  const conn = await db();
  return conn.tx(async (q) => {
    await releaseExpired(q);
    const { rows: taken } = await q.query<{ seat_no: number }>(
      "SELECT seat_no FROM booking_seats WHERE schedule_id = $1 AND travel_date = $2 AND seat_no = ANY($3::int[])",
      [input.scheduleId, input.date, seats],
    );
    if (taken.length)
      throw new BookingError(
        `Kursi ${taken.map((t) => t.seat_no).join(", ")} baru saja dipesan orang lain. Silakan pilih kursi lain.`,
        taken.map((t) => t.seat_no),
      );

    let booking: Booking | undefined;
    for (let attempt = 0; !booking; attempt++) {
      if (attempt > 5) throw new Error("Gagal membuat kode booking.");
      const { rows } = await q.query<Booking>(
          `INSERT INTO bookings (code, schedule_id, travel_date, origin, destination, depart_time,
             customer_name, phone, pickup_address, dropoff_address, notes, seats, passengers,
             price_per_seat, total, status, source, expires_at)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)
           ON CONFLICT (code) DO NOTHING
           RETURNING *`,
          [
            bookingCode(input.date),
            input.scheduleId,
            input.date,
            trip.route.origin,
            trip.route.destination,
            trip.schedule.depart_time,
            input.customerName.trim(),
            input.phone.trim(),
            input.pickupAddress.trim(),
            input.dropoffAddress.trim(),
            input.notes.trim(),
            seats,
            JSON.stringify(passengers),
            trip.route.price,
            trip.route.price * seats.length,
            status,
            opts.source,
            expiresAt,
          ],
        );
      booking = rows[0];
    }

    try {
      await q.query(
        `INSERT INTO booking_seats (schedule_id, travel_date, seat_no, booking_id)
         SELECT $1, $2, unnest($3::int[]), $4`,
        [input.scheduleId, input.date, seats, booking.id],
      );
    } catch {
      // Primary key bentrok: kursi diambil pemesan lain di saat yang sama.
      throw new BookingError("Kursi yang dipilih baru saja dipesan orang lain. Silakan pilih ulang.", seats);
    }
    return booking;
  });
}

export async function getBookingByCode(code: string): Promise<Booking | null> {
  const conn = await db();
  await releaseExpired(conn);
  const { rows } = await conn.query<Booking>("SELECT * FROM bookings WHERE code = $1", [code.trim().toUpperCase()]);
  return rows[0] ?? null;
}

const TRANSITIONS: Record<BookingStatus, BookingStatus[]> = {
  pending: ["paid", "cancelled"],
  paid: ["done", "pending", "cancelled"],
  done: ["paid"],
  cancelled: [],
  expired: [],
};

export function allowedTransitions(status: BookingStatus): BookingStatus[] {
  return TRANSITIONS[status];
}

export async function setBookingStatus(id: number, status: BookingStatus) {
  const conn = await db();
  await conn.tx(async (q) => {
    const { rows } = await q.query<Booking>("SELECT * FROM bookings WHERE id = $1", [id]);
    const b = rows[0];
    if (!b) throw new BookingError("Pesanan tidak ditemukan.");
    if (!TRANSITIONS[b.status].includes(status))
      throw new BookingError(`Status tidak bisa diubah dari ${STATUS_LABEL[b.status]} ke ${STATUS_LABEL[status]}.`);
    // Dikembalikan ke "pending" oleh admin -> tidak ada batas waktu otomatis.
    await q.query("UPDATE bookings SET status = $2, expires_at = NULL, updated_at = now() WHERE id = $1", [id, status]);
    if (status === "cancelled") await q.query("DELETE FROM booking_seats WHERE booking_id = $1", [id]);
  });
}

export type BookingFilter = {
  date?: string;
  routeId?: number;
  scheduleId?: number;
  status?: string;
  q?: string;
};

export async function listBookings(f: BookingFilter = {}): Promise<Booking[]> {
  const conn = await db();
  await releaseExpired(conn);
  const where: string[] = [];
  const params: unknown[] = [];
  const p = (v: unknown) => {
    params.push(v);
    return `$${params.length}`;
  };
  if (f.date) where.push(`b.travel_date = ${p(f.date)}`);
  if (f.scheduleId) where.push(`b.schedule_id = ${p(f.scheduleId)}`);
  if (f.routeId) where.push(`s.route_id = ${p(f.routeId)}`);
  if (f.status === "active") where.push("b.status IN ('pending', 'paid', 'done')");
  else if (f.status) where.push(`b.status = ${p(f.status)}`);
  if (f.q) {
    const q = p(`%${f.q.trim()}%`);
    where.push(`(b.code ILIKE ${q} OR b.customer_name ILIKE ${q} OR b.phone ILIKE ${q})`);
  }
  const whereSql = where.join(" AND ");
  const { rows } = await conn.query<Booking>(
    `SELECT b.* FROM bookings b JOIN schedules s ON s.id = b.schedule_id
     ${whereSql ? "WHERE " + whereSql : ""}
     ORDER BY b.travel_date DESC, b.depart_time, b.created_at DESC LIMIT 300`,
    params,
  );
  return rows;
}

export type DashboardTrip = Trip & {
  paidSeats: number;
  pendingSeats: number;
  revenue: number;
  bookings: number;
};

export async function dashboard(date: string): Promise<DashboardTrip[]> {
  const conn = await db();
  await releaseExpired(conn);
  const { rows } = await conn.query<
    Schedule & { r: Route; paid_seats: number; pending_seats: number; revenue: number; bookings: number }
  >(
    `SELECT s.*, row_to_json(r.*) AS r,
       coalesce(sum(cardinality(b.seats)) FILTER (WHERE b.status IN ('paid','done')), 0)::int AS paid_seats,
       coalesce(sum(cardinality(b.seats)) FILTER (WHERE b.status = 'pending'), 0)::int AS pending_seats,
       coalesce(sum(b.total) FILTER (WHERE b.status IN ('paid','done')), 0)::int AS revenue,
       count(b.id) FILTER (WHERE b.status IN ('pending','paid','done'))::int AS bookings
     FROM schedules s
     JOIN routes r ON r.id = s.route_id
     LEFT JOIN bookings b ON b.schedule_id = s.id AND b.travel_date = $1
     WHERE (s.active AND r.active) OR b.id IS NOT NULL
     GROUP BY s.id, r.id
     ORDER BY r.sort, r.id, s.depart_time`,
    [date],
  );
  return rows.map(({ r: route, paid_seats, pending_seats, revenue, bookings, ...schedule }) => ({
    schedule,
    route,
    date,
    arrival: tripArrival(route, schedule.depart_time),
    seatsLeft: TOTAL_SEATS - paid_seats - pending_seats,
    departed: hasDeparted(route, date, schedule.depart_time),
    paidSeats: paid_seats,
    pendingSeats: pending_seats,
    revenue,
    bookings,
  }));
}
