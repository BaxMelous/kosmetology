"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const REGULATIONS = [
  {
    title: "Федеральный закон от 21.11.2011 № 323-ФЗ «Об основах охраны здоровья граждан в Российской Федерации»",
    href: "https://www.consultant.ru/document/cons_doc_LAW_121895/",
  },
  {
    title: "Постановление Правительства РФ от 28.12.2024 № 1944 «О Программе государственных гарантий бесплатного оказания гражданам медицинской помощи на 2025 год и на плановый период 2026 и 2027 годов»",
    href: "http://publication.pravo.gov.ru/document/0001202412300006",
  },
  {
    title: "Федеральный закон от 27.07.2006 № 152-ФЗ «О персональных данных»",
    href: "https://www.consultant.ru/document/cons_doc_LAW_61801/",
  },
  {
    title: "Федеральный закон от 07.02.1992 № 2300-1 «О защите прав потребителей»",
    href: "https://www.consultant.ru/document/cons_doc_LAW_305/",
  },
];

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
    <div className="bg-slate-50 pt-8 md:pt-14">
      <div className="container mx-auto max-w-4xl px-4 py-10 md:px-8 md:py-16">
        <h1 className="mb-4 text-3xl font-semibold text-slate-800 md:text-6xl">
          Правовая информация
        </h1>
        <p className="mb-10 text-slate-500 md:mb-16 md:text-lg">
          Нормативные документы, лицензии и правила клиники СитиМед Эстетика.
        </p>

        <Accordion className="space-y-5">
          {/* Нормативные акты */}
          <AccordionItem
            value="regulations"
            className="overflow-hidden rounded-3xl border border-slate-100 bg-white px-6 shadow-sm"
          >
            <AccordionTrigger className="min-h-11 py-5 text-left hover:no-underline md:py-6">
              <h2 className="text-lg font-semibold text-slate-800 md:text-xl">
                Нормативные акты
              </h2>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <ul className="space-y-4">
                {REGULATIONS.map((item) => (
                  <li key={item.title}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 text-slate-600 transition-colors hover:text-primary"
                    >
                      <span className="mt-0.5 block h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span>{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* Лицензия */}
          <AccordionItem
            value="license"
            className="overflow-hidden rounded-3xl border border-slate-100 bg-white px-6 shadow-sm"
          >
            <AccordionTrigger className="min-h-11 py-5 text-left hover:no-underline md:py-6">
              <h2 className="text-lg font-semibold text-slate-800 md:text-xl">
                Лицензия
              </h2>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-base font-medium text-slate-800">
                    Лицензия на осуществление медицинской деятельности
                  </h3>
                  <ul className="space-y-2 text-slate-600">
                    <li><strong>Номер:</strong> Л041-01157-12/00562498</li>
                    <li><strong>Дата выдачи:</strong> 20 декабря 2019 г.</li>
                    <li><strong>Лицензирующий орган:</strong> Министерство здравоохранения Республики Марий Эл</li>
                    <li><strong>Срок действия:</strong> Бессрочно</li>
                  </ul>
                </div>
                {/* Placeholder for license scans */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex aspect-[3/4] items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-sm text-slate-400">
                    Скан лицензии (стр. 1)
                  </div>
                  <div className="flex aspect-[3/4] items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-sm text-slate-400">
                    Скан лицензии (стр. 2)
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Вышестоящие организации */}
          <AccordionItem
            value="supervisory"
            className="overflow-hidden rounded-3xl border border-slate-100 bg-white px-6 shadow-sm"
          >
            <AccordionTrigger className="min-h-11 py-5 text-left hover:no-underline md:py-6">
              <h2 className="text-lg font-semibold text-slate-800 md:text-xl">
                Вышестоящие организации
              </h2>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="space-y-6">
                {SUPERVISORY_ORGS.map((org) => (
                  <div
                    key={org.name}
                    className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
                  >
                    <h3 className="mb-2 text-base font-semibold text-slate-800">
                      {org.name}
                    </h3>
                    <ul className="space-y-1 text-sm text-slate-600">
                      <li><strong>Адрес:</strong> {org.address}</li>
                      <li><strong>Телефон:</strong>{" "}
                        <a href={`tel:${org.phone.replace(/[^+\d]/g, "")}`} className="text-primary hover:underline">
                          {org.phone}
                        </a>
                      </li>
                      <li>
                        <a
                          href={org.site}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Официальный сайт
                        </a>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Правила внутреннего распорядка */}
          <AccordionItem
            value="rules"
            className="overflow-hidden rounded-3xl border border-slate-100 bg-white px-6 shadow-sm"
          >
            <AccordionTrigger className="min-h-11 py-5 text-left hover:no-underline md:py-6">
              <h2 className="text-lg font-semibold text-slate-800 md:text-xl">
                Правила внутреннего распорядка для пациентов
              </h2>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="space-y-4 text-slate-600">
                <section>
                  <h3 className="mb-2 font-semibold text-slate-800">1. Общие положения</h3>
                  <p>Правила внутреннего распорядка для пациентов (далее — Правила) разработаны в соответствии с Федеральным законом № 323-ФЗ и определяют нормы поведения пациентов в ООО «СитиМед».</p>
                </section>
                <section>
                  <h3 className="mb-2 font-semibold text-slate-800">2. Порядок обращения</h3>
                  <ul className="list-disc space-y-1 pl-5">
                    <li>Приём пациентов осуществляется по предварительной записи.</li>
                    <li>При первом посещении необходимо предоставить паспорт и полис ОМС (при наличии).</li>
                    <li>Пациент обязан сообщить врачу полную и достоверную информацию о состоянии своего здоровья.</li>
                  </ul>
                </section>
                <section>
                  <h3 className="mb-2 font-semibold text-slate-800">3. Права пациентов</h3>
                  <ul className="list-disc space-y-1 pl-5">
                    <li>Право на получение медицинской помощи надлежащего качества.</li>
                    <li>Право на информированное добровольное согласие на медицинское вмешательство.</li>
                    <li>Право на отказ от медицинского вмешательства.</li>
                    <li>Право на сохранение врачебной тайны.</li>
                  </ul>
                </section>
                <section>
                  <h3 className="mb-2 font-semibold text-slate-800">4. Обязанности пациентов</h3>
                  <ul className="list-disc space-y-1 pl-5">
                    <li>Соблюдать рекомендации врача и предписанный режим лечения.</li>
                    <li>Соблюдать чистоту и порядок в помещениях клиники.</li>
                    <li>Бережно относиться к имуществу клиники.</li>
                    <li>Своевременно оплачивать оказанные медицинские услуги.</li>
                  </ul>
                </section>
                <section>
                  <h3 className="mb-2 font-semibold text-slate-800">5. Обработка персональных данных</h3>
                  <p>Клиника осуществляет обработку персональных данных пациентов в соответствии с Федеральным законом № 152-ФЗ «О персональных данных» и Политикой конфиденциальности. Персональные данные используются исключительно в целях оказания медицинской помощи и не подлежат передаче третьим лицам без письменного согласия пациента.</p>
                </section>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
