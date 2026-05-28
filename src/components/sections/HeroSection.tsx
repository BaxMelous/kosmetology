"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "@/components/Link";
import { Button } from "@/components/ui/button";
import { useConsultationModal } from "@/components/ConsultationModal";

export function HeroSection() {
  const { openModal } = useConsultationModal();
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Parallax mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseX.set(x * 10);
      mouseY.set(y * 10);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section ref={containerRef} className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 pt-1 pb-8 sm:pt-1 sm:pb-10 md:px-8 md:pb-12">

        {/* Rounded container — full video background like PageHero */}
        <div className="relative isolate overflow-hidden rounded-[2rem] md:rounded-[2.5rem] lg:min-h-[600px] xl:min-h-[680px]">

          {/* Video background — parallax */}
          <motion.div
            style={{ x: springX, y: springY }}
            className="absolute inset-0 scale-110"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <video
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => setVideoLoaded(true)}
              className={`h-full w-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
            >
              <source src="/video/hero-main.mp4" type="video/mp4" />
            </video>
          </motion.div>

          {/* Skeleton */}
          {!videoLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-100 via-white to-slate-50" />
          )}

          {/* Overlay — gentle darkening for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50/60 via-transparent to-transparent" />

          {/* Floating orbs */}
          <motion.div
            animate={{ x: [0, 30, -20, 10, 0], y: [0, -25, 15, -10, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-lime-200/25 blur-[80px]"
          />
          <motion.div
            animate={{ x: [0, -20, 35, -15, 0], y: [0, 20, -30, 10, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#F97316]/10 blur-[100px]"
          />

          {/* Content overlay */}
          <div className="relative z-10 flex items-center px-6 py-16 sm:px-10 sm:py-20 md:px-14 md:py-24 lg:px-16 lg:py-28 xl:px-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-2xl space-y-6 md:space-y-8"
            >
              {/* Заголовок */}
              <h1 className="text-2xl font-light leading-[1.15] tracking-[0.02em] text-[#1a1a2e] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                Профессиональная{" "}
                <span className="font-normal text-[#F97316]">косметология</span>
                <br />
                в СитиМед Эстетика
              </h1>

              {/* Подзаголовок */}
              <p className="mt-5 max-w-md text-sm font-light leading-[1.7] text-[#999] sm:text-base md:text-lg">
                Современные методики омоложения и ухода за кожей с использованием
                сертифицированных препаратов. Индивидуальный подход и видимый
                результат уже после первой процедуры.
              </p>

              {/* Кнопки */}
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-4">
                <Button
                  onClick={openModal}
                  className="h-11 rounded-xl bg-[#F97316] px-6 text-sm font-light tracking-[0.04em] text-white transition-all duration-300 hover:bg-[#F97316]/90 hover:shadow-lg hover:shadow-[#F97316]/20 sm:w-auto"
                >
                  Записаться
                </Button>
                <Link href="/prices">
                  <Button
                    variant="outline"
                    className="h-11 rounded-xl border border-slate-200 bg-white px-6 text-sm font-light tracking-[0.04em] text-[#1a1a2e] transition-all duration-300 hover:border-[#F97316]/30 hover:text-[#F97316] sm:w-auto"
                  >
                    Посмотреть услуги
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
