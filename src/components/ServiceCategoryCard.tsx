"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useConsultationModal } from "@/components/ConsultationModal";
import type { ServiceCategory } from "@/lib/data";

type ServiceCategoryCardProps = {
  category: ServiceCategory;
};

/**
 * Премиальная карточка категории услуг.
 * Высокий блок (~200px) с фото модели справа, градиентной маской,
 * плавным раскрытием при клике и анимацией на hover.
 */
export function ServiceCategoryCard({ category }: ServiceCategoryCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useConsultationModal();

  return (
    <motion.div
      layout
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-shadow duration-500",
        isOpen ? "shadow-md" : "hover:shadow-lg"
      )}
      onClick={() => setIsOpen(!isOpen)}
      role="button"
      tabIndex={0}
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
        animate={{ height: isOpen ? 120 : 200 }}
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
            "bg-gradient-to-r from-white via-white via-55% to-transparent"
          )}
        />

        {/* Полупрозрачный градиент в развёрнутом состоянии */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-white/70 via-white/30 via-70% to-transparent"
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Заголовок — слева */}
        <div className="relative z-20 flex-1 px-6 sm:px-8 md:px-10">
          <motion.div layout transition={{ type: "spring", stiffness: 300, damping: 30 }}>
            <h2 className="text-lg font-medium leading-[1.3] text-slate-800 sm:text-xl md:text-2xl">
              {category.title}
            </h2>
            <p className="mt-1.5 max-w-md text-sm leading-[1.6] text-slate-400 line-clamp-2 sm:mt-2 sm:text-base">
              {category.description}
            </p>
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

      {/* === Раскрывающийся список услуг === */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div
              className="border-t border-slate-100 px-6 py-5 sm:px-8 sm:py-6 md:px-10 md:py-7"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-2 sm:space-y-3">
                {category.services.map((service) => (
                  <motion.article
                    key={service.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
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
                          openModal();
                        }}
                        className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-medium text-white transition-all duration-300 hover:bg-orange-600 active:scale-[0.97] sm:h-10 sm:px-5"
                      >
                        Записаться
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
