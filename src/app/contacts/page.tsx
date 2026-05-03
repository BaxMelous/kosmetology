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
    <div className="bg-slate-50 pt-14">
      <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8">
        <h1 className="mb-16 text-4xl font-semibold text-slate-800 md:text-6xl">Контакты</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24">
          {/* Left Column: Info & Form */}
          <div className="space-y-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <div className="mb-2 flex items-start gap-3 text-primary">
                   <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                   </div>
                   <span className="font-bold uppercase text-xs tracking-widest">Адрес</span>
                </div>
                <p className="text-lg font-medium leading-snug text-slate-800">{CONTACTS.address}</p>
              </div>

              <div className="space-y-2">
                <div className="mb-2 flex items-start gap-3 text-primary">
                   <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                   </div>
                   <span className="font-bold uppercase text-xs tracking-widest">Телефон</span>
                </div>
                <p className="text-lg font-medium text-slate-800">{CONTACTS.phone}</p>
                <p className="text-sm text-slate-500">Ежедневно: 08:00–20:00</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-10 shadow-sm md:p-14">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-semibold text-slate-800">Остались вопросы?</h3>
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
                  <Button type="submit" className="h-11 w-full rounded-xl bg-orange-500 px-6 font-medium text-white transition-all duration-300 hover:bg-orange-600">
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
          <div className="space-y-8">
            {/* Map Placeholder */}
            <div className="h-[450px] bg-lime-200 rounded-[3rem] relative overflow-hidden flex flex-col items-center justify-center group shadow-md border-8 border-white">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
              <div className="relative z-10 flex flex-col items-center animate-bounce">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                  <MapPin className="w-8 h-8 text-white fill-white" />
                </div>
                <div className="mt-4 bg-white px-6 py-2 rounded-2xl shadow-xl font-bold text-slate-900 text-sm">СитиМед Эстетика</div>
              </div>
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-3 gap-6">
              {clinicPhotos.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedPhoto(img)}
                  className="aspect-square overflow-hidden rounded-[2rem] shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
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
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-center text-4xl font-semibold text-slate-800">Как добраться?</h2>
          <Accordion className="space-y-4">
            <AccordionItem value="car" className="bg-slate-50 border-none rounded-[2.5rem] px-8 overflow-hidden">
              <AccordionTrigger className="hover:no-underline py-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                    <Car className="w-6 h-6" />
                  </div>
                  <span className="text-left text-xl font-semibold text-slate-800">На автомобиле</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-10 text-lg text-slate-600 leading-relaxed pl-16">
                Для наших пациентов есть бесплатная парковка. Въезд через шлагбаум со стороны ул. Лобачевского. 
                Пожалуйста, сообщите администратору номер вашего автомобиля при записи или по телефону.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="bus" className="bg-slate-50 border-none rounded-[2.5rem] px-8 overflow-hidden">
              <AccordionTrigger className="hover:no-underline py-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                    <Bus className="w-6 h-6" />
                  </div>
                  <span className="text-left text-xl font-semibold text-slate-800">На общественном транспорте</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-10 text-lg text-slate-600 leading-relaxed pl-16">
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
            className="absolute right-6 top-6 rounded-full bg-white/20 p-2 text-white transition-all duration-300 hover:bg-white/30"
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
