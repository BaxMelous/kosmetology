import { Suspense } from "react";
import { getCosmetologyServices } from "@/lib/api/services";
import { PricesPageClient } from "@/components/PricesPageClient";
import { ScrollReveal } from "@/components/ScrollReveal";

function PricesPageFallback() {
  return (
    <section className="container mx-auto max-w-7xl px-4 pb-10 md:px-8 md:pb-20">
      <div className="h-10 w-64 animate-pulse rounded-full bg-slate-200 md:h-14 md:w-96" />
      <div className="mt-4 h-5 w-full max-w-3xl animate-pulse rounded-full bg-slate-200" />
      <div className="mt-2 h-5 w-4/5 max-w-2xl animate-pulse rounded-full bg-slate-200" />

      <div className="mt-8 h-14 rounded-full bg-white shadow-sm" />

      <div className="mt-8 space-y-5 md:mt-14">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-24 animate-pulse rounded-3xl border border-slate-100 bg-white shadow-sm"
          />
        ))}
      </div>
    </section>
  );
}

async function PricesPageContent() {
  const categories = await getCosmetologyServices();

  return <PricesPageClient categories={categories} />;
}

export default function PricesPage() {
  return (
    <div className="bg-slate-50 pt-8 md:pt-14">
      <Suspense fallback={<PricesPageFallback />}>
        <ScrollReveal>
          <PricesPageContent />
        </ScrollReveal>
      </Suspense>
    </div>
  );
}
