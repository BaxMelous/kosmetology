import React from "react";
import Link from "next/link";
import { CONTACTS } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-slate-100 py-16 text-slate-500">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="text-2xl font-semibold text-slate-800">
              СитиМед <span className="text-slate-800">Эстетика</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500">
              Клиника косметологии в Йошкар-Оле: инъекционные и аппаратные методики,
              нитевой лифтинг, пилинги и уходовые процедуры.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="mb-6 font-semibold text-slate-800">Навигация</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/prices" className="transition-all duration-300 hover:text-orange-500">Услуги и цены</Link></li>
              <li><Link href="/doctors" className="transition-all duration-300 hover:text-orange-500">Врачи</Link></li>
              <li><Link href="/reviews" className="transition-all duration-300 hover:text-orange-500">Отзывы</Link></li>
              <li><Link href="/prices" className="transition-all duration-300 hover:text-orange-500">Прайс-лист</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-6 font-semibold text-slate-800">Информация</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/contacts" className="transition-all duration-300 hover:text-orange-500">Политика конфиденциальности</Link></li>
              <li><Link href="/contacts" className="transition-all duration-300 hover:text-orange-500">Правовая информация</Link></li>
              <li><Link href="/contacts" className="transition-all duration-300 hover:text-orange-500">Лицензии</Link></li>
            </ul>
          </div>

          {/* Contacts */}
          <address className="space-y-4 text-sm not-italic">
            <h4 className="mb-6 font-semibold text-slate-800">Контакты</h4>
            <p>{CONTACTS.address}</p>
            <a
              href={`tel:${CONTACTS.phone.replace(/[^\d+]/g, "")}`}
              className="block font-semibold text-slate-800 transition-colors hover:text-orange-500"
            >
              {CONTACTS.phone}
            </a>
            <p className="text-slate-500">{CONTACTS.workingHours.weekdays}</p>
            <p className="text-slate-500">{CONTACTS.workingHours.saturday}</p>
          </address>
        </div>

        <div className="mt-12 space-y-3 border-t border-slate-200 pt-8 text-xs leading-relaxed text-slate-500">
          <p>
            Имеются противопоказания. Необходима консультация специалиста. Информация на сайте
            не является публичной офертой.
          </p>
          <p>© {new Date().getFullYear()} СитиМед Эстетика. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
