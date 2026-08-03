/**
 * Единая точка правды для канонических адресов и структурированных данных.
 *
 * ВАЖНО: в next.config.ts включён `trailingSlash: true` — страницы отдаются
 * по адресам со слешем на конце (/prices/). Канонический URL обязан совпадать
 * с реальным адресом страницы, иначе поисковик видит рассогласование.
 */

export const SITE_URL = "https://kosmetolog-citymed.ru";

export const SITE_NAME = "СитиМед Эстетика";

export const CITY = "Йошкар-Ола";
export const REGION = "Республика Марий Эл";

/**
 * Телефон — единый источник для сайта и разметки.
 * Формат для показа и он же, приведённый к E.164 для schema.org и ссылок tel:.
 * NAP (название/адрес/телефон) должен посимвольно совпадать с карточками
 * в Яндекс.Бизнесе и Google Business Profile — расхождение мешает локальной выдаче.
 */
export const PHONE_DISPLAY = "+7 (927) 684-54-54";
export const PHONE_E164 = `+${PHONE_DISPLAY.replace(/\D/g, "")}`;

/**
 * Профили организации во внешних сервисах — уходят в schema.org `sameAs`.
 * Это то, что связывает сайт с карточками в Яндекс.Бизнесе и Google Business
 * Profile: поисковик понимает, что сайт и карточка — одна и та же организация.
 *
 * Заполните ссылками на карточки (публичный адрес карточки, не адрес панели
 * управления). Пустые строки отфильтровываются и в разметку не попадают.
 */
export const ORGANIZATION_PROFILES: string[] = [
  // Карточка «СитиМед Эстетика» в Яндекс.Бизнесе (ул. Лобачевского, 1).
  // Это НЕ карточка медцентра «СитиМед» (org/sitimed/80990739915) — та относится
  // к другой организации, и смешивать их в sameAs нельзя.
  "https://yandex.ru/maps/org/sitimed_estetika/84936725841/",
  // Google Business Profile — добавить, когда будет публичная ссылка на карточку.
];

/**
 * Часы работы — ЕДИНЫЙ источник правды.
 * Отсюда берутся и подписи на сайте (CONTACTS.workingHours в src/lib/data.ts),
 * и openingHoursSpecification в schema.org. Меняете график — правите только здесь,
 * иначе разметка разойдётся с карточками в Яндекс.Бизнесе и Google Business Profile.
 */
export const OPENING_HOURS = [
  {
    label: "Пн–Пт",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "20:00",
  },
  {
    label: "Сб",
    days: ["Saturday"],
    opens: "08:00",
    closes: "18:00",
  },
] as const;

export const CLOSED_DAY_LABEL = "Вс: выходной";

/** "08:00" → "8:00": на сайте часы показываются без ведущего нуля. */
function trimLeadingZero(time: string): string {
  return time.replace(/^0/, "");
}

/** Подпись вида «Пн–Пт: 8:00–20:00» для вывода на страницах. */
export function formatOpeningHours(entry: (typeof OPENING_HOURS)[number]): string {
  return `${entry.label}: ${trimLeadingZero(entry.opens)}–${trimLeadingZero(entry.closes)}`;
}

/** openingHoursSpecification для schema.org. */
export function openingHoursSpecification() {
  return OPENING_HOURS.map((entry) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [...entry.days],
    opens: entry.opens,
    closes: entry.closes,
  }));
}

/**
 * Канонический адрес страницы.
 * Принимает путь вида "/prices" и приводит его к "/prices/".
 */
export function canonicalPath(path = "/"): string {
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }
  return path.endsWith("/") ? path : `${path}/`;
}

/** Абсолютный канонический URL — нужен там, где относительный путь не годится (JSON-LD). */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${canonicalPath(path)}`;
}

/** Пропсы для <script type="application/ld+json">. */
export function jsonLdScriptProps(schema: unknown) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(schema) },
  } as const;
}

export const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "ул. Лобачевского, 1",
  addressLocality: CITY,
  addressRegion: REGION,
  postalCode: "424008",
  addressCountry: "RU",
} as const;

type DoctorLike = {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  image: string | null;
};

/**
 * Physician — карточка врача как медицинского специалиста.
 * `worksFor` ссылается на @id организации с главной: так поисковик связывает
 * врача с клиникой, а не считает его отдельной организацией.
 */
export function buildPhysicianJsonLd(doctor: DoctorLike) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${absoluteUrl(`/doctors/${doctor.id}`)}#physician`,
    name: doctor.name,
    jobTitle: doctor.role,
    medicalSpecialty: "Dermatology",
    knowsAbout: doctor.specialties,
    url: absoluteUrl(`/doctors/${doctor.id}`),
    ...(doctor.image ? { image: `${SITE_URL}${doctor.image}` } : {}),
    worksFor: { "@id": `${SITE_URL}/#organization` },
    address: POSTAL_ADDRESS,
    telephone: PHONE_E164,
  };
}

type ServiceLike = { id: string; name: string; price: string; description?: string };
type CategoryLike = { id: string; title: string; services: ServiceLike[] };

/** "7500 ₽" → "7500". Возвращает null, если число не распознано. */
function parsePrice(price: string): string | null {
  const digits = price.replace(/[^\d]/g, "");
  return digits.length > 0 ? digits : null;
}

/**
 * OfferCatalog — прайс-лист в машиночитаемом виде.
 * Даёт поисковику цены явно, а не только текстом на странице.
 */
export function buildOfferCatalogJsonLd(categories: CategoryLike[]) {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `Прайс-лист — косметология в ${CITY}`,
    url: absoluteUrl("/prices"),
    provider: { "@id": `${SITE_URL}/#organization` },
    itemListElement: categories.map((category) => ({
      "@type": "OfferCatalog",
      name: category.title,
      itemListElement: category.services
        .map((service) => {
          const price = parsePrice(service.price);
          if (!price) return null;
          return {
            "@type": "Offer",
            name: service.name,
            price,
            priceCurrency: "RUB",
            url: `${absoluteUrl("/prices")}#${service.id}`,
            availability: "https://schema.org/InStock",
            itemOffered: {
              "@type": "Service",
              name: service.name,
              ...(service.description ? { description: service.description } : {}),
              provider: { "@id": `${SITE_URL}/#organization` },
            },
          };
        })
        .filter(Boolean),
    })),
  };
}
