// Data demo Langkah Nusa (tidak memakai database).

export const NUSA_WA = "6281234567890";

/** Foto dari pengguna; selama null halaman memakai ilustrasi. */
export const HERO_IMAGE: string | null = null;

export type Scene = "mountain" | "crater" | "sea" | "waterfall";
export type Category = "gunung" | "pantai" | "air-terjun";

export type Trip = {
  slug: string;
  name: string;
  location: string;
  category: Category;
  scene: Scene;
  duration: string;
  price: number;
  quota: number;
  /** Hari keberangkatan: 0 = Minggu ... 6 = Sabtu. */
  departDays: number[];
  meetingPoint: string;
  image: string | null;
  summary: string;
  itinerary: { title: string; items: [string, string][] }[];
  include: string[];
  exclude: string[];
};

export const CATEGORIES: { id: Category | "semua"; name: string }[] = [
  { id: "semua", name: "Semua" },
  { id: "gunung", name: "Gunung" },
  { id: "pantai", name: "Pantai & pulau" },
  { id: "air-terjun", name: "Air terjun" },
];

export const TRIPS: Trip[] = [
  {
    slug: "bromo-sunrise",
    name: "Bromo Sunrise",
    location: "Probolinggo, Jawa Timur",
    category: "gunung",
    scene: "mountain",
    duration: "2 hari 1 malam",
    price: 650000,
    quota: 12,
    departDays: [6],
    meetingPoint: "Stasiun Malang Kota Baru",
    image: null,
    summary: "Matahari terbit dari Penanjakan, lautan pasir, dan kawah Bromo yang masih berasap.",
    itinerary: [
      {
        title: "Hari 1 · Malang – Tumpang",
        items: [
          ["13.00", "Kumpul di Stasiun Malang, perkenalan grup"],
          ["15.00", "Perjalanan ke homestay di Tumpang"],
          ["19.00", "Makan malam & briefing pendakian"],
        ],
      },
      {
        title: "Hari 2 · Bromo",
        items: [
          ["01.00", "Jeep 4x4 menuju Penanjakan"],
          ["04.30", "Menunggu sunrise di Penanjakan"],
          ["07.00", "Kawah Bromo, Pasir Berbisik, Bukit Teletubbies"],
          ["12.00", "Kembali ke Malang, trip selesai"],
        ],
      },
    ],
    include: ["Jeep 4x4 bersama", "Homestay 1 malam", "Makan 2x", "Tiket masuk TNBTS", "Guide lokal"],
    exclude: ["Tiket kereta ke Malang", "Sewa jaket & kuda", "Pengeluaran pribadi"],
  },
  {
    slug: "ijen-blue-fire",
    name: "Kawah Ijen Blue Fire",
    location: "Banyuwangi, Jawa Timur",
    category: "gunung",
    scene: "crater",
    duration: "2 hari 1 malam",
    price: 550000,
    quota: 10,
    departDays: [5],
    meetingPoint: "Stasiun Ketapang, Banyuwangi",
    image: null,
    summary: "Api biru langka di dunia, danau kawah toska, dan penambang belerang tradisional.",
    itinerary: [
      {
        title: "Hari 1 · Banyuwangi",
        items: [
          ["16.00", "Kumpul di Stasiun Ketapang"],
          ["17.00", "Check-in homestay, istirahat"],
          ["23.30", "Berangkat ke Paltuding"],
        ],
      },
      {
        title: "Hari 2 · Ijen",
        items: [
          ["01.30", "Trekking 3 km ke bibir kawah (dengan masker gas)"],
          ["03.30", "Melihat blue fire"],
          ["06.00", "Sunrise & danau kawah toska"],
          ["10.00", "Kembali ke Banyuwangi, trip selesai"],
        ],
      },
    ],
    include: ["Transport PP Paltuding", "Homestay 1 malam", "Masker gas", "Tiket masuk", "Guide lokal"],
    exclude: ["Tiket kereta / pesawat", "Makan di luar jadwal", "Porter (opsional)"],
  },
  {
    slug: "bromo-ijen",
    name: "Bromo + Ijen",
    location: "Jawa Timur",
    category: "gunung",
    scene: "crater",
    duration: "3 hari 2 malam",
    price: 1350000,
    quota: 12,
    departDays: [4],
    meetingPoint: "Stasiun Malang Kota Baru",
    image: null,
    summary: "Dua gunung paling ikonik Jawa Timur dalam satu perjalanan, dari Malang sampai Banyuwangi.",
    itinerary: [
      {
        title: "Hari 1 · Malang – Bromo",
        items: [
          ["14.00", "Kumpul di Stasiun Malang"],
          ["19.00", "Makan malam di Cemoro Lawang"],
        ],
      },
      {
        title: "Hari 2 · Bromo – Banyuwangi",
        items: [
          ["03.00", "Sunrise Penanjakan & kawah Bromo"],
          ["10.00", "Perjalanan ke Banyuwangi (± 6 jam)"],
          ["18.00", "Check-in homestay"],
        ],
      },
      {
        title: "Hari 3 · Ijen",
        items: [
          ["01.00", "Trekking Kawah Ijen & blue fire"],
          ["10.00", "Antar ke Stasiun Ketapang / Bandara Banyuwangi"],
        ],
      },
    ],
    include: ["Mobil + sopir 3 hari", "Jeep Bromo", "Homestay 2 malam", "Makan 4x", "Semua tiket masuk", "Guide"],
    exclude: ["Tiket pulang", "Pengeluaran pribadi"],
  },
  {
    slug: "nusa-penida",
    name: "Nusa Penida West Trip",
    location: "Klungkung, Bali",
    category: "pantai",
    scene: "sea",
    duration: "1 hari",
    price: 475000,
    quota: 14,
    departDays: [0, 3, 6],
    meetingPoint: "Pelabuhan Sanur",
    image: null,
    summary: "Kelingking Beach, Broken Beach, Angel's Billabong, dan Crystal Bay dalam satu hari.",
    itinerary: [
      {
        title: "Hari 1 · Nusa Penida",
        items: [
          ["07.00", "Kumpul di Pelabuhan Sanur"],
          ["08.00", "Fast boat ke Nusa Penida (± 45 menit)"],
          ["09.30", "Kelingking Beach"],
          ["12.00", "Makan siang"],
          ["13.00", "Broken Beach & Angel's Billabong"],
          ["15.30", "Crystal Bay, lalu kembali ke Sanur"],
        ],
      },
    ],
    include: ["Fast boat PP", "Mobil + sopir di pulau", "Makan siang", "Tiket masuk", "Air mineral"],
    exclude: ["Snorkeling (opsional)", "Penjemputan hotel"],
  },
  {
    slug: "tumpak-sewu",
    name: "Tumpak Sewu & Goa Tetes",
    location: "Lumajang, Jawa Timur",
    category: "air-terjun",
    scene: "waterfall",
    duration: "1 hari",
    price: 375000,
    quota: 12,
    departDays: [0, 6],
    meetingPoint: "Stasiun Malang Kota Baru",
    image: null,
    summary: "Air terjun tirai raksasa dengan latar Semeru, turun ke dasar lembah dan Goa Tetes.",
    itinerary: [
      {
        title: "Hari 1 · Lumajang",
        items: [
          ["05.00", "Kumpul di Stasiun Malang"],
          ["08.00", "Panorama Tumpak Sewu"],
          ["09.00", "Trekking turun ke dasar air terjun"],
          ["12.00", "Goa Tetes"],
          ["15.00", "Makan siang, lalu kembali ke Malang"],
        ],
      },
    ],
    include: ["Transport PP Malang", "Guide trekking", "Makan siang", "Tiket masuk", "Jas hujan"],
    exclude: ["Sandal gunung", "Pengeluaran pribadi"],
  },
];

export function findTrip(slug: string) {
  return TRIPS.find((t) => t.slug === slug);
}

/** Sisa kuota (demo): deterministik per trip & tanggal. */
export function seatsLeft(trip: Trip, date: string): number {
  let h = 0;
  for (const c of trip.slug + date) h = (h * 33 + c.charCodeAt(0)) >>> 0;
  return h % (trip.quota + 1);
}

export const TESTIMONIALS = [
  { name: "Nadia · Bromo Sunrise", text: "Grupnya kecil jadi kayak jalan bareng teman. Guidenya sabar banget nungguin aku yang ngos-ngosan." },
  { name: "Arif · Bromo + Ijen", text: "Itinerary rapi, homestay bersih, blue fire-nya dapat! Harga sesuai, nggak ada biaya kejutan." },
  { name: "Maya · Nusa Penida", text: "Fotoin kita terus di Kelingking. Pulang bawa ratusan foto bagus." },
];
