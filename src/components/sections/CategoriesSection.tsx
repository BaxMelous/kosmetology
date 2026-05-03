import React from "react";
import { SERVICE_CATEGORIES } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Syringe, Zap, Layers, Sparkles, Flower2, ArrowRight } from "lucide-react";
import Link from "next/link";

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
    <section id="services" className="bg-slate-50 py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-slate-800 md:text-5xl">Наши услуги</h2>
            <p className="text-slate-500 max-w-xl">
              Передовые методики для вашей красоты. Мы используем только сертифицированные препараты и оборудование.
            </p>
          </div>
          <Link href="/prices" className="group flex items-center font-medium text-orange-500 transition-all duration-300 hover:text-orange-600">
            Весь прайс-лист
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICE_CATEGORIES.map((category) => {
            const Icon = ICON_MAP[category.icon] || Sparkles;
            return (
              <Card key={category.id} className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <CardHeader className="p-8 pb-4">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-200 transition-transform duration-500 group-hover:scale-105">
                    <Icon className="w-8 h-8 text-slate-900" />
                  </div>
                  <CardTitle className="mb-2 text-2xl font-semibold text-slate-800">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0">
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
