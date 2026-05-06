"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Service } from "@/lib/data";

type PopularService = Service & {
  category: string;
};

type PopularServicesProps = {
  services: PopularService[];
};

export function PopularServices({ services }: PopularServicesProps) {
  const popularServices = services;

  return (
    <section className="overflow-hidden bg-slate-50 py-10 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 md:mb-16 md:flex-row md:items-end md:gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-800 sm:text-3xl md:text-5xl">Популярные услуги</h2>
            <p className="text-slate-500">Что выбирают наши клиенты?</p>
          </div>
          <Link
            href="/prices"
            className="group inline-flex items-center font-medium text-orange-500 transition-all duration-300 hover:text-orange-600"
          >
            Все услуги и цены
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
              {popularServices.map((service, index) => (
                <CarouselItem key={index} className="basis-full pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="px-1 pb-1 pt-3">
                    <Card className="group flex h-[400px] flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                      <CardContent className="flex h-full flex-col p-6 md:p-8">
                        <div className="flex-1">
                          <span className="mb-4 inline-block rounded-full bg-lime-200 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-800">
                            {service.category}
                          </span>
                          <h3 className="mb-4 text-2xl font-semibold text-slate-800 transition-colors group-hover:text-orange-500">
                            {service.name}
                          </h3>
                          <p className="line-clamp-3 font-normal leading-relaxed text-slate-500">
                            {service.description}
                          </p>
                        </div>
                        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-8">
                          <span className="text-2xl font-semibold text-slate-800">{service.price}</span>
                          <Link href={`/contacts?service=${service.id}`}>
                            <Button className="h-11 rounded-xl bg-orange-500 px-6 font-medium text-white transition-all duration-300 hover:bg-orange-600">
                              Записаться
                            </Button>
                          </Link>
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
