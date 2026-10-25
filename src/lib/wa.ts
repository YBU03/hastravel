import { city } from "./cities";
import type { Booking } from "./data";
import { formatDate, normalizePhone, rupiah } from "./format";

export function waLink(number: string, text?: string): string {
  const n = normalizePhone(number);
  return `https://wa.me/${n}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

function tripLines(b: Booking): string[] {
  const from = city(b.origin);
  return [
    `Rute: ${from.name} → ${city(b.destination).name}`,
    `Tanggal: ${formatDate(b.travel_date)}`,
    `Jam berangkat: ${b.depart_time} ${from.tzLabel}`,
    `Kursi: ${b.seats.join(", ")}`,
  ];
}

/** Pesan dari pelanggan ke admin setelah booking di web. */
export function bookingMessage(b: Booking, siteUrl: string): string {
  return [
    "Halo HasTrans, saya mau konfirmasi pesanan travel 🙏",
    "",
    `*Kode Booking: ${b.code}*`,
    `Nama: ${b.customer_name}`,
    `No. HP: ${b.phone}`,
    ...tripLines(b),
    "",
    "Penumpang:",
    ...b.passengers.map((p, i) => `${i + 1}. Kursi ${p.seat} - ${p.name}`),
    "",
    `Jemput: ${b.pickup_address}`,
    `Antar: ${b.dropoff_address}`,
    ...(b.notes ? [`Catatan: ${b.notes}`] : []),
    "",
    `Harga: ${rupiah(b.price_per_seat)} x ${b.seats.length} kursi`,
    `*Total: ${rupiah(b.total)}*`,
    "",
    `Detail: ${siteUrl}/hastrans/pesanan/${b.code}`,
  ].join("\n");
}

/** Pesan dari admin ke pelanggan. */
export function customerMessage(b: Booking, siteUrl: string): string {
  const head =
    b.status === "paid" || b.status === "done"
      ? `Halo ${b.customer_name}, pembayaran pesanan *${b.code}* sudah kami terima. Terima kasih! ✅`
      : `Halo ${b.customer_name}, kami dari HasTrans terkait pesanan *${b.code}*.`;
  return [head, "", ...tripLines(b), `Total: ${rupiah(b.total)}`, "", `Detail: ${siteUrl}/hastrans/pesanan/${b.code}`].join(
    "\n",
  );
}
