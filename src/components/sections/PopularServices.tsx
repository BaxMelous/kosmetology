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
import { Button } from "@/components/ui/button";
import { useConsultationModal } from "@/components/ConsultationModal";
import type { Service } from "@/lib/data";

type PopularService = Service & {
  category: string;
};

type PopularServicesProps = {
  services: PopularService[];
};

export function PopularServices({ services }: PopularServicesProps) {
  const { openModal } = useConsultationModal();

  return (
    <section className="overflow-hidden bg-white py-10 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 md:mb-16 md:flex-row md:items-center md:gap-6">
          <div className="space-y-4">
            <div className="mb-6 h-px w-12 bg-[#F97316]/40 md:mb-8 md:w-16" />
            <h2 className="text-xl font-light tracking-[0.08em] text-[#1a1a2e] sm:text-2xl md:text-3xl">Популярные услуги</h2>
            <p className="max-w-lg text-sm font-light leading-[1.6] tracking-[0.02em] text-[#888] sm:text-base">Что выбирают наши клиенты</p>
          </div>
          <Link
            href="/prices"
            className="group inline-flex items-center font-light tracking-[0.04em] text-[#F97316] transition-all duration-300 hover:text-[#F97316]/70"
          >
            Все услуги и цены
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="relative px-0 md:px-14">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {services.map((service, index) => (
                <CarouselItem key={index} className="basis-full pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="flex h-full px-1 pb-1 pt-3">
                    <article className="group flex w-full flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white transition-all duration-500 hover:-translate-y-1">

                      <div className="flex flex-1 flex-col p-8 md:p-10">
                        {/* Бейдж — glassmorphism */}
                        <span className="mb-4 inline-block w-fit rounded-full bg-lime-200/60 px-3 py-1 text-[10px] font-light uppercase tracking-[0.12em] text-lime-800 backdrop-blur-sm">
                          {service.category}
                        </span>

                        {/* Название */}
                        <h3 className="mb-4 text-xl font-medium leading-snug text-[#1a1a2e] transition-colors duration-300 group-hover:text-[#F97316] md:text-2xl">
                          {service.name}
                        </h3>

                        {/* Описание */}
                        <p className="line-clamp-3 text-sm font-light leading-[1.6] text-[#888] md:text-[15px]">
                          {service.description}
                        </p>

                        {/* Футер: цена + кнопка */}
                        <div className="mt-auto flex items-center justify-between pt-8 md:pt-10">
                          <span className="text-xl font-light tracking-[0.03em] text-[#1a1a2e] md:text-2xl">
                            {service.price}
                          </span>
                          <Button
                            onClick={openModal}
                            className="h-10 rounded-xl border border-[#F97316]/30 bg-transparent px-4 text-sm font-light tracking-[0.04em] text-[#F97316] transition-all duration-300 hover:border-[#F97316] hover:bg-[#F97316] hover:text-white hover:shadow-lg hover:shadow-[#F97316]/15"
                          >
                            Записаться
                          </Button>
                        </div>
                      </div>

                    </article>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-1 top-1/2 flex h-9 w-9 -translate-y-1/2 rounded-full border border-slate-200 bg-white/80 text-slate-400 backdrop-blur-sm transition-all duration-300 hover:border-[#F97316]/40 hover:bg-white hover:text-[#F97316] md:-left-6 md:h-11 md:w-11" />
            <CarouselNext className="absolute -right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 rounded-full border border-slate-200 bg-white/80 text-slate-400 backdrop-blur-sm transition-all duration-300 hover:border-[#F97316]/40 hover:bg-white hover:text-[#F97316] md:-right-6 md:h-11 md:w-11" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
