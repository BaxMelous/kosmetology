import React from "react";
import { CONTACTS } from "@/lib/data";
import { MapPin, Phone, Clock, Bus, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ContactsSection() {
  return (
    <section id="contacts" className="bg-slate-50 py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info & Map */}
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-slate-800 md:text-5xl">Контакты</h2>
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
          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm md:p-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-slate-800">Остались вопросы?</h3>
                <p className="text-slate-500">Напишите нам, и мы свяжемся с вами в ближайшее время.</p>
              </div>

              <form action="/contacts" method="get" className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Ваше имя</Label>
                  <Input id="name" placeholder="Иван Иванов" className="rounded-2xl h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" placeholder="+7 (___) ___-__-__" className="rounded-2xl h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Сообщение</Label>
                  <Textarea id="message" placeholder="Ваш вопрос или пожелание..." className="rounded-2xl min-h-[150px]" />
                </div>
                <Button type="submit" className="h-11 w-full rounded-xl bg-orange-500 px-6 font-medium text-white transition-all duration-300 hover:bg-orange-600">
                  Отправить заявку
                  <Send className="ml-2 w-5 h-5" />
                </Button>
                <p className="text-[10px] text-slate-400 text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
