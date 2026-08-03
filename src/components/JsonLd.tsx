import { ORGANIZATION_PROFILES, SITE_NAME, SITE_URL, openingHoursSpecification } from "@/lib/seo";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    // MedicalClinic — более точный подтип MedicalBusiness: и Google, и Яндекс
    // используют его для сопоставления сайта с карточкой организации.
    "@type": ["MedicalBusiness", "MedicalClinic"],
    "@id": `${SITE_URL}/#organization`,
    "name": SITE_NAME,
    "description": "Профессиональная косметология в Йошкар-Оле: SMAS-лифтинг, аппаратная и инъекционная косметология, контурная пластика, биоревитализация, чистка лица, пилинги.",
    "url": SITE_URL,
    "image": `${SITE_URL}/og-image.webp`,
    "logo": `${SITE_URL}/og-image.webp`,
    "telephone": "+79276845454",
    "medicalSpecialty": "Dermatology",
    "areaServed": {
      "@type": "City",
      "name": "Йошкар-Ола",
    },
    // Связывает сайт с карточками в Яндекс.Бизнесе и Google Business Profile.
    // Список задаётся в src/lib/seo.ts; пока он пуст — поле не выводится.
    ...(ORGANIZATION_PROFILES.filter(Boolean).length > 0
      ? { sameAs: ORGANIZATION_PROFILES.filter(Boolean) }
      : {}),
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ул. Лобачевского, 1",
      "addressLocality": "Йошкар-Ола",
      "addressRegion": "Республика Марий Эл",
      "postalCode": "424008",
      "addressCountry": "RU",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 56.6319,
      "longitude": 47.8784,
    },
    // Часы — из src/lib/seo.ts, тот же источник, что и подписи на сайте.
    "openingHoursSpecification": openingHoursSpecification(),
    "priceRange": "от 160 ₽",
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "SMAS-лифтинг",
          "description": "Безоперационная подтяжка лица и тела ультразвуком",
        },
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Ботулинотерапия",
          "description": "Разглаживание морщин препаратами ботулотоксина",
        },
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Контурная пластика",
          "description": "Коррекция формы губ и восполнение объемов лица",
        },
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Чистка лица",
          "description": "Атравматичная и механическая чистка лица",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
