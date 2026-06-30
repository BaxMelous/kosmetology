import { DOCTORS } from "@/lib/data";
import { CtaConsultation } from "@/components/sections/CtaConsultation";
import { DoctorCard } from "@/components/DoctorCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PageHero } from "@/components/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Врачи-косметологи",
  description: "Врачи-косметологи СитиМед Эстетика в Йошкар-Оле: Бахтина М.А., Гордеева Н.В., Домрачева Н.Ю., Смирнова О.С. Опыт от 10 лет, регулярное обучение.",
};

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
            {DOCTORS.map((doctor, i) => (
              <DoctorCard key={doctor.id} doctor={doctor} isChief={doctor.isChief} priority={i === 0} />
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
