import { useMemo } from 'react';
import type { Reservation } from '../types';
import { formatJalaliDate, toPersianDigits } from '../utils/format';
import StatusBadge from './StatusBadge';
import { ChevronLeftIcon } from './icons';

interface ReservationsTableProps {
  reservations: Reservation[];
  onSelect: (reservation: Reservation) => void;
}

export default function ReservationsTable({ reservations, onSelect }: ReservationsTableProps) {
  const sorted = useMemo(
    () =>
      [...reservations].sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)),
    [reservations],
  );

  if (sorted.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
        <p className="font-medium text-slate-600">رزروی یافت نشد</p>
        <p className="mt-1 text-sm text-slate-400">عبارت جست‌وجو یا فیلتر وضعیت را تغییر دهید.</p>
      </div>
    );
  }

  return (
    <>
      {/* نمایش جدولی در دسکتاپ */}
      <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500">
              <th className="px-4 py-3 text-right font-medium">مشتری</th>
              <th className="px-4 py-3 text-right font-medium">شماره تماس</th>
              <th className="px-4 py-3 text-right font-medium">نوع خدمت</th>
              <th className="px-4 py-3 text-right font-medium">تاریخ</th>
              <th className="px-4 py-3 text-right font-medium">ساعت</th>
              <th className="px-4 py-3 text-right font-medium">وضعیت</th>
              <th className="w-10 px-2 py-3" aria-label="جزئیات" />
            </tr>
          </thead>
          <tbody>
            {sorted.map((reservation) => (
              <tr
                key={reservation.id}
                onClick={() => onSelect(reservation)}
                className="cursor-pointer border-b border-slate-100 transition last:border-0 hover:bg-slate-50"
              >
                <td className="px-4 py-3.5 font-medium text-slate-900">{reservation.customerName}</td>
                <td dir="ltr" className="px-4 py-3.5 text-right text-slate-600">
                  {toPersianDigits(reservation.phone)}
                </td>
                <td className="px-4 py-3.5 text-slate-600">{reservation.service}</td>
                <td className="px-4 py-3.5 text-slate-600">{formatJalaliDate(reservation.date)}</td>
                <td className="px-4 py-3.5 text-slate-600">{toPersianDigits(reservation.time)}</td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={reservation.status} />
                </td>
                <td className="px-2 py-3.5">
                  <ChevronLeftIcon className="h-4 w-4 text-slate-300" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* نمایش کارتی در موبایل */}
      <div className="space-y-3 md:hidden">
        {sorted.map((reservation) => (
          <button
            key={reservation.id}
            type="button"
            onClick={() => onSelect(reservation)}
            className="w-full rounded-xl border border-slate-200 bg-white p-4 text-right transition hover:border-slate-300"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-slate-900">{reservation.customerName}</span>
              <StatusBadge status={reservation.status} />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-y-2 text-sm text-slate-500">
              <span>{reservation.service}</span>
              <span dir="ltr" className="text-left">
                {toPersianDigits(reservation.phone)}
              </span>
              <span>
                {formatJalaliDate(reservation.date)} — ساعت {toPersianDigits(reservation.time)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
