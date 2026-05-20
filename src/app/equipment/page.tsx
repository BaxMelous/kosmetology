import type { Metadata } from "next";
import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CtaConsultation } from "@/components/sections/CtaConsultation";
import { EQUIPMENT } from "@/lib/data";
import { Check, ShieldCheck, GraduationCap, Scissors, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Оборудование клиники | СитиМед Эстетика",
  description:
    "Аппараты экспертного класса для косметологии в Йошкар-Оле: LUMENIS M22, UTIMS SMAS-лифтинг, NEOGEN evo, Айкун Icoone Laser, RF Secret.",
};

const PRIORITIES = [
  {
    icon: ShieldCheck,
    title: "Аппараты экспертного класса",
    text: "M22 и Айкун — редкость для Йошкар-Олы, работаем на передовом оборудовании",
  },
  {
    icon: Check,
    title: "Всё сертифицировано",
    text: "Аппараты одобрены и имеют все необходимые документы",
  },
  {
    icon: GraduationCap,
    title: "Регулярное обучение",
    text: "Наши врачи постоянно повышают квалификацию, в том числе проходят курсы напрямую от производителей оборудования",
  },
  {
    icon: Scissors,
    title: "Без разрезов и долгого восстановления",
    text: "Неинвазивные методики, которые встраиваются в ваш график",
  },
  {
    icon: Search,
    title: "Честный подбор",
    text: "Консультация перед процедурой, чтобы не делать лишнего",
  },
];

export default function EquipmentPage() {
  return (
    <div className="bg-slate-50 pt-8 md:pt-14">
      {/* Header */}
      <ScrollReveal>
        <section className="container mx-auto max-w-7xl px-4 pb-10 md:px-8 md:pb-16">
          <div className="mx-auto mb-10 max-w-4xl text-center md:mb-14">
            <h1 className="text-3xl font-semibold text-slate-800 sm:text-4xl md:text-6xl">
              Оборудование СитиМед Эстетика
            </h1>
            <p className="mt-3 text-base text-slate-500 md:mt-4 md:text-lg">
              Современные технологии для вашей красоты и здоровья
            </p>
          </div>

          {/* Equipment cards */}
          <div className="space-y-8 md:space-y-12">
            {EQUIPMENT.map((item, index) => (
              <ScrollReveal key={item.id} delayMs={index * 80}>
                <article className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="flex flex-col lg:flex-row">
                    {/* Image */}
                    <div className="relative w-full overflow-hidden bg-slate-100 lg:w-[420px] lg:flex-shrink-0">
                      {item.image ? (
                        <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[380px]">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 1024px) 100vw, 420px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="flex aspect-[4/3] items-center justify-center lg:aspect-auto lg:h-full lg:min-h-[380px] lg:w-[420px]">
                          <div className="text-center">
                            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-400 md:h-20 md:w-20">
                              <span className="text-2xl font-light md:text-3xl">
                                {item.name
                                  .split(" ")[0]
                                  .substring(0, 2)
                                  .toUpperCase()}
                              </span>
                            </div>
                            <p className="text-xs uppercase tracking-widest text-slate-400">
                              {item.name}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between p-6 md:p-8 lg:p-10">
                      <div className="space-y-6">
                        {/* Name & tagline */}
                        <div>
                          <h2 className="text-xl font-semibold text-slate-800 transition-colors group-hover:text-orange-500 md:text-2xl lg:text-3xl">
                            {item.name}
                          </h2>
                          <p className="mt-2 text-base font-medium italic leading-relaxed text-slate-500 md:text-lg">
                            «{item.tagline}»
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                          {item.description}
                        </p>

                        {/* Two columns: problems + advantages */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                          {/* Problems */}
                          <div>
                            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-orange-500">
                              Что решает
                            </h3>
                            <ul className="space-y-2.5">
                              {item.problems.map((problem, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600"
                                >
                                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-lime-500" />
                                  <span>{problem}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Advantages */}
                          <div>
                            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-orange-500">
                              Преимущества
                            </h3>
                            <ul className="space-y-2.5">
                              {item.advantages.map((adv, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600"
                                >
                                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-lime-500" />
                                  <span>{adv}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Priorities */}
      <ScrollReveal delayMs={100}>
        <section className="bg-white py-14 md:py-20">
          <div className="container mx-auto max-w-7xl px-4 md:px-8">
            <h2 className="mb-10 text-center text-2xl font-semibold text-slate-800 md:mb-14 md:text-4xl">
              Приоритеты для наших пациентов
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-5">
              {PRIORITIES.map((p, i) => (
                <div
                  key={i}
                  className="rounded-3xl border border-slate-100 bg-slate-50 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-6"
                >
                  <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-500 md:h-12 md:w-12">
                    <p.icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <h3 className="mb-2 text-sm font-semibold text-slate-800">
                    {p.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-500">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal delayMs={120}>
        <CtaConsultation />
      </ScrollReveal>
    </div>
  );
}
