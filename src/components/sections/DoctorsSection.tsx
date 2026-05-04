import React from "react";
import Link from "next/link";
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
    <section id="doctors" className="bg-white py-10 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 text-center md:mb-16 md:flex-row md:items-end md:gap-6 md:text-left">
          <div className="space-y-3 md:space-y-4">
            <h2 className="text-2xl font-semibold text-slate-800 sm:text-3xl md:text-5xl">Наши специалисты</h2>
            <p className="mx-auto max-w-2xl text-slate-500 md:mx-0">
              Доверьте свою красоту и здоровье профессионалам. Все врачи клиники имеют высшее медицинское образование.
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
