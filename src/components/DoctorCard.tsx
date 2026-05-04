import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Doctor } from "@/lib/data";

type DoctorCardProps = {
  doctor: Doctor;
  isChief?: boolean;
};

export function DoctorCard({ doctor, isChief = false }: DoctorCardProps) {
  return (
    <article className="flex h-full min-w-0 flex-col rounded-3xl border border-slate-100 bg-white p-5 text-center shadow-sm sm:p-6 lg:p-7 lg:text-left">
      <div className="relative mb-8">
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
        <div className="mx-auto mt-6 h-36 w-36 rounded-full bg-slate-300 sm:h-40 sm:w-40 lg:h-44 lg:w-44"></div>
      </div>

      <h3 className="mb-2 break-words text-xl font-semibold leading-snug text-slate-800 sm:text-2xl">
        {doctor.name}
      </h3>
      <p className="mb-6 break-words text-sm font-normal text-slate-500">
        {doctor.role}
      </p>

      <div className="mt-auto">
        <Link href={`/contacts?doctor=${doctor.id}`} className="block">
          <Button className="h-11 w-full rounded-xl bg-orange-500 px-6 font-medium text-white transition-all duration-300 hover:bg-orange-600">
            Записаться
          </Button>
        </Link>
      </div>
    </article>
  );
}
