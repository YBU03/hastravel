/**
 * Denah ELF 19 kursi, dilihat dari atas dengan bagian depan di atas.
 * Sopir di kanan, pintu penumpang di kiri.
 */
export type SeatCell = number | "driver" | "door" | null;

export const ELF_LAYOUT: SeatCell[][] = [
  [2, 1, null, "driver"],
  ["door", 5, 4, 3],
  [9, 8, 7, 6],
  ["door", 12, 11, 10],
  [null, 15, 14, 13],
  [19, 18, 17, 16],
];

export const TOTAL_SEATS = 19;
export const ALL_SEATS = Array.from({ length: TOTAL_SEATS }, (_, i) => i + 1);
/** Kursi di samping sopir; bisa ditutup dari halaman Pengaturan. */
export const FRONT_SEATS = [1, 2];
export const MAX_SEATS_PER_BOOKING = 7;
