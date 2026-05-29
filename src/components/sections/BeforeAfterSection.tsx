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
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { BEFORE_AFTER_CASES } from "@/lib/data";

export function BeforeAfterSection() {
  return (
    <section className="overflow-hidden py-10 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 md:mb-16 md:flex-row md:items-center md:gap-6">
          <div className="space-y-4">
            <div className="mb-6 h-px w-12 bg-[#F97316]/40 md:mb-8 md:w-16" />
            <h2 className="text-xl font-light tracking-[0.08em] text-[#1a1a2e] sm:text-2xl md:text-3xl">
              Результаты до и после
            </h2>
            <p className="max-w-lg text-sm font-light leading-[1.6] tracking-[0.02em] text-[#888] sm:text-base">
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
                    <article className="group flex w-full flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white transition-all duration-300 hover:-translate-y-0.5">
                      <BeforeAfterSlider
                        beforeImage={caseItem.beforeImage}
                        afterImage={caseItem.afterImage}
                        beforeAlt={`До: ${caseItem.title}`}
                        afterAlt={`После: ${caseItem.title}`}
                      />
                      <div className="flex flex-1 flex-col space-y-3 p-5 md:p-6">
                        <span className="inline-block w-fit rounded-full bg-lime-200/60 px-3 py-1 text-[10px] font-light uppercase tracking-[0.12em] text-lime-800 backdrop-blur-sm">
                          {caseItem.category}
                        </span>
                        <h3 className="text-lg font-medium leading-snug text-[#1a1a2e] transition-colors duration-300 group-hover:text-[#F97316] md:text-xl">
                          {caseItem.title}
                        </h3>
                        <p className="line-clamp-2 text-sm font-light leading-relaxed text-[#888]">
                          {caseItem.description}
                        </p>
                      </div>
                    </article>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 border border-slate-100 bg-white transition-all duration-300 hover:bg-orange-500 hover:text-white md:-left-6 md:h-12 md:w-12" />
            <CarouselNext className="absolute -right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 border border-slate-100 bg-white transition-all duration-300 hover:bg-orange-500 hover:text-white md:-right-6 md:h-12 md:w-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
