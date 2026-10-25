// Data demo Raudhah Safar (tidak memakai database).

export const RAUDHAH_WA = "6281234567890";

export type Room = "quad" | "triple" | "double";

export const ROOMS: { id: Room; name: string; detail: string }[] = [
  { id: "quad", name: "Quad", detail: "4 orang / kamar" },
  { id: "triple", name: "Triple", detail: "3 orang / kamar" },
  { id: "double", name: "Double", detail: "2 orang / kamar" },
];

export type Departure = { date: string; seats: number };

export type Package = {
  slug: string;
  name: string;
  kind: string;
  days: number;
  image: string;
  airline: string;
  hotels: { city: string; name: string; stars: number; distance: string }[];
  prices: Record<Room, number>;
  /** DP per jamaah untuk mengunci kursi. */
  dp: number;
  departures: Departure[];
  highlights: string[];
  itinerary: [string, string][];
  include: string[];
  exclude: string[];
};

export const PACKAGES: Package[] = [
  {
    slug: "umroh-reguler",
    name: "Umroh Reguler",
    kind: "Umroh",
    days: 9,
    image: "/raudhah/paket-reguler.png",
    airline: "Saudia · direct Jakarta–Jeddah",
    hotels: [
      { city: "Makkah", name: "Hotel bintang 4 (setara Elaf Ajyad)", stars: 4, distance: "± 300 m ke Masjidil Haram" },
      { city: "Madinah", name: "Hotel bintang 4 (setara Al Haram)", stars: 4, distance: "± 150 m ke Masjid Nabawi" },
    ],
    prices: { quad: 29900000, triple: 31900000, double: 34900000 },
    dp: 10000000,
    departures: [
      { date: "2026-11-21", seats: 6 },
      { date: "2026-12-12", seats: 0 },
      { date: "2026-12-26", seats: 14 },
      { date: "2027-01-16", seats: 22 },
      { date: "2027-03-27", seats: 30 },
    ],
    highlights: ["Pembimbing ustadz bersertifikat", "City tour Makkah & Madinah", "Manasik 2x sebelum berangkat"],
    itinerary: [
      ["Hari 1", "Jakarta – Jeddah, lanjut ke Madinah"],
      ["Hari 2–4", "Ibadah di Masjid Nabawi, ziarah Raudhah, Quba, Uhud"],
      ["Hari 5", "Miqat Bir Ali, perjalanan ke Makkah, umroh pertama"],
      ["Hari 6–8", "Ibadah di Masjidil Haram, city tour Arafah–Mina, umroh kedua"],
      ["Hari 9", "Thawaf wada', Jeddah – Jakarta"],
    ],
    include: ["Tiket pesawat PP", "Visa umroh", "Hotel sesuai paket", "Makan 3x prasmanan", "Air zamzam 5 liter", "Perlengkapan umroh", "Asuransi perjalanan"],
    exclude: ["Paspor & vaksin meningitis", "Kelebihan bagasi", "Pengeluaran pribadi"],
  },
  {
    slug: "umroh-plus-turki",
    name: "Umroh Plus Turki",
    kind: "Umroh Plus",
    days: 12,
    image: "/raudhah/paket-turki.png",
    airline: "Turkish Airlines · via Istanbul",
    hotels: [
      { city: "Istanbul", name: "Hotel bintang 4 Sultanahmet", stars: 4, distance: "jalan kaki ke Blue Mosque" },
      { city: "Makkah", name: "Hotel bintang 5 (setara Swissôtel)", stars: 5, distance: "± 50 m ke Masjidil Haram" },
      { city: "Madinah", name: "Hotel bintang 5 (setara Pullman)", stars: 5, distance: "± 100 m ke Masjid Nabawi" },
    ],
    prices: { quad: 38500000, triple: 41000000, double: 45500000 },
    dp: 15000000,
    departures: [
      { date: "2026-12-05", seats: 9 },
      { date: "2027-01-23", seats: 18 },
      { date: "2027-04-10", seats: 24 },
    ],
    highlights: ["3 hari di Istanbul", "Hagia Sophia & Blue Mosque", "Kapal Selat Bosphorus"],
    itinerary: [
      ["Hari 1–3", "Jakarta – Istanbul: Blue Mosque, Hagia Sophia, Bosphorus, Grand Bazaar"],
      ["Hari 4–6", "Istanbul – Madinah, ibadah di Masjid Nabawi & ziarah"],
      ["Hari 7–11", "Makkah: umroh, ibadah di Masjidil Haram, city tour"],
      ["Hari 12", "Jeddah – Jakarta"],
    ],
    include: ["Tiket pesawat PP", "Visa umroh & Turki", "Hotel sesuai paket", "Makan 3x", "Tour Istanbul + tiket masuk", "Perlengkapan umroh"],
    exclude: ["Paspor & vaksin", "Tip tour leader lokal", "Pengeluaran pribadi"],
  },
  {
    slug: "umroh-ramadhan",
    name: "Umroh Ramadhan",
    kind: "Umroh",
    days: 15,
    image: "/raudhah/paket-ramadhan.png",
    airline: "Garuda Indonesia · direct",
    hotels: [
      { city: "Madinah", name: "Hotel bintang 5 (setara Dar Al Taqwa)", stars: 5, distance: "± 50 m ke Masjid Nabawi" },
      { city: "Makkah", name: "Hotel bintang 5 (setara Hilton Suites)", stars: 5, distance: "± 100 m ke Masjidil Haram" },
    ],
    prices: { quad: 45000000, triple: 48500000, double: 53000000 },
    dp: 15000000,
    departures: [
      { date: "2027-02-20", seats: 4 },
      { date: "2027-03-01", seats: 11 },
    ],
    highlights: ["I'tikaf 10 malam terakhir", "Buka puasa di Masjid Nabawi", "Hotel dekat Haram"],
    itinerary: [
      ["Hari 1–5", "Madinah: tarawih & buka puasa di Masjid Nabawi, ziarah"],
      ["Hari 6", "Miqat Bir Ali, umroh pertama"],
      ["Hari 7–14", "Makkah: ibadah Ramadhan, i'tikaf, tadarus bersama"],
      ["Hari 15", "Thawaf wada', pulang ke Jakarta"],
    ],
    include: ["Tiket pesawat PP", "Visa", "Hotel bintang 5", "Sahur & buka puasa", "Air zamzam", "Perlengkapan umroh"],
    exclude: ["Paspor & vaksin", "Pengeluaran pribadi"],
  },
  {
    slug: "haji-khusus",
    name: "Haji Khusus",
    kind: "Haji",
    days: 26,
    image: "/raudhah/paket-haji.png",
    airline: "Saudia · direct",
    hotels: [
      { city: "Makkah", name: "Hotel bintang 5 ring 1", stars: 5, distance: "± 100 m ke Masjidil Haram" },
      { city: "Madinah", name: "Hotel bintang 5", stars: 5, distance: "± 100 m ke Masjid Nabawi" },
      { city: "Arafah–Mina", name: "Tenda VIP ber-AC", stars: 5, distance: "Maktab dekat jamarat" },
    ],
    prices: { quad: 245000000, triple: 255000000, double: 270000000 },
    dp: 50000000,
    departures: [{ date: "2027-05-01", seats: 3 }],
    highlights: ["Kuota haji khusus resmi", "Tenda VIP Arafah–Mina", "Pembimbing 1:45 jamaah"],
    itinerary: [
      ["Hari 1–7", "Madinah: arbain di Masjid Nabawi"],
      ["Hari 8–14", "Makkah: umroh & persiapan wukuf"],
      ["Hari 15–19", "Armuzna: wukuf di Arafah, mabit Muzdalifah, lempar jumrah di Mina"],
      ["Hari 20–26", "Thawaf ifadah, thawaf wada', kembali ke Jakarta"],
    ],
    include: ["Tiket pesawat PP", "Visa haji", "Hotel & tenda VIP", "Makan 3x", "Bimbingan manasik intensif", "Perlengkapan haji"],
    exclude: ["Paspor & vaksin", "Dam / hadyu", "Pengeluaran pribadi"],
  },
];

