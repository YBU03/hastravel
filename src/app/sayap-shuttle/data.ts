// Data demo Sayap Shuttle (tidak memakai database).

export const SAYAP_WA = "6281234567890";
export const MAX_PAX = 14;

export type Zone = { id: string; name: string; areas: string; shared: number; private: number; minutes: number };
export type Airport = { code: string; name: string; city: string; tz: "WIB" | "WITA"; zones: Zone[] };

export const AIRPORTS: Airport[] = [
  {
    code: "DPS",
    name: "I Gusti Ngurah Rai",
    city: "Bali",
    tz: "WITA",
    zones: [
      { id: "kuta", name: "Kuta & Legian", areas: "Kuta, Legian, Tuban", shared: 75000, private: 250000, minutes: 20 },
      { id: "seminyak", name: "Seminyak & Canggu", areas: "Seminyak, Kerobokan, Canggu", shared: 100000, private: 325000, minutes: 45 },
      { id: "nusadua", name: "Jimbaran & Nusa Dua", areas: "Jimbaran, Nusa Dua, Tanjung Benoa", shared: 90000, private: 300000, minutes: 30 },
      { id: "sanur", name: "Sanur & Denpasar", areas: "Sanur, Renon, Denpasar Kota", shared: 90000, private: 300000, minutes: 35 },
      { id: "uluwatu", name: "Uluwatu", areas: "Uluwatu, Pecatu, Ungasan", shared: 125000, private: 400000, minutes: 50 },
      { id: "ubud", name: "Ubud", areas: "Ubud, Tegallalang, Payangan", shared: 150000, private: 450000, minutes: 75 },
    ],
  },
  {
    code: "SUB",
    name: "Juanda",
    city: "Surabaya",
    tz: "WIB",
    zones: [
      { id: "sidoarjo", name: "Sidoarjo", areas: "Sidoarjo Kota, Waru, Gedangan", shared: 50000, private: 200000, minutes: 25 },
      { id: "sby-pusat", name: "Surabaya Pusat & Timur", areas: "Tunjungan, Gubeng, Kenjeran", shared: 60000, private: 225000, minutes: 40 },
      { id: "sby-barat", name: "Surabaya Barat", areas: "Darmo, Citraland, Pakuwon", shared: 70000, private: 250000, minutes: 50 },
      { id: "gresik", name: "Gresik", areas: "Gresik Kota, Kebomas", shared: 80000, private: 300000, minutes: 60 },
      { id: "malang", name: "Malang & Batu", areas: "Malang Kota, Batu", shared: 150000, private: 650000, minutes: 120 },
    ],
  },
];

/** Shuttle bersama berangkat tiap jam. */
export const SHARED_TIMES = Array.from({ length: 17 }, (_, i) => `${String(i + 6).padStart(2, "0")}:00`);

export type Direction = "from" | "to";
export type Service = "shared" | "private";

export function findAirport(code?: string | null) {
  return AIRPORTS.find((a) => a.code === code) ?? AIRPORTS[0];
}

export function findZone(airport: Airport, id?: string | null) {
  return airport.zones.find((z) => z.id === id) ?? airport.zones[0];
}

export function priceFor(zone: Zone, service: Service, pax: number) {
  // Private: per unit van (maks 14 orang); shared: per orang.
  return service === "private" ? zone.private * Math.ceil(pax / MAX_PAX) : zone.shared * pax;
}

export const SLIDES = [
  {
    image: "/sayap/slide-1.jpg",
    eyebrow: "Airport Transfer · Bali & Surabaya",
    title: "Mendarat,\nlangsung jalan.",
    text: "Van sudah menunggu di area penjemputan. Tanpa antre taksi, tanpa tawar-menawar.",
  },
  {
    image: "/sayap/slide-2.jpg",
    eyebrow: "Meet & Greet",
    title: "Dijemput dengan\npapan nama.",
    text: "Sopir memantau jadwal pesawatmu. Delay? Kami tetap menunggu tanpa biaya tambahan.",
  },
  {
    image: "/sayap/slide-3.jpg",
    eyebrow: "Tarif pasti per zona",
    title: "Ngurah Rai ke Ubud,\nKuta, Nusa Dua.",
    text: "Harga sudah termasuk tol & parkir bandara. Yang kamu lihat, itu yang kamu bayar.",
  },
];

export const FAQ = [
  ["Bagaimana kalau pesawat saya delay?", "Kami memantau nomor penerbangan secara real-time. Sopir menyesuaikan jam jemput tanpa biaya tambahan."],
  ["Apa bedanya Shared dan Private?", "Shared berangkat tiap jam bersama penumpang lain, dibayar per orang. Private satu van khusus rombonganmu, bisa berangkat jam berapa pun."],
  ["Berapa bagasi yang boleh dibawa?", "1 koper besar + 1 tas kabin per orang. Papan selancar & sepeda bisa dengan konfirmasi ke admin."],
  ["Bagaimana cara bayar?", "Setelah pesanan dikirim via WhatsApp, admin mengirim link pembayaran (transfer / QRIS). Bisa juga bayar tunai ke sopir untuk layanan Private."],
  ["Di mana titik temu di bandara?", "Sopir menunggu di pintu kedatangan dengan papan nama bertuliskan namamu, lalu mengantar ke area parkir shuttle."],
] as const;

export const TESTIMONIALS = [
  { name: "Rina, Jakarta", text: "Pesawat delay 2 jam, sopirnya tetap nunggu dan malah kabarin duluan. Mantap!" },
  { name: "Daniel, Melbourne", text: "Easy booking, clean van, driver was waiting with my name. Best airport transfer in Bali." },
  { name: "Keluarga Hartono", text: "Ambil Private untuk 9 orang ke Ubud, jauh lebih hemat daripada 3 taksi." },
];
