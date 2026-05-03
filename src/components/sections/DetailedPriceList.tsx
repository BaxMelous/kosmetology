import React from "react";
import Link from "next/link";
import { SERVICE_CATEGORIES } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function DetailedPriceList() {
  return (
    <section id="price" className="py-24 bg-slate-50">
      <div className="container mx-auto max-w-4xl px-4 md:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-semibold text-slate-800 md:text-5xl">Прайс-лист</h2>
          <p className="text-slate-500">
            Ознакомьтесь с подробным перечнем процедур нашей клиники.
          </p>
        </div>

        <Accordion className="w-full space-y-4">
          {SERVICE_CATEGORIES.map((category) => (
            <AccordionItem
              key={category.id} 
              value={category.id}
              className="overflow-hidden rounded-3xl border border-slate-100 bg-white px-8 shadow-sm"
            >
              <AccordionTrigger className="hover:no-underline py-6">
                <span className="text-xl font-semibold text-slate-800">{category.title}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-8">
                <div className="divide-y divide-slate-100">
                  {category.services.map((service) => (
                    <div key={service.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-1">
                        <p className="font-semibold text-slate-800">{service.name}</p>
                        {service.description && (
                          <p className="text-xs text-slate-500 max-w-lg leading-relaxed">
                            {service.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="whitespace-nowrap text-lg font-semibold text-slate-800">{service.price}</span>
                        <Link href={`/contacts?service=${service.id}`} className="inline-flex h-11 items-center rounded-xl bg-orange-500 px-6 font-medium text-white transition-all duration-300 hover:bg-orange-600">
                          Записаться
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
