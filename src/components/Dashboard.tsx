import { useEffect, useMemo, useState } from 'react';
import type { Reservation, ReservationStatus } from '../types';
import { STATUS_LABELS } from '../types';
import { initialReservations } from '../data/reservations';
import { isToday } from '../utils/format';
import DashboardHeader from './DashboardHeader';
import StatCard from './StatCard';
import ReservationsTable from './ReservationsTable';
import ReservationFormModal from './ReservationFormModal';
import ReservationDetailsModal from './ReservationDetailsModal';
import Toast from './Toast';
import {
  CalendarIcon,
  CheckCircleIcon,
  ClipboardIcon,
  ClockIcon,
  PlusIcon,
  SearchIcon,
} from './icons';

interface DashboardProps {
  user: string;
  onLogout: () => void;
}

type ToastState = { type: 'success' | 'error'; message: string } | null;

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ReservationStatus>('all');
  const [formOpen, setFormOpen] = useState(false);
  const [selected, setSelected] = useState<Reservation | null>(null);
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  const stats = useMemo(
    () => ({
      total: reservations.length,
      today: reservations.filter((r) => isToday(r.date)).length,
      pending: reservations.filter((r) => r.status === 'pending').length,
      confirmed: reservations.filter((r) => r.status === 'confirmed').length,
    }),
    [reservations],
  );

  const filtered = useMemo(() => {
    const term = query.trim();
    return reservations.filter((reservation) => {
      const matchesQuery =
        !term || reservation.customerName.includes(term) || reservation.phone.includes(term);
      const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [reservations, query, statusFilter]);

  const addReservation = (reservation: Reservation) => {
    setReservations((prev) => [...prev, reservation]);
    setFormOpen(false);
    setToast({ type: 'success', message: 'رزرو جدید با موفقیت ثبت شد.' });
  };

  const changeStatus = (id: string, status: ReservationStatus) => {
    setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    setSelected(null);
    setToast({ type: 'success', message: `وضعیت رزرو به «${STATUS_LABELS[status]}» تغییر کرد.` });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader user={user} onLogout={onLogout} />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900">مدیریت رزروها</h1>
            <p className="mt-0.5 text-sm text-slate-500">نمای کلی رزروهای مجموعه</p>
          </div>
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600/40"
          >
            <PlusIcon className="h-4 w-4" />
            ثبت رزرو جدید
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard title="کل رزروها" value={stats.total} icon={<ClipboardIcon className="h-5 w-5" />} tone="slate" />
          <StatCard title="رزروهای امروز" value={stats.today} icon={<CalendarIcon className="h-5 w-5" />} tone="teal" />
          <StatCard title="در انتظار تایید" value={stats.pending} icon={<ClockIcon className="h-5 w-5" />} tone="amber" />
          <StatCard title="تایید شده" value={stats.confirmed} icon={<CheckCircleIcon className="h-5 w-5" />} tone="emerald" />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جست‌وجوی نام مشتری یا شماره تماس..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className={`rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15 ${
              statusFilter === 'all' ? 'text-slate-500' : 'text-slate-900'
            }`}
            aria-label="فیلتر وضعیت رزرو"
          >
            <option value="all">همه وضعیت‌ها</option>
            {(Object.keys(STATUS_LABELS) as ReservationStatus[]).map((status) => (
              <option key={status} value={status}>
                {STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <ReservationsTable reservations={filtered} onSelect={setSelected} />
        </div>
      </main>

      {formOpen && (
        <ReservationFormModal onClose={() => setFormOpen(false)} onSubmit={addReservation} />
      )}

      {selected && (
        <ReservationDetailsModal
          reservation={reservations.find((r) => r.id === selected.id) ?? selected}
          onClose={() => setSelected(null)}
          onStatusChange={changeStatus}
        />
      )}

      {toast && <Toast type={toast.type} message={toast.message} />}
    </div>
  );
}
