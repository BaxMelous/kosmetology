"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/components/Link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { EQUIPMENT } from "@/lib/data";

export function EquipmentSection() {
  return (
    <section className="overflow-hidden py-10 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="mb-10 flex flex-col justify-between gap-4 md:mb-16 md:flex-row md:items-center md:gap-6">
          <div className="space-y-4">
            <div className="mb-6 h-px w-12 bg-[#F97316]/40 md:mb-8 md:w-16" />
            <h2 className="text-xl font-light tracking-[0.08em] text-[#1a1a2e] sm:text-2xl md:text-3xl">
              Эстетика технологий
            </h2>
            <p className="max-w-lg text-sm font-light leading-[1.6] tracking-[0.02em] text-muted-light sm:text-base">
              Аппараты экспертного класса с доказанной эффективностью
            </p>
          </div>
          <Link
            href="/equipment"
            className="group inline-flex items-center font-medium text-primary transition-all duration-300 hover:text-primary-hover"
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
                    <article className="group flex w-full flex-col overflow-hidden rounded-card border border-slate-100 bg-white transition-all duration-300 hover:-translate-y-0.5">

                      {/* Изображение — на всю ширину, object-cover, с нижним градиентом */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        {item.image ? (
                          <>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Градиент: фото плавно переходит в белый фон карточки */}
                            <div
                              className="pointer-events-none absolute inset-x-0 bottom-0 h-14"
                              style={{
                                background: "linear-gradient(to top, #FFFFFF, transparent)",
                              }}
                            />
                          </>
                        ) : (
                          <div className="flex h-full items-center justify-center bg-[#f5f5f5]">
                            <span className="text-5xl font-light text-slate-300">
                              {item.name.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Контент */}
                      <div className="flex flex-1 flex-col p-5 md:p-6">
                        <h3 className="text-lg font-light tracking-[0.03em] text-[#1a1a2e] transition-colors duration-300 group-hover:text-[#F97316]">
                          {item.name}
                        </h3>

                        {/* Тезис */}
                        <p className="mt-1.5 text-xs font-light italic leading-relaxed text-muted-light">
                          «{item.tagline}»
                        </p>

                        {/* Описание */}
                        <p className="mt-2 line-clamp-2 text-xs font-light leading-[1.6] text-muted-text">
                          {item.description}
                        </p>

                        {/* Что решает */}
                        {item.problems && item.problems.length > 0 && (
                          <div className="mt-4">
                            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#1a1a2e]">
                              Что решает
                            </p>
                            <div className="grid grid-cols-1 gap-1.5">
                              {item.problems.slice(0, 2).map((problem, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#F97316]/10">
                                    <Check className="h-2.5 w-2.5 text-[#F97316]" />
                                  </div>
                                  <p className="text-[11px] font-light leading-[1.5] text-muted-light">
                                    {problem}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Регистрационное удостоверение */}
                        {item.regNumber && (
                          <div className="mt-auto pt-4">
                            {item.regCertificate ? (
                              <a
                                href={item.regCertificate}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/50 px-3 py-2 transition-colors hover:border-green-200 hover:bg-green-50/50"
                              >
                                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-green-600" />
                                <span className="text-[10px] font-light text-muted-light">{item.regNumber}</span>
                              </a>
                            ) : (
                              <div className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/50 px-3 py-2">
                                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-green-600" />
                                <span className="text-[10px] font-light text-muted-light">{item.regNumber}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                    </article>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 border border-slate-100 bg-white transition-all duration-300 hover:bg-primary hover:text-white focus-visible:ring-2 focus-visible:ring-primary/50 md:-left-6 md:h-12 md:w-12" />
            <CarouselNext className="absolute -right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 border border-slate-100 bg-white transition-all duration-300 hover:bg-primary hover:text-white focus-visible:ring-2 focus-visible:ring-primary/50 md:-right-6 md:h-12 md:w-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
