"use client";

import { useEffect, useRef, useState } from "react";
import { priorityQueue, type PriorityLevel } from "@/lib/priority-loader";
import { usePathname } from "next/navigation";

/**
 * usePriorityLoad — хук для секций страницы.
 * Возвращает shouldLoad: true когда секции пора загружаться.
 * Viewport boost через IntersectionObserver.
 */
export function usePriorityLoad(priority: PriorityLevel, label?: string) {
  const pathname = usePathname();
  const ref = useRef<HTMLElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const idRef = useRef(`${pathname}:${label ?? priority}-${Math.random().toString(36).slice(2, 6)}`);

  // Viewport boost
  useEffect(() => {
    const el = ref.current;
    if (!el || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          priorityQueue.boost(idRef.current);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoad]);

  // Регистрируем в очереди
  useEffect(() => {
    const id = idRef.current;
    priorityQueue.enqueue({
      id,
      priority,
      page: pathname,
      execute: async () => {
        setShouldLoad(true);
      },
      label: label ?? `section-${priority}`,
    });
  }, [pathname, priority, label]);

  return { shouldLoad, ref };
}

