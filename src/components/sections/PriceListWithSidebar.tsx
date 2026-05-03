"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SERVICE_CATEGORIES } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function PriceListWithSidebar() {
  const [activeCategory, setActiveCategory] = useState(SERVICE_CATEGORIES[0].id);

  return (
    <section className="bg-white py-12 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full md:w-80 shrink-0 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 px-2">Категории</h3>
              <nav className="flex flex-col space-y-1">
                {SERVICE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-2xl text-sm font-semibold transition-all",
                      activeCategory === cat.id
                        ? "bg-orange-500 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-50 hover:text-orange-500"
                    )}
                  >
                    {cat.title}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6 bg-slate-50 rounded-3xl space-y-4">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Поиск услуги</h4>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input placeholder="Найти..." className="pl-10 rounded-xl bg-white border-none shadow-sm" />
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-slate-800 md:text-5xl">Услуги и цены</h2>
              <p className="text-slate-500 max-w-2xl text-lg">
                Ознакомьтесь с полным перечнем процедур нашей клиники. Мы используем только сертифицированные препараты и передовое оборудование.
              </p>
            </div>

            <div className="space-y-8">
              {SERVICE_CATEGORIES.map((cat) => (
                <div key={cat.id} className={cn(activeCategory === cat.id ? "block" : "hidden md:block")}>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-200 text-sm text-slate-900">
                      {cat.id[0].toUpperCase()}
                    </span>
                    {cat.title}
                  </h3>
                  
                  <div className="grid gap-4">
                    {cat.services.map((service) => (
                      <div 
                        key={service.id}
                        className="bg-slate-50 p-6 md:p-8 rounded-[2rem] flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100 group"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h4 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                              {service.name}
                            </h4>
                            {service.isPopular && (
                              <span className="rounded-md bg-lime-200 px-2 py-0.5 text-[10px] font-medium uppercase tracking-tight text-slate-800">Акция</span>
                            )}
                          </div>
                          {service.description && (
                            <p className="text-sm text-slate-500 max-w-xl leading-relaxed">
                              {service.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-6 justify-between sm:justify-end shrink-0">
                          <span className="whitespace-nowrap text-2xl font-semibold text-slate-800">
                            {service.price}
                          </span>
                          <Link
                            href={`/contacts?service=${service.id}`}
                            className="inline-flex h-11 items-center rounded-xl border border-orange-500 px-6 font-medium text-orange-500 transition-all duration-300 hover:bg-orange-500 hover:text-white"
                          >
                            Записаться
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
