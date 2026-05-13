"use client";

import React, { useRef, useCallback } from "react";
import { CheckCircle2, Award, ShieldCheck, Zap, Users, Wallet } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const FEATURES = [
  {
    title: "Врачи-эксперты",
    description: "Косметологи с медицинским образованием и опытом работы более 10-20 лет.",
    icon: Users,
  },
  {
    title: "Оригинальные препараты",
    description: "Работаем только с сертифицированными материалами от ведущих производителей.",
    icon: ShieldCheck,
  },
  {
    title: "Современное оборудование",
    description: "Аппараты экспертного класса для достижения максимального результата.",
    icon: Zap,
  },
  {
    title: "Безопасность",
    description: "Соблюдение всех медицинских протоколов и стерильность процедур.",
    icon: Award,
  },
  {
    title: "Честные цены",
    description: "Стоимость процедур прозрачна и не содержит скрытых доплат.",
    icon: Wallet,
  },
  {
    title: "Индивидуальный подход",
    description: "Подбираем программу ухода под ваш тип кожи и конкретные задачи.",
    icon: CheckCircle2,
  },
];

const TRIPLE_FEATURES = [...FEATURES, ...FEATURES, ...FEATURES];
const START_INDEX = FEATURES.length;

export function FeaturesSection() {
  const autoplayRef = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  const setApi = useCallback((api: CarouselApi) => {
    if (!api) return;

    api.on("select", () => {
      const idx = api.selectedScrollSnap();
      if (idx < FEATURES.length - 1) {
        api.scrollTo(idx + FEATURES.length, false);
      } else if (idx >= FEATURES.length * 2 + 1) {
        api.scrollTo(idx - FEATURES.length, false);
      }
    });

    const applyTransforms = () => {
      const slides = api.slideNodes();
      const activeIndex = api.selectedScrollSnap();

      slides.forEach((slide, i) => {
        if (i === activeIndex) {
          slide.style.transform = "";
          slide.style.filter = "";
          slide.style.opacity = "1";
          slide.style.zIndex = "1";
        } else if (i === activeIndex - 1 || i === activeIndex + 1) {
          const isPrev = i < activeIndex;
          const rotate = isPrev ? "6deg" : "-6deg";
          const translateX = isPrev ? "6%" : "-6%";
          slide.style.transform = `perspective(800px) rotateY(${rotate}) scale(0.92) translateX(${translateX})`;
          slide.style.filter = "brightness(0.85)";
          slide.style.opacity = "0.6";
          slide.style.zIndex = "0";
        } else {
          slide.style.transform = "perspective(800px) rotateY(0deg) scale(0.88)";
          slide.style.filter = "brightness(0.7)";
          slide.style.opacity = "0.3";
          slide.style.zIndex = "-1";
        }
      });
    };

    api.on("select", applyTransforms);
    api.on("reInit", applyTransforms);
    applyTransforms();
  }, []);

  return (
    <section className="bg-white py-14 md:py-28">
      <div className="px-0">
        <div className="mb-10 text-center md:mb-16 space-y-4 px-4 md:px-8">
          <h2 className="text-3xl font-semibold text-slate-800 md:text-5xl">
            Доверьте свою красоту профессионалам
          </h2>
        </div>

        <div
          className="relative px-0"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
          }}
        >
          <Carousel
            opts={{
              align: "center",
              startIndex: START_INDEX,
              containScroll: false,
            }}
            plugins={[autoplayRef.current]}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="py-10 md:py-14">
              {TRIPLE_FEATURES.map((feature, index) => (
                <CarouselItem
                  key={index}
                  className="basis-[94%] md:basis-[84%] lg:basis-[72%]"
                >
                  <div className="relative mx-2 overflow-hidden rounded-[3rem] bg-white shadow-2xl md:mx-3">
                    {/* Background decoration — placeholder for photos */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-rose-50 to-lime-100" />
                    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-200 blur-[100px] opacity-50" />
                    <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-lime-200 blur-[90px] opacity-50" />

                    {/* Content */}
                    <div className="relative flex aspect-[4/3] flex-col justify-between p-6 md:aspect-[3/2] md:p-12">
                      <div>
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 shadow-md backdrop-blur-sm md:mb-6 md:h-20 md:w-20">
                          <feature.icon className="h-6 w-6 text-orange-500 md:h-8 md:w-8" />
                        </div>
                        <h3 className="mb-3 text-xl font-semibold text-slate-800 md:mb-4 md:text-4xl">
                          {feature.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-slate-600 md:text-xl">
                          {feature.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-orange-500">
                        <span className="h-px w-10 bg-orange-300" />
                        {(index % FEATURES.length) + 1} / {FEATURES.length}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 border-0 bg-white shadow-lg transition-all hover:bg-orange-500 hover:text-white md:left-5 md:h-14 md:w-14" />
            <CarouselNext className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 border-0 bg-white shadow-lg transition-all hover:bg-orange-500 hover:text-white md:right-5 md:h-14 md:w-14" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
