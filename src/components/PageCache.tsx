"use client";

import { useEffect, useRef } from "react";

/**
 * PrefetchInjector — вставляет <link rel="prefetch"> для всех страниц сайта.
 * Браузер скачивает HTML в фоне → HTTP-кеш → навигация мгновенная.
 * Не требует Service Worker, работает в HTTP и HTTPS.
 */
export function PrefetchInjector() {
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;
    doneRef.current = true;

    // Ждём 2 секунды чтобы не мешать LCP
    const timer = setTimeout(() => {
      const pages = [
        "/doctors/",
        "/prices/",
        "/equipment/",
        "/before-after/",
        "/reviews/",
        "/contacts/",
        "/legal/",
      ];

      const fragment = document.createDocumentFragment();
      for (const page of pages) {
        if (page === window.location.pathname) continue;
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.as = "document";
        link.href = page;
        fragment.appendChild(link);
      }
      document.head.appendChild(fragment);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return null;
}

