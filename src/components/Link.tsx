"use client";

import { useCallback, useRef } from "react";
import NextLink from "next/link";
import type { ComponentProps } from "react";

/**
 * Link — обёртка над next/link с умным prefetch.
 * Предзагружает страницу ТОЛЬКО при наведении курсора.
 * Всегда использует HTTPS для prefetch (избегает Mixed Content).
 */
export function Link(props: ComponentProps<typeof NextLink>) {
  const prefetchedRef = useRef(false);

  const handleMouseEnter = useCallback(() => {
    if (prefetchedRef.current) return;
    prefetchedRef.current = true;
    
    const path = typeof props.href === "string" ? props.href : props.href?.pathname ?? "";
    if (!path) return;
    
    // Всегда HTTPS — предотвращаем Mixed Content
    const origin = window.location.origin.replace(/^http:/, "https:");
    const fullHref = `${origin}${path}`;
    
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "document";
    link.href = fullHref;
    document.head.appendChild(link);
    setTimeout(() => document.head.removeChild(link), 5000);
  }, [props.href]);

  return <NextLink {...props} prefetch={false} onMouseEnter={handleMouseEnter} />;
}
