import { useState, type SubmitEvent, type ReactNode } from "react";
import { DatePicker } from "react-persian-range-picker";
import type { Reservation } from "../types";
import { SERVICES } from "../data/reservations";
import { todayISO } from "../utils/format";
import Modal from "./Modal";

interface FormState {
   customerName: string;
   phone: string;
   service: string;
   date: string;
   time: string;
   note: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = {
   customerName: "",
   phone: "",
   service: "",
   date: "",
   time: "",
   note: "",
};

function validate(form: FormState): FormErrors {
   const errors: FormErrors = {};

   if (form.customerName.trim().length < 3) {
      errors.customerName = "نام و نام خانوادگی مشتری را وارد کنید.";
   }
   if (!/^09\d{9}$/.test(form.phone.trim())) {
      errors.phone = "شماره تماس معتبر نیست. مثال: 09123456789";
   }
   if (!form.service) {
      errors.service = "نوع خدمت را انتخاب کنید.";
   }
   if (!form.date) {
      errors.date = "تاریخ رزرو را انتخاب کنید.";
   } else if (form.date < todayISO()) {
      errors.date = "تاریخ رزرو نمی‌تواند در گذشته باشد.";
   }
   if (!form.time) {
      errors.time = "ساعت رزرو را انتخاب کنید.";
   }

   return errors;
}

function Field({
   label,
   htmlFor,
   error,
   children,
}: {
   label: string;
   htmlFor: string;
   error?: string;
   children: ReactNode;
}) {
   return (
      <div>
         <label
            htmlFor={htmlFor}
            className="mb-1.5 block text-sm font-medium text-slate-700"
         >
            {label} <span className="text-rose-500">*</span>
         </label>
         {children}
         {error && <p className="mt-1.5 text-xs text-rose-600">{error}</p>}
      </div>
   );
}

interface ReservationFormModalProps {
   onClose: () => void;
   onSubmit: (reservation: Reservation) => void;
}

export default function ReservationFormModal({
   onClose,
   onSubmit,
}: ReservationFormModalProps) {
   const [form, setForm] = useState<FormState>(EMPTY_FORM);
   const [errors, setErrors] = useState<FormErrors>({});

   const setField = (field: keyof FormState, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
   };

   const handleSubmit = (event: SubmitEvent) => {
      event.preventDefault();

      const nextErrors = validate(form);
      setErrors(nextErrors);
      if (Object.values(nextErrors).some(Boolean)) return;

      onSubmit({
         id: `r-${Date.now()}`,
         customerName: form.customerName.trim(),
         phone: form.phone.trim(),
         service: form.service,
         date: form.date,
         time: form.time,
         status: "pending",
         note: form.note.trim() || undefined,
      });
   };

   const inputClass = (error?: string) =>
      `w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
         error
            ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
            : "border-slate-200 focus:border-teal-600 focus:ring-teal-600/15"
      }`;

   // تبدیل timestamp خروجی دیت‌پیکر به رشته ISO
   const handleDateChange = (value: number | string | null) => {
      if (value === null) {
         setField("date", "");
         return;
      }
      // خروجی به صورت timestamp است
      const dateObj = new Date(value);
      const iso = dateObj.toISOString().split("T")[0];
      setField("date", iso);
   };

   return (
      <Modal title="ثبت رزرو جدید" onClose={onClose}>
         <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <Field
               label="نام و نام خانوادگی"
               htmlFor="customerName"
               error={errors.customerName}
            >
               <input
                  id="customerName"
                  type="text"
                  value={form.customerName}
                  onChange={(e) => setField("customerName", e.target.value)}
                  className={inputClass(errors.customerName)}
                  placeholder="مثلاً: فاطمه احمدی"
               />
            </Field>

            <Field label="شماره تماس" htmlFor="phone" error={errors.phone}>
               <input
                  id="phone"
                  type="tel"
                  dir="ltr"
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  className={`${inputClass(errors.phone)} text-left`}
                  placeholder="09xxxxxxxxx"
               />
            </Field>

            <Field label="نوع خدمت" htmlFor="service" error={errors.service}>
               <select
                  id="service"
                  value={form.service}
                  onChange={(e) => setField("service", e.target.value)}
                  className={`${inputClass(errors.service)} ${form.service ? "" : "text-slate-400"}`}
               >
                  <option value="" disabled>
                     انتخاب کنید...
                  </option>
                  {SERVICES.map((service) => (
                     <option key={service} value={service}>
                        {service}
                     </option>
                  ))}
               </select>
            </Field>

            <div className="grid grid-cols-2 gap-3">
               <Field label="تاریخ رزرو" htmlFor="date" error={errors.date}>
                  <DatePicker
                     calendarType="jalali"
                     exportType="timeStamp"
                     value={form.date ? new Date(form.date).getTime() : null}
                     onChange={handleDateChange}
                     placeholder="انتخاب تاریخ"
                     primaryColor="#0f766e"
                     highlightColor="#fff"
                     className="min-h-10.5 w-full! rounded-lg! border! bg-white! px-3.5! py-2.5! text-sm! text-slate-900! outline-none! transition! placeholder:text-slate-400! focus:ring-2! border-slate-200! focus:border-teal-600! focus:ring-teal-600/15!"
                  />
               </Field>

               <Field label="ساعت رزرو" htmlFor="time" error={errors.time}>
                  <input
                     id="time"
                     type="time"
                     value={form.time}
                     onChange={(e) => setField("time", e.target.value)}
                     className={inputClass(errors.time)}
                  />
               </Field>
            </div>

            <div>
               <label
                  htmlFor="note"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
               >
                  توضیحات{" "}
                  <span className="text-xs font-normal text-slate-400">(اختیاری)</span>
               </label>
               <textarea
                  id="note"
                  rows={2}
                  value={form.note}
                  onChange={(e) => setField("note", e.target.value)}
                  className={`${inputClass()} resize-none`}
                  placeholder="اگر نکته‌ای درباره رزرو هست، اینجا بنویسید."
               />
            </div>

            <div className="flex gap-3 pt-1">
               <button
                  type="submit"
                  className="flex-1 rounded-lg bg-teal-700 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600/40"
               >
                  ثبت رزرو
               </button>
               <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
               >
                  انصراف
               </button>
            </div>
         </form>
      </Modal>
   );
}
