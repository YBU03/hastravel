import Link from "next/link";
import { PORTFOLIO } from "@/lib/portfolio";
import { Collection } from "./_home/Collection";

export default function Home() {
  const total = PORTFOLIO.length;
  const live = PORTFOLIO.filter((p) => p.status !== "soon").length;
  const full = PORTFOLIO.filter((p) => p.status === "full").length;
  const progress = Math.round((live / total) * 100);

  const stats = [
    { label: "Total tema", value: total, note: "Kategori bisnis travel", icon: "grid" },
    { label: "Live", value: live, note: "Dapat diakses publik", icon: "live" },
    { label: "Dalam pengembangan", value: total - live, note: "Segera dirilis", icon: "build" },
    { label: "Sistem lengkap", value: full, note: "Dengan panel admin", icon: "shield" },
  ] as const;

  return (
    <div className="min-h-screen bg-[#f5f6f8] text-slate-900">
      {/* Navigasi */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3" aria-label="Yubu Travel Portfolio">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/yubu/logo.png" alt="" className="h-8 w-auto" />
            <span className="leading-tight">
              <span className="block text-[15px] font-extrabold tracking-tight">Yubu</span>
              <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">Travel Portfolio</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 text-sm font-semibold text-slate-600 md:flex">
            <a href="#ringkasan" className="rounded-lg px-3 py-2 hover:bg-slate-100 hover:text-slate-900">
              Ringkasan
            </a>
            <a href="#koleksi" className="rounded-lg px-3 py-2 hover:bg-slate-100 hover:text-slate-900">
              Koleksi
            </a>
          </nav>
          <a href="#koleksi" className="rounded-lg bg-[#ef0f0f] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#c90c0c]">
            Lihat koleksi
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        {/* Judul halaman */}
        <section className="flex flex-col gap-4 border-b border-slate-200 py-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ef0f0f]">Travel Web Collection</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">Koleksi Website Travel</h1>
            <p className="mt-2 max-w-2xl text-slate-600">
              Desain website dan sistem pemesanan untuk bisnis travel: antar kota, shuttle bandara, sewa kendaraan, wisata, umroh, hingga fast
              boat. Setiap tema terintegrasi dengan WhatsApp dan dioptimalkan untuk perangkat seluler.
            </p>
          </div>
          <div className="text-sm text-slate-500">
            Diperbarui <span className="font-semibold text-slate-700">{new Date().getFullYear()}</span>
          </div>
        </section>

        {/* Ringkasan */}
        <section id="ringkasan" className="scroll-mt-20 py-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{s.label}</p>
                    <p className="mt-1 text-3xl font-extrabold tracking-tight">{s.value}</p>
                  </div>
                  <StatIcon name={s.icon} />
                </div>
                <p className="mt-3 text-xs text-slate-500">{s.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">Progres koleksi</span>
              <span className="font-bold text-slate-700">{progress}%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-[#ef0f0f]" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-500">
              <Legend color="bg-[#ef0f0f]" text={`${live} tema live`} />
              <Legend color="bg-slate-300" text={`${total - live} tema dalam pengembangan`} />
            </div>
          </div>
        </section>

        {/* Koleksi */}
        <section id="koleksi" className="scroll-mt-20">
          <Collection items={PORTFOLIO} />
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/yubu/logo.png" alt="" className="h-6 w-auto" />
            <span className="font-semibold text-slate-700">Yubu Travel Portfolio</span>
          </div>
          <p>© {new Date().getFullYear()} Yubu Travel Portfolio. Seluruh hak cipta dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}

function Legend({ color, text }: { color: string; text: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      {text}
    </span>
  );
}

function StatIcon({ name }: { name: "grid" | "live" | "build" | "shield" }) {
  const paths = {
    grid: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
    live: <path d="M5 12l4 4L19 6" />,
    build: <path d="M12 6v6l4 2M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18z" />,
    shield: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />,
  };
  const tone = name === "live" ? "bg-emerald-50 text-emerald-600" : name === "build" ? "bg-amber-50 text-amber-600" : name === "shield" ? "bg-red-50 text-[#ef0f0f]" : "bg-slate-100 text-slate-600";
  return (
    <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${tone}`}>
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {paths[name]}
      </svg>
    </span>
  );
}
