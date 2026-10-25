"use client";

import { ELF_LAYOUT } from "@/lib/seats";
import { IconSteering } from "./icons";

type Props = {
  taken: number[];
  /** Kursi yang tidak dijual (misal kursi depan ditutup). */
  blocked?: number[];
  selected: number[];
  onToggle?: (seat: number) => void;
  /** Label tambahan per kursi (misal nama penumpang di manifest). */
  labels?: Record<number, string>;
};

export function SeatMap({ taken, blocked = [], selected, onToggle, labels }: Props) {
  return (
    <div className="mx-auto w-full max-w-[19rem]">
      <div className="relative rounded-[2.5rem] border-4 border-slate-300 bg-slate-50 px-4 pb-6 pt-8">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-300 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
          Depan
        </div>
        <div className="grid grid-cols-4 gap-2.5">
          {ELF_LAYOUT.map((row, r) => (
            <div key={r} className={`contents`}>
              {row.map((cell, c) => {
                const key = `${r}-${c}`;
                if (cell === null) return <div key={key} />;
                if (cell === "driver")
                  return (
                    <div
                      key={key}
                      className="flex aspect-square flex-col items-center justify-center rounded-xl bg-slate-700 text-[9px] font-medium text-slate-200"
                      title="Sopir"
                    >
                      <IconSteering width={22} height={22} />
                      Sopir
                    </div>
                  );
                if (cell === "door")
                  return (
                    <div key={key} className="relative">
                      <div className="absolute -left-[1.4rem] bottom-1 top-1 w-1.5 rounded-full bg-amber-400" />
                      <span className="absolute -left-1 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] font-semibold uppercase tracking-wider text-amber-600">
                        Pintu
                      </span>
                    </div>
                  );
                return (
                  <Seat
                    key={key}
                    n={cell}
                    state={
                      taken.includes(cell)
                        ? "taken"
                        : blocked.includes(cell)
                          ? "blocked"
                          : selected.includes(cell)
                            ? "selected"
                            : "free"
                    }
                    label={labels?.[cell]}
                    onClick={onToggle ? () => onToggle(cell) : undefined}
                  />
                );
              })}
              {r === 0 && <div className="col-span-4 my-1 h-1 rounded-full bg-slate-200" />}
            </div>
          ))}
        </div>
      </div>
      {!labels && (
        <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-slate-600">
          <Legend className="border-2 border-brand-200 bg-white" text="Tersedia" />
          <Legend className="bg-brand-600" text="Dipilih" />
          <Legend className="bg-slate-300" text="Terisi" />
          {blocked.length > 0 && <Legend className="bg-slate-200 bg-stripes" text="Tidak dijual" />}
        </div>
      )}
    </div>
  );
}

function Legend({ className, text }: { className: string; text: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`h-4 w-4 rounded ${className}`} />
      {text}
    </span>
  );
}

function Seat({
  n,
  state,
  label,
  onClick,
}: {
  n: number;
  state: "free" | "selected" | "taken" | "blocked";
  label?: string;
  onClick?: () => void;
}) {
  const styles = {
    free: "border-2 border-brand-200 bg-white text-brand-700 hover:border-brand-500 hover:bg-brand-50",
    selected: "border-2 border-brand-600 bg-brand-600 text-white shadow-md shadow-brand-600/30",
    taken: "border-2 border-slate-300 bg-slate-300 text-slate-500 cursor-not-allowed",
    blocked: "border-2 border-slate-200 bg-slate-200 bg-stripes text-slate-400 cursor-not-allowed",
  }[state];
  const disabled = !onClick || state === "taken" || state === "blocked";
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-pressed={state === "selected"}
      aria-label={`Kursi ${n}${state === "taken" ? " (terisi)" : state === "blocked" ? " (tidak dijual)" : ""}`}
      className={`relative flex aspect-square flex-col items-center justify-center rounded-xl text-sm font-bold transition ${styles} ${
        !onClick && state !== "taken" ? "cursor-default" : ""
      }`}
    >
      <span className="absolute inset-x-2 bottom-1 h-1 rounded-full bg-current opacity-20" />
      {state === "taken" && !label ? <span className="text-base">✕</span> : n}
      {label && <span className="mt-0.5 max-w-full truncate px-1 text-[8px] font-medium leading-none">{label}</span>}
    </button>
  );
}
