export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "СитиМед Эстетика",
    "description": "Профессиональная косметология в Йошкар-Оле: SMAS-лифтинг, аппаратная и инъекционная косметология, контурная пластика, биоревитализация, чистка лица, пилинги.",
    "url": "https://kosmetolog-citymed.ru",
    "telephone": "+79276845454",
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
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "18:00",
      },
    ],
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
