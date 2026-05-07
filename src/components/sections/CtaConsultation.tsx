import React from "react";
import { Link } from "@/components/Link";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export function CtaConsultation() {
  return (
    <section className="py-14 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 p-6 md:p-20 text-center">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 space-y-5 md:space-y-8 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-3xl bg-white shadow-sm mb-4">
              <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            </div>
            <h2 className="text-2xl md:text-5xl font-semibold leading-tight text-slate-800">
              Запишитесь на первичную консультацию косметолога
            </h2>
            <p className="text-base md:text-xl font-normal leading-relaxed text-slate-500">
              На консультации врач-косметолог проведет диагностику кожи, выслушает ваши пожелания и составит индивидуальный план преображения. Подберем оптимальные процедуры с учетом вашего типа кожи, возраста и бюджета.
            </p>
            <Link href="/contacts">
              <Button className="h-11 rounded-xl bg-orange-500 px-6 font-medium text-white transition-all duration-300 hover:bg-orange-600">
                Записаться
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
