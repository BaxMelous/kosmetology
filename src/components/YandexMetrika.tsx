"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
  /** Идентификатор счётчика Яндекс Метрики */
  counterId: number;
};

/**
 * YandexMetrika — ленивая загрузка счётчика Яндекс Метрики.
 *
 * tag.js не грузится при первоначальном рендере (не блокирует Lighthouse).
 * Запуск происходит по первому взаимодействию пользователя (мышь, скролл, тач)
 * либо по таймауту 4 с. После инициализации хиты отправляются вручную при
 * каждом переходе SPA (Next.js App Router).
 */
export function YandexMetrika({ counterId }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Загрузка tag.js и первичная инициализация ──
  const bootstrap = useCallback(() => {
    if (initRef.current) return;
    initRef.current = true;

    // Удаляем слушатели — они больше не нужны
    cleanupListeners();

    // Очищаем таймаут безопасности
    if (timersRef.current) {
      clearTimeout(timersRef.current);
      timersRef.current = null;
    }

    // Уже инициализирован (Suspense мог перемонтировать)?
    if (window.__ymInit) return;
    window.__ymInit = true;

    // Создаём очередь для хитов, которые могут прийти до готовности счётчика
    window.__ymPendingHits = [];

    (function (d: Document, w: Window & typeof globalThis, c: string) {
      const g = w as unknown as Record<string, unknown>;
      const id = g[`yandex_metrika_callbacks`] as
        | Array<() => void>
        | undefined;
      const callbacks = id ?? [];
      g[`yandex_metrika_callbacks`] = callbacks;

      w.ym = function (...args: unknown[]) {
        const a = args as unknown[];
        (w.ym as unknown as { a: unknown[]; l: number }).a = a;
        (w.ym as unknown as { a: unknown[]; l: number }).l = 0;
      };

      const s = d.createElement("script");
      s.async = true;
      s.src = `https://mc.yandex.ru/metrika/tag.js`;

      const p = d.getElementsByTagName("script")[0];
      if (p && p.parentNode) {
        p.parentNode.insertBefore(s, p);
      } else {
        d.head.appendChild(s);
      }

      // После загрузки tag.js — инициализируем счётчик и сливаем очередь
      s.onload = () => {
        try {
          if (typeof w.ym === "function") {
            w.ym(counterId, "init", {
              defer: true,                     // не отправляем первый хит авто
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true,
            });

            // Сливаем отложенные хиты
            const pending = w.__ymPendingHits ?? [];
            while (pending.length > 0) {
              const url = pending.shift();
              if (url && typeof w.ym === "function") {
                w.ym(counterId, "hit", url);
              }
            }

            // Отправляем хит для текущей страницы
            const currentUrl = w.location.pathname + w.location.search;
            if (typeof w.ym === "function") {
              w.ym(counterId, "hit", currentUrl);
            }
          }
        } catch {
          // Игнорируем ошибки метрики
        }
      };
    })(document, window, `yandex_metrika_callbacks_${counterId}`);
  }, [counterId]);

  // ── Слушатели пользовательской активности ──
  const cleanupListeners = useCallback(() => {
    const events = ["mousemove", "scroll", "touchstart"] as const;
    events.forEach((evt) => window.removeEventListener(evt, bootstrap));
  }, [bootstrap]);

  // Монтируем слушатели + таймаут
  useEffect(() => {
    if (initRef.current) return;

    const events = ["mousemove", "scroll", "touchstart"] as const;
    events.forEach((evt) => window.addEventListener(evt, bootstrap, { once: true, passive: true }));

    // Таймаут безопасности: 4 с
    timersRef.current = setTimeout(bootstrap, 4000);

    return () => {
      cleanupListeners();
      if (timersRef.current) {
        clearTimeout(timersRef.current);
        timersRef.current = null;
      }
    };
  }, [bootstrap, cleanupListeners]);

  // ── SPA-переходы: отправка hit ──
  useEffect(() => {
    if (!initRef.current) {
      // Счётчик ещё не инициализирован — кладём URL в очередь
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
      if (window.__ymPendingHits) {
        window.__ymPendingHits.push(url);
      }
      return;
    }

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    try {
      if (typeof window !== "undefined" && typeof window.ym === "function") {
        window.ym(counterId, "hit", url);
      }
    } catch {
      // Игнорируем ошибки метрики
    }
  }, [pathname, searchParams, counterId]);

  return null; // Компонент ничего не рендерит
}
