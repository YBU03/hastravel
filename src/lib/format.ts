const DAYS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

export function rupiah(n: number): string {
  return "Rp" + Math.round(n).toLocaleString("id-ID");
}

function parseDate(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function isValidDate(date: string | undefined | null): date is string {
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  return parseDate(date).toISOString().slice(0, 10) === date;
}

/** "2026-10-25" -> "Minggu, 25 Okt 2026" */
export function formatDate(date: string, opts: { weekday?: boolean } = {}): string {
  const d = parseDate(date);
  const base = `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  return opts.weekday === false ? base : `${DAYS[d.getUTCDay()]}, ${base}`;
}

export function shortDay(date: string): { day: string; date: string } {
  const d = parseDate(date);
  return { day: DAYS[d.getUTCDay()].slice(0, 3), date: `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}` };
}

export function addDays(date: string, n: number): string {
  const d = parseDate(date);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/** Tanggal & menit-sejak-tengah-malam saat ini pada zona waktu dengan offset tertentu. */
export function nowAt(utcOffset: number): { date: string; minutes: number } {
  const d = new Date(Date.now() + utcOffset * 3600_000);
  return { date: d.toISOString().slice(0, 10), minutes: d.getUTCHours() * 60 + d.getUTCMinutes() };
}

/** Hari ini menurut waktu Bali (WITA), dipakai sebagai default pencarian. */
export function todayWita(): string {
  return nowAt(8).date;
}

export function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function fromMinutes(min: number): string {
  const m = ((min % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

/** Perkiraan jam tiba (waktu lokal tujuan). */
export function arrival(departTime: string, durationMin: number, fromOffset: number, toOffset: number) {
  const total = toMinutes(departTime) + durationMin + (toOffset - fromOffset) * 60;
  return { time: fromMinutes(total), dayOffset: Math.floor(total / 1440) };
}

export function formatDuration(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} jam ${m} mnt` : `${h} jam`;
}

export function formatDateTime(d: Date | string): string {
  const date = new Date(d);
  // Ditampilkan dalam WITA.
  const w = new Date(date.getTime() + 8 * 3600_000);
  return `${w.getUTCDate()} ${MONTHS[w.getUTCMonth()]} ${w.getUTCFullYear()}, ${fromMinutes(
    w.getUTCHours() * 60 + w.getUTCMinutes(),
  )} WITA`;
}

/** 0812xxxx / +62812xxxx / 62812xxxx -> 62812xxxx */
export function normalizePhone(phone: string): string {
  let p = phone.replace(/[^\d+]/g, "");
  if (p.startsWith("+")) p = p.slice(1);
  if (p.startsWith("0")) p = "62" + p.slice(1);
  else if (p.startsWith("8")) p = "62" + p;
  return p;
}

export function maskPhone(phone: string): string {
  return phone.length <= 6 ? phone : phone.slice(0, 4) + "****" + phone.slice(-3);
}
