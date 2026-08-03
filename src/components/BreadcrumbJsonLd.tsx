/**
 * BreadcrumbJsonLd — хлебные крошки для поисковой выдачи.
 * Генерирует структурированные данные BreadcrumbList.
 */
import { absoluteUrl } from "@/lib/seo";

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  if (!items.length) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
