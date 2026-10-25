// Data demo Armada Ria (tidak memakai database).

export const RIA_WA = "6281234567890";

/** Foto dari pengguna; selama null halaman memakai ilustrasi bus. */
export const IMAGES: { hero: string | null; gallery: (string | null)[] } = {
  hero: null,
  gallery: [null, null, null, null],
};

export type Bus = {
  id: string;
  name: string;
  seats: number;
  perDay: number;
  color: string;
  image: string | null;
  features: string[];
};

export const BUSES: Bus[] = [
  { id: "big", name: "Big Bus", seats: 50, perDay: 3500000, color: "#ff5a1f", image: null, features: ["Toilet", "Karaoke", "Bagasi besar"] },
  { id: "medium", name: "Medium Bus", seats: 31, perDay: 2500000, color: "#ffcc00", image: null, features: ["Reclining seat", "TV & audio", "USB charger"] },
  { id: "elf", name: "Elf Long", seats: 19, perDay: 1500000, color: "#7fd3ff", image: null, features: ["AC dingin", "Lincah di jalan kecil", "Bagasi atas"] },
  { id: "hiace", name: "Hiace Commuter", seats: 14, perDay: 1200000, color: "#b5e86b", image: null, features: ["Kabin nyaman", "Cocok keluarga", "Hemat"] },
];

export const DISTANCES = [
  { id: "dalam", name: "Dalam kota", factor: 1 },
  { id: "dekat", name: "Luar kota ≤ 200 km", factor: 1.2 },
  { id: "jauh", name: "Luar kota > 200 km", factor: 1.45 },
  { id: "pulau", name: "Antar pulau (+ kapal)", factor: 1.8 },
];

export const EXTRAS = [
  { id: "guide", name: "Tour guide", perDay: 400000 },
  { id: "foto", name: "Dokumentasi foto & video", perDay: 750000 },
  { id: "snack", name: "Snack & air mineral / orang", perPax: 25000 },
] as const;

export const CLIENTS = ["Study tour sekolah", "Gathering kantor", "Ziarah wali", "Rombongan pengantin", "Komunitas & klub", "Liburan keluarga besar"];

export const TESTIMONIALS = [
  { name: "SMAN 3 Malang", text: "6 bus untuk study tour ke Bali, semua tepat waktu. Sopir ramah ke anak-anak!", color: "#ffcc00" },
  { name: "PT Sinar Jaya", text: "Gathering 120 karyawan jadi gampang. Penawaran cepat, harga jelas di depan.", color: "#7fd3ff" },
  { name: "Komunitas Gowes SBY", text: "Bagasi muat 20 sepeda. Pokoknya rombongan senang!", color: "#b5e86b" },
];
