import { DOCTORS } from "@/lib/data";
import { CtaConsultation } from "@/components/sections/CtaConsultation";
import { DoctorCard } from "@/components/DoctorCard";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function DoctorsPage() {
  return (
    <div className="bg-slate-50 pt-14">
      <ScrollReveal>
        <section className="container mx-auto max-w-7xl px-4 pb-16 md:px-8">
          <div className="mx-auto mb-14 max-w-4xl text-center">
            <h1 className="text-4xl font-semibold text-slate-800 md:text-6xl">Наши специалисты</h1>
            <p className="mt-4 text-lg text-slate-500">
              Доверьте свою красоту и здоровье профессионалам. Все врачи клиники имеют высшее медицинское образование и регулярно проходят стажировки.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
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
