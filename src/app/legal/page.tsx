import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PageHero } from "@/components/PageHero";
import { CtaConsultation } from "@/components/sections/CtaConsultation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Нормативные документы | СитиМед Эстетика",
  description:
    "Нормативные документы, лицензии, учредительные документы и правила клиники СитиМед Эстетика в Йошкар-Оле. Официальная информация о деятельности клиники.",
};

// --- Document link card ---
function DocLink({ title, href, description }: { title: string; href: string; description?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-card border border-slate-100 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
        <FileText className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <span className="block text-sm font-light leading-snug text-[#1a1a2e] transition-colors group-hover:text-primary">
          {title}
        </span>
        {description && (
          <span className="mt-0.5 block text-xs font-light text-muted-light">{description}</span>
        )}
      </div>
    </a>
  );
}

// --- Folder paths ---
const DOCS = "/documents";

// --- Statutory documents ---
const FOUNDING_DOCS = [
  {
    title: "Устав ООО «Медицинский центр СитиМед»",
    href: `${DOCS}/Устав ООО Медицинский центр СитиМед.pdf`,
  },
  {
    title: "Свидетельство о постановке на учёт в налоговом органе (ИНН)",
    href: `${DOCS}/Свидетельство о постановке на учет Российской организации в налоговом органе по месту ее нахождения (ИНН).pdf`,
  },
  {
    title: "Свидетельство о внесении записи в ЕГРЮЛ",
    href: `${DOCS}/Свидетельство о внесении записи в Единый государственный реестр юридических лиц.jpg`,
  },
];

// --- Regulations (laws) ---
const REGULATIONS = [
  {
    title: "Федеральный закон от 21.11.2011 № 323-ФЗ «Об основах охраны здоровья граждан в Российской Федерации»",
    href: "https://www.consultant.ru/document/cons_doc_LAW_121895/",
  },
  {
    title: "Федеральный закон от 27.07.2006 № 152-ФЗ «О персональных данных»",
    href: "https://www.consultant.ru/document/cons_doc_LAW_61801/",
  },
  {
    title: "Федеральный закон от 07.02.1992 № 2300-1 «О защите прав потребителей»",
    href: "https://www.consultant.ru/document/cons_doc_LAW_305/",
  },
  {
    title: "Постановление Правительства РФ об утверждении правил предоставления платных медицинских услуг",
    href: `${DOCS}/Постановление Правительства РФ об утверждении правил предоставления медицинскими оранизациями платных медицинских услуг.pdf`,
  },
  {
    title: "Программа государственных гарантий бесплатного оказания гражданам медицинской помощи на 2026 год (Республика Марий Эл)",
    href: `${DOCS}/Программа госгарантий марий эл на 2026 г.pdf`,
  },
  {
    title: "Перечень жизненно необходимых и важнейших лекарственных препаратов",
    href: `${DOCS}/Распоряжение об утверждении перечня жизненно необходимых и важнейших лекарственных препаратов для медицинского применения.pdf`,
  },
];

// --- Personal data ---
const PERSONAL_DATA_DOCS = [
  {
    title: "Политика по обработке персональных данных",
    href: `${DOCS}/Политика по обработке персональных данных.pdf`,
  },
  {
    title: "Положение о защите персональных данных",
    href: `${DOCS}/Положение о защите персональных данных.pdf`,
  },
  {
    title: "Согласие на обработку персональных данных",
    href: `${DOCS}/Согласие на обработку персональных данных.pdf`,
  },
];

// --- Paid services ---
const PAID_SERVICES_DOCS = [
  {
    title: "Договор на оказание платных медицинских услуг",
    href: `${DOCS}/Договор на оказание платных медицинских услуг.pdf`,
  },
  {
    title: "Положение о предоставлении платных медицинских услуг",
    href: `${DOCS}/Положение о предоставлении платных медицинских услуг в ООО "Медицинский центр СитиМед.pdf`,
  },
  {
    title: "Положение о скидках",
    href: `${DOCS}/Положение о скидках.pdf`,
  },
];

// --- Patient info ---
const PATIENT_INFO_DOCS = [
  {
    title: "Правила внутреннего распорядка для пациентов",
    href: `${DOCS}/Правила внутреннего распорядка для пациентов.pdf`,
  },
  {
    title: "Доверенность для детей до 18 лет в сопровождении родственников",
    href: `${DOCS}/Доверенность для детей до 18 лет в сопровождении родственников.pdf`,
  },
  {
    title: "Положение о порядке рассмотрения обращений граждан",
    href: `${DOCS}/Положение о порядке рассмотрения обращений граждан в ООО "Медицинский центр СитиМед.pdf`,
  },
  {
    title: "Памятка для населения о гриппе",
    href: `${DOCS}/Памятка для населения о гриппе.jpg`,
  },
  {
    title: "Техника безопасности при хронических заболеваниях",
    description: "Эпилепсия, диабет, астма, сердечно-сосудистые и другие заболевания",
    href: `${DOCS}/Техника безопасности при внезапных приступах эпилепсии, диабета, астмы, сердечно-сосудистых и других хронических заболеваний.jpg`,
  },
];

