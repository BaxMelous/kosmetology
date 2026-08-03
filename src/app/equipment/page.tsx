import type { Metadata } from "next";
import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PageHero } from "@/components/PageHero";
import { CtaConsultation } from "@/components/sections/CtaConsultation";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { EQUIPMENT } from "@/lib/data";
import { canonicalPath } from "@/lib/seo";
import { Check, ShieldCheck, Award, GraduationCap, Clock, ClipboardCheck } from "lucide-react";

const PRIORITIES = [
  {
    icon: ShieldCheck,
    title: "Аппараты экспертного класса",
    text: "Работаем на оборудовании премиум-класса с подтверждённой клинической эффективностью — результат, которому можно доверять",
  },
  {
    icon: Award,
    title: "Всё сертифицировано",
    text: "Полное соответствие медицинским и косметологическим стандартам — от стерилизации инструментов до регистрационных удостоверений на оборудование",
  },
  {
    icon: GraduationCap,
    title: "Регулярное обучение",
    text: "Наши врачи постоянно повышают квалификацию, в том числе проходят курсы напрямую от производителей оборудования",
  },
  {
    icon: Clock,
    title: "Без разрезов и долгого восстановления",
    text: "Неинвазивные методики, которые встраиваются в ваш график",
  },
  {
    icon: ClipboardCheck,
    title: "Честный подбор",
    text: "Консультация перед процедурой, чтобы составить индивидуальный план лечения и косметологических процедур, подходящий именно вам",
  },
];

export const metadata: Metadata = {
  // Бренд добавляет title.template из корневого layout — здесь его не дублируем.
  title: "Оборудование клиники косметологии",
  description:
    "Аппараты экспертного класса для косметологии в Йошкар-Оле: LUMENIS M22, UTIMS SMAS-лифтинг, NEOGEN evo, Айкун Icoone Laser.",
  alternates: { canonical: canonicalPath("/equipment") },
};

export default function EquipmentPage() {
  return (
    <div className="bg-slate-50 pb-10 md:pb-20">
      <BreadcrumbJsonLd items={[{ name: "Главная", url: "/" }, { name: "Оборудование", url: "/equipment/" }]} />
      <PageHero
        title="Эстетика технологий"
        subtitle="Аппараты экспертного класса для вашей красоты и здоровья. Работаем на передовом оборудовании с доказанной эффективностью."
        videoSrc="/video/hero-equipment.mp4"
        posterSrc="/video/hero-equipment-poster.webp"
        videoFilter="none"
      />

      <ScrollReveal>
        <section className="container mx-auto max-w-7xl px-4 pt-6 md:px-8 md:pt-10">
          <div className="space-y-8 md:space-y-12">
            {EQUIPMENT.map((item, index) => (
              <ScrollReveal key={item.id} delayMs={index * 80}>
                <article className="group relative isolate overflow-hidden rounded-card border border-slate-100 bg-white shadow-card transition-all duration-500 hover:shadow-card-hover lg:min-h-[550px]">

                  {/* Изображение: моб. — сверху с фикс. высотой, десктоп — absolute слева на всю высоту */}
                  <div className="relative h-[300px] w-full shrink-0 overflow-hidden sm:h-[360px] lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-[38%]">
                    {item.image ? (
                      <>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 38vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Длинный плавный градиент: фото растворяется в белом фоне текста */}
                        <div
                          className="pointer-events-none absolute inset-y-0 right-0 w-28 lg:w-44"
                          style={{
                            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 70%, #FFFFFF 100%)",
                          }}
                        />
                      </>
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[#f5f5f5]">
                        <span className="text-6xl font-light text-slate-300">
                          {item.name.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Текстовый блок: десктоп — смещён вправо на 38% */}
                  <div className="flex flex-col justify-center p-8 sm:p-10 lg:ml-[38%] lg:px-14 lg:py-16">
                    {/* Название */}
                    <h2 className="text-2xl font-light tracking-[0.04em] text-[#1a1a2e] transition-colors duration-300 group-hover:text-[#F97316] md:text-3xl">
                      {item.name}
                    </h2>

                    {/* Тезис */}
                    <p className="mt-3 text-sm font-light italic leading-relaxed text-muted-light md:text-base">
                      «{item.tagline}»
                    </p>

                    {/* Описание */}
                    <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-muted-text md:text-base">
                      {item.description}
                    </p>

                    {/* Что решает */}
                    {item.problems && item.problems.length > 0 && (
                      <div className="mt-6">
                        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#1a1a2e]">
                          Что решает
                        </h3>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {item.problems.map((problem, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                              <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#F97316]/10">
                                <Check className="h-2.5 w-2.5 text-[#F97316]" />
                              </div>
                              <p className="text-xs font-light leading-relaxed text-muted-light md:text-sm">
                                {problem}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Преимущества */}
                    {item.advantages && item.advantages.length > 0 && (
                      <div className="mt-5">
                        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#1a1a2e]">
                          Преимущества
                        </h3>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {item.advantages.map((adv, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                              <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-lime-200/60">
                                <Check className="h-2.5 w-2.5 text-lime-700" />
                              </div>
                              <p className="text-xs font-light leading-relaxed text-muted-light md:text-sm">
                                {adv}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Регистрационное удостоверение */}
                    {item.regNumber && (
                      <div className="mt-6">
                        {item.regCertificate ? (
                          <a
                            href={item.regCertificate}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-green-200 bg-green-50/50 px-4 py-2 transition-colors hover:bg-green-50"
                          >
                            <ShieldCheck className="h-4 w-4 shrink-0 text-green-600" />
                            <span className="text-xs font-light text-muted-light">{item.regNumber}</span>
                          </a>
                        ) : (
                          <div className="inline-flex items-center gap-2 rounded-lg border border-green-200 bg-green-50/50 px-4 py-2">
                            <ShieldCheck className="h-4 w-4 shrink-0 text-green-600" />
                            <span className="text-xs font-light text-muted-light">{item.regNumber}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Приоритеты */}
      <ScrollReveal delayMs={80}>
        <section className="py-14 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 md:px-8">
            <div className="mb-10 md:mb-14">
              <div className="mx-auto mb-6 h-px w-12 bg-[#F97316]/40 md:w-16" />
              <h2 className="text-center text-2xl font-light tracking-[0.04em] text-[#1a1a2e] md:text-4xl">
                Приоритеты для наших пациентов
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-5">
              {PRIORITIES.map((p, i) => (
                <div
                  key={i}
                  className="group rounded-card border border-slate-100 bg-white p-6 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#F97316]/10 text-[#F97316] transition-colors duration-300 group-hover:bg-[#F97316] group-hover:text-white">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-sm font-medium text-[#1a1a2e]">
                    {p.title}
                  </h3>
                  <p className="text-xs font-light leading-relaxed text-muted-light">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delayMs={100}>
        <CtaConsultation />
      </ScrollReveal>
    </div>
  );
}
