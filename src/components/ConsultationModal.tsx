"use client";

import { createContext, useContext, useState, useCallback, type ReactNode, type FormEvent } from "react";
import { X, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "@/components/Link";

type ModalContextType = {
  /** Открыть модальное окно. context — услуга/врач (опционально) */
  openModal: (context?: string) => void;
  closeModal: () => void;
};

const ConsultationModalContext = createContext<ModalContextType>({
  openModal: () => {},
  closeModal: () => {},
});

export function useConsultationModal() {
  return useContext(ConsultationModalContext);
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

/** Убирает из строки все цифры */
function stripDigits(value: string): string {
  return value.replace(/\d/g, "");
}

/** Оставляет только цифры и + ( ) - пробел */
function stripNonDigits(value: string): string {
  return value.replace(/[^\d+\-() ]/g, "");
}

export function ConsultationModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errors, setErrors] = useState<{ phone?: string }>({});
  /** Контекст заявки: название услуги или имя врача */
  const [context, setContext] = useState<string | undefined>(undefined);

  const openModal = (ctx?: string) => {
    setStatus("idle");
    setErrors({});
    setContext(ctx);
    setIsOpen(true);
  };

  const closeModal = useCallback(() => {
    if (status === "loading") return;
    setIsOpen(false);
    setTimeout(() => {
      setName("");
      setPhone("");
      setMessage("");
      setStatus("idle");
      setErrors({});
    }, 300);
  }, [status]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Валидация
    const newErrors: { phone?: string } = {};
    if (!phone.trim()) {
      newErrors.phone = "Укажите номер телефона";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setStatus("loading");

    try {
      const res = await fetch("/send-email.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          message: message.trim(),
          subject: context || "",
          page: window.location.href,
        }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <ConsultationModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="relative w-full max-w-md overflow-hidden rounded-card bg-white shadow-2xl">
            <button
              onClick={closeModal}
              className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700"
              aria-label="Закрыть"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6 md:p-8">
              <div className="mb-6 space-y-1">
                <h2 className="text-xl font-semibold text-slate-800 md:text-2xl">
                  Запись на консультацию
                </h2>
                {context && (
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {context}
                  </span>
                )}
                <p className="text-sm text-slate-500">
                  Оставьте заявку, и мы перезвоним вам в течение 15 минут.
                </p>
              </div>

              {status === "success" ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <CheckCircle2 className="mb-3 h-12 w-12 text-green-500" />
                  <h3 className="mb-1 text-lg font-semibold text-slate-800">Заявка отправлена!</h3>
                  <p className="text-sm text-slate-500">Мы перезвоним вам в течение 15 минут.</p>
                  <Button
                    onClick={closeModal}
                    className="mt-5 h-11 rounded-xl bg-slate-100 px-6 text-slate-700 hover:bg-slate-200"
                  >
                    Закрыть
                  </Button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-1.5">
                    <Label htmlFor="modal-name" className="text-xs font-medium uppercase tracking-widest text-slate-500">Ваше имя</Label>
                    <Input
                      id="modal-name"
                      value={name}
                      onChange={(e) => setName(stripDigits(e.target.value))}
                      placeholder="Введите имя"
                      className="h-12 rounded-xl border-slate-200 bg-slate-50 focus-visible:ring-primary"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="modal-phone" className="text-xs font-medium uppercase tracking-widest text-slate-500">Телефон *</Label>
                    <Input
                      id="modal-phone"
                      value={phone}
                      onChange={(e) => { setPhone(stripNonDigits(e.target.value)); setErrors((prev) => ({ ...prev, phone: undefined })); }}
                      placeholder="+7 (___) ___-__-__"
                      className={errors.phone ? "h-12 rounded-xl border-red-300 bg-red-50 focus-visible:ring-red-400" : "h-12 rounded-xl border-slate-200 bg-slate-50 focus-visible:ring-primary"}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500">{errors.phone}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="modal-message" className="text-xs font-medium uppercase tracking-widest text-slate-500">Комментарий</Label>
                    <Textarea
                      id="modal-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ваш вопрос или пожелание..."
                      className="min-h-[100px] rounded-xl border-slate-200 bg-slate-50 focus-visible:ring-primary"
                    />
                  </div>

                  {status === "error" && (
                    <p className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      Ошибка отправки. Пожалуйста, попробуйте ещё раз или позвоните нам.
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="h-12 w-full rounded-xl bg-primary px-6 font-medium text-white transition-all duration-300 hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/25 disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      <>
                        Отправить заявку
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                  <p className="text-center text-[11px] leading-relaxed text-slate-400">
                    Нажимая &laquo;Отправить&raquo;, вы даете{" "}
                    <Link href="/documents/Согласие на обработку персональных данных.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600">согласие</Link>{" "}
                    на обработку персональных данных и соглашаетесь с{" "}
                    <Link href="/documents/Политика по обработке персональных данных.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600">Политикой конфиденциальности</Link>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </ConsultationModalContext.Provider>
  );
}