// --- Supervisory orgs ---
const SUPERVISORY_ORGS = [
  {
    name: "Министерство здравоохранения Республики Марий Эл",
    address: "424000, г. Йошкар-Ола, ул. Советская, д. 149",
    phone: "+7 (8362) 45-15-15",
    site: "https://mari-el.gov.ru/ministries/minzdrav/",
  },
  {
    name: "Управление Роспотребнадзора по Республике Марий Эл",
    address: "424007, г. Йошкар-Ола, ул. Машиностроителей, д. 121",
    phone: "+7 (8362) 68-19-44",
    site: "https://12.rospotrebnadzor.ru/",
  },
  {
    name: "Территориальный орган Росздравнадзора по Республике Марий Эл",
    address: "424000, г. Йошкар-Ола, ул. Волкова, д. 104",
    phone: "+7 (8362) 45-99-49",
    site: "https://12reg.roszdravnadzor.gov.ru/",
  },
];

export default function LegalPage() {
  return (
    <div className="bg-slate-50 pb-10 md:pb-20">
      <PageHero
        title="Нормативные документы"
        subtitle="Лицензии, учредительные документы и правила клиники СитиМед Эстетика. Официальная информация о нашей деятельности."
        videoSrc="/video/hero-contacts.mp4"
        posterSrc="/video/hero-contacts-poster.webp"
        videoFilter="none"
      />

      <ScrollReveal>
        <section className="container mx-auto max-w-7xl px-4 pt-6 md:px-8 md:pt-10">
          <Accordion className="space-y-4 md:space-y-5">
            {/* ===== 1. Лицензия ===== */}
            <AccordionItem
              value="license"
              className="overflow-hidden rounded-card border border-slate-100 bg-white shadow-card"
            >
              <AccordionTrigger className="min-h-11 px-6 py-5 text-left hover:no-underline md:px-8 md:py-6">
                <h2 className="text-lg font-light tracking-[0.04em] text-[#1a1a2e] md:text-xl">
                  Лицензия
                </h2>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 md:px-8 md:pb-8">
                <div className="space-y-6">
                  {/* License details card */}
                  <div className="rounded-card border border-slate-100 bg-slate-50/70 p-5 md:p-6">
                    <h3 className="mb-3 text-base font-light tracking-[0.03em] text-[#1a1a2e]">
                      Лицензия на осуществление медицинской деятельности
                    </h3>
                    <div className="grid grid-cols-1 gap-2 text-sm font-light text-muted-light sm:grid-cols-2">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.15em] text-slate-400">Номер</span>
                        <p className="mt-0.5 text-[#1a1a2e]">Л041-01131-12/00323497</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.15em] text-slate-400">Дата выдачи</span>
                        <p className="mt-0.5 text-[#1a1a2e]">24 декабря 2020 г.</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.15em] text-slate-400">Лицензирующий орган</span>
                        <p className="mt-0.5 text-[#1a1a2e]">Министерство здравоохранения Республики Марий Эл</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.15em] text-slate-400">Срок действия</span>
                        <p className="mt-0.5 text-[#1a1a2e]">Бессрочно</p>
                      </div>
                    </div>
                  </div>

                  {/* PDF preview */}
                  <div className="overflow-hidden rounded-card border border-slate-100 shadow-card">
                    <iframe
                      src={`${DOCS}/l041-01131-12_00323497.pdf#view=FitH`}
                      className="h-150 w-full md:h-200"
                      title="Скан лицензии"
                    />
                  </div>

                  <DocLink
                    title="Скачать лицензию (PDF)"
                    href={`${DOCS}/l041-01131-12_00323497.pdf`}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* ===== 2. Учредительные документы ===== */}
            <AccordionItem
              value="founding"
              className="overflow-hidden rounded-card border border-slate-100 bg-white shadow-card"
            >
              <AccordionTrigger className="min-h-11 px-6 py-5 text-left hover:no-underline md:px-8 md:py-6">
                <h2 className="text-lg font-light tracking-[0.04em] text-[#1a1a2e] md:text-xl">
                  Учредительные документы
                </h2>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 md:px-8 md:pb-8">
                {/* Company details */}
                <div className="mb-5 rounded-card border border-slate-100 bg-slate-50/70 p-5 md:p-6">
                  <h3 className="mb-3 text-sm font-light tracking-[0.03em] text-[#1a1a2e]">
                    ООО «Медицинский центр СитиМед»
                  </h3>
                  <div className="grid grid-cols-1 gap-2 text-sm font-light sm:grid-cols-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.15em] text-slate-400">ИНН</span>
                      <p className="mt-0.5 text-[#1a1a2e]">1215157275</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.15em] text-slate-400">ОГРН</span>
                      <p className="mt-0.5 text-[#1a1a2e]">1111215003789</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                  {FOUNDING_DOCS.map((doc) => (
                    <DocLink key={doc.title} {...doc} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* ===== 3. Нормативные акты ===== */}
            <AccordionItem
              value="regulations"
              className="overflow-hidden rounded-card border border-slate-100 bg-white shadow-card"
            >
              <AccordionTrigger className="min-h-11 px-6 py-5 text-left hover:no-underline md:px-8 md:py-6">
                <h2 className="text-lg font-light tracking-[0.04em] text-[#1a1a2e] md:text-xl">
                  Нормативные акты
                </h2>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 md:px-8 md:pb-8">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                  {REGULATIONS.map((item) => (
                    <DocLink key={item.title} {...item} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* ===== 4. Персональные данные ===== */}
            <AccordionItem
              value="personalData"
              className="overflow-hidden rounded-card border border-slate-100 bg-white shadow-card"
            >
              <AccordionTrigger className="min-h-11 px-6 py-5 text-left hover:no-underline md:px-8 md:py-6">
                <h2 className="text-lg font-light tracking-[0.04em] text-[#1a1a2e] md:text-xl">
                  Персональные данные
                </h2>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 md:px-8 md:pb-8">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                  {PERSONAL_DATA_DOCS.map((doc) => (
                    <DocLink key={doc.title} {...doc} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* ===== 5. Платные медицинские услуги ===== */}
            <AccordionItem
              value="paidServices"
              className="overflow-hidden rounded-card border border-slate-100 bg-white shadow-card"
            >
              <AccordionTrigger className="min-h-11 px-6 py-5 text-left hover:no-underline md:px-8 md:py-6">
                <h2 className="text-lg font-light tracking-[0.04em] text-[#1a1a2e] md:text-xl">
                  Платные медицинские услуги
                </h2>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 md:px-8 md:pb-8">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                  {PAID_SERVICES_DOCS.map((doc) => (
                    <DocLink key={doc.title} {...doc} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* ===== 6. Информация для пациентов ===== */}
            <AccordionItem
              value="patientInfo"
              className="overflow-hidden rounded-card border border-slate-100 bg-white shadow-card"
            >
              <AccordionTrigger className="min-h-11 px-6 py-5 text-left hover:no-underline md:px-8 md:py-6">
                <h2 className="text-lg font-light tracking-[0.04em] text-[#1a1a2e] md:text-xl">
                  Информация для пациентов
                </h2>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 md:px-8 md:pb-8">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                  {PATIENT_INFO_DOCS.map((doc) => (
                    <DocLink key={doc.title} {...doc} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* ===== 7. Вышестоящие организации ===== */}
            <AccordionItem
              value="supervisory"
              className="overflow-hidden rounded-card border border-slate-100 bg-white shadow-card"
            >
              <AccordionTrigger className="min-h-11 px-6 py-5 text-left hover:no-underline md:px-8 md:py-6">
                <h2 className="text-lg font-light tracking-[0.04em] text-[#1a1a2e] md:text-xl">
                  Вышестоящие организации
                </h2>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 md:px-8 md:pb-8">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {SUPERVISORY_ORGS.map((org) => (
                    <div
                      key={org.name}
                      className="rounded-card border border-slate-100 bg-slate-50/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                    >
                      <h3 className="mb-3 text-sm font-light leading-snug tracking-[0.03em] text-[#1a1a2e]">
                        {org.name}
                      </h3>
                      <ul className="space-y-1.5 text-xs font-light text-muted-light">
                        <li>
                          <span className="text-[10px] uppercase tracking-[0.15em] text-slate-400">Адрес</span>
                          <p className="mt-0.5">{org.address}</p>
                        </li>
                        <li>
                          <span className="text-[10px] uppercase tracking-[0.15em] text-slate-400">Телефон</span>
                          <p className="mt-0.5">
                            <a href={`tel:${org.phone.replace(/[^+\d]/g, "")}`} className="text-primary hover:underline">
                              {org.phone}
                            </a>
                          </p>
                        </li>
                        <li>
                          <a
                            href={org.site}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block pt-0.5 text-primary hover:underline"
                          >
                            Официальный сайт →
                          </a>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </ScrollReveal>

      <ScrollReveal delayMs={100}>
        <CtaConsultation />
      </ScrollReveal>
    </div>
  );
}
