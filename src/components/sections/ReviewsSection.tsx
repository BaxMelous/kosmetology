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
import { Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ReviewsSection() {
  return (
    <section id="reviews" className="overflow-hidden bg-slate-50 py-10 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 space-y-3 text-center md:mb-16 md:space-y-4">
          <h2 className="text-2xl font-semibold text-slate-800 sm:text-3xl md:text-5xl">Отзывы наших пациентов</h2>
          <p className="text-slate-500">Мы ценим ваше доверие. Более 1000 пациентов уже оценили уровень сервиса и профессионализм врачей СитиМед Эстетика.</p>
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
                              <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-secondary text-secondary" />
                            ))}
                          </div>
                          <h3 className="text-lg md:text-xl font-semibold leading-snug text-slate-800">
                            &laquo;{review.title}&raquo;
                          </h3>
                          <p className="text-sm md:text-lg font-normal leading-relaxed text-slate-500">
                            {review.text}
                          </p>
                        </div>
                        <div className="mt-5 md:mt-8 space-y-3 md:space-y-4 border-t border-slate-100 pt-5 md:pt-8">
                          <span className="inline-block rounded-full bg-slate-100 px-2.5 md:px-3 py-1 text-[11px] md:text-xs font-medium text-slate-600">
                            {review.services}
                          </span>
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-xl font-semibold text-orange-500">
                              {review.author[0]}
                            </div>
                            <span className="font-medium text-slate-800">{review.author}</span>
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

        <div className="mt-12 flex flex-col items-center gap-6 md:mt-16">
          <Link href="/reviews">
            <Button className="h-11 rounded-xl bg-orange-500 px-6 font-medium text-white transition-all duration-300 hover:bg-orange-600">
              Оставить отзыв
            </Button>
          </Link>
          <div className="text-center">
            <p className="text-sm font-medium text-slate-500">Читайте о нас на независимых площадках</p>
            <div className="mt-3 flex items-center justify-center gap-6">
              <a href="https://doctu.ru/jjoshkar-ola/clinic/medicinskij-centr-sitimed-na-lobachevskogo/doctors" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#00A8E1] transition-colors hover:underline">Докту</a>
              <a href="https://yandex.ru/maps/org/sitimed/80990739915/reviews/?ll=47.878239%2C56.631931&z=14" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#FFCC00] transition-colors hover:underline">Яндекс Карты</a>
              <a href="https://2gis.ru/yoshkarola/search/%D1%81%D0%B8%D1%82%D0%B8%D0%BC%D0%B5%D0%B4%20%D0%B9%D0%BE%D1%88%D0%BA%D0%B0%D1%80%20%D0%BE%D0%BB%D0%B0/firm/70000001045728820/47.878323%2C56.631883/tab/reviews?m=47.878323%2C56.631883%2F14.41" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#6ABC25] transition-colors hover:underline">2ГИС</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
