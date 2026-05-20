"use client";

import React from "react";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  subtitle: string;
  videoSrc: string;
  className?: string;
};

/**
 * PageHero — премиальный верхний блок с фоновым видео.
 * Белый градиентный оверлей, матовое стекло под текстом,
 * тёмный текст на светлом фоне. Выравнивание под логотип в шапке.
 */
export function PageHero({ title, subtitle, videoSrc, className }: PageHeroProps) {
  return (
    <div className={cn("container mx-auto max-w-7xl px-4 lg:px-8", className)}>
      <div className="mt-3 sm:mt-4 md:mt-6">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Фоновое видео: лёгкая яркость + мягкий блюр для «мечтательности» */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "brightness(1.1) blur(2px)" }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>

          {/* Белый градиентный оверлей: 90% слева → 0% к центру */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 via-60% to-transparent" />

          {/* Контент */}
          <div className="relative flex min-h-[280px] flex-col justify-center px-6 py-12 sm:min-h-[340px] sm:px-8 sm:py-16 md:min-h-[400px] md:px-10 md:py-20 lg:min-h-[440px] lg:px-12 lg:py-24">
            <div className="relative max-w-xl">
              <h1 className="text-2xl font-bold leading-tight text-slate-800 sm:text-3xl md:text-4xl lg:text-5xl">
                {title}
              </h1>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base md:text-lg">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
