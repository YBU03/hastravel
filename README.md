# Yubu Travel Portfolio

Kumpulan 10 tema website travel dalam satu repo. Daftar tema ada di `src/lib/portfolio.ts`.

| Route | Isi |
|---|---|
| `/` | Galeri portfolio (10 tema) |
| `/hastrans` | 1. HasTrans: travel antar kota, versi lengkap + admin (`/hastrans/admin`) |
| `/sayap-shuttle` | 2. Sayap Shuttle: shuttle bandara, tema Dark Modern (demo, tanpa database) |
| `/kencana-executive` | 3. Kencana Executive: sewa mobil premium, tema Luxury |
| `/armada-ria` | 4. Armada Ria: sewa bus rombongan + kalkulator penawaran, tema Bold & Ceria |
| `/langkah-nusa` | 5. Langkah Nusa: open trip dengan itinerary & kuota, tema Natural |
| `/raudhah-safar` | 6. Raudhah Safar: umroh & haji, jadwal per bulan, pilih kamar, simulasi DP & cicilan, tema Islami Elegan |
| … | 7–10 menyusul (status "Segera hadir" di galeri) |

Tema 2–5 tidak memakai database; data & nomor WA demo ada di `data.ts` masing-masing. Foto yang belum ada (`null` di `data.ts`) otomatis diganti ilustrasi.

Menambah tema baru: buat folder `src/app/<slug>`, ubah status tema di `src/lib/portfolio.ts` menjadi `"demo"`, dan simpan screenshot di `public/portfolio/<slug>.jpg`.

---

## 1. HasTrans: Web Booking Travel Antar Kota

Web pemesanan travel ELF **Denpasar ⇄ Surabaya** dan **Denpasar ⇄ Jember**: pelanggan memilih rute, tanggal, jadwal & kursi, lalu pesanan tersimpan di sistem dan dikirim ke WhatsApp admin.

### Fitur

**Pelanggan**
- Cari jadwal (asal ⇄ tujuan, tanggal, jumlah penumpang) + strip tanggal
- Denah kursi ELF 19 kursi interaktif (tersedia / dipilih / terisi)
- Isi data pemesan, nama penumpang per kursi, alamat jemput & antar
- Kursi dikunci selama batas waktu bayar (default 60 menit), lalu otomatis dilepas jika belum dibayar
- Halaman pesanan + tombol **Kirim ke WhatsApp** (pesan sudah terisi lengkap) + info rekening
- Cek pesanan dengan kode booking + No. HP

**Admin** (`/hastrans/admin`)
- Dashboard per tanggal: keterisian kursi per keberangkatan, lunas/belum bayar, pendapatan
- Daftar pesanan + filter; ubah status (Lunas / Selesai / Batalkan), chat WA pelanggan
- Pesanan manual (pesanan via telepon/WA) dengan denah kursi
- Manifest penumpang per keberangkatan (bisa dicetak untuk sopir)
- Pengaturan: harga & durasi rute, jam keberangkatan, nomor WA admin, rekening, batas waktu bayar, buka/tutup kursi depan

### Menjalankan lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000 (galeri). HasTrans di http://localhost:3000/hastrans, admin di http://localhost:3000/hastrans/admin (password dev: `admin123`).

Tanpa `DATABASE_URL`, data disimpan di folder `.data/` (Postgres tertanam/PGlite), tidak perlu setup apa pun.

### Deploy (Vercel + Supabase)

1. Buat project di [Supabase](https://supabase.com) (gratis) → **Connect** → salin connection string *Transaction pooler*.
2. Import repo ini di [Vercel](https://vercel.com).
3. Isi Environment Variables (lihat `.env.example`):
   - `DATABASE_URL` — connection string Postgres
   - `ADMIN_PASSWORD` — password halaman admin
   - `ADMIN_SECRET` — string acak panjang
4. Deploy. Tabel & data awal dibuat otomatis saat pertama diakses.
5. Login `/hastrans/admin` → **Pengaturan**: ganti nomor WhatsApp, rekening, harga & jadwal (data awal masih contoh).

### Struktur

- `src/lib/seats.ts` — denah ELF (ubah di sini jika armada berbeda)
- `src/lib/schema.ts` — tabel database + data awal
- `src/lib/data.ts` — query: jadwal, ketersediaan kursi, booking, admin
- `src/app/hastrans/(site)` — halaman pelanggan; `src/app/hastrans/admin` — halaman admin

## 2. Sayap Shuttle

Demo tampilan (tanpa database): slider banner otomatis, widget pemesanan, tarif per zona (DPS & SUB), pilihan Shared / Private, diskon pulang-pergi, pesanan dikirim ke WhatsApp. Data & nomor WA demo ada di `src/app/sayap-shuttle/data.ts`, gambar di `public/sayap/`.
