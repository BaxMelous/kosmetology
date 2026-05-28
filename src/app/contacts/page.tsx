"use client";

import { useState } from "react";
import { CONTACTS } from "@/lib/data";
import { MapPin, Phone, Bus, Send, Car, X } from "lucide-react";
import { Link } from "@/components/Link";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PageHero } from "@/components/PageHero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

export default function ContactsPage() {
  const clinicPhotos = [
    "/Contacts_1.webp",
    "/Contacts_2.webp",
    "/Contacts_3.webp",
  ];
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <div className="bg-slate-50 pb-10 md:pb-20">
      <PageHero
        title="Мы всегда на связи"
        subtitle="Приезжайте в клинику или напишите нам — мы ответим на все вопросы и поможем подобрать удобное время для визита."
        videoSrc="/video/hero-contacts.mp4"
        videoFilter="none"
      />

      <ScrollReveal>
        <div className="container mx-auto max-w-7xl px-4 pt-6 md:px-8 md:pt-10">
          <div className="mb-12 grid grid-cols-1 gap-10 lg:mb-24 lg:grid-cols-2 lg:gap-20">

            {/* Left Column: Info & Form */}
            <div className="space-y-8 md:space-y-12">

              {/* Glass Info Cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/60 bg-white/50 p-5 backdrop-blur-lg md:p-6">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#F97316]/10 text-[#F97316]">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <p className="mb-1 text-[10px] font-light uppercase tracking-[0.15em] text-[#F97316]">Адрес</p>
                  <p className="text-sm font-light leading-relaxed text-[#1a1a2e] md:text-base">
                    {CONTACTS.address}
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/60 bg-white/50 p-5 backdrop-blur-lg md:p-6">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#F97316]/10 text-[#F97316]">
                    <Phone className="h-4 w-4" />
                  </div>
                  <p className="mb-1 text-[10px] font-light uppercase tracking-[0.15em] text-[#F97316]">Телефон</p>
                  <p className="text-sm font-light text-[#1a1a2e] md:text-base">{CONTACTS.phone}</p>
                  <p className="mt-1.5 text-xs font-light text-[#888]">Ежедневно: 08:00–20:00</p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-7 md:p-10">
                <div className="mb-8 space-y-1.5">
                  <h3 className="text-xl font-light tracking-[0.04em] text-[#1a1a2e] md:text-2xl">
                    Остались вопросы? Напишите нам
                  </h3>
                  <p className="text-sm font-light text-[#888]">
                    Мы свяжемся с вами в течение 15 минут.
                  </p>
                </div>

                <form action="/contacts" method="get" className="space-y-6">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-[10px] font-light uppercase tracking-[0.15em] text-[#888]">
                      Ваше имя
                    </label>
                    <input
                      id="name"
                      placeholder="Введите имя"
                      className="w-full border-b border-slate-200 bg-transparent py-3 text-sm font-light text-[#1a1a2e] placeholder:text-slate-300 transition-colors duration-300 focus:border-[#F97316] focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-[10px] font-light uppercase tracking-[0.15em] text-[#888]">
                      Телефон
                    </label>
                    <input
                      id="phone"
                      placeholder="+7 (___) ___-__-__"
                      className="w-full border-b border-slate-200 bg-transparent py-3 text-sm font-light text-[#1a1a2e] placeholder:text-slate-300 transition-colors duration-300 focus:border-[#F97316] focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-[10px] font-light uppercase tracking-[0.15em] text-[#888]">
                      Сообщение
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Ваш вопрос или пожелание..."
                      className="w-full resize-none border-b border-slate-200 bg-transparent py-3 text-sm font-light text-[#1a1a2e] placeholder:text-slate-300 transition-colors duration-300 focus:border-[#F97316] focus:outline-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="h-11 w-full rounded-xl bg-[#F97316] px-6 text-sm font-light tracking-[0.04em] text-white transition-all duration-300 hover:bg-[#F97316]/90 hover:shadow-lg hover:shadow-[#F97316]/15"
                  >
                    Отправить заявку
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-center text-[11px] font-light leading-relaxed text-[#888]">
                    Нажимая «Отправить», вы даете{" "}
                    <Link href="/legal" className="underline transition-colors hover:text-[#1a1a2e]">согласие</Link>{" "}
                    на обработку персональных данных и соглашаетесь с{" "}
                    <Link href="/legal" className="underline transition-colors hover:text-[#1a1a2e]">Политикой конфиденциальности</Link>.
                  </p>
                </form>
              </div>
            </div>

            {/* Right Column: Map & Photos */}
            <div className="space-y-6 md:space-y-8">
              {/* Map */}
              <a
                href="https://yandex.com/maps/-/CPWKaAzz"
                target="_blank"
                rel="noopener noreferrer"
                className="group/map relative flex h-[320px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 hover:shadow-[0_30px_65px_rgba(0,0,0,0.1)] md:h-[420px]"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url('https://static-maps.yandex.ru/1.x/?ll=47.8784,56.6319&z=16&size=650,450&l=map&pt=47.8784,56.6319,pm2rdl&lang=ru_RU')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute inset-0 bg-black/5 transition-colors duration-300 group-hover/map:bg-black/0" />
                <div className="relative z-10 flex flex-col items-center gap-3 transition-transform duration-500 group-hover/map:scale-105">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-3 border-white bg-[#F97316] shadow-xl">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/60 bg-white/80 px-4 py-2 text-sm font-light tracking-[0.03em] text-[#1a1a2e] backdrop-blur-sm transition-all duration-300 group-hover/map:bg-white group-hover/map:shadow-lg">
                    <MapPin className="h-4 w-4 text-[#F97316]" />
                    Открыть в Яндекс Картах
                  </span>
                </div>
              </a>

              {/* Photos Grid */}
              <div className="grid grid-cols-3 gap-3 md:gap-5">
                {clinicPhotos.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedPhoto(img)}
                    className="group/photo aspect-square overflow-hidden rounded-[1.25rem] md:rounded-[1.75rem]"
                  >
                    <Image
                      src={img}
                      alt="Фото клиники СитиМед"
                      width={400}
                      height={400}
                      unoptimized
                      className="h-full w-full object-cover transition-transform duration-500 group-hover/photo:scale-110"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Directions */}
          <div className="mx-auto max-w-4xl space-y-8 md:space-y-12">
            <div className="text-center">
              <div className="mx-auto mb-6 h-px w-12 bg-[#F97316]/40 md:w-16" />
              <h2 className="text-2xl font-light tracking-[0.04em] text-[#1a1a2e] md:text-4xl">
                Как добраться?
              </h2>
            </div>
            <Accordion className="space-y-3">
              <AccordionItem value="car" className="overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white px-5 md:rounded-[2rem] md:px-7">
                <AccordionTrigger className="min-h-11 py-5 hover:no-underline md:py-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F97316]/10 text-[#F97316] md:h-11 md:w-11">
                      <Car className="h-5 w-5" />
                    </div>
                    <span className="text-left text-base font-light tracking-[0.03em] text-[#1a1a2e] md:text-lg">
                      На автомобиле
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-5 pl-0 text-sm font-light leading-relaxed text-[#888] md:pb-8 md:pl-14 md:text-base">
                  Для пациентов предусмотрена бесплатная парковка.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="bus" className="overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white px-5 md:rounded-[2rem] md:px-7">
                <AccordionTrigger className="min-h-11 py-5 hover:no-underline md:py-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F97316]/10 text-[#F97316] md:h-11 md:w-11">
                      <Bus className="h-5 w-5" />
                    </div>
                    <span className="text-left text-base font-light tracking-[0.03em] text-[#1a1a2e] md:text-lg">
                      На общественном транспорте
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-5 pl-0 text-sm font-light leading-relaxed text-[#888] md:pb-8 md:pl-14 md:text-base">
                  <p className="mb-4">Остановки: «Якова Эшпая» и «Ленинский проспект».</p>
                  <div className="flex flex-wrap gap-2">
                    {["24П", "21К", "18К", "20К", "М8", "М2", "3П"].map(route => (
                      <span key={route} className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-light text-[#1a1a2e]">
                        {route}
                      </span>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Social Media */}
          <div className="mx-auto mt-14 max-w-4xl text-center md:mt-20">
            <div className="rounded-[2rem] border border-slate-100 bg-white px-6 py-10 md:px-12 md:py-14">
              <p className="text-base font-light tracking-[0.04em] text-[#1a1a2e] md:text-lg">
                Мы в социальных сетях
              </p>
              <div className="mt-6 flex items-center justify-center gap-4">
                {[
                  { href: "https://vk.ru/citymed_estetic", icon: "/VK%20Logo.svg", alt: "VK" },
                  { href: "https://t.me/citymed_12", icon: "/Form%3DRounded%20square-2.svg", alt: "TG" },
                  { href: "https://max.ru/citimed", icon: "/Form%3DRounded%20square.svg", alt: "MAX" },
                ].map((s) => (
                  <a
                    key={s.alt}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:border-[#F97316]/40 hover:bg-[#F97316]/5"
                    aria-label={s.alt}
                  >
                    <img
                      src={s.icon}
                      alt={s.alt}
                      className="h-5 w-5 opacity-40 transition-all duration-300 group-hover:opacity-100"
                    />
                  </a>
                ))}
              </div>
              <p className="mt-5 text-xs font-light text-[#888]">
                Подписывайтесь — публикуем акции, советы косметолога и отзывы пациентов
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

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
