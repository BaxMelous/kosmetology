"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { ServiceCategory } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { ServiceCategoryCard } from "@/components/ServiceCategoryCard";

type PricesPageClientProps = {
  categories: ServiceCategory[];
};

export function PricesPageClient({ categories }: PricesPageClientProps) {
  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return categories;
    }

    return categories
      .map((category) => ({
        ...category,
        services: category.services.filter((service) => {
          const name = service.name.toLowerCase();
          const description = service.description?.toLowerCase() ?? "";
          return name.includes(query) || description.includes(query);
        }),
      }))
      .filter((category) => category.services.length > 0);
  }, [categories, search]);

  return (
    <section className="container mx-auto max-w-7xl px-4 pt-6 md:px-8 md:pt-10">
      <div className="relative">
        <Search className="pointer-events-none absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Поиск услуги..."
          className="h-14 rounded-full border-none bg-white pl-14 text-base text-slate-900 shadow-sm placeholder:text-slate-500"
        />
      </div>

      <div className="mt-8 md:mt-14">
        <div className="space-y-4 sm:space-y-5">
          {filteredCategories.map((category) => (
            <ServiceCategoryCard key={category.id} category={category} />
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="rounded-3xl bg-white p-10 text-center text-slate-500 shadow-sm">
            По вашему запросу услуги не найдены.
          </div>
        )}
      </div>
    </section>
  );
}
