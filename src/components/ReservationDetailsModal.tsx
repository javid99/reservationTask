import type { Reservation, ReservationStatus } from '../types';
import { formatJalaliDate, toPersianDigits } from '../utils/format';
import Modal from './Modal';
import StatusBadge from './StatusBadge';

interface ReservationDetailsModalProps {
  reservation: Reservation;
  onClose: () => void;
  onStatusChange: (id: string, status: ReservationStatus) => void;
}

export default function ReservationDetailsModal({
  reservation,
  onClose,
  onStatusChange,
}: ReservationDetailsModalProps) {
  const rows: { label: string; value: string }[] = [
    { label: 'شماره تماس', value: toPersianDigits(reservation.phone) },
    { label: 'نوع خدمت', value: reservation.service },
    { label: 'تاریخ', value: formatJalaliDate(reservation.date, true) },
    { label: 'ساعت', value: `${toPersianDigits(reservation.time)}` },
    { label: 'کد رزرو', value: toPersianDigits(reservation.id.replace('r-', '')) },
  ];

  const actions: { status: ReservationStatus; label: string; className: string }[] = [];
  if (reservation.status === 'pending') {
    actions.push({
      status: 'confirmed',
      label: 'تایید رزرو',
      className: 'flex-1 bg-teal-700 text-white hover:bg-teal-800',
    });
  }
  if (reservation.status === 'pending' || reservation.status === 'confirmed') {
    actions.push({
      status: 'done',
      label: 'انجام شد',
      className: 'flex-1 border border-slate-200 text-slate-700 hover:bg-slate-50',
    });
    actions.push({
      status: 'canceled',
      label: 'لغو رزرو',
      className: 'flex-1 border border-rose-200 text-rose-600 hover:bg-rose-50',
    });
  }

  return (
    <Modal title="جزئیات رزرو" onClose={onClose}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">{reservation.customerName}</h3>
        <StatusBadge status={reservation.status} />
      </div>

      <dl className="mt-5 divide-y divide-slate-100 rounded-xl border border-slate-200">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between px-4 py-3 text-sm">
            <dt className="text-slate-500">{row.label}</dt>
            <dd
              className={`font-medium text-slate-900 ${row.label === 'شماره تماس' ? 'dir-ltr' : ''}`}
              dir={row.label === 'شماره تماس' ? 'ltr' : undefined}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      {reservation.note && (
        <div className="mt-4 rounded-lg bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
          <span className="font-medium text-slate-500">توضیحات: </span>
          {reservation.note}
        </div>
      )}

      {actions.length > 0 && (
        <div className="mt-6 flex gap-2.5">
          {actions.map((action) => (
            <button
              key={action.status}
              type="button"
              onClick={() => onStatusChange(reservation.id, action.status)}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-teal-600/30 ${action.className}`}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </Modal>
  );
}
