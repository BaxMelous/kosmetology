"use client";

import React from "react";
import Link from "next/link";
import { SERVICE_CATEGORIES } from "@/lib/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PopularServices() {
  const popularServices = SERVICE_CATEGORIES.flatMap(cat => 
    cat.services.filter(s => s.isPopular).map(s => ({ ...s, category: cat.title }))
  );

  return (
    <section className="overflow-hidden bg-slate-50 py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-slate-800 md:text-5xl">Популярные услуги</h2>
            <p className="text-slate-500">То, что наши клиенты выбирают чаще всего.</p>
          </div>
        </div>

        <div className="px-12 relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {popularServices.map((service, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="group flex h-[400px] flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                      <CardContent className="flex h-full flex-col p-8">
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
            <CarouselPrevious className="absolute -left-6 top-1/2 h-12 w-12 -translate-y-1/2 border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:bg-orange-500 hover:text-white" />
            <CarouselNext className="absolute -right-6 top-1/2 h-12 w-12 -translate-y-1/2 border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:bg-orange-500 hover:text-white" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
