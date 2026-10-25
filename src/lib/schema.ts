export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS routes (
  id SERIAL PRIMARY KEY,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  price INTEGER NOT NULL,
  duration_min INTEGER NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  sort INTEGER NOT NULL DEFAULT 0,
  UNIQUE (origin, destination)
);

CREATE TABLE IF NOT EXISTS schedules (
  id SERIAL PRIMARY KEY,
  route_id INTEGER NOT NULL REFERENCES routes(id),
  depart_time TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  UNIQUE (route_id, depart_time)
);

CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  schedule_id INTEGER NOT NULL REFERENCES schedules(id),
  travel_date TEXT NOT NULL,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  depart_time TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  pickup_address TEXT NOT NULL,
  dropoff_address TEXT NOT NULL,
  notes TEXT NOT NULL DEFAULT '',
  seats INTEGER[] NOT NULL,
  passengers JSONB NOT NULL,
  price_per_seat INTEGER NOT NULL,
  total INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  source TEXT NOT NULL DEFAULT 'web',
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS bookings_trip_idx ON bookings (schedule_id, travel_date);
CREATE INDEX IF NOT EXISTS bookings_date_idx ON bookings (travel_date);

-- Satu baris per kursi yang terpakai; primary key mencegah kursi dobel.
CREATE TABLE IF NOT EXISTS booking_seats (
  schedule_id INTEGER NOT NULL,
  travel_date TEXT NOT NULL,
  seat_no INTEGER NOT NULL,
  booking_id INTEGER NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  PRIMARY KEY (schedule_id, travel_date, seat_no)
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
`;

// Data awal (contoh) — harga & jadwal bisa diubah di /admin/pengaturan.
export const SEED_SQL = `
INSERT INTO routes (origin, destination, price, duration_min, sort) VALUES
  ('denpasar', 'surabaya', 250000, 600, 1),
  ('surabaya', 'denpasar', 250000, 600, 2),
  ('denpasar', 'jember', 200000, 420, 3),
  ('jember', 'denpasar', 200000, 420, 4)
ON CONFLICT (origin, destination) DO NOTHING;

INSERT INTO schedules (route_id, depart_time)
SELECT r.id, t.depart_time
FROM routes r
CROSS JOIN (VALUES ('08:00'), ('19:00')) AS t(depart_time)
WHERE NOT EXISTS (SELECT 1 FROM schedules s WHERE s.route_id = r.id)
ON CONFLICT (route_id, depart_time) DO NOTHING;

INSERT INTO settings (key, value) VALUES
  ('wa_number', '6281234567890'),
  ('hold_minutes', '60'),
  ('front_seats_open', 'true'),
  ('bank_info', 'BCA 1234567890 a.n. HasTrans
BRI 0987654321 a.n. HasTrans'),
  ('payment_note', 'Transfer sesuai total, lalu kirim bukti transfer ke WhatsApp admin. Pembayaran juga bisa via QRIS (minta ke admin).'),
  ('address', 'Denpasar, Bali'),
  ('email', 'halo@hastrans.id')
ON CONFLICT (key) DO NOTHING;
`;
