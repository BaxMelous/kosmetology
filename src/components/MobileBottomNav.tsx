"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BriefcaseMedical, Users, MessageCircle, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Главная", href: "/", icon: Home },
  { label: "Услуги", href: "/prices", icon: BriefcaseMedical },
  { label: "Врачи", href: "/doctors", icon: Users },
  { label: "Отзывы", href: "/reviews", icon: MessageCircle },
  { label: "Контакты", href: "/contacts", icon: Phone },
];

function isItemActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] lg:hidden">
      <nav
        aria-label="Основная навигация"
        className="pointer-events-auto w-full max-w-md rounded-full border border-white/60 bg-white/70 px-2 py-2 shadow-[0_20px_60px_rgba(15,23,42,0.14)] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/55"
      >
        <ul className="grid grid-cols-5 gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = isItemActive(pathname, item.href);
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex min-h-14 flex-col items-center justify-center gap-1 rounded-full px-2 text-[10px] font-medium tracking-wide transition-all duration-300",
                    isActive
                      ? "bg-white text-orange-500 shadow-sm"
                      : "text-slate-500 hover:bg-white/60 hover:text-slate-900"
                  )}
                >
                  <Icon className={cn("h-4 w-4", isActive ? "text-orange-500" : "text-slate-500")} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
