import { Star } from "lucide-react";
import { REVIEWS } from "@/lib/data";

export default function ReviewsPage() {
  return (
    <div className="bg-slate-50 pt-14">
      <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl font-semibold text-slate-800 md:text-6xl">Отзывы пациентов</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Мы ценим ваше доверие. Более 1000 пациентов уже оценили уровень сервиса и профессионализм врачей СитиМед Эстетика.
          </p>
        </div>

        {/* Aggregate Ratings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
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
              className="group flex cursor-pointer items-center justify-between rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                <h3 className="mb-1 text-lg font-semibold text-slate-800">{item.platform}</h3>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div key={review.id} className="flex h-full flex-col justify-between rounded-3xl border border-slate-100 bg-white p-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="space-y-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <h3 className="text-xl font-semibold leading-snug text-slate-800">
                  &laquo;{review.title}&raquo;
                </h3>
                <p className="font-normal leading-relaxed text-slate-500">
                  {review.text}
                </p>
              </div>
              <div className="mt-8 space-y-4 border-t border-slate-100 pt-8">
                <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {review.services}
                </span>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-50 text-xl font-semibold text-orange-500">
                    {review.author[0]}
                  </div>
                  <div>
                    <p className="mb-1 leading-none font-medium text-slate-800">{review.author}</p>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400">Проверено</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
