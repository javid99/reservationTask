import type { ReactNode } from 'react';

const tones = {
  slate: 'bg-slate-100 text-slate-600',
  teal: 'bg-teal-50 text-teal-700',
  amber: 'bg-amber-50 text-amber-600',
  emerald: 'bg-emerald-50 text-emerald-700',
};

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  tone: keyof typeof tones;
}

export default function StatCard({ title, value, icon, tone }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{value.toLocaleString('fa-IR')}</p>
        </div>
        <span className={`rounded-lg p-2.5 ${tones[tone]}`}>{icon}</span>
      </div>
    </div>
  );
}
