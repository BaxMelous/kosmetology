"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "@/components/Link";

type ModalContextType = {
  openModal: () => void;
  closeModal: () => void;
};

const ConsultationModalContext = createContext<ModalContextType>({
  openModal: () => {},
  closeModal: () => {},
});

export function useConsultationModal() {
  return useContext(ConsultationModalContext);
}

export function ConsultationModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ConsultationModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] bg-white shadow-2xl">
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
                <p className="text-sm text-slate-500">
                  Оставьте заявку, и мы перезвоним вам в течение 15 минут.
                </p>
              </div>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); closeModal(); }}>
                <div className="space-y-1.5">
                  <Label htmlFor="modal-name" className="text-xs font-medium uppercase tracking-widest text-slate-500">Ваше имя</Label>
                  <Input id="modal-name" placeholder="Введите имя" className="h-12 rounded-xl border-slate-200 bg-slate-50 focus-visible:ring-primary" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="modal-phone" className="text-xs font-medium uppercase tracking-widest text-slate-500">Телефон</Label>
                  <Input id="modal-phone" placeholder="+7 (___) ___-__-__" className="h-12 rounded-xl border-slate-200 bg-slate-50 focus-visible:ring-primary" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="modal-message" className="text-xs font-medium uppercase tracking-widest text-slate-500">Комментарий</Label>
                  <Textarea id="modal-message" placeholder="Ваш вопрос или пожелание..." className="min-h-[100px] rounded-xl border-slate-200 bg-slate-50 focus-visible:ring-primary" />
                </div>
                <Button type="submit" className="h-12 w-full rounded-xl bg-orange-500 px-6 font-medium text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/25">
                  Отправить заявку
                  <Send className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-center text-[11px] leading-relaxed text-slate-400">
                  Нажимая &laquo;Отправить&raquo;, вы даете{" "}
                  <Link href="/legal" className="underline hover:text-slate-600">согласие</Link>{" "}
                  на обработку персональных данных и соглашаетесь с{" "}
                  <Link href="/legal" className="underline hover:text-slate-600">Политикой конфиденциальности</Link>.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </ConsultationModalContext.Provider>
  );
}
