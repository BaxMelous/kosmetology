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
        "relative py-2 text-sm font-medium transition-all duration-300 hover:text-orange-500",
        isActive ? "text-orange-500" : "text-slate-500"
      )}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-orange-500" />
      )}
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
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-slate-50/90 backdrop-blur-md">
      <div className="container mx-auto flex h-16 lg:h-20 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/kosmologo.svg" alt="СитиМед Эстетика" width="200" height="56" className="h-10 w-auto lg:h-14" />
        </Link>

        {/* Desktop Nav: primary + burger */}
        <nav className="hidden lg:flex items-center space-x-8">
          {PRIMARY_NAV.map((item) => (
            <NavLink key={item.label} {...item} pathname={pathname} />
          ))}

          {/* Burger dropdown */}
          <div ref={burgerRef} className="relative">
            <button
              onClick={() => setIsBurgerOpen(!isBurgerOpen)}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 hover:bg-slate-100",
                isBurgerOpen ? "bg-slate-100 text-orange-500" : "text-slate-500"
              )}
              aria-label="Ещё"
              aria-expanded={isBurgerOpen}
            >
              {isBurgerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Dropdown menu */}
            {isBurgerOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
                {SECONDARY_NAV.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsBurgerOpen(false)}
                    className={cn(
                      "flex min-h-10 items-center rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-slate-50 hover:text-orange-500",
                      (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href))
                        ? "bg-orange-50 text-orange-500"
                        : "text-slate-600"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={toggleA11y}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-all duration-300 hover:bg-slate-100 hover:text-slate-800"
            aria-label="Версия для слабовидящих"
            title="Версия для слабовидящих"
          >
            <Eye className={`h-5 w-5 ${a11yEnabled ? "text-primary" : ""}`} />
          </button>
          <a
            href="tel:+79276845454"
            className="flex items-center text-sm font-medium text-slate-700 transition-all duration-300 hover:text-orange-500"
          >
            <Phone className="mr-2 h-4 w-4" />
            +7 (927) 684-54-54
          </a>
          <Button onClick={openModal} className="h-11 rounded-xl bg-orange-500 px-6 font-medium text-white transition-all duration-300 hover:bg-orange-600">
              Записаться
            </Button>
          </div>

        {/* Mobile Toggle */}
        <button
          className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-800 transition-colors hover:bg-slate-100 lg:hidden"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 top-16 lg:top-20 z-50 bg-slate-950/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        >
          <div
            className="absolute inset-x-4 top-4 overflow-hidden rounded-[2rem] border border-white/70 bg-white/95 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.18)]"
            onClick={(event) => event.stopPropagation()}
          >
            <nav className="flex flex-col space-y-2">
              {ALL_NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex min-h-11 items-center rounded-2xl px-4 py-3 text-2xl font-medium transition-all duration-300 hover:bg-slate-100 hover:text-orange-500",
                    (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)) ? "bg-slate-100 text-orange-500" : "text-slate-700"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 space-y-4 border-t border-slate-100 pt-6">
              <a
                href="tel:+79276845454"
                className="flex min-h-11 items-center px-2 text-lg font-medium text-slate-700"
              >
                <Phone className="mr-2 h-5 w-5" />
                +7 (927) 684-54-54
              </a>
              <Button onClick={openModal} className="h-11 w-full rounded-xl bg-orange-500 px-6 font-medium text-white transition-all duration-300 hover:bg-orange-600">
                  Записаться
                </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
