import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { CtaConsultation } from "@/components/sections/CtaConsultation";
import { BEFORE_AFTER_CASES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Результаты до и после процедур | СитиМед Эстетика",
  description:
    "Реальные фотографии пациентов до и после косметологических процедур в клинике СитиМед Эстетика. Оцените результаты работы наших специалистов.",
};

export default function BeforeAfterPage() {
  return (
    <div className="bg-slate-50 pt-8 md:pt-14">
      <ScrollReveal>
        <section className="container mx-auto max-w-7xl px-4 pb-10 md:px-8 md:pb-16">
          {/* Header */}
          <div className="mx-auto mb-10 max-w-4xl text-center md:mb-14">
            <h1 className="text-3xl font-semibold text-slate-800 sm:text-4xl md:text-6xl">
              До и после
            </h1>
            <p className="mt-3 text-base text-slate-500 md:mt-4 md:text-lg">
              Реальные результаты наших пациентов. Каждая фотография — это
              история преображения, подтверждающая профессионализм врачей
              СитиМед Эстетика.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="mx-auto mb-10 max-w-3xl rounded-2xl border border-amber-200 bg-amber-50/60 p-4 text-center text-xs leading-relaxed text-amber-800 md:mb-14 md:p-5 md:text-sm">
            Результаты индивидуальны и зависят от особенностей организма
            пациента. Фотографии публикуются с согласия пациентов.
            Передвиньте ползунок на каждом изображении, чтобы увидеть разницу.
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
            {BEFORE_AFTER_CASES.map((caseItem, index) => (
              <ScrollReveal key={caseItem.id} delayMs={index * 60}>
                <article className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  {/* Slider */}
                  <BeforeAfterSlider
                    beforeImage={caseItem.beforeImage}
                    afterImage={caseItem.afterImage}
                    beforeAlt={`До: ${caseItem.title}`}
                    afterAlt={`После: ${caseItem.title}`}
                  />

                  {/* Info */}
                  <div className="space-y-3 p-5 md:p-6">
                    <span className="inline-block rounded-full bg-lime-200 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-slate-800">
                      {caseItem.category}
                    </span>
                    <h2 className="text-lg font-semibold leading-snug text-slate-800 md:text-xl">
                      {caseItem.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-slate-500">
                      {caseItem.description}
                    </p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal delayMs={100}>
        <CtaConsultation />
      </ScrollReveal>
    </div>
  );
}
