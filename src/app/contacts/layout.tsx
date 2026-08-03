import type { Metadata } from "next";
import { canonicalPath } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Контакты и адрес — косметология в Йошкар-Оле",
  description: "СитиМед Эстетика в Йошкар-Оле: адрес ул. Лобачевского, 1, телефон +7 (927) 684-54-54. Бесплатная парковка, удобный подъезд с Ленинского проспекта и ул. Зарубина.",
  alternates: { canonical: canonicalPath("/contacts") },
};

export default function ContactsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
