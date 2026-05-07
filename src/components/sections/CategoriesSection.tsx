import React from "react";
import { SERVICE_CATEGORIES } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Syringe, Zap, Layers, Sparkles, Flower2, ArrowRight } from "lucide-react";
import { Link } from "@/components/Link";

import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Syringe,
  Zap,
  Layers,
  Sparkles,
  Flower2,
};

export function CategoriesSection() {
  return (
    <section id="services" className="bg-slate-50 py-10 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 md:mb-16 md:flex-row md:items-end md:gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-800 sm:text-3xl md:text-5xl">Наши услуги</h2>
            <p className="text-slate-500 max-w-xl">
              Передовые методики для вашей красоты. Мы используем только сертифицированные препараты и оборудование.
            </p>
          </div>
          <Link href="/prices" className="group flex items-center font-medium text-orange-500 transition-all duration-300 hover:text-orange-600">
            Весь прайс-лист
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-3">
          {SERVICE_CATEGORIES.map((category) => {
            const Icon = ICON_MAP[category.icon] || Sparkles;
            return (
              <Card key={category.id} className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <CardHeader className="p-6 pb-4 md:p-8 md:pb-4">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-200 transition-transform duration-500 group-hover:scale-105 md:mb-6 md:h-16 md:w-16">
                    <Icon className="w-8 h-8 text-slate-900" />
                  </div>
                  <CardTitle className="mb-2 text-xl font-semibold text-slate-800 md:text-2xl">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 md:p-8 md:pt-0">
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    {category.description}
                  </p>
                  <ul className="space-y-3">
                    {category.services.slice(0, 3).map((service) => (
                      <li key={service.id} className="flex items-center justify-between text-sm font-medium border-b border-slate-100 pb-2 last:border-0">
                        <span className="text-slate-700">{service.name}</span>
                        <span className="font-medium text-slate-800">{service.price}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/prices" className="mt-8 inline-flex items-center text-sm font-medium text-slate-700 transition-all duration-300 hover:text-orange-500">
                    Подробнее
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
