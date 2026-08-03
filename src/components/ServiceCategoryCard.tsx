"use client";

import React, { useId, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useConsultationModal } from "@/components/ConsultationModal";
import type { ServiceCategory } from "@/lib/data";

type ServiceCategoryCardProps = {
  category: ServiceCategory;
};

/**
 * Премиальная карточка категории услуг.
 * Высокий блок с фото модели справа, градиентной маской,
 * плавным раскрытием при клике и анимацией на hover.
 * Описание категории: всегда в DOM (для SEO), визуально обрезается CSS line-clamp,
 * раскрывается по кнопке «Подробнее».
 */
export function ServiceCategoryCard({ category }: ServiceCategoryCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [catDescExpanded, setCatDescExpanded] = useState(false);
  const { openModal } = useConsultationModal();
  const contentId = useId();

  return (
    <motion.div
      layout
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-card border border-slate-100 bg-white shadow-sm transition-shadow duration-500",
        isOpen ? "shadow-md" : "hover:shadow-lg"
      )}
      onClick={() => setIsOpen(!isOpen)}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      aria-controls={contentId}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsOpen(!isOpen);
        }
      }}
    >
      {/* === Верхняя часть: заголовок + фото === */}
      <motion.div
        layout
        className="relative flex items-center overflow-hidden"
        animate={{ height: isOpen ? 120 : (catDescExpanded ? "auto" : 200) }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Фото модели — справа */}
        <motion.div
          className="absolute right-0 top-0 h-full w-[45%] sm:w-[40%] md:w-[35%]"
          animate={{
            scale: isOpen ? 1 : 1.05,
            filter: isOpen ? "blur(4px)" : "blur(0px)",
          }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="h-full w-full bg-cover bg-right bg-no-repeat"
            style={{ backgroundImage: `url(${category.image})` }}
          />
        </motion.div>

        {/* Градиентная маска: белый → прозрачный слева направо */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-10",
            "bg-linear-to-r from-white via-white via-55% to-transparent"
          )}
        />

        {/* Полупрозрачный градиент в развёрнутом состоянии */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 bg-linear-to-r from-white/70 via-white/30 via-70% to-transparent"
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Заголовок — слева */}
        <div className="relative z-20 flex-1 px-6 py-7 sm:px-8 sm:py-8 md:px-10 md:py-9">
          <motion.div layout transition={{ type: "spring", stiffness: 300, damping: 30 }}>
            <h2 className="text-lg font-medium leading-[1.3] text-slate-800 sm:text-xl md:text-2xl">
              {category.title}
            </h2>
            {!isOpen && (
              <div className="mt-1.5 max-w-md sm:mt-2">
                <p
                  className={cn(
                    "text-sm leading-[1.6] text-slate-400 sm:text-base",
                    !catDescExpanded && "line-clamp-2"
                  )}
                >
                  {category.description}
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCatDescExpanded(!catDescExpanded);
                  }}
                  className="mt-0.5 text-xs font-medium text-[#F97316] hover:text-[#e8690b] transition-colors"
                >
                  {catDescExpanded ? "Свернуть" : "Подробнее"}
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Индикатор раскрытия — справа */}
        <motion.div
          className="relative z-20 mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/80 shadow-sm sm:mr-6 sm:h-12 sm:w-12"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-5 w-5 text-slate-400" />
        </motion.div>
      </motion.div>

      {/*
        === Список услуг ===
        ВАЖНО ДЛЯ SEO: блок всегда смонтирован и всегда присутствует в HTML.
        Свёрнутое состояние — это CSS-схлопывание, а НЕ размонтирование.
        Раньше здесь стояло `{isOpen && …}`, из-за чего в собранном HTML не было
        ни одного названия услуги и ни одной цены — робот видел только заголовки
        категорий. Не заменяйте это обратно на условный рендер.
        `inert` в свёрнутом виде убирает скрытые кнопки из таб-порядка.
      */}
      <div
        id={contentId}
        className={cn(
          // Схлопывание на чистом CSS (grid-rows 0fr↔1fr), без JS-анимации:
          // раскрытие не зависит от того, успел ли отработать animation frame,
          // и работает даже если анимации подавлены системой.
          "grid transition-[grid-template-rows,opacity] duration-[350ms] ease-out motion-reduce:transition-none",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
        inert={!isOpen}
      >
        {/* Сам grid-элемент — без padding и с min-h-0, иначе в свёрнутом виде
            останется полоса высотой в отступы (padding не сжимается). Все
            отступы и рамка — на вложенном слое. */}
        <div className="min-h-0 overflow-hidden">
          <div
            className="border-t border-slate-100 px-6 py-5 sm:px-8 sm:py-6 md:px-10 md:py-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-2 sm:space-y-3">
            {category.services.map((service) => (
              <article
                key={service.id}
                id={service.id}
                className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 px-5 py-4 transition-colors hover:bg-white hover:shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4"
              >
                {/* Название + описание */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-medium text-slate-800 sm:text-base">
                      {service.name}
                    </h3>
                    {service.isPopular && (
                      <span className="rounded-full px-2.5 py-0.5 text-[11px] font-normal uppercase tracking-wide" style={{ backgroundColor: "#A3B90320", color: "#A3B903" }}>
                        Популярно
                      </span>
                    )}
                  </div>
                  {service.description && (
                    <p className="mt-1 text-xs leading-[1.6] text-muted-foreground sm:text-sm">
                      {service.description}
                    </p>
                  )}
                </div>

                {/* Цена + кнопка */}
                <div className="flex items-center justify-between gap-4 sm:shrink-0">
                  <span className="text-base font-bold tabular-nums sm:text-lg" style={{ color: "#F97316" }}>
                    {service.price}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(service.name);
                    }}
                    className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-medium text-white transition-all duration-300 hover:bg-primary-hover active:scale-[0.97] sm:h-10 sm:px-5"
                  >
                    Записаться
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </article>
            ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
