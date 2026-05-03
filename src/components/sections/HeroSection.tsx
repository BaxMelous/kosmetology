import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50">
      <div className="container mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-4 py-12 md:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          {/* Text Content */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <h1 className="text-4xl font-semibold leading-tight text-slate-800 md:text-6xl">
              Косметология <br />
              <span className="text-primary">экспертного уровня</span> <br />
              в СитиМед Эстетика
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-normal leading-relaxed text-slate-500 md:text-xl lg:mx-0">
              Безопасность, передовые технологии и команда признанных экспертов для вашей красоты и здоровья. 
              Мы создаем результаты, которыми вы будете гордиться.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/contacts">
                <Button className="h-11 rounded-xl bg-orange-500 px-6 font-medium text-white transition-all duration-300 hover:bg-orange-600">
                  Записаться на прием
                </Button>
              </Link>
              <Link href="/prices">
                <Button variant="outline" className="h-11 rounded-xl border border-slate-200 bg-white px-6 font-medium text-slate-800 transition-all duration-300 hover:bg-slate-100">
                  Посмотреть услуги
                </Button>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative flex flex-1 justify-center">
            <div className="relative z-10 w-full max-w-[520px] overflow-hidden rounded-[2rem] shadow-2xl transition-transform duration-500 lg:rotate-3 lg:hover:rotate-0">
              <Image
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=75&w=720&h=900&auto=format&fit=crop"
                alt="Врач-косметолог за работой"
                width={720}
                height={900}
                quality={75}
                fetchPriority="high"
                className="h-auto w-full object-cover"
                priority
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary rounded-full blur-3xl opacity-30 -z-10" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary rounded-full blur-3xl opacity-10 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
