import type { ReservationStatus } from '../types';
import { STATUS_LABELS } from '../types';

const badgeStyles: Record<ReservationStatus, string> = {
  pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  confirmed: 'bg-sky-50 text-sky-700 ring-sky-600/20',
  done: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  canceled: 'bg-rose-50 text-rose-700 ring-rose-600/20',
};

const dotStyles: Record<ReservationStatus, string> = {
  pending: 'bg-amber-500',
  confirmed: 'bg-sky-500',
  done: 'bg-emerald-500',
  canceled: 'bg-rose-500',
};

export default function StatusBadge({ status }: { status: ReservationStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${badgeStyles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotStyles[status]}`} />
      {STATUS_LABELS[status]}
    </span>
  );
}
