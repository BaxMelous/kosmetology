"use client";

import React from "react";
import { REVIEWS } from "@/lib/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ArrowRight } from "lucide-react";
import { Link } from "@/components/Link";

export function ReviewsSection() {
  return (
    <section id="reviews" className="overflow-hidden bg-slate-50 py-10 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 md:mb-16 md:flex-row md:items-end md:gap-6">
          <div className="space-y-4">
            <div className="mb-6 h-px w-12 bg-[#F97316]/40 md:mb-8 md:w-16" />
            <h2 className="text-xl font-light tracking-[0.08em] text-[#1a1a2e] sm:text-2xl md:text-3xl">Отзывы наших пациентов</h2>
            <p className="text-slate-500">Мы ценим ваше доверие. Более 1000 пациентов уже оценили уровень сервиса и профессионализм врачей СитиМед Эстетика.</p>
          </div>
          <Link
            href="/reviews"
            className="group inline-flex items-center font-medium text-orange-500 transition-all duration-300 hover:text-orange-600"
          >
            Все отзывы
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="relative px-0 md:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {REVIEWS.map((review) => (
                <CarouselItem key={review.id} className="basis-full pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="flex h-full p-1">
                    <Card className="flex h-full min-h-[320px] md:min-h-[420px] w-full flex-col rounded-3xl border border-slate-100 bg-white shadow-sm">
                      <CardContent className="flex h-full flex-col justify-between p-5 md:p-10">
                        <div className="space-y-4 md:space-y-6">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-[#FF5607] text-[#FF5607]" />
                            ))}
                          </div>
                          <h3 className="text-lg md:text-xl font-medium leading-snug text-slate-800">
                            &laquo;{review.title}&raquo;
                          </h3>
                          <p className="text-sm md:text-base font-normal leading-[1.6] text-slate-400">
                            {review.text}
                          </p>
                        </div>
                        <div className="mt-5 md:mt-8 space-y-3 md:space-y-4 border-t border-slate-100 pt-5 md:pt-8">
                          <span className="inline-block rounded-full border border-slate-200/50 bg-white/40 px-2.5 md:px-3 py-1 text-[11px] md:text-xs font-medium text-slate-500 backdrop-blur-[5px]">
                            {review.services}
                          </span>
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-white text-xl font-light text-slate-500 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)]">
                              {review.author[0]}
                            </div>
                            <div>
                              <p className="mb-1 font-medium leading-none text-slate-800">{review.author}</p>
                              <p className="text-[10px] uppercase tracking-widest text-slate-400">Проверено</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-6 top-1/2 hidden h-12 w-12 -translate-y-1/2 border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:bg-orange-500 hover:text-white md:flex" />
            <CarouselNext className="absolute -right-6 top-1/2 hidden h-12 w-12 -translate-y-1/2 border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:bg-orange-500 hover:text-white md:flex" />
          </Carousel>
        </div>

        <div className="mt-12 md:mt-16">
          <p className="mb-5 text-center text-sm font-medium text-slate-400 md:mb-6">Читайте о нас на независимых площадках</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-5">
            {[
              { platform: "Яндекс Карты", rating: "4.9", reviews: "749+", href: "https://yandex.ru/maps/org/sitimed/80990739915/reviews/?ll=47.878239%2C56.631931&z=14" },
              { platform: "Докту", rating: "4.5", reviews: "110+", href: "https://doctu.ru/jjoshkar-ola/clinic/medicinskij-centr-sitimed-na-lobachevskogo/doctors" },
              { platform: "2ГИС", rating: "4.4", reviews: "735+", href: "https://2gis.ru/yoshkarola/search/%D1%81%D0%B8%D1%82%D0%B8%D0%BC%D0%B5%D0%B4%20%D0%B9%D0%BE%D1%88%D0%BA%D0%B0%D1%80%20%D0%BE%D0%BB%D0%B0/firm/70000001045728820/47.878323%2C56.631883/tab/reviews?m=47.878323%2C56.631883%2F14.41" },
            ].map((item) => (
              <a
                key={item.platform}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex cursor-pointer items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-5"
              >
                <div>
                  <p className="text-base font-semibold text-slate-800">{item.platform}</p>
                  <p className="text-xs text-slate-400">{item.reviews} отзывов</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-semibold text-slate-800">{item.rating}</div>
                  <div className="mt-0.5 flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-2.5 w-2.5 fill-[#FF5607] text-[#FF5607]" />
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
