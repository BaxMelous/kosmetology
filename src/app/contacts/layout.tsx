import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты и адрес",
  description: "СитиМед Эстетика в Йошкар-Оле: адрес ул. Лобачевского, 1, телефон +7 (927) 684-54-54. Бесплатная парковка, удобный подъезд с Ленинского проспекта и ул. Зарубина.",
};

export default function ContactsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
