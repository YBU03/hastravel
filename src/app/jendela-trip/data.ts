// Data Jendela Trip (tanpa database). Harga adalah estimasi; harga final dikonfirmasi agen via WhatsApp.

export const JENDELA_WA = "6281234567890";

export const CITIES = [
  { code: "CGK", name: "Jakarta" },
  { code: "SUB", name: "Surabaya" },
  { code: "DPS", name: "Bali (Denpasar)" },
  { code: "YIA", name: "Yogyakarta" },
  { code: "LBJ", name: "Labuan Bajo" },
  { code: "KNO", name: "Medan" },
  { code: "UPG", name: "Makassar" },
  { code: "SOQ", name: "Sorong (Raja Ampat)" },
];

export const CABINS = [
  { id: "lcc", name: "Ekonomi hemat", note: "Bagasi kabin 7 kg", factor: 1 },
  { id: "full", name: "Ekonomi full service", note: "Bagasi 20 kg + makan", factor: 1.45 },
  { id: "business", name: "Bisnis", note: "Lounge + bagasi 30 kg", factor: 3.2 },
];

/** Estimasi harga dasar sekali jalan per orang (kelas hemat). */
export function baseFare(from: string, to: string): number {
  const far = ["LBJ", "SOQ", "KNO", "UPG"];
  const n = (far.includes(from) ? 1 : 0) + (far.includes(to) ? 1 : 0);
  return [650000, 1150000, 1900000][n];
}

export const HOTEL_CLASSES = [
  { id: "3", name: "Bintang 3", perNight: 450000 },
  { id: "4", name: "Bintang 4", perNight: 850000 },
  { id: "5", name: "Bintang 5 / resort", perNight: 1900000 },
];

export type Poster = { id: string; city: string; tagline: string; price: number; from: string; to: string; bg: string; sun: string; land: string; image: string | null };

export const POSTERS: Poster[] = [
  { id: "bali", city: "Bali", tagline: "Pulau Dewata", price: 650000, from: "CGK", to: "DPS", bg: "#e2a72e", sun: "#d6452b", land: "#2f7f7a", image: "/jendela/bali.jpg" },
  { id: "bajo", city: "Labuan Bajo", tagline: "Negeri Komodo", price: 1150000, from: "CGK", to: "LBJ", bg: "#2f7f7a", sun: "#e2a72e", land: "#2d1e12", image: "/jendela/bajo.jpg" },
  { id: "jogja", city: "Yogyakarta", tagline: "Kota Budaya", price: 650000, from: "CGK", to: "YIA", bg: "#d6452b", sun: "#f3e7cf", land: "#2d1e12", image: "/jendela/jogja.jpg" },
  { id: "rajaampat", city: "Raja Ampat", tagline: "Surga Timur", price: 1900000, from: "CGK", to: "SOQ", bg: "#2d1e12", sun: "#e2a72e", land: "#2f7f7a", image: "/jendela/rajaampat.jpg" },
];

export const PERKS = [
  ["Harga transparan", "Rincian harga tiket & hotel dikirim sebelum bayar."],
  ["Dibantu manusia", "Agen membalas WhatsApp 07.00–22.00, setiap hari."],
  ["Reschedule & refund", "Kami yang urus ke maskapai & hotel, kamu tinggal tunggu."],
  ["Paket hemat", "Gabung tiket + hotel, harga lebih murah dari beli terpisah."],
];
