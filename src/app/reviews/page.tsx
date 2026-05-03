import { Star } from "lucide-react";
import { REVIEWS } from "@/lib/data";

export default function ReviewsPage() {
  return (
    <div className="bg-slate-50 pt-14">
      <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl font-semibold text-slate-800 md:text-6xl">Отзывы пациентов</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Мы ценим каждое мнение и постоянно работаем над тем, чтобы ваш опыт в СитиМед был идеальным.
          </p>
        </div>

        {/* Aggregate Ratings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { platform: "Яндекс Карты", rating: "5.0", reviews: "120+", color: "bg-[#FFCC00]" },
            { platform: "ПроДокторов", rating: "4.9", reviews: "80+", color: "bg-[#00A8E1]" },
            { platform: "2ГИС", rating: "5.0", reviews: "45+", color: "bg-[#6ABC25]" },
          ].map((item, i) => (
            <div key={i} className="group flex items-center justify-between rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
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
            </div>
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
                <p className="font-normal italic leading-relaxed text-slate-500">
                  &laquo;{review.text}&raquo;
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-100 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-50 text-xl font-semibold text-orange-500">
                  {review.author[0]}
                </div>
                <div>
                  <p className="mb-1 leading-none font-medium text-slate-800">{review.author}</p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400">Проверено</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
