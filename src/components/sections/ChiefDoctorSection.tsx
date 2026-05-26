"use client";

import React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";

export function ChiefDoctorSection() {
  return (
    <section className="relative overflow-hidden bg-white py-14 md:py-28">
      {/* Фоновый декор — бледные абстрактные пятна */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-orange-100/30 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-lime-100/20 blur-[100px]" />
        <div className="absolute top-1/2 left-1/3 h-[300px] w-[300px] rounded-full bg-amber-50/30 blur-[80px]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Текст */}
          <div className="space-y-6 text-left md:text-left md:space-y-7">
            {/* Иконка кавычек */}
            <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100/50 text-orange-400 md:h-12 md:w-12">
              <Quote className="h-5 w-5 md:h-6 md:w-6" />
            </div>

            {/* Заголовок */}
            <div>
              <div className="mb-6 h-px w-12 bg-[#F97316]/40 md:mb-8 md:w-16" />
              <h2 className="text-xl font-light tracking-[0.08em] text-[#1a1a2e] sm:text-2xl md:text-3xl">
                Дорогие наши пациенты!
              </h2>
            </div>

            {/* Абзац 1 */}
            <p className="text-sm font-light leading-[1.7] tracking-[0.02em] text-[#666] sm:text-base">
              Зачастую мы откладываем свой визит к косметологу на многие годы
              по каким-либо причинам. Кто-то из-за стеснения, кто-то из-за
              страха боли и последствий, кто-то из-за ложных представлений
              о стоимости косметологических процедур.
            </p>

            {/* Ключевая цитата */}
            <blockquote className="border-l-2 border-[#F97316]/30 pl-5 text-base font-light italic leading-[1.7] tracking-[0.02em] text-[#F97316] sm:text-lg md:pl-6 md:text-xl">
              Современная косметология в умелых руках — это безболезненно, безопасно и без лишних навязанных процедур.
            </blockquote>

            {/* Абзац 2 */}
            <p className="text-sm font-light leading-[1.7] tracking-[0.02em] text-[#666] sm:text-base">
              За многие годы практики мы научились грамотно подходить к запросу
              каждого пациента, не изменяя его индивидуальных особенностей.
              В своей работе мы прекрасно совмещаем аппаратные и инъекционные
              методы, которые зачастую не требуют длительной реабилитации.
            </p>

            {/* Призыв */}
            <div className="pt-3 md:pt-4">
              <p className="text-base font-light leading-[1.7] tracking-[0.02em] text-[#1a1a2e] sm:text-lg">
                Будем рады видеть Вас в нашем косметологическом центре!
              </p>
              <p className="mt-2 text-sm font-light leading-[1.7] tracking-[0.02em] text-[#888] sm:text-base">
                Мы поможем Вам сохранить здоровье кожи и Вашу несравненную
                красоту на долгие годы!
              </p>
            </div>

            {/* Подпись */}
            <div className="pt-6 md:pt-8">
              <div className="flex items-center gap-5">
                <div className="hidden h-px flex-1 bg-slate-200 md:block" />
                <div className="text-left">
                  <p className="font-serif text-xl italic tracking-[0.02em] text-[#1a1a2e] md:text-2xl">
                    Бахтина М.А.
                  </p>
                  <p className="mt-1 text-xs font-light tracking-[0.06em] text-[#aaa]">
                    Главный врач, дерматовенеролог, косметолог
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Портрет — книжная ориентация, по центру, скрыт на мобильных */}
          <div className="relative hidden md:block">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.06)] lg:max-w-lg">
              <Image
                src="/doctors/bakhtina.webp"
                alt="Бахтина Марина Александровна — главный врач"
                fill
                quality={90}
                unoptimized
                className="object-cover"
                sizes="(min-width: 1024px) 32rem, 28rem"
              />
              <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-black/[0.04]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

