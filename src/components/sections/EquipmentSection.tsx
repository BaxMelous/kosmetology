"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/components/Link";
import { ArrowRight, Check } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { EQUIPMENT } from "@/lib/data";

export function EquipmentSection() {
  return (
    <section className="overflow-hidden bg-white py-10 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 md:mb-16 md:flex-row md:items-end md:gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-800 sm:text-3xl md:text-5xl">
              Наше оборудование
            </h2>
            <p className="text-slate-500">
              Аппараты экспертного класса для вашей красоты
            </p>
          </div>
          <Link
            href="/equipment"
            className="group inline-flex items-center font-medium text-orange-500 transition-all duration-300 hover:text-orange-600"
          >
            Всё оборудование
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
              {EQUIPMENT.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="basis-full pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="flex h-full px-1 pb-1 pt-3">
                    <Card className="group flex w-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white pt-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                      {/* Image */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <span className="text-4xl font-light text-slate-300">
                              {item.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>

                      <CardContent className="flex flex-1 flex-col justify-between space-y-4 p-5 md:p-6">
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold leading-snug text-slate-800 transition-colors group-hover:text-orange-500 md:text-xl">
                            {item.name}
                          </h3>
                          <p className="line-clamp-2 text-sm font-medium leading-relaxed text-slate-500 italic">
                            «{item.tagline}»
                          </p>
                          <p className="line-clamp-3 text-sm leading-relaxed text-slate-500">
                            {item.description}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-orange-500 transition-colors group-hover:text-orange-600">
                            Подробнее об аппарате →
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:bg-orange-500 hover:text-white md:-left-6 md:h-12 md:w-12" />
            <CarouselNext className="absolute -right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:bg-orange-500 hover:text-white md:-right-6 md:h-12 md:w-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
