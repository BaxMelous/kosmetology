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
 * Запуск по первому взаимодействию (мышь/скролл/тач) либо таймауту 4 с.
 * Использует СТАНДАРТНУЮ заглушку ym с очередью вызовов — tag.js при загрузке
 * разбирает очередь и вызывает колбэки, в которых мы отправляем хиты вручную.
 */
export function YandexMetrika({ counterId }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Загрузка tag.js + инициализация (стандартный подход Яндекса) ──
  const bootstrap = useCallback(() => {
    if (initRef.current) return;
    initRef.current = true;

    cleanupListeners();
    if (timersRef.current) {
      clearTimeout(timersRef.current);
      timersRef.current = null;
    }

    if (window.__ymInit) return;
    window.__ymInit = true;

    // Очередь для хитов, накопленных до готовности счётчика
    window.__ymPendingHits = [];

    const w = window;
    const d = document;

    // ── Стандартная заглушка ym (как в официальном коде Яндекса) ──
    // Она сохраняет ВСЕ вызовы в массив ym.a, а tag.js при загрузке их разбирает.
    const ymStub = function (...args: unknown[]) {
      (ymStub.a = ymStub.a || []).push(args);
    } as ((...args: unknown[]) => void) & { a?: unknown[][]; l: number };
    ymStub.l = Number(new Date());
    w.ym = ymStub;

    // ── Очередь вызова init — tag.js выполнит его при загрузке ──
    // Параметры полностью соответствуют стандартному коду Яндекса
    w.ym(counterId, "init", {
      ssr: true,
      webvisor: true,
      clickmap: true,
      ecommerce: "dataLayer",
      referrer: document.referrer,
      url: location.href,
      accurateTrackBounce: true,
      trackLinks: true,
    });

    // ── Регистрируем колбэк на готовность счётчика ──
    const cbKey = "yandex_metrika_callbacks";
    const g = w as unknown as Record<string, unknown>;
    const cbs = (g[cbKey] as Array<() => void>) ?? [];
    g[cbKey] = cbs;

    cbs.push(() => {
      // Счётчик готов — сливаем накопленные хиты (SPA-переходы до инициализации)
      const pending = w.__ymPendingHits ?? [];
      w.__ymPendingHits = [];
      for (const url of pending) {
        if (typeof w.ym === "function") {
          try { w.ym(counterId, "hit", url); } catch { /* ok */ }
        }
      }
    });

    // ── Загружаем tag.js (с id счетчика в URL, как в стандартном коде) ──
    const s = d.createElement("script");
    s.async = true;
    s.src = `https://mc.yandex.ru/metrika/tag.js?id=${counterId}`;
    d.head.appendChild(s);
  }, [counterId]);

  // ── Слушатели пользовательской активности ──
  const cleanupListeners = useCallback(() => {
    const events = ["mousemove", "scroll", "touchstart"] as const;
    events.forEach((evt) => window.removeEventListener(evt, bootstrap));
  }, [bootstrap]);

  useEffect(() => {
    if (initRef.current) return;

    const events = ["mousemove", "scroll", "touchstart"] as const;
    events.forEach((evt) =>
      window.addEventListener(evt, bootstrap, { once: true, passive: true })
    );

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
  const buildUrl = useCallback(
    () =>
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : ""),
    [pathname, searchParams]
  );

  useEffect(() => {
    const url = buildUrl();

    if (!initRef.current) {
      // Счётчик ещё не запущен — кладём URL в очередь
      if (window.__ymPendingHits) {
        window.__ymPendingHits.push(url);
      }
      return;
    }

    // Счётчик готов — отправляем хит
    try {
      if (typeof window !== "undefined" && typeof window.ym === "function") {
        window.ym(counterId, "hit", url);
      }
    } catch {
      // Игнорируем ошибки
    }
  }, [buildUrl, counterId]);

  return null;
}
