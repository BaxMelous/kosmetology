"use client";

import React, { useState } from "react";
import Link from "next/link";
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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-slate-50/90 backdrop-blur-md">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-semibold tracking-tight text-slate-800 md:text-2xl">
            СитиМед <span className="text-foreground">Эстетика</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
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
        <div className="hidden md:flex items-center space-x-4">
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
          className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-800 transition-colors hover:bg-slate-100 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-20 z-50 flex flex-col animate-in slide-in-from-top bg-white px-6 py-8 md:hidden">
          <nav className="flex flex-1 flex-col space-y-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex min-h-11 items-center rounded-2xl px-4 py-3 text-2xl font-medium transition-all duration-300 hover:bg-slate-100 hover:text-orange-500",
                  pathname === item.href ? "text-orange-500" : "text-slate-700"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="space-y-4 border-t border-slate-100 pt-6">
            <a
              href="tel:+79276845454"
              className="flex min-h-11 items-center px-2 text-lg font-medium text-slate-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <Phone className="mr-2 h-5 w-5" />
              +7 (927) 684-54-54
            </a>
            <Link href="/contacts" onClick={() => setIsMenuOpen(false)}>
              <Button className="h-11 w-full rounded-xl bg-orange-500 px-6 font-medium text-white transition-all duration-300 hover:bg-orange-600">
                Записаться
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
