import type { Metadata } from "next";
import { Star } from "lucide-react";
import { REVIEWS } from "@/lib/data";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { canonicalPath } from "@/lib/seo";

export const metadata: Metadata = {
  // Бренд добавляет title.template из корневого layout — здесь его не дублируем.
  title: "Отзывы пациентов о косметологии в Йошкар-Оле",
  description:
    "Реальные отзывы пациентов о процедурах в клинике СитиМед Эстетика в Йошкар-Оле. Оцените уровень сервиса и профессионализм наших врачей.",
  alternates: { canonical: canonicalPath("/reviews") },
};

export default function ReviewsPage() {
  return (
    <div className="bg-slate-50 pb-10 md:pb-20">
      <BreadcrumbJsonLd items={[{ name: "Главная", url: "/" }, { name: "Отзывы", url: "/reviews/" }]} />
      <PageHero
        title="Отзывы о косметологии в Йошкар-Оле"
        subtitle="Мы ценим ваше доверие. Более 1000 пациентов в Йошкар-Оле уже оценили уровень сервиса и профессионализм врачей клиники «СитиМед Эстетика»."
        videoSrc="/video/hero-reviews.mp4"
        posterSrc="/video/hero-reviews-poster.webp"
        videoFilter="none"
      />
      <ScrollReveal>
        <section className="container mx-auto max-w-7xl px-4 pt-6 md:px-8 md:pt-10">

        {/* Aggregate Ratings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 mb-12 md:mb-20">
          {[
            { platform: "Яндекс Карты", rating: "4.9", reviews: "749+", color: "bg-[#FFCC00]", href: "https://yandex.ru/maps/org/sitimed/80990739915/reviews/?ll=47.878239%2C56.631931&z=14" },
            { platform: "Докту", rating: "4.5", reviews: "110+", color: "bg-[#00A8E1]", href: "https://doctu.ru/jjoshkar-ola/clinic/medicinskij-centr-sitimed-na-lobachevskogo/doctors" },
            { platform: "2ГИС", rating: "4.4", reviews: "735+", color: "bg-[#6ABC25]", href: "https://2gis.ru/yoshkarola/search/%D1%81%D0%B8%D1%82%D0%B8%D0%BC%D0%B5%D0%B4%20%D0%B9%D0%BE%D1%88%D0%BA%D0%B0%D1%80%20%D0%BE%D0%BB%D0%B0/firm/70000001045728820/47.878323%2C56.631883/tab/reviews?m=47.878323%2C56.631883%2F14.41" },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex cursor-pointer items-center justify-between rounded-card border border-slate-100 bg-white p-5 md:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                <p className="mb-1 text-lg font-semibold text-slate-800">{item.platform}</p>
                <p className="text-slate-500 text-sm">{item.reviews} отзывов</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-semibold text-slate-800">{item.rating}</div>
                <div className="flex gap-0.5 mt-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3 h-3 fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Full Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {REVIEWS.map((review) => (
            <div key={review.id} className="flex h-full flex-col justify-between rounded-card border border-slate-100 bg-white p-5 md:p-10 shadow-card transition-all duration-500 hover:scale-[1.015] hover:shadow-card-hover">
              <div className="space-y-4 md:space-y-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                  ))}
                </div>
                {/* h2: карточки идут сразу за h1 страницы — h3 давал пропуск уровня. */}
                <h2 className="text-lg md:text-xl font-medium leading-snug text-slate-800">
                  &laquo;{review.title}&raquo;
                </h2>
                <p className="text-sm md:text-base font-normal leading-loose text-slate-500">
                  {review.text}
                </p>
              </div>
              <div className="relative z-10 mt-5 md:mt-8 space-y-3 md:space-y-4 border-t border-slate-100 pt-5 md:pt-8">
                <span className="inline-block rounded-full border border-slate-200/50 bg-white/40 px-2.5 md:px-3 py-1 text-[11px] md:text-xs font-medium text-slate-500 backdrop-blur-[5px]">
                  {review.services}
                </span>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-white text-xl font-light text-slate-500 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)]">
                    {review.author[0]}
                  </div>
                  <div>
                    <p className="mb-1 leading-none font-medium text-slate-800">{review.author}</p>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500">Проверено</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
