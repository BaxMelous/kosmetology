import { Suspense } from "react";
import { getCosmetologyServices } from "@/lib/api/services";
import { PricesPageClient } from "@/components/PricesPageClient";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PageHero } from "@/components/PageHero";

function PricesPageFallback() {
  return (
    <section className="container mx-auto max-w-7xl px-4 pt-6 md:px-8 md:pt-10">
      <div className="h-14 rounded-full bg-white shadow-sm" />

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
    <div className="bg-slate-50 pb-10 md:pb-20">
      <PageHero
        title="Услуги и цены"
        subtitle="Ознакомьтесь с полным перечнем процедур нашей клиники. Мы используем только сертифицированные препараты и передовое оборудование."
        videoSrc="/video/hero-prices.mp4"
      />
      <Suspense fallback={<PricesPageFallback />}>
        <ScrollReveal>
          <PricesPageContent />
        </ScrollReveal>
      </Suspense>
    </div>
  );
}
