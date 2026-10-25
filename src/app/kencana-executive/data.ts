// Data demo Kencana Executive (tidak memakai database).

export const KENCANA_WA = "6281234567890";

/**
 * Gambar dari pengguna. Selama masih null, halaman memakai ilustrasi garis emas.
 * Isi dengan path di public/kencana/ setelah file diunggah.
 */
export const IMAGES: { hero: string | null; occasions: Record<string, string | null> } = {
  hero: null,
  occasions: { wedding: null, corporate: null, airport: null },
};

export type PackageId = "half" | "full" | "transfer";

export type Unit = {
  slug: string;
  name: string;
  variant: string;
  seats: number;
  luggage: number;
  tag?: string;
  image: string | null;
  prices: Record<PackageId, number>;
  features: string[];
};

export const UNITS: Unit[] = [
  {
    slug: "alphard",
    name: "Toyota Alphard",
    variant: "Executive Lounge",
    seats: 6,
    luggage: 3,
    tag: "Paling diminati",
    image: null,
    prices: { half: 1800000, full: 2800000, transfer: 1200000 },
    features: ["Captain seat dengan pijat", "Ottoman & sandaran kaki", "Ambient light", "Sunroof"],
  },
  {
    slug: "lexus-lm",
    name: "Lexus LM 350h",
    variant: "4-Seater Royal Lounge",
    seats: 4,
    luggage: 2,
    tag: "Paling eksklusif",
    image: null,
    prices: { half: 4500000, full: 7000000, transfer: 2500000 },
    features: ["Partisi privasi + layar 48 inci", "Kursi kulit semi-anilin", "Kulkas mini", "Audio Mark Levinson"],
  },
  {
    slug: "hiace-luxury",
    name: "Toyota Hiace Premio",
    variant: "Luxury 10 Seater",
    seats: 10,
    luggage: 6,
    tag: "Untuk rombongan",
    image: null,
    prices: { half: 1600000, full: 2500000, transfer: 1100000 },
    features: ["Captain seat kulit", "Kabin tinggi & lega", "TV & karaoke", "Bagasi besar"],
  },
  {
    slug: "zenix",
    name: "Toyota Innova Zenix",
    variant: "Hybrid Q",
    seats: 6,
    luggage: 3,
    image: null,
    prices: { half: 900000, full: 1400000, transfer: 600000 },
    features: ["Hybrid, senyap & hemat", "Captain seat baris kedua", "Panoramic roof", "Charger nirkabel"],
  },
];

export const PACKAGES: { id: PackageId; name: string; detail: string }[] = [
  { id: "half", name: "Half Day", detail: "6 jam · dalam kota" },
  { id: "full", name: "Full Day", detail: "12 jam · per hari" },
  { id: "transfer", name: "Airport Transfer", detail: "Sekali jalan · bandara ⇄ hotel" },
];

export const ADDONS = [
  { id: "extra-hour", name: "Tambahan 1 jam", price: 250000 },
  { id: "english", name: "Chauffeur berbahasa Inggris", price: 300000 },
  { id: "refreshment", name: "Paket snack & minuman premium", price: 150000 },
  { id: "wedding", name: "Dekorasi bunga pengantin", price: 750000 },
] as const;

export const OCCASIONS = [
  { id: "wedding", title: "Pernikahan", text: "Mobil pengantin dengan dekorasi bunga segar dan chauffeur berjas." },
  { id: "corporate", title: "Korporat & VIP", text: "Penjemputan tamu direksi, roadshow, dan acara perusahaan." },
  { id: "airport", title: "VIP Airport", text: "Meet & greet di terminal, bagasi kami yang bawa." },
];

export const CITIES = ["Jakarta", "Bali", "Surabaya"];

/** Tanggal yang sudah terpesan (demo): deterministik per unit & tanggal. */
export function isBooked(unit: string, date: string): boolean {
  let h = 0;
  for (const c of unit + date) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h % 5 === 0;
}

export function findUnit(slug?: string | null): Unit {
  return UNITS.find((u) => u.slug === slug) ?? UNITS[0];
}
