import { useState, type FormEvent } from 'react';
import { CheckCircleIcon } from './icons';

const DEMO_EMAIL = 'admin@panel.ir';
const DEMO_PASSWORD = 'admin1234';

interface LoginProps {
  onLogin: (email: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState('');

  const validate = (): boolean => {
    const errors: typeof fieldErrors = {};
    const emailValue = email.trim();

    if (!emailValue) {
      errors.email = 'ایمیل یا نام کاربری را وارد کنید.';
    } else if (emailValue.includes('@') && !/^\S+@\S+\.\S+$/.test(emailValue)) {
      errors.email = 'فرمت ایمیل صحیح نیست.';
    }

    if (!password) {
      errors.password = 'رمز عبور را وارد کنید.';
    } else if (password.length < 6) {
      errors.password = 'رمز عبور باید حداقل ۶ کاراکتر باشد.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setFormError('');

    if (!validate()) return;

    if (email.trim() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      onLogin(email.trim());
    } else {
      setFormError('ایمیل یا رمز عبور اشتباه است.');
    }
  };

  const inputClass = (error?: string) =>
    `w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
      error
        ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100'
        : 'border-slate-200 focus:border-teal-600 focus:ring-teal-600/15'
    }`;

  return (
    <div className="min-h-screen bg-white lg:grid lg:grid-cols-[5fr_4fr]">
      <aside className="hidden flex-col justify-between bg-teal-950 p-12 text-teal-50 lg:flex">
        <div className="flex items-center gap-2.5">
          <img src="/favicon.svg" alt="" className="h-9 w-9" />
          <span className="text-lg font-bold">رزرواسیون</span>
        </div>

        <div>
          <h1 className="text-3xl font-bold leading-snug">
            رزروهای مجموعه‌تان را
            <br />
            یکجا مدیریت کنید
          </h1>
          <p className="mt-4 max-w-sm leading-7 text-teal-200/80">
            ثبت و پیگیری رزرو مشتریان، مشاهده آمار روزانه و مدیریت وضعیت هر نوبت، همه در یک پنل
            ساده.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-teal-100/90">
            {['ثبت سریع رزرو جدید', 'جست‌وجوی مشتریان و فیلتر وضعیت نوبت‌ها', 'گزارش آماری رزروها'].map(
              (item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <CheckCircleIcon className="h-5 w-5 shrink-0 text-teal-400" />
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>

        <p className="text-xs text-teal-200/50">مجموعه خدماتی رزرواسیون — نسخه نمایشی</p>
      </aside>

      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6 lg:min-h-0">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <img src="/favicon.svg" alt="" className="h-9 w-9" />
            <span className="text-lg font-bold text-slate-900">رزرواسیون</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900">ورود به پنل</h2>
          <p className="mt-1.5 text-sm text-slate-500">برای مدیریت رزروها وارد حساب خود شوید.</p>

          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                ایمیل یا نام کاربری
              </label>
              <input
                id="email"
                type="text"
                dir="ltr"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${inputClass(fieldErrors.email)} text-left`}
                placeholder="you@example.com"
              />
              {fieldErrors.email && (
                <p className="mt-1.5 text-xs text-rose-600">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
                رمز عبور
              </label>
              <input
                id="password"
                type="password"
                dir="ltr"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputClass(fieldErrors.password)} text-left`}
                placeholder="••••••••"
              />
              {fieldErrors.password && (
                <p className="mt-1.5 text-xs text-rose-600">{fieldErrors.password}</p>
              )}
            </div>

            {formError && (
              <div className="rounded-lg bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
                {formError}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-teal-700 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600/40"
            >
              ورود
            </button>
          </form>

          <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-white px-4 py-3 text-center text-xs leading-6 text-slate-500">
            اطلاعات ورود آزمایشی:
            <br />
            <span dir="ltr" className="font-medium text-slate-700">
              {DEMO_EMAIL} / {DEMO_PASSWORD}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
