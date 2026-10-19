const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

export function toPersianDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);
}

const dateFormatter = new Intl.DateTimeFormat('fa-IR', {
  calendar: 'persian',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const dateFormatterWithWeekday = new Intl.DateTimeFormat('fa-IR', {
  calendar: 'persian',
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export function formatJalaliDate(iso: string, withWeekday = false): string {
  const [year, month, day] = iso.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return (withWeekday ? dateFormatterWithWeekday : dateFormatter).format(date);
}

export function todayISO(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

export function isToday(iso: string): boolean {
  return iso === todayISO();
}
