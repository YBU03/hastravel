// Data demo Gaspol Bali (tidak memakai database).

export const GASPOL_WA = "6281234567890";

/** Foto dari pengguna; selama kosong/null halaman memakai ilustrasi neon. */
export const HERO_IMAGES: string[] = [];
export const FEED_IMAGES: (string | null)[] = [null, null, null, null];

export type Bike = {
  id: string;
  name: string;
  type: string;
  cc: number;
  daily: number;
  weekly: number;
  monthly: number;
  tag: string;
  image: string | null;
  perks: string[];
};

export const BIKES: Bike[] = [
  { id: "scoopy", name: "Scoopy", type: "Matic retro", cc: 110, daily: 70000, weekly: 420000, monthly: 1500000, tag: "Paling murah", image: null, perks: ["Ringan & lincah", "Irit bensin", "Bagasi helm"] },
  { id: "nmax", name: "NMax", type: "Maxi scooter", cc: 155, daily: 120000, weekly: 750000, monthly: 2600000, tag: "Favorit turis", image: null, perks: ["Jok lebar berdua", "ABS", "Nyaman jarak jauh"] },
  { id: "pcx", name: "PCX", type: "Maxi premium", cc: 160, daily: 130000, weekly: 800000, monthly: 2800000, tag: "Paling nyaman", image: null, perks: ["Keyless", "Suspensi empuk", "Bagasi 30 L"] },
  { id: "klx", name: "KLX", type: "Trail / dual-sport", cc: 150, daily: 200000, weekly: 1200000, monthly: 4200000, tag: "Buat petualang", image: null, perks: ["Jalan rusak? santai", "Ke air terjun & bukit", "Ground clearance tinggi"] },
];

export const AREAS = [
  { id: "canggu", name: "Canggu", fee: 0 },
  { id: "seminyak", name: "Seminyak", fee: 0 },
  { id: "kuta", name: "Kuta / Legian", fee: 25000 },
  { id: "sanur", name: "Sanur", fee: 40000 },
  { id: "uluwatu", name: "Uluwatu", fee: 60000 },
  { id: "ubud", name: "Ubud", fee: 75000 },
];

export const ADDONS = [
  { id: "helmet", name: "Helm ekstra", perDay: 10000 },
  { id: "surf", name: "Surf rack", perDay: 20000 },
  { id: "holder", name: "Holder HP", perDay: 5000 },
  { id: "rain", name: "Jas hujan", once: 25000 },
] as const;

export const DEPOSIT = 500000;

/** Tarif otomatis: harian < 7 hari, mingguan 7–29 hari, bulanan ≥ 30 hari. */
export function rentalPrice(bike: Bike, days: number): { total: number; rate: string } {
  if (days >= 30) return { total: Math.round((bike.monthly / 30) * days / 1000) * 1000, rate: "tarif bulanan" };
  if (days >= 7) return { total: Math.round((bike.weekly / 7) * days / 1000) * 1000, rate: "tarif mingguan" };
  return { total: bike.daily * days, rate: "tarif harian" };
}

export const FAQ = [
  ["Perlu SIM?", "Wajib SIM C (lokal) atau SIM internasional untuk turis. Bawa saat serah terima motor."],
  ["Deposit berapa?", `Deposit Rp${DEPOSIT.toLocaleString("id-ID")} atau KTP/paspor, dikembalikan saat motor kembali.`],
  ["Bensin gimana?", "Motor diantar full tank, dikembalikan dengan level bensin yang sama."],
  ["Kalau mogok?", "Telepon/WA kami 24 jam, teknisi datang atau motor diganti di hari yang sama."],
] as const;
