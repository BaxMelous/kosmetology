import { Link } from "@/components/Link";
import Image from "next/image";
import type { Doctor } from "@/lib/data";

type DoctorCardProps = {
  doctor: Doctor;
  isChief?: boolean;
};

/**
 * DoctorCard — карточка врача в стиле «современный люкс».
 * Вертикальное фото, стеклянные бейджи, чистая типографика.
 */
export function DoctorCard({ doctor, isChief = false }: DoctorCardProps) {
  return (
    <Link
      href={`/doctors/${doctor.id}`}
      className="group block h-full active:scale-[0.98] transition-transform duration-200"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
        {/* === Фото: верхние ~68% карточки === */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
          {doctor.image ? (
            <>
              <Image
                src={doctor.image}
                alt={doctor.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ borderRadius: "0 0 24px 24px" }}
              />
              {/* Градиент: плавный переход от фото к белому */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white via-white/40 to-transparent" />
            </>
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
              <span className="text-6xl font-light text-slate-300">
                {doctor.name.charAt(0)}
              </span>
            </div>
          )}

          {/* === Стеклянные бейджи === */}
          <div className="absolute left-3 top-3 z-10 flex flex-col items-start gap-2 sm:left-4 sm:top-4">
            {isChief && (
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/50 px-3 py-1 text-[11px] font-light uppercase tracking-[0.12em] text-slate-600 backdrop-blur-[12px] sm:text-xs" style={{ background: "rgba(255,255,255,0.4)" }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#F97316" }} />
                Ведущий косметолог
              </span>
            )}
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/50 px-3 py-1 text-[11px] font-light uppercase tracking-[0.12em] text-slate-600 backdrop-blur-[12px] sm:text-xs" style={{ background: "rgba(255,255,255,0.4)" }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#A3B903" }} />
              {doctor.experience ?? "Опыт 10 лет"}
            </span>
          </div>
        </div>

        {/* === Контент === */}
        <div className="flex flex-1 flex-col justify-between px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
          <div className="space-y-1.5">
            <h3 className="text-base font-medium tracking-[0.01em] text-slate-800 sm:text-lg">
              {doctor.name}
            </h3>
            <p className="text-xs leading-[1.5] text-[#777] sm:text-sm">
              {doctor.role}
            </p>
          </div>

          {/* Кнопка «Подробнее» */}
          <span className="mt-4 inline-flex h-9 w-fit items-center rounded-xl border px-4 text-xs font-medium text-[#F97316] transition-all duration-300 group-hover:border-[#F97316] group-hover:bg-[#F97316] group-hover:text-white sm:h-10 sm:px-5 sm:text-sm" style={{ borderColor: "#F97316" }}>
            Подробнее
          </span>
        </div>
      </article>
    </Link>
  );
}

