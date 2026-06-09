"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

export function NavigationProgress() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement | null>(null);
  const prevPathname = useRef(pathname);

  const finishBar = useCallback(() => {
    const bar = barRef.current;
    if (!bar) return;
    bar.style.transition = "width 0.3s ease-out";
    bar.style.width = "100%";
    setTimeout(() => {
      bar?.remove();
      barRef.current = null;
    }, 350);
  }, []);

  const startBar = useCallback(() => {
    if (barRef.current) return;
    const bar = document.createElement("div");
    bar.style.cssText =
      "position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#F97316,#fbbf24);z-index:99999;width:0";
    document.body.appendChild(bar);
    barRef.current = bar;
    requestAnimationFrame(() => {
      bar.style.transition = "width 30s cubic-bezier(0.1,0.7,0.1,1)";
      bar.style.width = "80%";
    });
  }, []);

  // Завершаем при смене страницы
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      finishBar();
    }
  }, [pathname, finishBar]);

  // Запускаем при клике на внутреннюю ссылку
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a[href]");
      if (link) {
        const href = link.getAttribute("href");
        if (href && !href.startsWith("http") && !href.startsWith("#") && !href.startsWith("tel:") && !href.startsWith("mailto:")) {
          startBar();
        }
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, [startBar]);

  return null;
}

