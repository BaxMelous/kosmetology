"use client";

import React, { useEffect, useState, useRef } from "react";
import { Link } from "@/components/Link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAccessibility } from "@/components/AccessibilityProvider";
import { useConsultationModal } from "@/components/ConsultationModal";

const PRIMARY_NAV = [
  { label: "Главная", href: "/" },
  { label: "Услуги и цены", href: "/prices" },
  { label: "Врачи", href: "/doctors" },
  { label: "Контакты", href: "/contacts" },
];

const SECONDARY_NAV = [
  { label: "До/После", href: "/before-after" },
  { label: "Оборудование", href: "/equipment" },
  { label: "Отзывы", href: "/reviews" },
];

const ALL_NAV = [...PRIMARY_NAV, ...SECONDARY_NAV];

function NavLink({ href, label, pathname }: { href: string; label: string; pathname: string }) {
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={cn(
        "relative rounded-full px-4 py-2 text-sm font-light tracking-[0.02em] transition-all duration-300",
        isActive
          ? "bg-[#F97316]/10 text-[#F97316]"
          : "text-slate-500 hover:text-[#1a1a2e] hover:bg-slate-100"
      )}
    >
      {label}
    </Link>
  );
}

export function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const burgerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { enabled: a11yEnabled, toggle: toggleA11y } = useAccessibility();
  const { openModal } = useConsultationModal();

  // Close burger on outside click
  useEffect(() => {
    if (!isBurgerOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (burgerRef.current && !burgerRef.current.contains(e.target as Node)) {
        setIsBurgerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isBurgerOpen]);

  // Close burger on Escape
  useEffect(() => {
    if (!isBurgerOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsBurgerOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isBurgerOpen]);

  // Close burger on route change
  useEffect(() => {
    setIsBurgerOpen(false);
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  return (
    <header className="fixed top-3 left-1/2 z-50 w-full max-w-7xl -translate-x-1/2 px-4 md:px-8">
      {/* Floating island */}
      <div className="flex items-center justify-between rounded-full border border-white/20 bg-white/75 py-3 shadow-card backdrop-blur-xl">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center pl-5">
          <img src="/kosmologo.svg" alt="СитиМед Эстетика" width="168" height="48" className="h-9 w-auto lg:h-10" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center lg:flex lg:gap-1">
          {PRIMARY_NAV.map((item) => (
            <NavLink key={item.label} {...item} pathname={pathname} />
          ))}

          {/* Burger dropdown */}
          <div ref={burgerRef} className="relative">
            <button
              onClick={() => setIsBurgerOpen(!isBurgerOpen)}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-primary/50",
                isBurgerOpen ? "bg-slate-100 text-[#F97316]" : "text-slate-400"
              )}
              aria-label="Ещё"
              aria-expanded={isBurgerOpen}
            >
              <Menu className="h-4 w-4" />
            </button>

            {isBurgerOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
                {SECONDARY_NAV.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsBurgerOpen(false)}
                    className={cn(
                      "flex min-h-10 items-center rounded-xl px-4 py-2.5 text-sm font-light tracking-[0.02em] transition-all duration-200 hover:bg-slate-50 hover:text-[#F97316]",
                      (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href))
                        ? "bg-[#F97316]/5 text-[#F97316]"
                        : "text-slate-500"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 pr-5 lg:flex">
          <button
            onClick={toggleA11y}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-all duration-300 hover:bg-slate-100 hover:text-slate-600",
              a11yEnabled && "bg-[#F97316]/10 text-[#F97316]"
            )}
            aria-label="Версия для слабовидящих"
          >
            <Eye className="h-4 w-4" />
          </button>
          <a
            href="tel:+79276845454"
            className="flex items-center gap-1.5 text-sm font-light tracking-[0.02em] text-slate-600 transition-colors duration-300 hover:text-[#F97316]"
          >
            <Phone className="h-3.5 w-3.5" />
            +7 (927) 684-54-54
          </a>
          <Button
            onClick={openModal}
            className="h-9 rounded-full bg-[#F97316] px-5 text-sm font-light tracking-[0.03em] text-white transition-all duration-300 hover:bg-[#F97316]/90 hover:shadow-lg hover:shadow-[#F97316]/15"
          >
            Записаться
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="flex h-11 w-11 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-primary/50 lg:hidden mr-0.5"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div
          className="fixed top-[4.5rem] inset-x-0 bottom-0 z-[60] bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        >
          <div
            className="absolute inset-x-4 -top-3 max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain rounded-card border border-white/70 bg-white/95 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.18)]"
            onClick={(event) => event.stopPropagation()}
          >
            <nav className="flex flex-col space-y-2">
              {ALL_NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex min-h-11 items-center rounded-2xl px-4 py-3 text-2xl font-light tracking-[0.02em] transition-all duration-300 hover:bg-slate-100 hover:text-[#F97316]",
                    (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href))
                      ? "bg-[#F97316]/5 text-[#F97316]"
                      : "text-slate-700"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 space-y-4 border-t border-slate-100 pt-6">
              <a
                href="tel:+79276845454"
                className="flex min-h-11 items-center px-2 text-lg font-light tracking-[0.02em] text-slate-700"
              >
                <Phone className="mr-2 h-5 w-5" />
                +7 (927) 684-54-54
              </a>
              <Button
                onClick={openModal}
                className="h-11 w-full rounded-full bg-[#F97316] px-6 text-sm font-light tracking-[0.03em] text-white transition-all duration-300 hover:bg-[#F97316]/90"
              >
                Записаться
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
