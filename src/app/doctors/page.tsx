import { DOCTORS } from "@/lib/data";
import { CtaConsultation } from "@/components/sections/CtaConsultation";
import { DoctorCard } from "@/components/DoctorCard";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function DoctorsPage() {
  return (
    <div className="bg-slate-50 pt-8 md:pt-14">
      <ScrollReveal>
        <section className="container mx-auto max-w-7xl px-4 pb-10 md:px-8 md:pb-16">
          <div className="mx-auto mb-10 max-w-4xl text-center md:mb-14">
            <h1 className="text-3xl font-semibold text-slate-800 sm:text-4xl md:text-6xl">Наши специалисты</h1>
            <p className="mt-3 text-base text-slate-500 md:mt-4 md:text-lg">
              Доверьте свою красоту и здоровье профессионалам. Все врачи клиники имеют высшее медицинское образование и регулярно проходят стажировки.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {DOCTORS.map((doctor, index) => (
              <DoctorCard key={doctor.id} doctor={doctor} isChief={index === 0} />
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
