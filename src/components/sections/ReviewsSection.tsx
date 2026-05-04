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

export function ReviewsSection() {
  return (
    <section id="reviews" className="overflow-hidden bg-slate-50 py-10 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 space-y-3 text-center md:mb-16 md:space-y-4">
          <h2 className="text-2xl font-semibold text-slate-800 sm:text-3xl md:text-5xl">Отзывы наших пациентов</h2>
          <p className="text-slate-500">Ваше доверие — наша главная награда.</p>
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
                    <Card className="flex h-full min-h-[380px] w-full flex-col rounded-3xl border border-slate-100 bg-white shadow-sm">
                      <CardContent className="flex h-full flex-col justify-between p-6 md:p-10">
                        <div className="space-y-6">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                            ))}
                          </div>
                          <p className="line-clamp-6 text-base font-normal italic leading-relaxed text-slate-500 md:text-lg">
                            &laquo;{review.text}&raquo;
                          </p>
                        </div>
                        <div className="mt-8 pt-8 border-t border-slate-100 flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-xl font-semibold text-orange-500">
                            {review.author[0]}
                          </div>
                          <span className="font-medium text-slate-800">{review.author}</span>
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
      </div>
    </section>
  );
}
