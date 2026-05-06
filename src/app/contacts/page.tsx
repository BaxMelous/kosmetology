"use client";

import { useState } from "react";
import { CONTACTS } from "@/lib/data";
import { MapPin, Phone, Bus, Send, Car, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

export default function ContactsPage() {
  const clinicPhotos = [
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&h=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&h=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&h=1200&auto=format&fit=crop",
  ];
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <div className="bg-slate-50 pt-8 md:pt-14">
      <div className="container mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
        <h1 className="mb-10 text-3xl font-semibold text-slate-800 sm:text-4xl md:mb-16 md:text-6xl">Контакты</h1>

        <div className="mb-12 grid grid-cols-1 gap-10 lg:mb-24 lg:grid-cols-2 lg:gap-20">
          {/* Left Column: Info & Form */}
          <div className="space-y-10 md:space-y-16">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8">
              <div className="space-y-2">
                <div className="grid grid-cols-[40px_1fr] items-start gap-x-3 gap-y-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="pt-2 font-bold uppercase text-xs tracking-widest text-primary">Адрес</span>
                  <div className="col-start-2">
                    <p className="text-base font-medium leading-snug text-slate-800 md:text-lg">{CONTACTS.address}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="grid grid-cols-[40px_1fr] items-start gap-x-3 gap-y-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <span className="pt-2 font-bold uppercase text-xs tracking-widest text-primary">Телефон</span>
                  <div className="col-start-2">
                    <p className="text-base font-medium text-slate-800 md:text-lg">{CONTACTS.phone}</p>
                    <p className="mt-2 text-sm text-slate-500">Ежедневно: 08:00–20:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-14">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-8">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-slate-800 md:text-3xl">Оставить заявку</h3>
                  <p className="text-slate-500">Напишите нам, и мы свяжемся с вами в течение 15 минут.</p>
                </div>

                <form action="/contacts" method="get" className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-medium uppercase tracking-widest text-slate-400">Ваше имя</Label>
                    <Input id="name" placeholder="Введите имя" className="h-14 rounded-2xl border-none bg-white pl-4 shadow-sm focus-visible:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs font-medium uppercase tracking-widest text-slate-400">Телефон</Label>
                    <Input id="phone" placeholder="+7 (___) ___-__-__" className="h-14 rounded-2xl border-none bg-white pl-4 shadow-sm focus-visible:ring-primary" />
                  </div>
                  <Button type="submit" className="h-12 w-full rounded-xl bg-orange-500 px-6 font-medium text-white transition-all duration-300 hover:bg-orange-600">
                    Отправить заявку
                    <Send className="ml-2 w-5 h-5" />
                  </Button>
                  <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                    Нажимая кнопку, вы соглашаетесь с <br /> <span className="underline cursor-pointer">политикой конфиденциальности</span>.
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column: Map & Photos */}
          <div className="space-y-6 md:space-y-8">
            {/* Map */}
            <a
              href="https://yandex.com/maps/-/CPWKaAzz"
              target="_blank"
              rel="noopener noreferrer"
              className="group/map relative flex h-[300px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[2rem] border-4 border-white shadow-md transition-all duration-300 hover:shadow-xl md:h-[450px] md:rounded-[3rem] md:border-8"
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
              <div className="absolute inset-0 bg-black/5" />
              <div className="relative z-10 flex flex-col items-center gap-4 transition-transform duration-300 group-hover/map:scale-105">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-primary shadow-2xl">
                  <MapPin className="h-8 w-8 fill-white text-white" />
                </div>
                <div className="rounded-2xl bg-white px-6 py-2 text-sm font-bold text-slate-900 shadow-xl">
                  СитиМед Эстетика
                </div>
                <span className="inline-flex items-center gap-2 rounded-xl border border-white/60 bg-white/80 px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover/map:bg-white group-hover/map:shadow-md">
                  <MapPin className="h-4 w-4 text-primary" />
                  Открыть в Яндекс Картах
                </span>
              </div>
            </a>

            {/* Photos Grid */}
            <div className="grid grid-cols-3 gap-3 md:gap-6">
              {clinicPhotos.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedPhoto(img)}
                  className="aspect-square overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-xl md:rounded-[2rem]"
                >
                  <Image
                    src={img}
                    alt="Интерьер клиники"
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Directions */}
        <div className="mx-auto max-w-4xl space-y-6 md:space-y-12">
          <h2 className="text-center text-2xl font-semibold text-slate-800 md:text-4xl">Как добраться?</h2>
          <Accordion className="space-y-4">
            <AccordionItem value="car" className="overflow-hidden rounded-3xl border-none bg-slate-50 px-4 md:rounded-[2.5rem] md:px-8">
              <AccordionTrigger className="min-h-11 py-5 hover:no-underline md:py-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                    <Car className="w-6 h-6" />
                  </div>
                  <span className="text-left text-lg font-semibold text-slate-800 md:text-xl">На автомобиле</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pl-0 text-base leading-relaxed text-slate-600 md:pb-10 md:pl-16 md:text-lg">
                Для наших пациентов есть бесплатная парковка. Въезд через шлагбаум со стороны ул. Лобачевского. 
                Пожалуйста, сообщите администратору номер вашего автомобиля при записи или по телефону.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="bus" className="overflow-hidden rounded-3xl border-none bg-slate-50 px-4 md:rounded-[2.5rem] md:px-8">
              <AccordionTrigger className="min-h-11 py-5 hover:no-underline md:py-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                    <Bus className="w-6 h-6" />
                  </div>
                  <span className="text-left text-lg font-semibold text-slate-800 md:text-xl">На общественном транспорте</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pl-0 text-base leading-relaxed text-slate-600 md:pb-10 md:pl-16 md:text-lg">
                <p className="mb-4">Остановки: «Якова Эшпая» и «Ленинский проспект».</p>
                <div className="flex flex-wrap gap-2">
                  {["24П", "21К", "18К", "20К", "М8", "М2", "3П"].map(route => (
                    <span key={route} className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-700">{route}</span>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6">
          <button
            type="button"
            onClick={() => setSelectedPhoto(null)}
            className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 p-2 text-white transition-all duration-300 hover:bg-white/30"
            aria-label="Закрыть"
          >
            <X className="h-6 w-6" />
          </button>
          <Image
            src={selectedPhoto}
            alt="Фото клиники"
            width={1200}
            height={1200}
            className="max-h-[90vh] w-auto max-w-[90vw] rounded-2xl object-contain"
          />
        </div>
      )}
    </div>
  );
}
