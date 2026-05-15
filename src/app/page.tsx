import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { PopularServices } from "@/components/sections/PopularServices";
import { DoctorsSection } from "@/components/sections/DoctorsSection";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { CtaConsultation } from "@/components/sections/CtaConsultation";
import { ScrollReveal } from "@/components/ScrollReveal";
import { DOCTORS, SERVICE_CATEGORIES } from "@/lib/data";

export default function Home() {
  const popularServices = SERVICE_CATEGORIES.flatMap((category) =>
    category.services
      .filter((service) => service.isPopular)
      .map((service) => ({ ...service, category: category.title }))
  );

  return (
    <>
      <HeroSection />
      <ScrollReveal>
        <FeaturesSection />
      </ScrollReveal>
      <ScrollReveal delayMs={80}>
        <PopularServices services={popularServices} />
      </ScrollReveal>
      <ScrollReveal delayMs={120}>
        <div className="bg-white">
          <DoctorsSection doctors={DOCTORS} limit={4} />
        </div>
      </ScrollReveal>
      <ScrollReveal delayMs={140}>
        <BeforeAfterSection />
      </ScrollReveal>
      <ScrollReveal delayMs={160}>
        <ReviewsSection />
      </ScrollReveal>
      <ScrollReveal delayMs={200}>
        <CtaConsultation />
      </ScrollReveal>
    </>
  );
}
