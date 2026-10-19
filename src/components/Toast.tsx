import { CheckCircleIcon, XCircleIcon } from './icons';

interface ToastProps {
  type: 'success' | 'error';
  message: string;
}

export default function Toast({ type, message }: ToastProps) {
  const success = type === 'success';

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4">
      <div
        role="status"
        className={`animate-fade-up pointer-events-auto flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium shadow-lg ${
          success ? 'bg-teal-800 text-white' : 'bg-rose-700 text-white'
        }`}
      >
        {success ? (
          <CheckCircleIcon className="h-5 w-5 shrink-0" />
        ) : (
          <XCircleIcon className="h-5 w-5 shrink-0" />
        )}
        {message}
      </div>
    </div>
  );
}
