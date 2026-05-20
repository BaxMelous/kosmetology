"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  subtitle: string;
  videoSrc: string;
  className?: string;
};

/**
 * PageHero — премиальный верхний блок с фоновым видео.
 * Видео загружается лениво через IntersectionObserver,
 * не блокирует FCP/LCP. Показывается CSS-градиент по умолчанию.
 */
export function PageHero({ title, subtitle, videoSrc, className }: PageHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={cn("container mx-auto max-w-7xl px-4 lg:px-8", className)}>
      <div className="mt-3 sm:mt-4 md:mt-6">
        <div className="relative overflow-hidden rounded-3xl">
          {/* CSS-градиентный фон — виден сразу, не ждёт видео */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 transition-opacity duration-700",
              videoLoaded && "opacity-0"
            )}
          />

          {/* Видео: постер 2.4 КБ становится LCP-элементом мгновенно */}
          {shouldLoad && (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster="/video/hero-poster.jpg"
              aria-hidden="true"
              onCanPlay={() => setVideoLoaded(true)}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
                videoLoaded ? "opacity-100" : "opacity-0"
              )}
              style={{ filter: "brightness(1.1) blur(2px)" }}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          )}

          {/* Белый градиентный оверлей: 90% слева → 0% к центру */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 via-60% to-transparent" />

          {/* Контент: текст виден мгновенно */}
          <div className="relative flex min-h-[280px] flex-col justify-center px-6 py-12 sm:min-h-[340px] sm:px-8 sm:py-16 md:min-h-[400px] md:px-10 md:py-20 lg:min-h-[440px] lg:px-12 lg:py-24">
            <div className="relative max-w-xl">
              <h1 className="text-xl font-medium leading-tight tracking-[-0.02em] text-slate-800 sm:text-2xl md:text-3xl lg:text-4xl">
                {title}
              </h1>
              <p className="mt-3 max-w-lg text-sm leading-[1.6] text-slate-400 sm:mt-4 sm:text-base md:text-lg">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
