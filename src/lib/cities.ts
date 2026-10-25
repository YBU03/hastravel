export type CityKey = "denpasar" | "surabaya" | "jember";

export type City = {
  key: CityKey;
  name: string;
  /** Selisih jam terhadap UTC (Indonesia tidak memakai DST). */
  utcOffset: number;
  tzLabel: "WIB" | "WITA";
};

export const CITIES: Record<CityKey, City> = {
  denpasar: { key: "denpasar", name: "Denpasar", utcOffset: 8, tzLabel: "WITA" },
  surabaya: { key: "surabaya", name: "Surabaya", utcOffset: 7, tzLabel: "WIB" },
  jember: { key: "jember", name: "Jember", utcOffset: 7, tzLabel: "WIB" },
};

export function city(key: string): City {
  const c = CITIES[key as CityKey];
  if (!c) throw new Error(`Kota tidak dikenal: ${key}`);
  return c;
}

export function isCity(key: string | undefined | null): key is CityKey {
  return !!key && key in CITIES;
}
