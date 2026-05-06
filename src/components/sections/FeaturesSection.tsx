import React from "react";
import { CheckCircle2, Award, ShieldCheck, Zap, Users, Wallet } from "lucide-react";

const FEATURES = [
  {
    title: "Врачи-эксперты",
    description: "Косметологи с медицинским образованием и опытом работы более 10-20 лет.",
    icon: Users,
  },
  {
    title: "Оригинальные препараты",
    description: "Работаем только с сертифицированными материалами от ведущих производителей.",
    icon: ShieldCheck,
  },
  {
    title: "Современное оборудование",
    description: "Аппараты экспертного класса для достижения максимального результата.",
    icon: Zap,
  },
  {
    title: "Безопасность",
    description: "Соблюдение всех медицинских протоколов и стерильность процедур.",
    icon: Award,
  },
  {
    title: "Честные цены",
    description: "Стоимость процедур прозрачна и не содержит скрытых доплат.",
    icon: Wallet,
  },
  {
    title: "Индивидуальный подход",
    description: "Подбираем программу ухода под ваш тип кожи и конкретные задачи.",
    icon: CheckCircle2,
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-white py-14 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-10 md:mb-16 space-y-4">
          <h2 className="text-3xl font-semibold text-slate-800 md:text-5xl">Доверьте свою красоту профессионалам</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="rounded-3xl border border-slate-100 bg-slate-50 p-5 md:p-8"
            >
              <div className="mb-4 md:mb-6 flex h-11 w-11 md:h-14 md:w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                <feature.icon className="h-6 w-6 md:h-8 md:w-8 text-orange-500" />
              </div>
              <h3 className="mb-2 md:mb-3 text-lg md:text-xl font-semibold text-slate-800">{feature.title}</h3>
              <p className="text-sm md:text-base font-normal leading-relaxed text-slate-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
