"use client";

import React, { useRef } from "react";
import { Link } from "@/components/Link";
import { Quote, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

// Base delay: how far into the section before first item appears (0..1)
const BASE_START = 0.18;
const STAGGER = 0.03;
const FADE_DURATION = 0.08;

// --- Scroll-driven reveal item ---

function ScrollRevealItem({
  scrollYProgress,
  staggerIndex,
  as: Tag = "div",
  className,
  children,
}: {
  scrollYProgress: MotionValue<number>;
  staggerIndex: number;
  as?: "div" | "h1" | "h2" | "h3" | "p";
  className?: string;
  children: React.ReactNode;
}) {
  const fadeInStart = BASE_START + staggerIndex * STAGGER;
  const fadeInEnd = fadeInStart + FADE_DURATION;
  const fadeOutStart = 0.82;
  const fadeOutEnd = 0.95;

  const opacity = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0]
  );
  const y = useTransform(scrollYProgress, [fadeInStart, fadeInEnd], [30, 0]);

  return (
    <motion.div style={{ opacity, y }}>
      <Tag className={className}>{children}</Tag>
    </motion.div>
  );
}

// --- Section ---

export function ChiefDoctorSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax for decorative blobs
  const blob1Y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["10%", "-15%"]);
  const blob2X = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  // Quote icon — driven by scroll
  const quoteOpacity = useTransform(scrollYProgress, [BASE_START - 0.02, BASE_START + 0.04, 0.88, 0.98], [0, 1, 1, 0]);
  const quoteScale = useTransform(scrollYProgress, [BASE_START - 0.02, BASE_START + 0.04], [0.5, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-linear-to-b from-white via-orange-50/20 to-white py-14 md:py-28"
    >
      {/* Parallax decorative blobs */}
      <motion.div
        className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-orange-200 blur-[100px] opacity-25 md:h-96 md:w-96"
        style={{ y: blob1Y }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-lime-200 blur-[80px] opacity-20 md:h-80 md:w-80"
        style={{ y: blob2Y, x: blob2X }}
      />

      <div className="container relative z-10 mx-auto max-w-4xl px-4 md:px-8">
        {/* Quote icon */}
        <motion.div
          className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 md:mb-10 md:h-14 md:w-14"
          style={{ opacity: quoteOpacity, scale: quoteScale }}
        >
          <Quote className="h-6 w-6 md:h-7 md:w-7" />
        </motion.div>

        {/* H1 — Greeting */}
        <ScrollRevealItem scrollYProgress={scrollYProgress} staggerIndex={0} as="h1" className="mb-8 text-3xl font-semibold leading-tight text-slate-800 sm:text-4xl md:text-5xl">
          Дорогие наши пациенты!
        </ScrollRevealItem>

        {/* P1 */}
        <ScrollRevealItem scrollYProgress={scrollYProgress} staggerIndex={1} as="p" className="mb-5 text-base leading-relaxed text-slate-600 md:text-lg">
          Зачастую мы откладываем свой визит к косметологу на многие годы
          по каким-либо причинам. Кто-то из-за стеснения, кто-то из-за
          страха боли и последствий, кто-то из-за ложных представлений
          о стоимости косметологических процедур.
        </ScrollRevealItem>

        {/* H2 */}
        <ScrollRevealItem scrollYProgress={scrollYProgress} staggerIndex={2} as="h2" className="mb-4 mt-8 text-2xl font-semibold leading-snug text-slate-800 sm:text-3xl md:text-3xl">
          Хотелось бы развеять все мифы.
        </ScrollRevealItem>

        {/* P2 */}
        <ScrollRevealItem scrollYProgress={scrollYProgress} staggerIndex={3} as="p" className="mb-5 text-base leading-relaxed text-slate-600 md:text-lg">
          Современная косметология в умелых руках — это{" "}
          <span className="font-semibold text-slate-800">безболезненно</span>,{" "}
          <span className="font-semibold text-slate-800">безопасно</span>{" "}
          и{" "}
          <span className="font-semibold text-slate-800">
            без лишних навязанных процедур
          </span>
          .
        </ScrollRevealItem>

        {/* P3 */}
        <ScrollRevealItem scrollYProgress={scrollYProgress} staggerIndex={4} as="p" className="mb-5 text-base leading-relaxed text-slate-600 md:text-lg">
          За многие годы практики мы научились грамотно подходить к запросу
          каждого пациента, не изменяя его индивидуальных особенностей.
        </ScrollRevealItem>

        {/* P4 */}
        <ScrollRevealItem scrollYProgress={scrollYProgress} staggerIndex={5} as="p" className="mb-5 text-base leading-relaxed text-slate-600 md:text-lg">
          В своей работе мы прекрасно совмещаем аппаратные и инъекционные
          методы, которые зачастую не требуют длительной реабилитации.
        </ScrollRevealItem>

        {/* H3 */}
        <ScrollRevealItem scrollYProgress={scrollYProgress} staggerIndex={6} as="h3" className="mb-4 mt-8 text-xl font-semibold leading-snug text-slate-800 sm:text-2xl md:text-2xl">
          Будем рады видеть Вас в нашем косметологическом центре!
        </ScrollRevealItem>

        {/* P5 */}
        <ScrollRevealItem scrollYProgress={scrollYProgress} staggerIndex={7} as="p" className="text-base leading-relaxed text-slate-600 md:text-lg">
          Мы поможем Вам сохранить здоровье кожи и Вашу несравненную
          красоту на долгие годы!
        </ScrollRevealItem>

        {/* Signature card */}
        <SignatureCard scrollYProgress={scrollYProgress} staggerIndex={8} />
      </div>
    </section>
  );
}

// --- Signature card sub-component ---

function SignatureCard({
  scrollYProgress,
  staggerIndex,
}: {
  scrollYProgress: MotionValue<number>;
  staggerIndex: number;
}) {
  const fadeInStart = BASE_START + staggerIndex * STAGGER;
  const fadeInEnd = fadeInStart + FADE_DURATION;
  const fadeOutStart = 0.82;
  const fadeOutEnd = 0.95;

  const opacity = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0]
  );
  const y = useTransform(scrollYProgress, [fadeInStart, fadeInEnd], [30, 0]);

  return (
    <motion.div className="mt-12 md:mt-16" style={{ opacity, y }}>
      <Link
        href="/doctors/bakhtina"
        className="group block overflow-hidden rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-6"
      >
        <div className="flex items-center gap-5">
          {/* Round avatar */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-orange-100 via-amber-50 to-lime-100 shadow-sm ring-2 ring-white md:h-20 md:w-20">
            <span className="text-2xl font-light text-orange-400 md:text-3xl">
              МА
            </span>
          </div>

          {/* Name & role */}
          <div className="min-w-0 flex-1">
            <p className="text-lg font-semibold leading-snug text-slate-800 transition-colors group-hover:text-orange-500 md:text-xl">
              Бахтина Марина Александровна
            </p>
            <p className="mt-0.5 text-sm text-slate-500">
              Главный врач, дерматовенеролог, косметолог
            </p>
          </div>

          {/* Arrow */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

