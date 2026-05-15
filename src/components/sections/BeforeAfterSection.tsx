"use client";

import React from "react";
import { Link } from "@/components/Link";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { BEFORE_AFTER_CASES } from "@/lib/data";

export function BeforeAfterSection() {
  return (
    <section className="overflow-hidden bg-slate-50 py-10 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 md:mb-16 md:flex-row md:items-end md:gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-800 sm:text-3xl md:text-5xl">
              Результаты до и после
            </h2>
            <p className="text-slate-500">
              Реальные преображения наших пациентов
            </p>
          </div>
          <Link
            href="/before-after"
            className="group inline-flex items-center font-medium text-orange-500 transition-all duration-300 hover:text-orange-600"
          >
            Все примеры
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="relative px-0 md:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              watchDrag: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {BEFORE_AFTER_CASES.map((caseItem) => (
                <CarouselItem
                  key={caseItem.id}
                  className="basis-full pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="flex h-full px-1 pb-1 pt-3">
                    <Card className="group flex w-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white pt-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                      <BeforeAfterSlider
                        beforeImage={caseItem.beforeImage}
                        afterImage={caseItem.afterImage}
                        beforeAlt={`До: ${caseItem.title}`}
                        afterAlt={`После: ${caseItem.title}`}
                      />
                      <CardContent className="flex flex-1 flex-col justify-between space-y-3 p-5 md:p-6">
                        <div className="space-y-3">
                          <span className="inline-block rounded-full bg-lime-200 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-800">
                            {caseItem.category}
                          </span>
                          <h3 className="text-lg font-semibold leading-snug text-slate-800 transition-colors group-hover:text-orange-500 md:text-xl">
                            {caseItem.title}
                          </h3>
                          <p className="line-clamp-2 text-sm leading-relaxed text-slate-500">
                            {caseItem.description}
                          </p>
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
