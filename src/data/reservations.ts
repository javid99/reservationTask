import type { Reservation } from '../types';
import { todayISO } from '../utils/format';

export const SERVICES = [
  'کوتاهی مو',
  'رنگ و لایت',
  'کراتینه مو',
  'اصلاح صورت',
  'پاکسازی پوست',
  'ماساژ بدن',
  'مانیکور',
  'اپیلاسیون',
  'پکیج عروس',
];

function shiftDays(offset: number): string {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export function initialReservations(): Reservation[] {
  const today = todayISO();

  return [
    {
      id: 'r-1001',
      customerName: 'سارا محمدی',
      phone: '09121234567',
      service: 'رنگ و لایت',
      date: today,
      time: '10:30',
      status: 'confirmed',
    },
    {
      id: 'r-1002',
      customerName: 'علی رضایی',
      phone: '09351112233',
      service: 'اصلاح صورت',
      date: today,
      time: '12:00',
      status: 'pending',
    },
    {
      id: 'r-1003',
      customerName: 'مریم حسینی',
      phone: '09194445566',
      service: 'پاکسازی پوست',
      date: today,
      time: '16:30',
      status: 'confirmed',
    },
    {
      id: 'r-1004',
      customerName: 'حسین کریمی',
      phone: '09127778899',
      service: 'ماساژ بدن',
      date: today,
      time: '18:00',
      status: 'pending',
      note: 'مشتری درخواست اتاق ساکت دارد.',
    },
    {
      id: 'r-1005',
      customerName: 'نگار موسوی',
      phone: '09013334455',
      service: 'مانیکور',
      date: shiftDays(1),
      time: '11:00',
      status: 'confirmed',
    },
    {
      id: 'r-1006',
      customerName: 'امیر تهرانی',
      phone: '09122223344',
      service: 'کوتاهی مو',
      date: shiftDays(1),
      time: '09:30',
      status: 'pending',
    },
    {
      id: 'r-1007',
      customerName: 'زهرا اکبری',
      phone: '09365556677',
      service: 'کراتینه مو',
      date: shiftDays(1),
      time: '15:00',
      status: 'confirmed',
    },
    {
      id: 'r-1008',
      customerName: 'محمد صادقی',
      phone: '09108889900',
      service: 'پکیج عروس',
      date: shiftDays(2),
      time: '17:30',
      status: 'confirmed',
      note: 'قرار شد همراه مشتری برای تست گریم بیاید.',
    },
    {
      id: 'r-1009',
      customerName: 'لیلا نوری',
      phone: '09123334455',
      service: 'اپیلاسیون',
      date: shiftDays(2),
      time: '10:00',
      status: 'canceled',
    },
    {
      id: 'r-1010',
      customerName: 'رضا قاسمی',
      phone: '09391234561',
      service: 'اصلاح صورت',
      date: shiftDays(-1),
      time: '19:00',
      status: 'done',
    },
    {
      id: 'r-1011',
      customerName: 'شیما رستمی',
      phone: '09174567890',
      service: 'ماساژ بدن',
      date: shiftDays(-1),
      time: '13:30',
      status: 'done',
    },
    {
      id: 'r-1012',
      customerName: 'کاوه شریفی',
      phone: '09121110000',
      service: 'رنگ و لایت',
      date: shiftDays(-2),
      time: '14:15',
      status: 'canceled',
    },
  ];
}
