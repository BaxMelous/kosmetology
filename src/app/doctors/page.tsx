import { DOCTORS } from "@/lib/data";
import { CtaConsultation } from "@/components/sections/CtaConsultation";
import { DoctorCard } from "@/components/DoctorCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Link } from "@/components/Link";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";

export default function DoctorsPage() {
  return (
    <div className="bg-slate-50 pb-10 md:pb-20">
      <PageHero
        title="Наши специалисты"
        subtitle="Наши врачи постоянно повышают квалификацию, следят за новыми методиками и искренне любят свою работу. Красота и безопасность — их главный приоритет."
        videoSrc="/video/hero-doctors.mp4"
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
      <ScrollReveal delayMs={160}>
        <section className="pb-16 text-center">
          <div className="container mx-auto max-w-3xl px-4 md:px-8">
            <h2 className="text-2xl font-semibold text-slate-800 md:text-3xl">
              Не знаете, к какому специалисту записаться?
            </h2>
            <p className="mt-3 text-slate-500">
              Оставьте заявку, и наш администратор поможет подобрать врача под ваш запрос, основываясь на симптомах и пожеланиях.
            </p>
            <Link href="/contacts" className="mt-6 inline-block">
              <Button className="h-11 rounded-xl bg-orange-500 px-6 font-medium text-white transition-all duration-300 hover:bg-orange-600">
                Оставить заявку
              </Button>
            </Link>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
