"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type ParallaxSectionProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Universal scroll-driven section wrapper.
 * Fades content in as it scrolls into view, fades out as it leaves.
 * Bidirectional — works both scrolling down and up.
 * Mobile: softer animation with minimal Y offset and earlier trigger.
 */
export function ParallaxSection({ children, className = "" }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Mobile: earlier fade-in, smaller Y offset (10px max), pure opacity otherwise
  const opacity = useTransform(
    scrollYProgress,
    isMobile ? [0.04, 0.12, 0.85, 0.95] : [0.12, 0.22, 0.82, 0.95],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    isMobile ? [0.04, 0.12] : [0.12, 0.22],
    isMobile ? [10, 0] : [24, 0]
  );

  return (
    <motion.div ref={ref} className={className} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}
