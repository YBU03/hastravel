# HasTrans — Web Booking Travel Antar Kota

Web pemesanan travel ELF **Denpasar ⇄ Surabaya** dan **Denpasar ⇄ Jember**: pelanggan memilih rute, tanggal, jadwal & kursi, lalu pesanan tersimpan di sistem dan dikirim ke WhatsApp admin.

## Fitur

**Pelanggan**
- Cari jadwal (asal ⇄ tujuan, tanggal, jumlah penumpang) + strip tanggal
- Denah kursi ELF 19 kursi interaktif (tersedia / dipilih / terisi)
- Isi data pemesan, nama penumpang per kursi, alamat jemput & antar
- Kursi dikunci selama batas waktu bayar (default 60 menit), lalu otomatis dilepas jika belum dibayar
- Halaman pesanan + tombol **Kirim ke WhatsApp** (pesan sudah terisi lengkap) + info rekening
- Cek pesanan dengan kode booking + No. HP

**Admin** (`/admin`)
- Dashboard per tanggal: keterisian kursi per keberangkatan, lunas/belum bayar, pendapatan
- Daftar pesanan + filter; ubah status (Lunas / Selesai / Batalkan), chat WA pelanggan
- Pesanan manual (pesanan via telepon/WA) dengan denah kursi
- Manifest penumpang per keberangkatan (bisa dicetak untuk sopir)
- Pengaturan: harga & durasi rute, jam keberangkatan, nomor WA admin, rekening, batas waktu bayar, buka/tutup kursi depan

## Menjalankan lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000 — admin di http://localhost:3000/admin (password dev: `admin123`).

Tanpa `DATABASE_URL`, data disimpan di folder `.data/` (Postgres tertanam/PGlite), tidak perlu setup apa pun.

## Deploy (Vercel + Supabase)

1. Buat project di [Supabase](https://supabase.com) (gratis) → **Connect** → salin connection string *Transaction pooler*.
2. Import repo ini di [Vercel](https://vercel.com).
3. Isi Environment Variables (lihat `.env.example`):
   - `DATABASE_URL` — connection string Postgres
   - `ADMIN_PASSWORD` — password halaman admin
   - `ADMIN_SECRET` — string acak panjang
4. Deploy. Tabel & data awal dibuat otomatis saat pertama diakses.
5. Login `/admin` → **Pengaturan**: ganti nomor WhatsApp, rekening, harga & jadwal (data awal masih contoh).

## Struktur

- `src/lib/seats.ts` — denah ELF (ubah di sini jika armada berbeda)
- `src/lib/schema.ts` — tabel database + data awal
- `src/lib/data.ts` — query: jadwal, ketersediaan kursi, booking, admin
- `src/app/(site)` — halaman pelanggan; `src/app/admin` — halaman admin
