import { CONTACTS } from "@/lib/data";

/**
 * Канонический адрес сайта. ОБЯЗАТЕЛЬНО задайте NEXT_PUBLIC_SITE_URL в окружении
 * продакшена — от этого значения зависят canonical, sitemap.xml, robots.txt и OG-теги.
 */
const FALLBACK_SITE_URL = "https://kosmetolog-citymed.ru";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || FALLBACK_SITE_URL).replace(
  /\/$/,
  ""
);

export const SITE_NAME = "СитиМед Эстетика";

export const SITE_DESCRIPTION =
  "Клиника косметологии «СитиМед Эстетика» в Йошкар-Оле: инъекционная и аппаратная косметология, " +
  "нитевой лифтинг, пилинги и уходовые процедуры. Врачи-дерматовенерологи, сертифицированные препараты.";

export const CITY = "Йошкар-Ола";
export const REGION = "Республика Марий Эл";

/** Телефон в формате E.164 — нужен и для schema.org, и для ссылок tel: */
export const PHONE_E164 = "+7" + CONTACTS.phone.replace(/\D/g, "").replace(/^[78]/, "");

export function absoluteUrl(path = "/") {
  return new URL(path, `${SITE_URL}/`).toString().replace(/\/$/, "") || SITE_URL;
}

/**
 * Часы работы для schema.org. Источник истины — CONTACTS.workingHours.
 * При изменении графика правьте `src/lib/data.ts`, а не эти константы.
 */
const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "20:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Saturday"],
    opens: "08:00",
    closes: "18:00",
  },
];

const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "ул. Лобачевского, 1",
  addressLocality: CITY,
  addressRegion: REGION,
  addressCountry: "RU",
};

/** Основная сущность организации. На неё ссылаются остальные блоки через @id. */
export const CLINIC_ID = `${SITE_URL}/#clinic`;

export function buildClinicJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "MedicalBusiness"],
    "@id": CLINIC_ID,
    name: SITE_NAME,
    alternateName: "СитиМед Эстетика — косметология в Йошкар-Оле",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    telephone: PHONE_E164,
    address: POSTAL_ADDRESS,
    areaServed: [
      { "@type": "City", name: CITY },
      { "@type": "AdministrativeArea", name: REGION },
    ],
    medicalSpecialty: ["Dermatology", "PlasticSurgery"],
    openingHoursSpecification: OPENING_HOURS,
    currenciesAccepted: "RUB",
    availableService: [
      "Инъекционная косметология",
      "Аппаратная косметология",
      "Нитевой лифтинг",
      "Химические пилинги",
      "Уходовые процедуры",
    ].map((name) => ({ "@type": "MedicalProcedure", name })),
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "ru-RU",
    publisher: { "@id": CLINIC_ID },
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildPhysicianJsonLd(doctor: {
  id: string;
  name: string;
  role?: string;
  specialties: string[];
  image?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": absoluteUrl(`/doctors/${doctor.id}`) + "#physician",
    name: doctor.name,
    url: absoluteUrl(`/doctors/${doctor.id}`),
    jobTitle: doctor.role || "Врач-косметолог",
    medicalSpecialty: "Dermatology",
    knowsAbout: doctor.specialties,
    ...(doctor.image ? { image: absoluteUrl(doctor.image) } : {}),
    worksFor: { "@id": CLINIC_ID },
    address: POSTAL_ADDRESS,
    telephone: PHONE_E164,
  };
}

/** Прайс-лист как ItemList c Offer — помогает Яндексу собирать товарные сниппеты. */
export function buildPriceListJsonLd(
  categories: { title: string; services: { id: string; name: string; price: string }[] }[]
) {
  const offers = categories.flatMap((category) =>
    category.services.map((service) => {
      const amount = Number(service.price.replace(/[^\d]/g, ""));

      return {
        "@type": "Offer",
        name: service.name,
        category: category.title,
        url: absoluteUrl(`/prices#${service.id}`),
        priceCurrency: "RUB",
        ...(Number.isFinite(amount) && amount > 0 ? { price: amount } : {}),
        availability: "https://schema.org/InStock",
        seller: { "@id": CLINIC_ID },
      };
    })
  );

  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `Цены на косметологию в ${CITY} — ${SITE_NAME}`,
    url: absoluteUrl("/prices"),
    itemListElement: offers,
  };
}

/** Единая точка вставки JSON-LD, чтобы не дублировать разметку script по компонентам. */
export function jsonLdScriptProps(data: object) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  } as const;
}
