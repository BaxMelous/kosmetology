import React from "react";
import { Link } from "@/components/Link";
import { ArrowRight } from "lucide-react";

const FEATURES = [
  {
    title: "Врачи-эксперты",
    description: "Специалисты с медобразованием и опытом от 10 лет. Постоянно повышаем квалификацию.",
    cta: "Познакомиться с командой",
    href: "/doctors",
    image: "/images/advantages/doctors.webp",
  },
  {
    title: "Передовое оборудование",
    description: "Аппараты M22, NeoGen, ICOONE и SMAS-лифтинг. Безопасно и без долгого восстановления.",
    cta: "Посмотреть оборудование",
    href: "/equipment",
    image: "/images/advantages/equipment.webp",
  },
  {
    title: "Результаты",
    description: "Реальные истории преображений наших пациентов. Фото ДО/ПОСЛЕ говорят больше любых слов.",
    cta: "Смотреть результаты",
    href: "/before-after",
    image: "/images/advantages/results.webp",
  },
  {
    title: "Цены",
    description: "Открытый прайс на все процедуры. Вы заранее знаете стоимость — никаких скрытых доплат.",
    cta: "Посмотреть цены",
    href: "/prices",
    image: "/images/advantages/prices.webp",
  },
  {
    title: "Отзывы",
    description: "Нам доверяет более 1000 пациентов. Почитайте их отзывы о процедурах и врачах.",
    cta: "Читать отзывы",
    href: "/reviews",
    image: "/images/advantages/reviews.webp",
  },
  {
    title: "Контакты",
    description: "Удобное расположение в центре Йошкар-Олы, бесплатная парковка. Запишитесь на консультацию.",
    cta: "Как нас найти",
    href: "/contacts",
    image: "/images/advantages/contacts.webp",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-white py-14 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-14 text-center md:mb-20">
          <div className="mx-auto mb-6 h-px w-12 bg-[#F97316]/40 md:mb-8 md:w-16" />
          <h2 className="text-xl font-light tracking-[0.08em] text-[#1a1a2e] sm:text-2xl md:text-3xl">
            Доверьте свою красоту профессионалам
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {FEATURES.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="group relative block min-h-52 overflow-hidden rounded-[2rem] bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] sm:min-h-56 md:min-h-60"
              >
                {/* Фоновое изображение — на всю карточку */}
                <div
                  className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${feature.image})`,
                    backgroundPosition: "right center",
                  }}
                />

                {/* Градиентный оверлей — плавное растворение слева направо */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(90deg, #FFFFFF 15%, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0) 80%)",
                  }}
                />

                {/* Контент — поверх всего */}
                <div className="relative z-[2] flex h-full flex-col justify-between px-6 py-5 sm:px-8">
                  <div>
                    <h3 className="text-base font-medium tracking-[0.01em] text-slate-800 transition-colors duration-300 group-hover:text-[#F97316] sm:text-lg">
                      {feature.title}
                    </h3>
                    <p className="mt-2.5 max-w-[55%] text-sm font-light leading-[1.6] text-[#666]">
                      {feature.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <span className="inline-flex items-center gap-1.5 text-sm font-light text-[#F97316] transition-all duration-300 group-hover:gap-2">
                    {feature.cta}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
