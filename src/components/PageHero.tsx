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

  // ── Проверка соединения: на 2G/3G/saveData не грузим полное видео ──
  const canUpgrade = (() => {
    if (typeof navigator === "undefined") return true;
    const conn = (navigator as Navigator & { connection?: { effectiveType?: string; saveData?: boolean } }).connection;
    if (!conn) return true; // нет API → считаем быстрым
    if (conn.saveData) return false;
    const type = conn.effectiveType;
    return type !== "slow-2g" && type !== "2g" && type !== "3g";
  })();

  // ── Регистрируем сжатое видео в очереди с приоритетом 0 (пересоздаётся при навигации) ──
  useEffect(() => {
    setShouldLoad(false);
    setVideoLoaded(false);
    const id = `hero-video:${videoSrc}`;
    schedule(id, 0, async () => {
      setShouldLoad(true);
    }, `hero ${videoSrc}`);
  }, [videoSrc, schedule, pathname]);

  // ── Полное видео: загружается в скрытом элементе, заменяет сжатое только когда готово ──
  const upgradeToFullQuality = () => {
    if (upgradedRef.current || !canUpgrade) return;
    upgradedRef.current = true;

    const fullSrc = videoSrc.replace("/video/", "/video/full/");
    const mainVideo = videoRef.current;
    if (!mainVideo) return;

    // Создаём скрытый video-элемент для предзагрузки полного качества
    const preloader = document.createElement("video");
    preloader.preload = "auto";
    preloader.muted = true;
    preloader.playsInline = true;
    preloader.style.cssText = "position:absolute;width:1px;height:1px;opacity:0;pointer-events:none";
    preloader.src = fullSrc;
    // Добавляем в DOM — браузер начнёт загрузку
    mainVideo.parentNode?.insertBefore(preloader, mainVideo);

    let swapped = false;
    const doSwap = () => {
      if (swapped) return;
      swapped = true;
      const currentTime = mainVideo.currentTime;
      const wasPlaying = !mainVideo.paused;
      const source = mainVideo.querySelector("source");
      if (source) {
        source.src = fullSrc;
        mainVideo.load();
        mainVideo.currentTime = currentTime;
        if (wasPlaying) mainVideo.play().catch(() => {});
      }
      preloader.remove();
    };

    preloader.addEventListener("canplaythrough", doSwap, { once: true });
    // Fallback: если за 15 сек не загрузилось — удаляем прелоадер
    setTimeout(() => { if (!swapped) preloader.remove(); }, 15000);
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
