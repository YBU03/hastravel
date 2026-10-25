// Bali Driver Co. data (no database). Bookings go to WhatsApp.

export const BALI_WA = "6281234567890";

/** Rough rate for showing an approximate USD figure. */
export const USD_RATE = 16000;

export const usd = (idr: number) => `≈ US$${Math.round(idr / USD_RATE)}`;

/** Images from the client; while null the page shows editorial placeholders. */
export const IMAGES: { hero: string | null; routes: Record<string, string | null>; drivers: Record<string, string | null> } = {
  hero: null,
  routes: { ubud: null, uluwatu: null, kintamani: null, east: null },
  drivers: { wayan: null, made: null, komang: null },
};

export type Rate = { id: string; hours: number; name: string; price: number; note: string };

export const RATES: Rate[] = [
  { id: "4h", hours: 4, name: "Half day", price: 450000, note: "Airport runs, dinners, a single stop" },
  { id: "8h", hours: 8, name: "Day out", price: 650000, note: "The classic one-region day" },
  { id: "10h", hours: 10, name: "Full day", price: 750000, note: "Two regions, unhurried" },
  { id: "12h", hours: 12, name: "Long day", price: 850000, note: "Sunrise to sunset, island-wide" },
];

export type Car = { id: string; name: string; seats: number; factor: number };

export const CARS: Car[] = [
  { id: "avanza", name: "Toyota Avanza", seats: 5, factor: 1 },
  { id: "innova", name: "Toyota Innova Reborn", seats: 6, factor: 1.3 },
  { id: "hiace", name: "Toyota Hiace", seats: 12, factor: 1.9 },
];

export type Route = {
  id: string;
  no: string;
  name: string;
  region: string;
  rate: string;
  stops: string[];
  text: string;
};

export const ROUTES: Route[] = [
  {
    id: "ubud",
    no: "01",
    name: "Ubud, slowly",
    region: "Central Bali",
    rate: "8h",
    stops: ["Tegenungan Waterfall", "Ubud Art Market", "Sacred Monkey Forest", "Campuhan Ridge Walk"],
    text: "Temples before the crowds, a long lunch over the rice fields, and a walk along the ridge when the light turns gold.",
  },
  {
    id: "uluwatu",
    no: "02",
    name: "Uluwatu at sunset",
    region: "The Bukit",
    rate: "8h",
    stops: ["Melasti Beach", "Padang Padang", "Uluwatu Temple", "Kecak fire dance"],
    text: "White cliffs, hidden beaches, and the Kecak dance on the clifftop as the sun drops into the Indian Ocean.",
  },
  {
    id: "kintamani",
    no: "03",
    name: "Kintamani & Tegallalang",
    region: "The Highlands",
    rate: "10h",
    stops: ["Tegallalang Rice Terrace", "Tirta Empul", "Coffee plantation", "Mount Batur viewpoint"],
    text: "Up into the cool air: terraced valleys, the holy spring, and breakfast facing an active volcano.",
  },
  {
    id: "east",
    no: "04",
    name: "The quiet East",
    region: "Karangasem",
    rate: "12h",
    stops: ["Lempuyang Gates", "Tirta Gangga", "Taman Ujung", "Virgin Beach"],
    text: "The long road east to the Gates of Heaven, royal water palaces, and a beach most visitors never find.",
  },
];

export type Driver = { id: string; name: string; since: number; languages: string[]; bio: string; trait: string };

export const DRIVERS: Driver[] = [
  {
    id: "wayan",
    name: "Wayan Sudarma",
    since: 2011,
    languages: ["English", "Bahasa"],
    bio: "Born in Ubud, knows every back road between the rice fields. Will find you the warung his mother eats at.",
    trait: "The local guide",
  },
  {
    id: "made",
    name: "Made Ariana",
    since: 2015,
    languages: ["English", "Japanese", "Bahasa"],
    bio: "A former hotel concierge. Calm, precise, and always ten minutes early. Families love him.",
    trait: "The calm one",
  },
  {
    id: "komang",
    name: "Komang Putra",
    since: 2018,
    languages: ["English", "Russian", "Bahasa"],
    bio: "Amateur photographer. He knows exactly where to stand at Lempuyang and when the queue is shortest.",
    trait: "The photographer",
  },
];

export const AREAS = ["Seminyak", "Canggu", "Kuta", "Legian", "Jimbaran", "Nusa Dua", "Uluwatu", "Sanur", "Ubud", "Airport (DPS)"];

export const TESTIMONIALS = [
  { quote: "Wayan was the best part of our honeymoon. No rush, no tourist traps, just Bali.", name: "Hannah & Tom", from: "London" },
  { quote: "Booked three days in a row with Made. The kids called him uncle by day two.", name: "The Nakamura family", from: "Osaka" },
  { quote: "Clear price on WhatsApp, cold water in the car, and a driver who actually listens.", name: "Daniel R.", from: "Melbourne" },
];

export const INCLUDED = ["Private car & English-speaking driver", "Fuel and parking", "Bottled water, every day", "Free waiting time at each stop"];
