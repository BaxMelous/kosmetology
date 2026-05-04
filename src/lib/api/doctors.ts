import { cache } from "react";
import { buildFileUrl, fetchApi } from "@/lib/api/client";
import { DOCTORS, type Doctor } from "@/lib/data";
import type { ExternalDoctorDto } from "@/lib/types/api";

const COSMETOLOGY_SPECIALIZATION_PATTERN = /(космет|дерматолог)/i;
const CHIEF_DOCTOR_NAME = "бахтина марина александровна";
const EDUCATION_SECTION_PATTERN =
  /образование|интернатура|ординатура|переподготовка|повышение квалификации|дополнительная профессиональная программа/i;
const EXPERIENCE_SECTION_PATTERN = /опыт работы|стаж/i;

function formatDoctorName(doctor: ExternalDoctorDto) {
  return [doctor.surname, doctor.name, doctor.patronymic].filter(Boolean).join(" ");
}

function formatDoctorRole(doctor: ExternalDoctorDto) {
  const uniqueSpecializations = Array.from(
    new Set(doctor.specializations.map((specialization) => specialization.name.replaceAll("_", " ").trim()))
  );

  return uniqueSpecializations.join(", ");
}

function isChiefDoctor(doctor: ExternalDoctorDto) {
  return formatDoctorName(doctor).toLowerCase() === CHIEF_DOCTOR_NAME;
}

function isCosmetologyDoctor(doctor: ExternalDoctorDto) {
  return doctor.specializations.some((specialization) =>
    COSMETOLOGY_SPECIALIZATION_PATTERN.test(specialization.name)
  );
}

function normalizeDescriptionLine(line: string) {
  return line
    .replace(/^\*\*|\*\*$/g, "")
    .replace(/\*\*/g, "")
    .replace(/\s{2,}/g, " ")
    .trim()
    .replace(/:+$/, "");
}

function extractDescriptionSections(description: string | null) {
  if (!description) {
    return {
      education: [] as string[],
      workExperience: [] as string[],
    };
  }

  const matches = Array.from(description.matchAll(/\*\*([^*]+)\*\*:?\s*([\s\S]*?)(?=\n\s*\*\*[^*]+\*\*:?\s*|$)/g));
  const education: string[] = [];
  const workExperience: string[] = [];

  for (const [, heading, rawContent] of matches) {
    const title = heading.trim();
    const contentLines = rawContent
      .split("\n")
      .map((line) => normalizeDescriptionLine(line))
      .filter(Boolean);

    if (contentLines.length === 0) {
      continue;
    }

    const formattedBlock = `${title}: ${contentLines.join(" ")}`;

    if (EDUCATION_SECTION_PATTERN.test(title)) {
      education.push(formattedBlock);
      continue;
    }

    if (EXPERIENCE_SECTION_PATTERN.test(title)) {
      workExperience.push(formattedBlock);
    }
  }

  if (education.length === 0) {
    const fallbackLines = description
      .split("\n")
      .map((line) => normalizeDescriptionLine(line))
      .filter(Boolean);

    if (fallbackLines.length > 0) {
      education.push(...fallbackLines);
    }
  }

  return { education, workExperience };
}

function mapDoctorToCard(doctor: ExternalDoctorDto): Doctor {
  const descriptionSections = extractDescriptionSections(doctor.description);

  return {
    id: doctor.id,
    name: formatDoctorName(doctor),
    role: formatDoctorRole(doctor),
    experience: doctor.experience ?? undefined,
    specialties: doctor.specializations.map((specialization) => specialization.name.replaceAll("_", " ").trim()),
    description: doctor.description ?? undefined,
    image: buildFileUrl(doctor.photoFileId),
    isChief: isChiefDoctor(doctor),
    directions: doctor.directions.map((direction) => direction.name),
    education: descriptionSections.education,
    workExperience: descriptionSections.workExperience,
  };
}

function getFallbackDoctors(): Doctor[] {
  return DOCTORS.map((doctor) => ({
    ...doctor,
    isChief: doctor.id === "bakhtina",
    directions: [],
    education: [],
    workExperience: [],
  }));
}

export const getCosmetologyDoctors = cache(async (): Promise<Doctor[]> => {
  const doctors = await fetchApi<ExternalDoctorDto[]>("/dictionary/doctors");

  if (!doctors) {
    return getFallbackDoctors();
  }

  const cosmetologyDoctors = doctors.filter(isCosmetologyDoctor).map(mapDoctorToCard);
  return cosmetologyDoctors.length > 0 ? cosmetologyDoctors : getFallbackDoctors();
});

export const getDoctorById = cache(async (id: string): Promise<Doctor | null> => {
  const doctors = await getCosmetologyDoctors();
  return doctors.find((doctor) => doctor.id === id) ?? null;
});
