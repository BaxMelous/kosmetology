import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { AccessibilityProvider } from "@/components/AccessibilityProvider";
import { ConsultationModalProvider } from "@/components/ConsultationModal";
import { YandexMetrika } from "@/components/YandexMetrika";
import { PriorityLoaderProvider } from "@/components/PriorityLoader";
import { NavigationProgress } from "@/components/NavigationProgress";
import { PrefetchInjector } from "@/components/PageCache";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500"],
  fallback: ["Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kosmetolog-citymed.ru"),
  title: {
    default: "СитиМед Эстетика — профессиональная косметология в Йошкар-Оле",
    template: "%s | СитиМед Эстетика",
  },
  description: "Центр косметологии СитиМед Эстетика в Йошкар-Оле: ул. Лобачевского, 1. SMAS-лифтинг, контурная пластика, биоревитализация, ботулинотерапия от морщин, чистка лица, аппаратная коррекция фигуры. Запись: +7 (927) 684-54-54.",
  keywords: ["косметология йошкар-ола", "ситимед эстетика", "smas-лифтинг", "чистка лица", "контурная пластика", "аппаратная косметология", "ботулинотерапия", "убрать морщины", "липолитики", "полимолочная кислота", "экзосомы"],
  // ВНИМАНИЕ: не задавайте здесь alternates.canonical — Next наследует метаданные
  // в дочерние сегменты, и один canonical в корне проставится на ВСЕ страницы
  // сайта. Каждая страница объявляет свой canonical сама.
  openGraph: {
    title: "СитиМед Эстетика — косметология в Йошкар-Оле",
    description: "Центр косметологии в Йошкар-Оле: ул. Лобачевского, 1. SMAS-лифтинг, ботулинотерапия, контурная пластика, биоревитализация, чистка лица, пилинги, коррекция фигуры. Звоните: +7 (927) 684-54-54.",
    url: "https://kosmetolog-citymed.ru",
    siteName: "СитиМед Эстетика",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "СитиМед Эстетика — косметология в Йошкар-Оле",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className="h-full antialiased scroll-smooth relative"
      data-scroll-behavior="smooth"
    >
      <head />
      <body className={`${inter.className} ${inter.variable} min-h-full flex flex-col bg-slate-50 text-slate-900`}>
        <AccessibilityProvider>
          <ConsultationModalProvider>
            <PriorityLoaderProvider>
              <Header />
              <main className="grow pt-[96px] pb-24 lg:pb-0">
                {children}
              </main>
              <Footer />
              <MobileBottomNav />
              <NavigationProgress />
            </PriorityLoaderProvider>
          </ConsultationModalProvider>
        </AccessibilityProvider>
        {/* Яндекс Метрика: ленивая загрузка, обёрнута в Suspense для совместимости с SSG */}
        <Suspense fallback={null}>
          <YandexMetrika counterId={109738119} />
        </Suspense>
        {/* Noscript-пиксель для пользователей с отключённым JavaScript */}
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/109738119"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
