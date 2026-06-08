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

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500"],
  fallback: ["Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Профессиональная косметология в СитиМед Эстетика | Йошкар-Ола",
  description: "Современные методики омоложения и ухода за кожей с использованием сертифицированных препаратов. Индивидуальный подход и видимый результат уже после первой процедуры.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className="h-full antialiased scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://static-maps.yandex.ru" />
      </head>
      <body className={`${inter.className} ${inter.variable} min-h-full flex flex-col bg-slate-50 text-slate-900`}>
        <AccessibilityProvider>
          <ConsultationModalProvider>
            <Header />
            <main className="grow pt-[96px] pb-24 lg:pb-0">
              {children}
            </main>
            <Footer />
            <MobileBottomNav />
          </ConsultationModalProvider>
        </AccessibilityProvider>
        {/* Яндекс Метрика: ленивая загрузка, обёрнута в Suspense для совместимости с SSG */}
        <Suspense fallback={null}>
          <YandexMetrika counterId={99121294} />
        </Suspense>
      </body>
    </html>
  );
}
