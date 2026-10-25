import { STATUS_LABEL, type BookingStatus } from "@/lib/data";

const STYLE: Record<BookingStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  paid: "bg-green-100 text-green-800",
  done: "bg-brand-100 text-brand-800",
  cancelled: "bg-red-100 text-red-700",
  expired: "bg-slate-200 text-slate-600",
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STYLE[status]}`}>
      {STATUS_LABEL[status]}
    </span>
  );
}
