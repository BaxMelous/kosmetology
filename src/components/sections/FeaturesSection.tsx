import React from "react";
import { Link } from "@/components/Link";

const FEATURES = [
  {
    title: "Врачи-эксперты",
    description: "Специалисты с высшим медицинским образованием и бережным подходом к вашей красоте.",
    href: "/doctors",
    image: "/images/advantages/doctors.webp",
  },
  {
    title: "Передовое оборудование",
    description: "Работаем на оригинальных современных аппаратах: это безопасно, не больно и дает эффект.",
    href: "/equipment",
    image: "/images/advantages/equipment.webp",
  },
  {
    title: "Реальные результаты",
    description: "Посмотрите истории преображения наших пациентов — фотографии скажут больше любых слов.",
    href: "/before-after",
    image: "/images/advantages/results.webp",
  },
  {
    title: "Честные цены",
    description: "Открытый прайс на все процедуры. Вы заранее знаете стоимость, без скрытых доплат.",
    href: "/prices",
    image: "/images/advantages/prices.webp",
  },
  {
    title: "Нам доверяют",
    description: "Сотни теплых отзывов от девушек, которые уже нашли своего любимого косметолога в нашей клинике.",
    href: "/reviews",
    image: "/images/advantages/reviews.webp",
  },
  {
    title: "Мы всегда на связи",
    description: "Удобное расположение, уютная атмосфера и администраторы, которые ответят на любой ваш вопрос.",
    href: "/contacts",
    image: "/images/advantages/contacts.webp",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-white py-14 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-14 text-center md:mb-20">
          {/* Тонкая оранжевая линия над заголовком */}
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
              className="group relative block h-52 overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] sm:h-56 md:h-60"
            >
              {/* Фоновое изображение — справа */}
              <div
                className="absolute inset-y-0 right-0 w-1/2 bg-cover bg-right bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${feature.image})` }}
              />

              {/* Градиентная маска: белый → прозрачный слева направо */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white via-55% to-transparent" />

              {/* Текст */}
              <div className="relative flex h-full flex-col justify-center px-6 sm:px-8">
                <h3 className="text-base font-medium tracking-[0.01em] text-slate-800 transition-colors duration-300 group-hover:text-[#F97316] sm:text-lg">
                  {feature.title}
                </h3>
                <p className="mt-2 max-w-[60%] text-xs leading-[1.5] text-slate-400 sm:text-sm">
                  {feature.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
