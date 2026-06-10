"use client";

import { useCallback, useRef } from "react";
import NextLink from "next/link";
import type { ComponentProps } from "react";

/**
 * Link — обёртка над next/link с умным prefetch.
 * Предзагружает страницу ТОЛЬКО при наведении курсора (не при попадании во viewport).
 * Экономит трафик на слабом интернете и не конкурирует с текущим контентом.
 */
export function Link(props: ComponentProps<typeof NextLink>) {
  const prefetchedRef = useRef(false);

  const handleMouseEnter = useCallback(() => {
    if (prefetchedRef.current) return;
    prefetchedRef.current = true;
    // Динамически создаём prefetch-ссылку — только при наведении
    const href = typeof props.href === "string" ? props.href : props.href?.pathname ?? "";
    if (href) {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "document";
      link.href = href;
      document.head.appendChild(link);
      setTimeout(() => document.head.removeChild(link), 5000);
    }
  }, [props.href]);

  return <NextLink {...props} prefetch={false} onMouseEnter={handleMouseEnter} />;
}
