"use client";

import React, { useState, type FormEvent } from "react";
import { CONTACTS } from "@/lib/data";
import { MapPin, Phone, Clock, Bus, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "@/components/Link";
import { formatPhone, isPhoneComplete } from "@/lib/utils";

/** Убирает из строки все цифры */
function stripDigits(value: string): string {
  return value.replace(/\d/g, "");
}

export function ContactsSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ phone?: string }>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors: { phone?: string } = {};
    if (!phone.trim()) {
      newErrors.phone = "Укажите номер телефона";
    } else if (!isPhoneComplete(phone)) {
      newErrors.phone = "Введите номер полностью";
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
          subject: "",
          page: window.location.href,
        }),
      });

      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };
  return (
    <section id="contacts" className="bg-slate-50 py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info & Map */}
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-xl font-light tracking-[0.08em] text-[#1a1a2e] sm:text-2xl md:text-3xl">Контакты</h2>
              <p className="text-slate-500">Мы всегда рады видеть вас в нашей клинике.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Адрес</p>
                  <p className="text-slate-600">{CONTACTS.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Телефон</p>
                  <p className="text-slate-600">{CONTACTS.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Режим работы</p>
                  <p className="text-slate-600">{CONTACTS.workingHours.weekdays}</p>
                  <p className="text-slate-600">{CONTACTS.workingHours.saturday}</p>
                  <p className="text-slate-600">{CONTACTS.workingHours.sunday}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
                  <Bus className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Как добраться</p>
                  <p className="text-sm text-slate-600">Остановки: {CONTACTS.stops}</p>
                  <p className="text-sm text-slate-600">Маршруты: {CONTACTS.routes}</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <a
              href="https://yandex.com/maps/-/CPWKaAzz"
              target="_blank"
              rel="noopener noreferrer"
              className="group/map relative flex h-[300px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-[2.5rem] shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              <div
                className="absolute -inset-2 bg-slate-300"
                style={{
                  backgroundImage: `url('https://static-maps.yandex.ru/1.x/?ll=47.8784,56.6319&z=16&size=650,450&l=map&pt=47.8784,56.6319,pm2rdl&lang=ru_RU')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(4px)",
                }}
              />
              <div className="absolute inset-0 bg-black/10 transition-colors group-hover/map:bg-black/5" />
              <div className="relative z-10 flex flex-col items-center gap-4 transition-transform duration-300 group-hover/map:scale-105">
                <MapPin className="h-12 w-12 text-white drop-shadow-lg transition-colors group-hover/map:text-primary" />
                <span className="rounded-xl bg-white/80 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover/map:bg-white group-hover/map:shadow-md">
                  Открыть в Яндекс Картах
                </span>
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <div className="rounded-card border border-slate-100 bg-white p-8 shadow-sm md:p-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-slate-800">Остались вопросы?</h3>
                <p className="text-slate-500">Напишите нам, и мы свяжемся с вами в ближайшее время.</p>
              </div>

              {status === "success" ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <CheckCircle2 className="mb-3 h-12 w-12 text-green-500" />
                  <h3 className="mb-1 text-lg font-semibold text-slate-800">Сообщение отправлено!</h3>
                  <p className="text-sm text-slate-500">Мы свяжемся с вами в ближайшее время.</p>
                  <Button
                    onClick={() => setStatus("idle")}
                    className="mt-5 h-11 rounded-xl bg-slate-100 px-6 text-slate-700 hover:bg-slate-200"
                  >
                    Отправить ещё заявку
                  </Button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="contacts-name">Ваше имя</Label>
                    <Input
                      id="contacts-name"
                      value={name}
                      onChange={(e) => setName(stripDigits(e.target.value))}
                      placeholder="Иван Иванов"
                      className="rounded-2xl h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contacts-phone">Телефон *</Label>
                    <Input
                      id="contacts-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => { setPhone(formatPhone(e.target.value)); setErrors((prev) => ({ ...prev, phone: undefined })); }}
                      onFocus={(e) => { if (!e.target.value) setPhone("+7"); }}
                      placeholder="+7(XXX)XXX-XX-XX"
                      className={errors.phone ? "rounded-2xl h-12 border-red-300 bg-red-50" : "rounded-2xl h-12"}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500">{errors.phone}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contacts-message">Сообщение</Label>
                    <Textarea
                      id="contacts-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ваш вопрос или пожелание..."
                      className="rounded-2xl min-h-[150px]"
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
                    className="h-11 w-full rounded-xl bg-primary px-6 font-medium text-white transition-all duration-300 hover:bg-primary-hover disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      <>
                        Отправить заявку
                        <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-slate-400 text-center leading-relaxed">
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
      </div>
    </section>
  );
}
