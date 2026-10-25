"use client";

import Link from "next/link";
import { useState } from "react";
import { STATUS_LABEL, type PortfolioItem, type PortfolioStatus } from "@/lib/portfolio";

type Filter = "all" | "live" | "soon";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Semua" },
  { id: "live", label: "Live" },
  { id: "soon", label: "Dalam pengembangan" },
];

export function Collection({ items }: { items: PortfolioItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const q = query.trim().toLowerCase();
  const shown = items.filter((p) => {
    const statusOk = filter === "all" || (filter === "live" ? p.status !== "soon" : p.status === "soon");
    const text = `${p.name} ${p.business} ${p.style} ${p.features.join(" ")}`.toLowerCase();
    return statusOk && (!q || text.includes(q));
  });
  const count = (f: Filter) => items.filter((p) => f === "all" || (f === "live" ? p.status !== "soon" : p.status === "soon")).length;

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-1 rounded-lg bg-slate-100 p-1">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-semibold transition ${
                filter === f.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {f.label}
              <span className={`rounded px-1.5 text-xs ${filter === f.id ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-600"}`}>{count(f.id)}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <label className="relative flex-1 lg:w-72 lg:flex-none">
            <span className="sr-only">Cari tema</span>
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari tema, jenis bisnis, fitur…"
              className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />
          </label>
          <div className="flex rounded-lg border border-slate-200 p-0.5" role="group" aria-label="Tampilan">
            {(["grid", "list"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                aria-pressed={view === v}
                aria-label={v === "grid" ? "Tampilan grid" : "Tampilan tabel"}
                className={`flex h-8 w-8 items-center justify-center rounded-md ${view === v ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100"}`}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  {v === "grid" ? <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      {shown.length === 0 && <p className="py-16 text-center text-slate-500">Tidak ada tema yang cocok dengan pencarian.</p>}

      {view === "grid" ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {shown.map((p) => (
            <Card key={p.slug} item={p} />
          ))}
        </div>
      ) : (
        shown.length > 0 && (
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3">No.</th>
                  <th className="px-4 py-3">Tema</th>
                  <th className="px-4 py-3">Jenis bisnis</th>
                  <th className="px-4 py-3">Gaya</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {shown.map((p) => (
                  <tr key={p.slug} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-xs text-slate-400">{String(p.no).padStart(2, "0")}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Thumb item={p} className="h-10 w-16 shrink-0 rounded-md" />
                        <span className="font-semibold">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{p.business}</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-2 text-slate-600">
                        <Palette colors={p.palette} />
                        {p.style}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill status={p.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      {p.status !== "soon" ? (
                        <Link href={`/${p.slug}`} className="font-semibold text-[#ef0f0f] hover:underline">
                          Buka website →
                        </Link>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
}

function Card({ item }: { item: PortfolioItem }) {
  const live = item.status !== "soon";
  const inner = (
    <>
      <div className="relative overflow-hidden border-b border-slate-200 bg-slate-100">
        <div className="flex h-7 items-center gap-1.5 bg-white px-3">
          <span className="h-2 w-2 rounded-full bg-slate-300" />
          <span className="h-2 w-2 rounded-full bg-slate-300" />
          <span className="h-2 w-2 rounded-full bg-slate-300" />
          <span className="ml-2 truncate rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">/{item.slug}</span>
        </div>
        <Thumb item={item} className="aspect-[16/10] w-full" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-xs text-slate-400">No. {String(item.no).padStart(2, "0")}</span>
          <StatusPill status={item.status} />
        </div>
        <h2 className="mt-2 text-lg font-bold tracking-tight">{item.name}</h2>
        <p className="text-sm text-slate-500">{item.business}</p>
        <p className="mt-3 line-clamp-2 text-sm text-slate-600">{item.description}</p>
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <Palette colors={item.palette} />
          <span>Gaya {item.style}</span>
        </div>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {item.features.map((f) => (
            <li key={f} className="rounded-md border border-slate-200 px-2 py-0.5 text-xs text-slate-600">
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-5">
          {live ? (
            <span className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 py-2.5 text-sm font-semibold text-white transition group-hover:bg-[#ef0f0f]">
              Buka website
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </span>
          ) : (
            <span className="flex items-center justify-center rounded-lg border border-dashed border-slate-300 py-2.5 text-sm font-medium text-slate-400">
              Segera dirilis
            </span>
          )}
        </div>
      </div>
    </>
  );
  const cls = "group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition";
  return live ? (
    <Link href={`/${item.slug}`} className={`${cls} hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg`}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

function Thumb({ item, className }: { item: PortfolioItem; className: string }) {
  const [bg, fg, accent, accent2] = item.palette;
  if (item.preview) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={item.preview} alt={`Tampilan ${item.name}`} loading="lazy" className={`${className} object-cover object-top transition duration-500 group-hover:scale-[1.02]`} />;
  }
  return (
    <div className={`${className} relative flex flex-col justify-end overflow-hidden p-4`} style={{ background: bg, color: fg }} role="img" aria-label={`Palet warna ${item.name}`}>
      <div className="absolute right-4 top-4 flex gap-1.5">
        <span className="h-2 w-8 rounded-full" style={{ background: fg, opacity: 0.3 }} />
        <span className="h-2 w-5 rounded-full" style={{ background: accent }} />
      </div>
      <div className="text-lg font-bold leading-tight">{item.name}</div>
      <div className="mt-2 flex gap-1.5">
        <span className="h-5 w-16 rounded" style={{ background: accent }} />
        <span className="h-5 w-10 rounded" style={{ background: accent2 }} />
      </div>
    </div>
  );
}

function Palette({ colors }: { colors: string[] }) {
  return (
    <span className="flex -space-x-1">
      {colors.map((c, i) => (
        <span key={i} className="h-3.5 w-3.5 rounded-full ring-2 ring-white" style={{ background: c, boxShadow: "inset 0 0 0 1px rgba(15,23,42,0.15)" }} />
      ))}
    </span>
  );
}

function StatusPill({ status }: { status: PortfolioStatus }) {
  const style = {
    full: "bg-red-50 text-[#ef0f0f] ring-red-100",
    live: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    soon: "bg-slate-100 text-slate-500 ring-slate-200",
  }[status];
  const dot = { full: "bg-[#ef0f0f]", live: "bg-emerald-500", soon: "bg-slate-400" }[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ${style}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {STATUS_LABEL[status]}
    </span>
  );
}
