"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function PricesPage() {
  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return SERVICE_CATEGORIES;
    }

    return SERVICE_CATEGORIES.map((category) => ({
      ...category,
      services: category.services.filter((service) => {
        const name = service.name.toLowerCase();
        const description = service.description?.toLowerCase() ?? "";
        return name.includes(query) || description.includes(query);
      }),
    })).filter((category) => category.services.length > 0);
  }, [search]);

  return (
    <div className="bg-slate-50 pt-14">
      <ScrollReveal>
      <section className="container mx-auto max-w-7xl px-4 pb-20 md:px-8">
          <h1 className="text-4xl font-semibold text-slate-800 md:text-6xl">Услуги и цены</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-500">
            Ознакомьтесь с полным перечнем процедур нашей клиники. Мы используем только сертифицированные препараты и передовое оборудование.
          </p>

          <div className="relative mt-8">
            <Search className="pointer-events-none absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Поиск услуги..."
              className="h-14 rounded-full border-none bg-white pl-14 text-base text-slate-900 shadow-sm placeholder:text-slate-400"
            />
          </div>

          <div className="mt-14">
            <Accordion className="space-y-5">
            {filteredCategories.map((category) => (
              <AccordionItem
                key={category.id}
                value={category.id}
                className="overflow-hidden rounded-3xl border border-slate-100 bg-white px-6 shadow-sm"
              >
                <AccordionTrigger className="py-6 text-left text-2xl font-semibold text-slate-800 hover:no-underline">
                  <h2>{category.title}</h2>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="space-y-3">
                    {category.services.map((service) => (
                      <article
                        key={service.id}
                        className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-6 md:flex-row md:items-center md:justify-between"
                      >
                        <div>
                          <div className="mb-1 flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-semibold text-slate-800">{service.name}</h3>
                            {service.isPopular && (
                              <span className="rounded-full bg-lime-200 px-3 py-1 text-xs font-medium text-slate-800">Акция</span>
                            )}
                          </div>
                          {service.description && <p className="text-sm text-slate-500">{service.description}</p>}
                        </div>
                        <div className="flex items-center gap-4 md:shrink-0">
                          <span className="text-xl font-semibold text-slate-800">{service.price}</span>
                          <Link href={`/contacts?service=${service.id}`}>
                            <Button className="h-11 rounded-xl bg-orange-500 px-6 font-medium text-white transition-all duration-300 hover:bg-orange-600">
                              Записаться
                            </Button>
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
            </Accordion>

            {filteredCategories.length === 0 && (
              <div className="rounded-3xl bg-white p-10 text-center text-slate-500 shadow-sm">
                По вашему запросу услуги не найдены.
              </div>
            )}
          </div>
      </section>
      </ScrollReveal>
    </div>
  );
}
