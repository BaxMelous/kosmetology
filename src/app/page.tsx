import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { ChiefDoctorSection } from "@/components/sections/ChiefDoctorSection";
import { PopularServices } from "@/components/sections/PopularServices";
import { DoctorsSection } from "@/components/sections/DoctorsSection";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { EquipmentSection } from "@/components/sections/EquipmentSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { CtaConsultation } from "@/components/sections/CtaConsultation";
import { ParallaxSection } from "@/components/ParallaxSection";
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
      <ParallaxSection>
        <FeaturesSection />
      </ParallaxSection>
      <ParallaxSection>
        <PopularServices services={popularServices} />
      </ParallaxSection>
      <ParallaxSection>
        <div className="bg-white">
          <DoctorsSection doctors={DOCTORS} limit={4} />
        </div>
      </ParallaxSection>
      <ChiefDoctorSection />
      <ParallaxSection>
        <EquipmentSection />
      </ParallaxSection>
      <ParallaxSection>
        <BeforeAfterSection />
      </ParallaxSection>
      <ParallaxSection>
        <ReviewsSection />
      </ParallaxSection>
      <ParallaxSection>
        <CtaConsultation />
      </ParallaxSection>
    </>
  );
}
