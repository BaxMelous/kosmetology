import React from "react";
import Image from "next/image";
import { Link } from "@/components/Link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50">
      <div className="container mx-auto flex max-w-7xl items-center px-4 py-6 sm:py-8 md:min-h-[calc(100vh-80px)] md:px-8 md:py-12">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-20">
          {/* Text Content */}
          <div className="flex-1 space-y-6 text-left lg:text-left">
            <h1 className="text-2xl font-semibold leading-tight text-slate-800 sm:text-4xl md:text-6xl">
              Профессиональная <br />
              <span className="text-primary">косметология</span> <br />
              в СитиМед Эстетика
            </h1>
            <p className="max-w-2xl text-sm font-normal leading-relaxed text-slate-500 sm:text-base md:text-xl lg:mx-0">
              Современные методики омоложения и ухода за кожей с использованием сертифицированных препаратов. 
              Индивидуальный подход и видимый результат уже после первой процедуры.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 lg:justify-start">
              <Link href="/contacts">
                <Button className="h-11 w-full rounded-xl bg-orange-500 px-6 font-medium text-white transition-all duration-300 hover:bg-orange-600 sm:w-auto">
                  Записаться
                </Button>
              </Link>
              <Link href="/prices">
                <Button variant="outline" className="h-11 w-full rounded-xl border border-slate-200 bg-white px-6 font-medium text-slate-800 transition-all duration-300 hover:bg-slate-100 sm:w-auto">
                  Посмотреть услуги
                </Button>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative hidden flex-1 justify-center lg:flex">
            <div className="relative z-10 w-full max-w-[520px] overflow-hidden rounded-[2rem] shadow-2xl transition-transform duration-500 lg:rotate-3 lg:hover:rotate-0">
              <Image
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=520&h=650&auto=format&fit=crop"
                alt="Врач-косметолог за работой"
                width={520}
                height={650}
                quality={85}
                unoptimized
                priority
                fetchPriority="high"
                className="h-[400px] w-full object-cover md:h-auto"
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