export const SLIDES = [
  {
    image: "/raudhah/slide-1.jpg",
    eyebrow: "Umroh & Haji Khusus",
    title: "Memenuhi panggilan-Nya dengan tenang.",
    text: "Hotel dekat Masjidil Haram, pembimbing berpengalaman, jadwal pasti tanpa biaya tersembunyi.",
  },
  {
    image: "/raudhah/slide-2.jpg",
    eyebrow: "Madinah Al-Munawwarah",
    title: "Rindu Raudhah, kami antarkan.",
    text: "Ziarah Masjid Nabawi, Quba, dan Uhud bersama ustadz pembimbing yang sabar menemani.",
  },
  {
    image: "/raudhah/slide-3.jpg",
    eyebrow: "Berangkat bersama",
    title: "Satu rombongan, satu keluarga.",
    text: "Manasik sebelum berangkat, grup kecil, dan pendampingan hingga kembali ke tanah air.",
  },
];

export const GUIDES = [
  { name: "Ust. Ahmad Fauzi, Lc.", role: "Pembimbing ibadah", years: "18 tahun membimbing" },
  { name: "Ustadzah Siti Maryam", role: "Pendamping jamaah wanita", years: "12 tahun membimbing" },
];

export const TESTIMONIALS = [
  { name: "Bapak Haryono & Ibu, Surabaya", text: "Ibu kami 72 tahun, tapi tim selalu sigap menyediakan kursi roda. Alhamdulillah ibadah lancar." },
  { name: "Ibu Ratna, Bandung", text: "Hotelnya benar-benar dekat, keluar lobi langsung pelataran Masjidil Haram. Sesuai yang dijanjikan." },
  { name: "Keluarga Pak Dimas, Jakarta", text: "Cicilannya ringan dan transparan. Manasiknya juga detail, jadi tidak bingung di sana." },
];

export function findPackage(slug: string) {
  return PACKAGES.find((p) => p.slug === slug);
}
