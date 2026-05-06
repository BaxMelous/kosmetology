import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";

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
      <body className={`${inter.className} ${inter.variable} min-h-full flex flex-col bg-slate-50 text-slate-900`}>
        <Header />
        <main className="flex-grow pb-24 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
