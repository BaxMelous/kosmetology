"use client";

import React, { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { usePriority } from "@/components/PriorityLoader";

type PageHeroProps = {
  title: string;
  subtitle: string;
  videoSrc: string;
  posterSrc?: string;
  className?: string;
  videoFilter?: string;
};

/**
 * PageHero — премиальный верхний блок с фоновым видео.
 * - Постер грузится сразу через preload
 * - Сжатое видео — priority 0 (критическое, первым в очереди)
 * - Полное видео — priority 3 (фоном, после загрузки страницы)
 */
export function PageHero({
  title,
  subtitle,
  videoSrc,
  posterSrc,
  className,
  videoFilter = "brightness(1.1) blur(2px)",
}: PageHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pathname = usePathname();
  const { schedule } = usePriority();
  const [shouldLoad, setShouldLoad] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [posterReady, setPosterReady] = useState(false);
  const posterRetries = useRef(0);
  const posterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const upgradedRef = useRef(false);

  // ── Регистрируем сжатое видео в очереди с приоритетом 0 (пересоздаётся при навигации) ──
  useEffect(() => {
    setShouldLoad(false);
    setVideoLoaded(false);
    const id = `hero-video:${videoSrc}`;
    schedule(id, 0, async () => {
      setShouldLoad(true);
    }, `hero ${videoSrc}`);
  }, [videoSrc, schedule, pathname]);

  // ── Полное видео: грузится фоном, не через очередь (не конкурирует с контентом) ──
  const upgradeToFullQuality = () => {
    if (upgradedRef.current) return;
    upgradedRef.current = true;

    const fullSrc = videoSrc.replace("/video/", "/video/full/");
    const video = videoRef.current;
    if (!video) return;

    // Фоновая загрузка — не блокирует очередь
    fetch(fullSrc, { method: "HEAD" })
      .then((res) => {
        if (!res.ok) return;
        const currentTime = video.currentTime;
        const wasPlaying = !video.paused;
        const onCanPlay = () => {
          video.removeEventListener("canplay", onCanPlay);
          video.currentTime = currentTime;
          if (wasPlaying) video.play().catch(() => {});
        };
        video.addEventListener("canplay", onCanPlay);
        const source = video.querySelector("source");
        if (source) { source.src = fullSrc; video.load(); }
      })
      .catch(() => {});
  };

  // ── Предзагрузка постера: только <link rel="preload"> (не дублируем new Image) ──
  useEffect(() => {
    if (!posterSrc) {
      setPosterReady(true);
      return;
    }

    // preload даёт высокий приоритет, браузер сам кеширует
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = posterSrc;
    document.head.appendChild(link);

    // Отслеживаем загрузку постера через тег <img> в DOM (не в памяти)
    const img = document.createElement("img");
    img.src = posterSrc;
    // fetchpriority="high" — доп. гарантия приоритета для hero-изображения
    img.fetchPriority = "high";

    const onLoad = () => {
      setPosterReady(true);
      // Убираем preload чтобы не держать соединение
      document.head.removeChild(link);
    };
    const onError = () => {
      document.head.removeChild(link);
      if (posterRetries.current < 2) {
        posterRetries.current++;
        posterTimer.current = setTimeout(() => {
          img.src = posterSrc; // повторная попытка
        }, 1500);
      }
    };

    img.onload = onLoad;
    img.onerror = onError;

    // Не вставляем в DOM — браузер всё равно загрузит и закеширует src

    return () => {
      img.onload = null;
      img.onerror = null;
      if (posterTimer.current) clearTimeout(posterTimer.current);
    };
  }, [posterSrc]);

  const hideGradient = posterReady && videoLoaded;

  return (
    <div ref={containerRef} className={cn("container mx-auto max-w-7xl px-4 lg:px-8", className)}>
      <div className="mt-3 sm:mt-4 md:mt-6">
        <div className="relative overflow-hidden rounded-card bg-slate-50">
          {/* CSS-градиентный фон: виден сразу, исчезает когда всё готово */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 transition-opacity duration-700",
              hideGradient && "opacity-0"
            )}
          />

          {/* Видео: постер загружен отдельно, видео — лениво */}
          {shouldLoad && (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster={posterSrc}
              aria-hidden="true"
              onCanPlay={() => setVideoLoaded(true)}
              onPlaying={() => upgradeToFullQuality()}
              onError={() => setVideoLoaded(true)}
              className={cn(
                "absolute -inset-[1px] h-[calc(100%+2px)] w-[calc(100%+2px)] max-w-none object-cover transition-opacity duration-700",
                videoLoaded ? "opacity-100" : "opacity-0"
              )}
              style={{ filter: videoFilter }}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          )}

          {/* Белый градиентный оверлей: 90% слева → 0% к центру */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 via-60% to-transparent" />

          {/* Контент: текст виден мгновенно */}
          <div className="relative flex min-h-[50vh] flex-col justify-center px-6 py-12 sm:px-8 sm:py-16 md:min-h-[55vh] md:px-10 md:py-20 lg:min-h-[60vh] lg:px-12 lg:py-24">
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
