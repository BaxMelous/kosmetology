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
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute left-0 top-20 w-full animate-in slide-in-from-top space-y-4 border-b border-slate-100 bg-slate-50 px-4 py-6 shadow-sm duration-300 md:hidden">
          <nav className="flex flex-col space-y-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "text-lg font-medium transition-all duration-300 hover:text-orange-500",
                  pathname === item.href ? "text-orange-500" : "text-slate-700"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t space-y-4">
            <a
              href="tel:+79276845454"
              className="flex items-center text-lg font-medium text-slate-700"
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
