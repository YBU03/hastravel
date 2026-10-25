// Data demo Selat Express (tidak memakai database).

export const SELAT_WA = "6281234567890";

/** Foto dari pengguna; selama null halaman memakai ilustrasi. */
export const IMAGES: { hero: string | null; boat: string | null } = { hero: null, boat: null };

export type PortId = "sanur" | "padangbai" | "penida" | "lembongan" | "gili-t" | "bangsal";

export const PORTS: Record<PortId, { name: string; island: string }> = {
  sanur: { name: "Sanur", island: "Bali" },
  padangbai: { name: "Padang Bai", island: "Bali" },
  penida: { name: "Nusa Penida", island: "Nusa Penida" },
  lembongan: { name: "Nusa Lembongan", island: "Nusa Lembongan" },
  "gili-t": { name: "Gili Trawangan", island: "Gili" },
  bangsal: { name: "Bangsal", island: "Lombok" },
};

type BaseRoute = { a: PortId; b: PortId; minutes: number; adult: number; times: string[]; boat: string };

const BASE: BaseRoute[] = [
  { a: "sanur", b: "penida", minutes: 45, adult: 175000, times: ["07:30", "09:00", "11:00", "14:00", "16:30"], boat: "Selat Express 1 (60 kursi)" },
  { a: "sanur", b: "lembongan", minutes: 30, adult: 200000, times: ["08:00", "10:30", "13:30", "16:00"], boat: "Selat Express 2 (50 kursi)" },
  { a: "padangbai", b: "gili-t", minutes: 120, adult: 450000, times: ["08:30", "11:00", "13:30"], boat: "Selat Ocean (80 kursi)" },
  { a: "padangbai", b: "bangsal", minutes: 135, adult: 450000, times: ["09:00", "13:00"], boat: "Selat Ocean (80 kursi)" },
];

export type Route = { from: PortId; to: PortId; minutes: number; adult: number; child: number; times: string[]; boat: string };

/** Setiap rute berlaku dua arah; jadwal arah balik digeser 1,5 jam. */
export const ROUTES: Route[] = BASE.flatMap((r) => {
  const child = Math.round((r.adult * 0.75) / 1000) * 1000;
  const back = r.times.map((t) => {
    const m = Number(t.slice(0, 2)) * 60 + Number(t.slice(3)) + 90;
    return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
  });
  return [
    { from: r.a, to: r.b, minutes: r.minutes, adult: r.adult, child, times: r.times, boat: r.boat },
    { from: r.b, to: r.a, minutes: r.minutes, adult: r.adult, child, times: back, boat: r.boat },
  ];
});

export function findRoute(from?: string | null, to?: string | null) {
  return ROUTES.find((r) => r.from === from && r.to === to);
}

export function destinationsFrom(from: string) {
  return ROUTES.filter((r) => r.from === from).map((r) => r.to);
}

export const ORIGINS = [...new Set(ROUTES.map((r) => r.from))];

/** Sisa kursi (demo): deterministik per rute, tanggal, dan jam. */
export function seatsLeft(r: Route, date: string, time: string) {
  let h = 0;
  for (const c of r.from + r.to + date + time) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const n = h % 40;
  return n < 3 ? 0 : n;
}

export const ADDONS = [
  { id: "snorkel", name: "Snorkeling 3 spot (Manta Point, Crystal Bay, Gamat)", perPax: 250000 },
  { id: "pickup", name: "Jemput hotel area Kuta–Sanur–Ubud", perBooking: 100000 },
  { id: "insurance", name: "Asuransi perjalanan", perPax: 15000 },
] as const;

export const DESTINATIONS = [
  { id: "penida", name: "Nusa Penida", text: "Kelingking, Broken Beach, Crystal Bay", scene: "cliff" as const, image: null as string | null },
  { id: "lembongan", name: "Nusa Lembongan", text: "Devil's Tear, mangrove, jembatan kuning", scene: "reef" as const, image: null as string | null },
  { id: "gili-t", name: "Gili Trawangan", text: "Pasir putih, penyu, sunset swing", scene: "island" as const, image: null as string | null },
  { id: "bangsal", name: "Lombok", text: "Senggigi, Mandalika, Rinjani", scene: "mountain" as const, image: null as string | null },
];

export const FAQ = [
  ["Berapa lama check-in sebelum berangkat?", "Datang 30 menit sebelum jadwal untuk check-in dan penukaran boarding pass."],
  ["Anak-anak dapat diskon?", "Anak usia 2–11 tahun membayar 75% harga dewasa. Bayi di bawah 2 tahun gratis tanpa kursi."],
  ["Bagaimana kalau ombak tinggi?", "Keberangkatan bisa dijadwalkan ulang gratis atau refund penuh jika dibatalkan karena cuaca."],
  ["Bagasi boleh berapa?", "1 koper + 1 tas kecil per orang. Papan selancar dikenakan biaya tambahan Rp50.000."],
] as const;
