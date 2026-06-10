import { DOCTORS } from "@/lib/data";
import { CtaConsultation } from "@/components/sections/CtaConsultation";
import { DoctorCard } from "@/components/DoctorCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PageHero } from "@/components/PageHero";

export default function DoctorsPage() {
  return (
    <div className="bg-slate-50 pb-10 md:pb-20">
      <PageHero
        title="Наши специалисты"
        subtitle="Наши врачи постоянно повышают квалификацию, следят за новыми методиками и искренне любят свою работу. Красота и безопасность — их главный приоритет."
        videoSrc="/video/hero-doctors.mp4"
        posterSrc="/video/hero-doctors-poster.webp"
      />
      <ScrollReveal>
        <section className="container mx-auto max-w-7xl px-4 pt-6 md:px-8 md:pt-10">

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {DOCTORS.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} isChief={doctor.isChief} />
            ))}
          </div>
        </section>
      </ScrollReveal>
      <ScrollReveal delayMs={100}>
        <CtaConsultation />
      </ScrollReveal>
    </div>
  );
}
