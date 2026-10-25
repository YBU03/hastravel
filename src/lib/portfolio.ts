export type PortfolioStatus = "full" | "demo" | "soon";

export type PortfolioItem = {
  no: number;
  slug: string;
  name: string;
  business: string;
  style: string;
  description: string;
  features: string[];
  status: PortfolioStatus;
  /** Warna tema untuk kartu galeri: [latar, teks, aksen, aksen kedua]. */
  palette: [string, string, string, string];
  preview?: string;
};

export const PORTFOLIO: PortfolioItem[] = [
  {
    no: 1,
    slug: "hastrans",
    name: "HasTrans",
    business: "Travel antar kota",
    style: "Clean App",
    description: "Booking travel ELF dengan denah kursi interaktif, kunci kursi otomatis, dan panel admin.",
    features: ["Pilih kursi", "Panel admin", "Manifest sopir"],
    status: "full",
    palette: ["#0064e7", "#ffffff", "#ffffff", "#5999ff"],
    preview: "/portfolio/hastrans.jpg",
  },
  {
    no: 2,
    slug: "sayap-shuttle",
    name: "Sayap Shuttle",
    business: "Shuttle bandara",
    style: "Dark Modern",
    description: "Antar-jemput bandara Ngurah Rai & Juanda: tarif per zona, shared atau private, nomor penerbangan.",
    features: ["Slider banner", "Tarif per zona", "Shared / private"],
    status: "demo",
    palette: ["#0B1020", "#ffffff", "#C6F432", "#1c2540"],
    preview: "/portfolio/sayap-shuttle.jpg",
  },
  {
    no: 3,
    slug: "kencana-executive",
    name: "Kencana Executive",
    business: "Sewa mobil premium + sopir",
    style: "Luxury",
    description: "Sewa Alphard & Hiace Premio: galeri armada, kalender ketersediaan, paket 12/24 jam.",
    features: ["Galeri armada", "Kalender unit", "Paket durasi"],
    status: "demo",
    palette: ["#0d0d0d", "#f5efe3", "#c9a96e", "#2a2620"],
    preview: "/portfolio/kencana-executive.jpg",
  },
  {
    no: 4,
    slug: "armada-ria",
    name: "Armada Ria",
    business: "Sewa bus pariwisata",
    style: "Bold & Ceria",
    description: "Bus untuk rombongan: kalkulator perkiraan harga, form penawaran, galeri bus & testimoni.",
    features: ["Kalkulator harga", "Form penawaran", "Galeri bus"],
    status: "demo",
    palette: ["#ffcc00", "#1a1a1a", "#ff5a1f", "#fff4c2"],
    preview: "/portfolio/armada-ria.jpg",
  },
  {
    no: 5,
    slug: "langkah-nusa",
    name: "Langkah Nusa",
    business: "Open trip & paket wisata",
    style: "Natural & Hangat",
    description: "Paket Bromo, Ijen, Nusa Penida: itinerary per hari, kuota peserta, termasuk/tidak termasuk.",
    features: ["Itinerary", "Kuota peserta", "Galeri trip"],
    status: "demo",
    palette: ["#f4ead8", "#3b2a20", "#c8623d", "#8fa382"],
    preview: "/portfolio/langkah-nusa.jpg",
  },
  {
    no: 6,
    slug: "raudhah-safar",
    name: "Raudhah Safar",
    business: "Umroh & haji plus",
    style: "Islami Elegan",
    description: "Paket umroh per bulan keberangkatan, hotel & maskapai, pilihan kamar, simulasi DP.",
    features: ["Paket per bulan", "Pilih kamar", "Simulasi DP"],
    status: "soon",
    palette: ["#0f3d2e", "#f6f1e4", "#d4af37", "#1d5c45"],
  },
  {
    no: 7,
    slug: "gaspol-bali",
    name: "Gaspol Bali",
    business: "Rental motor",
    style: "Street / Urban",
    description: "Katalog motor harian & mingguan, pilih tanggal sewa, antar ke hotel.",
    features: ["Katalog motor", "Tanggal sewa", "Antar hotel"],
    status: "soon",
    palette: ["#111111", "#ffffff", "#ff2e93", "#2b2b2b"],
  },
  {
    no: 8,
    slug: "selat-express",
    name: "Selat Express",
    business: "Fast boat",
    style: "Ocean",
    description: "Fast boat ke Nusa Penida, Gili & Lombok: jadwal per pelabuhan, tiket PP, paket snorkeling.",
    features: ["Jadwal kapal", "Tiket PP", "Dewasa / anak"],
    status: "soon",
    palette: ["#e6f7f8", "#063b4c", "#00a6b4", "#7fd6dd"],
  },
  {
    no: 9,
    slug: "jendela-trip",
    name: "Jendela Trip",
    business: "Agen tiket & hotel",
    style: "Retro Poster",
    description: "Cari tiket pesawat & hotel, promo destinasi, permintaan dipesankan via WhatsApp.",
    features: ["Cari tiket", "Promo destinasi", "Cap retro"],
    status: "soon",
    palette: ["#f3e7cf", "#2d1e12", "#d6452b", "#e2a72e"],
  },
  {
    no: 10,
    slug: "bali-driver",
    name: "Bali Driver Co.",
    business: "Private driver (turis)",
    style: "Editorial",
    description: "Private driver per jam / per hari untuk turis, contoh rute, profil sopir, bahasa Inggris.",
    features: ["Sewa per jam", "Contoh rute", "English"],
    status: "soon",
    palette: ["#fafaf7", "#111111", "#111111", "#d9d6cc"],
  },
];

export const STATUS_LABEL: Record<PortfolioStatus, string> = {
  full: "Full demo + admin",
  demo: "Live demo",
  soon: "Segera hadir",
};
