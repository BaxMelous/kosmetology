import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  buildClinicJsonLd,
  buildWebSiteJsonLd,
  jsonLdScriptProps,
} from "@/lib/seo";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
  fallback: ["Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Косметология в Йошкар-Оле — клиника «СитиМед Эстетика»",
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "косметология Йошкар-Ола",
    "косметолог Йошкар-Ола",
    "клиника косметологии Йошкар-Ола",
    "ботулинотерапия Йошкар-Ола",
    "биоревитализация Йошкар-Ола",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName: SITE_NAME,
    title: "Косметология в Йошкар-Оле — клиника «СитиМед Эстетика»",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Косметология в Йошкар-Оле — клиника «СитиМед Эстетика»",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    // Значения подставляются из окружения после подтверждения прав
    // в Яндекс.Вебмастере и Google Search Console.
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
  formatDetection: {
    telephone: true,
    address: true,
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
      className="h-full antialiased scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <body className={`${inter.className} ${inter.variable} min-h-full flex flex-col bg-slate-50 text-slate-900`}>
        <script {...jsonLdScriptProps(buildClinicJsonLd())} />
        <script {...jsonLdScriptProps(buildWebSiteJsonLd())} />
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
