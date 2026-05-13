import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { AccessibilityProvider } from "@/components/AccessibilityProvider";
import { ConsultationModalProvider } from "@/components/ConsultationModal";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
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
        <link rel="preconnect" href="https://static-maps.yandex.ru" />
      </head>
      <body className={`${inter.className} ${inter.variable} min-h-full flex flex-col bg-slate-50 text-slate-900`}>
        <AccessibilityProvider>
          <ConsultationModalProvider>
            <Header />
            <main className="flex-grow pb-24 lg:pb-0">
              {children}
            </main>
            <Footer />
            <MobileBottomNav />
          </ConsultationModalProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
