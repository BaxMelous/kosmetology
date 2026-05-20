"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type ParallaxSectionProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Universal scroll-driven section wrapper.
 * Fades content in as it scrolls into view, fades out as it leaves.
 * Bidirectional — works both scrolling down and up.
 */
export function ParallaxSection({ children, className = "" }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Fade in at 18% of section's scroll range, out at 85%
  const opacity = useTransform(
    scrollYProgress,
    [0.12, 0.22, 0.82, 0.95],
    [0, 1, 1, 0]
  );
  const y = useTransform(scrollYProgress, [0.12, 0.22], [24, 0]);

  return (
    <motion.div ref={ref} className={className} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}
