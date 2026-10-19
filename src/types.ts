export type ReservationStatus = 'pending' | 'confirmed' | 'done' | 'canceled';

export interface Reservation {
  id: string;
  customerName: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: ReservationStatus;
  note?: string;
}

export const STATUS_LABELS: Record<ReservationStatus, string> = {
  pending: 'در انتظار تایید',
  confirmed: 'تایید شده',
  done: 'انجام شده',
  canceled: 'لغو شده',
};
