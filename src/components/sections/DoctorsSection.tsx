import React from "react";
import { DOCTORS } from "@/lib/data";
import { DoctorCard } from "@/components/DoctorCard";

export function DoctorsSection() {
  return (
    <section id="doctors" className="bg-white py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-semibold text-slate-800 md:text-5xl">Наши специалисты</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Доверьте свою красоту и здоровье профессионалам. Все врачи клиники имеют высшее медицинское образование.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {DOCTORS.map((doctor, index) => (
            <DoctorCard key={doctor.id} doctor={doctor} isChief={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
