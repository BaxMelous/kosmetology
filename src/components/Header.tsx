"use client";

import React, { useEffect, useState } from "react";
import { Link } from "@/components/Link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Услуги и цены", href: "/prices" },
  { label: "Врачи", href: "/doctors" },
  { label: "Отзывы", href: "/reviews" },
  { label: "Контакты", href: "/contacts" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-slate-50/90 backdrop-blur-md">
      <div className="container mx-auto flex h-16 lg:h-20 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/kosmologo.svg" alt="СитиМед Эстетика" className="h-10 w-auto lg:h-14" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative py-2 text-sm font-medium text-slate-500 transition-all duration-300 hover:text-orange-500",
                  isActive ? "text-orange-500" : "text-slate-500"
                )}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-orange-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center space-x-4">
          <a
            href="tel:+79276845454"
            className="flex items-center text-sm font-medium text-slate-700 transition-all duration-300 hover:text-orange-500"
          >
            <Phone className="mr-2 h-4 w-4" />
            +7 (927) 684-54-54
          </a>
          <Link href="/contacts">
            <Button className="h-11 rounded-xl bg-orange-500 px-6 font-medium text-white transition-all duration-300 hover:bg-orange-600">
              Записаться
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-800 transition-colors hover:bg-slate-100 lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 top-16 lg:top-20 z-50 bg-slate-950/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="absolute inset-x-4 top-4 overflow-hidden rounded-[2rem] border border-white/70 bg-white/95 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.18)]"
            onClick={(event) => event.stopPropagation()}
          >
            <nav className="flex flex-col space-y-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex min-h-11 items-center rounded-2xl px-4 py-3 text-2xl font-medium transition-all duration-300 hover:bg-slate-100 hover:text-orange-500",
                    pathname === item.href ? "bg-slate-100 text-orange-500" : "text-slate-700"
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
              <Link href="/contacts">
                <Button className="h-11 w-full rounded-xl bg-orange-500 px-6 font-medium text-white transition-all duration-300 hover:bg-orange-600">
                  Записаться
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
