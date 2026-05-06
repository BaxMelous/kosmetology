import Link from "next/link";
import { DoctorAvatar } from "@/components/DoctorAvatar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Doctor } from "@/lib/data";

type DoctorCardProps = {
  doctor: Doctor;
  isChief?: boolean;
};

export function DoctorCard({ doctor, isChief = false }: DoctorCardProps) {
  return (
    <Link href={`/doctors/${doctor.id}`} className="block h-full active:scale-[0.98] active:opacity-80 transition-all duration-200">
      <article className="flex h-full min-w-0 flex-col rounded-3xl border border-slate-100 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6 lg:p-7 lg:text-left">
        <div className="relative mb-5 md:mb-8">
          <div className="absolute left-0 top-0 z-10 flex flex-col gap-2 lg:left-0">
            {isChief && (
              <span className="max-w-full rounded-full bg-lime-200 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-900 sm:px-4 sm:text-xs">
                Главный врач
              </span>
            )}
            <span className="max-w-full rounded-full bg-lime-200 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-900 sm:px-4 sm:text-xs">
              {doctor.experience ?? "Опыт 10 лет"}
            </span>
          </div>
          <div className="relative mx-auto mt-6 h-28 w-28 overflow-hidden rounded-full bg-slate-100 sm:h-36 sm:w-36 md:h-40 md:w-40 lg:h-44 lg:w-44">
            <DoctorAvatar
              src={doctor.image}
              alt={doctor.name}
              fallbackLetter={doctor.name.charAt(0)}
            />
          </div>
        </div>

        <h3 className="mb-2 break-words text-lg font-semibold leading-snug text-slate-800 sm:text-xl md:text-2xl">
          {doctor.name}
        </h3>
        <p className="mb-4 md:mb-6 break-words text-sm font-normal text-slate-500">
          {doctor.role}
        </p>

        <div className="mt-auto">
          <span
            className={cn(
              buttonVariants({ className: "h-11 w-full rounded-xl bg-orange-500 px-6 font-medium text-white hover:bg-orange-600" }),
              "pointer-events-none"
            )}
          >
            Подробнее
          </span>
        </div>
      </article>
    </Link>
  );
}
