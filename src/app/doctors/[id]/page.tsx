import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { notFound } from "next/navigation";
import { getCosmetologyDoctors, getDoctorById } from "@/lib/api/doctors";
import { CONTACTS } from "@/lib/data";
import { buildBreadcrumbJsonLd, buildPhysicianJsonLd, jsonLdScriptProps } from "@/lib/seo";

/**
 * Пререндерим карточки врачей, чтобы они отдавались статикой:
 * поисковый робот получает готовый HTML, а не ждёт ответа бэкенда.
 */
export async function generateStaticParams() {
  const doctors = await getCosmetologyDoctors();

  return doctors.map((doctor) => ({ id: doctor.id }));
}

type DoctorPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatDoctorMetaTitle(name: string) {
  const [surname = "", firstName = "", patronymic = ""] = name.split(" ");
  const initials = [firstName, patronymic].filter(Boolean).map((part) => `${part[0]}.`).join("");
  // Суффикс с названием клиники добавляет title.template из корневого layout.
  return `${surname} ${initials} — врач-косметолог в Йошкар-Оле`.replace(/\s+/g, " ").trim();
}

function buildDoctorMetaDescription(name: string, specialties: string[]) {
  const specialtyLine = specialties.slice(0, 3).join(", ");
  return `${name} — врач-косметолог клиники «СитиМед Эстетика» в Йошкар-Оле. Специализации: ${specialtyLine}. Запись на приём по телефону или онлайн.`;
}

function DetailSection({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="mt-8">
      <h3 className="mb-4 text-xl font-medium text-slate-900">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-slate-600">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export async function generateMetadata({ params }: DoctorPageProps): Promise<Metadata> {
  const { id } = await params;
  const doctor = await getDoctorById(id);

  if (!doctor) {
    return {
      title: "Врач не найден",
      description: "Специалист не найден в каталоге клиники СитиМед Эстетика.",
      robots: { index: false, follow: true },
    };
  }

  const title = formatDoctorMetaTitle(doctor.name);
  const description = buildDoctorMetaDescription(doctor.name, doctor.specialties);

  return {
    title,
    description,
    alternates: { canonical: `/doctors/${doctor.id}` },
    openGraph: {
      type: "profile",
      url: `/doctors/${doctor.id}`,
      title,
      description,
    },
  };
}

export default async function DoctorDetailPage({ params }: DoctorPageProps) {
  const { id } = await params;
  const doctor = await getDoctorById(id);

  if (!doctor) {
    notFound();
  }

  return (
    <main className="bg-slate-50 pt-8 md:pt-14">
      <script {...jsonLdScriptProps(buildPhysicianJsonLd(doctor))} />
      <script
        {...jsonLdScriptProps(
          buildBreadcrumbJsonLd([
            { name: "Главная", path: "/" },
            { name: "Врачи", path: "/doctors" },
            { name: doctor.name, path: `/doctors/${doctor.id}` },
          ])
        )}
      />
      <section className="container mx-auto max-w-7xl px-4 pb-12 md:px-8 md:pb-20">
        <Link
          href="/doctors"
          className="inline-flex items-center gap-2 text-slate-500 transition-colors hover:text-orange-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад к списку врачей
        </Link>

        <div className="mt-8 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="overflow-hidden rounded-3xl bg-white p-4 shadow-sm md:p-5">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-slate-100">
                {doctor.image ? (
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    quality={70}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 text-6xl font-semibold text-slate-500">
                    {doctor.name.charAt(0)}
                  </div>
                )}
              </div>
              <Link
                href={`/contacts?doctor=${doctor.id}`}
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-orange-500 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-600"
              >
                Записаться на прием
              </Link>
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h1 className="text-4xl font-semibold text-slate-900">{doctor.name}</h1>
              <p className="mt-3 text-lg text-slate-500">{doctor.specialties.join(", ")}</p>

              <DetailSection title="Образование" items={doctor.education ?? []} />
              <DetailSection title="Направления деятельности" items={doctor.directions ?? []} />
              <DetailSection title="Опыт работы" items={doctor.workExperience ?? []} />

              {doctor.experience && (
                <section className="mt-8">
                  <h3 className="mb-4 text-xl font-medium text-slate-900">Опыт работы</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-slate-600">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                      <span>{doctor.experience}</span>
                    </li>
                  </ul>
                </section>
              )}

              <div className="mt-10 rounded-3xl border border-slate-100 bg-slate-50 p-6">
                <h3 className="text-xl font-medium text-slate-900">Запись на прием</h3>
                <p className="mt-3 text-slate-600">
                  Для записи к специалисту свяжитесь с клиникой по телефону {CONTACTS.phone} или оставьте заявку через форму обратной связи.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
