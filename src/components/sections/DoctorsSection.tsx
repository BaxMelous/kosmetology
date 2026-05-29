import React from "react";
import { Link } from "@/components/Link";
import { ArrowRight } from "lucide-react";
import type { Doctor } from "@/lib/data";
import { DoctorCard } from "@/components/DoctorCard";

type DoctorsSectionProps = {
  doctors: Doctor[];
  limit?: number;
};

export function DoctorsSection({ doctors, limit }: DoctorsSectionProps) {
  const visibleDoctors = typeof limit === "number" ? doctors.slice(0, limit) : doctors;

  return (
    <section id="doctors" className="py-10 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 md:mb-16 md:flex-row md:items-center md:gap-6">
          <div className="space-y-4">
            <div className="mb-6 h-px w-12 bg-[#F97316]/40 md:mb-8 md:w-16" />
            <h2 className="text-xl font-light tracking-[0.08em] text-[#1a1a2e] sm:text-2xl md:text-3xl">Наши специалисты</h2>
            <p className="max-w-lg text-sm font-light leading-[1.6] tracking-[0.02em] text-[#888] sm:text-base">
              Наши врачи постоянно повышают квалификацию, следят за новыми методиками и искренне любят свою работу. Красота и безопасность — их главный приоритет.
            </p>
          </div>
          <Link
            href="/doctors"
            className="group inline-flex items-center justify-center font-medium text-orange-500 transition-all duration-300 hover:text-orange-600 md:justify-start"
          >
            Все специалисты
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {visibleDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} isChief={doctor.isChief} />
          ))}
        </div>
      </div>
    </section>
  );
}
