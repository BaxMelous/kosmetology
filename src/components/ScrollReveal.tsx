"use client";

import { useEffect, useRef, useState } from "react";

type ScrollRevealProps = {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
};

export function ScrollReveal({ children, delayMs = 0, className = "" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const node = ref.current;
    if (!node) return;

    const isMobileMatch = window.matchMedia("(max-width: 767px)").matches;

    if (isMobileMatch || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    let revealed = false;

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      setVisible(true);
      observer.disconnect();
      window.clearTimeout(timeoutId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          reveal();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -10% 0px" }
    );

    const timeoutId = window.setTimeout(reveal, 500);

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearTimeout(timeoutId);
    };
  }, [mounted]);

  // Show content immediately on mount for better UX
  const initialOpacity = mounted ? (visible ? 1 : 0) : 1;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: initialOpacity,
        transform: visible ? "translate3d(0,0,0)" : "translate3d(0,28px,0)",
        transitionProperty: visible ? "none" : "opacity, transform",
        transitionDuration: visible ? "0ms" : "700ms, 900ms",
        transitionTimingFunction: "ease, cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delayMs}ms`,
        pointerEvents: "auto",
        touchAction: "auto",
      }}
    >
      {children}
    </div>
  );
}
