import type { Metadata } from "next";
import { ContactsPageClient } from "@/components/ContactsPageClient";
import { buildBreadcrumbJsonLd, jsonLdScriptProps } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Контакты — косметология в Йошкар-Оле",
  description:
    "Адрес клиники косметологии «СитиМед Эстетика» в Йошкар-Оле: ул. Лобачевского, 1. " +
    "Телефон, часы работы, схема проезда, бесплатная парковка и остановки общественного транспорта.",
  alternates: { canonical: "/contacts" },
  openGraph: {
    url: "/contacts",
    title: "Контакты — косметология «СитиМед Эстетика», Йошкар-Ола",
    description: "Йошкар-Ола, ул. Лобачевского, 1. Телефон, часы работы и как добраться.",
  },
};

export default function ContactsPage() {
  return (
    <>
      <script
        {...jsonLdScriptProps(
          buildBreadcrumbJsonLd([
            { name: "Главная", path: "/" },
            { name: "Контакты", path: "/contacts" },
          ])
        )}
      />
      <ContactsPageClient />
    </>
  );
}
