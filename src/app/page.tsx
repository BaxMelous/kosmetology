import { Suspense } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { PopularServices } from "@/components/sections/PopularServices";
import { DoctorsSection } from "@/components/sections/DoctorsSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { CtaConsultation } from "@/components/sections/CtaConsultation";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getCosmetologyDoctors } from "@/lib/api/doctors";
import { getCosmetologyServices, getPopularServicesFromCategories } from "@/lib/api/services";

function PopularServicesFallback() {
  return (
    <section className="overflow-hidden bg-slate-50 py-10 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 md:mb-16 md:flex-row md:items-end md:gap-6">
          <div className="space-y-4">
            <div className="h-8 w-64 animate-pulse rounded-full bg-slate-200 md:h-12 md:w-96" />
            <div className="h-5 w-72 animate-pulse rounded-full bg-slate-200" />
          </div>
          <div className="h-5 w-36 animate-pulse rounded-full bg-slate-200" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-[400px] animate-pulse rounded-3xl border border-slate-100 bg-white shadow-sm"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function DoctorsFallback() {
  return (
    <section id="doctors" className="bg-white py-10 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 md:mb-16 md:flex-row md:items-end md:gap-6">
          <div className="space-y-4">
            <div className="mx-auto h-8 w-64 animate-pulse rounded-full bg-slate-200 md:mx-0 md:h-12 md:w-80" />
            <div className="mx-auto h-5 w-80 animate-pulse rounded-full bg-slate-200 md:mx-0" />
          </div>
          <div className="mx-auto h-5 w-36 animate-pulse rounded-full bg-slate-200 md:mx-0" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-[420px] animate-pulse rounded-3xl border border-slate-100 bg-slate-50"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

async function PopularServicesContent() {
  const serviceCategories = await getCosmetologyServices();
  const popularServices = getPopularServicesFromCategories(serviceCategories);

  return <PopularServices services={popularServices} />;
}

async function DoctorsContent() {
  const doctors = await getCosmetologyDoctors();

  return <DoctorsSection doctors={doctors} limit={4} />;
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <ScrollReveal>
        <FeaturesSection />
      </ScrollReveal>
      <Suspense fallback={<PopularServicesFallback />}>
        <ScrollReveal delayMs={80}>
          <PopularServicesContent />
        </ScrollReveal>
      </Suspense>
      <Suspense fallback={<DoctorsFallback />}>
        <ScrollReveal delayMs={120}>
          <div className="bg-white">
            <DoctorsContent />
          </div>
        </ScrollReveal>
      </Suspense>
      <ScrollReveal delayMs={160}>
        <ReviewsSection />
      </ScrollReveal>
      <ScrollReveal delayMs={200}>
        <CtaConsultation />
      </ScrollReveal>
    </>
  );
}
