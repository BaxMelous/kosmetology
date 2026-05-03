import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { PopularServices } from "@/components/sections/PopularServices";
import { DoctorsSection } from "@/components/sections/DoctorsSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { CtaConsultation } from "@/components/sections/CtaConsultation";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ScrollReveal>
        <FeaturesSection />
      </ScrollReveal>
      <ScrollReveal delayMs={80}>
        <PopularServices />
      </ScrollReveal>
      <ScrollReveal delayMs={120}>
        <div className="bg-white">
          <DoctorsSection />
        </div>
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
