import { LogoutIcon } from './icons';

interface DashboardHeaderProps {
  user: string;
  onLogout: () => void;
}

export default function DashboardHeader({ user, onLogout }: DashboardHeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <img src="/favicon.svg" alt="" className="h-8 w-8" />
          <div className="leading-tight">
            <span className="font-bold text-slate-900">رزرواسیون</span>
            <span className="hidden text-xs text-slate-400 sm:inline"> | پنل مدیریت رزروها</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span dir="ltr" className="hidden text-sm text-slate-500 sm:inline">
            {user}
          </span>
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <LogoutIcon className="h-4 w-4" />
            خروج
          </button>
        </div>
      </div>
    </header>
  );
}
