import React from "react";
import { Link } from "@/components/Link";
import { CONTACTS } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-slate-100 py-16 text-slate-500">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        {/* Medical Disclaimer */}
        <div className="mb-12 rounded-2xl border border-slate-200 bg-white px-6 py-5 text-center md:rounded-3xl md:px-12 md:py-7">
          <p className="text-sm font-bold uppercase tracking-wider text-slate-800 md:text-base">
            ИМЕЮТСЯ ПРОТИВОПОКАЗАНИЯ. НЕОБХОДИМА КОНСУЛЬТАЦИЯ СПЕЦИАЛИСТА
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <img src="/kosmologo.svg" alt="СитиМед Эстетика" className="h-12 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed text-slate-500">
              Профессиональная косметология в Йошкар-Оле. 
              Современные методики омоложения и ухода за кожей с использованием сертифицированных препаратов.
            </p>
            <div className="text-xs space-y-1 text-slate-400">
              <p>ООО «СитиМед»</p>
              <p>ИНН: 1215004470</p>
              <p>ОГРН: 1021200763875</p>
            </div>
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
              <li><Link href="/legal" className="transition-all duration-300 hover:text-orange-500">Политика конфиденциальности</Link></li>
              <li><Link href="/legal" className="transition-all duration-300 hover:text-orange-500">Правовая информация</Link></li>
              <li><Link href="/legal" className="transition-all duration-300 hover:text-orange-500">Лицензии</Link></li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-4 text-sm">
            <h4 className="mb-6 font-semibold text-slate-800">Контакты</h4>
            <p>{CONTACTS.address}</p>
            <p className="font-semibold text-slate-800">{CONTACTS.phone}</p>
            <p className="pt-4 text-xs text-slate-500">
              © {new Date().getFullYear()} СитиМед Эстетика. Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
