"use client";

import { useEffect, useRef, useState } from "react";
import { usePriority } from "@/components/PriorityLoader";

const ALL_HERO_VIDEOS = [
  "/video/hero-main.mp4",
  "/video/hero-doctors.mp4",
  "/video/hero-prices.mp4",
  "/video/hero-reviews.mp4",
  "/video/hero-before-after.mp4",
  "/video/hero-equipment.mp4",
  "/video/hero-contacts.mp4",
];

/** Проверяет, есть ли на странице незагруженные изображения */
function hasPendingImages(): boolean {
  const imgs = document.images;
  for (let i = 0; i < imgs.length; i++) {
    if (!imgs[i].complete) return true;
  }
  return false;
}

/**
 * PagePreloader — ждёт когда:
 * 1. Очередь приоритетов пуста
 * 2. Все <img> на странице загружены
 * 3. Прошло 5 секунд стабильного простоя
 * Только после этого начинает фоновую загрузку сжатых hero-видео.
 */
export function PagePreloader() {
  const { schedule, isIdle, pending } = usePriority();
  const [imagesDone, setImagesDone] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const started = useRef(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Проверяем загрузку изображений каждые 500 мс
  useEffect(() => {
    pollRef.current = setInterval(() => {
      if (!hasPendingImages()) {
        setImagesDone(true);
        if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
      }
    }, 500);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, []);

  // Запускаем предзагрузку только когда всё устаканилось
  useEffect(() => {
    const ready = isIdle && pending === 0 && imagesDone;
    if (!ready) {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = null;
      return;
    }

    if (!started.current) {
      idleTimer.current = setTimeout(() => {
        started.current = true;
        for (const path of ALL_HERO_VIDEOS) {
          schedule(
            `preload:${path}`,
            3,
            async () => { await fetch(path, { mode: "no-cors" }).catch(() => {}); },
            `preload ${path.split("/").pop()}`
          );
        }
      }, 5000);
    }

    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [isIdle, pending, imagesDone, schedule]);

  return null;
}


