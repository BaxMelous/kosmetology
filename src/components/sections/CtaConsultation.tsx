"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useConsultationModal } from "@/components/ConsultationModal";

export function CtaConsultation() {
  const { openModal } = useConsultationModal();
  return (
    <section className="pt-4 pb-14 md:pt-10 md:pb-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="relative overflow-hidden rounded-card bg-gradient-to-br from-slate-100 to-slate-200 p-6 md:p-20 text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 space-y-5 md:space-y-8 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-card bg-white shadow-sm mb-4">
              <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            </div>
            <h2 className="text-xl font-light tracking-[0.08em] text-[#1a1a2e] sm:text-2xl md:text-3xl">
              Запишитесь на первичную консультацию косметолога
            </h2>
            <p className="text-sm font-light leading-[1.6] tracking-[0.02em] text-muted-light sm:text-base">
              На консультации врач-косметолог проведет диагностику кожи, выслушает ваши пожелания и составит индивидуальный план преображения. Подберем оптимальные процедуры с учетом вашего типа кожи, возраста и бюджета.
            </p>
            <Button onClick={openModal} className="h-11 rounded-xl bg-primary px-6 font-medium text-white transition-all duration-300 hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2">
              Записаться
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
