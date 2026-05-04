export interface Doctor {
  id: string;
  name: string;
  role: string;
  experience?: string;
  specialties: string[];
  description?: string;
  image: string | null;
  isChief?: boolean;
  directions?: string[];
  education?: string[];
  workExperience?: string[];
}

export interface Service {
  id: string;
  name: string;
  price: string;
  description?: string;
  isPopular?: boolean;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  services: Service[];
  icon: string;
}

export interface Review {
  id: string;
  author: string;
  text: string;
  rating: number;
}

export const DOCTORS: Doctor[] = [
  {
    id: "bakhtina",
    name: "Бахтина Марина Александровна",
    role: "Врач-дерматовенеролог, врач-косметолог",
    specialties: ["Инъекционная косметология", "Аппаратные методики", "Коллагеностимуляция"],
    image: null,
  },
  {
    id: "gordeeva",
    name: "Гордеева Наталья Владимировна",
    role: "Врач-дерматовенеролог, врач-косметолог",
    experience: "Опыт более 20 лет",
    specialties: ["Эстетическая косметология", "Химические пилинги", "Чистка лица"],
    image: null,
  },
  {
    id: "domracheva",
    name: "Домрачева Надежда Юрьевна",
    role: "Врач-дерматовенеролог, трихолог, врач-косметолог",
    specialties: ["Трихология", "Лазерное лечение", "Инъекционная косметология"],
    image: null,
  },
  {
    id: "smirnova",
    name: "Смирнова Олеся Сергеевна",
    role: "Врач-дерматовенеролог, косметолог",
    specialties: ["Лечение кожных заболеваний", "Детский прием", "Удаление новообразований"],
    image: null,
  },
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "injection",
    title: "ИНЪЕКЦИОННАЯ КОСМЕТОЛОГИЯ",
    description: "Инъекционные методики для молодости и красоты. Забудьте о морщинах, сухости и «поплывшем» овале...",
    icon: "Syringe",
    services: [
      { id: "botox", name: "Ботулинотерапия", price: "от 160 ₽/ед", isPopular: true, description: "Разглаживание морщин за 15 минут..." },
      { id: "biorev", name: "Биоревитализация", price: "от 7 500 ₽", isPopular: true, description: "Сияние как после отпуска. Глубокое увлажнение..." },
      { id: "contour", name: "Контурная пластика", price: "от 17 000 ₽", isPopular: true, description: "Красивые, симметричные губы..." },
      { id: "meso", name: "Мезотерапия", price: "от 5 000 ₽" },
    ],
  },
  {
    id: "hardware",
    title: "АППАРАТНАЯ КОСМЕТОЛОГИЯ",
    description: "Технологии будущего для вашей кожи. SMAS-лифтинг, лазерное лечение...",
    icon: "Zap",
    services: [
      { id: "smas", name: "SMAS-лифтинг", price: "от 7 000 ₽", isPopular: true, description: "Безоперационная подтяжка..." },
      { id: "phototherapy", name: "Фототерапия", price: "от 6 000 ₽" },
      { id: "laser", name: "Лазерное лечение", price: "от 100 ₽" },
    ],
  },
  {
    id: "thread",
    title: "НИТЕВОЙ ЛИФТИНГ",
    description: "Безоперационная подтяжка лица нитями Aptos...",
    icon: "Layers",
    services: [
      { id: "aptos", name: "Aptos (2 нити)", price: "45 000 ₽" },
      { id: "mesoniti", name: "Мезонити (10 шт)", price: "10 000 ₽" },
    ],
  },
  {
    id: "peeling",
    title: "ХИМИЧЕСКИЕ ПИЛИНГИ",
    description: "Обновление и сияние вашей кожи...",
    icon: "Sparkles",
    services: [
      { id: "prx", name: "PRX-T33", price: "2 500 ₽" },
      { id: "valencia", name: "Valencia Peel", price: "3 500 ₽" },
      { id: "tca", name: "TCA", price: "7 000 ₽" },
    ],
  },
  {
    id: "care",
    title: "УХОДОВЫЕ ПРОЦЕДУРЫ И МАССАЖИ",
    description: "Комплексный уход за кожей лица и тела...",
    icon: "Flower2",
    services: [
      { id: "cleaning", name: "Чистка лица", price: "3 000 ₽", isPopular: true, description: "Убираем черные точки, воспаления..." },
      { id: "massage", name: "Миофасциальный массаж", price: "1 650 ₽" },
    ],
  },
];

export const REVIEWS: Review[] = [
  { id: "1", author: "Елена М.", rating: 5, text: "Прекрасная клиника! Врачи - настоящие профессионалы. Результат после первой процедуры превзошел все ожидания." },
  { id: "2", author: "Анна В.", rating: 5, text: "Очень уютная атмосфера и вежливый персонал. Делала лазерную эпиляцию - быстро и безболезненно." },
  { id: "3", author: "Марина С.", rating: 5, text: "Долго искала своего косметолога и нашла здесь. Рекомендую Елену Смирнову - золотые руки!" },
  { id: "4", author: "Виктория П.", rating: 5, text: "Хожу в СитиМед уже год. Кожа стала заметно лучше. Спасибо за профессионализм!" },
  { id: "5", author: "Ольга К.", rating: 5, text: "Отличный сервис и доступные цены. Процедуры подбирают индивидуально, не навязывают лишнего." },
  { id: "6", author: "Ирина Д.", rating: 5, text: "Была на чистке лица, все прошло супер. Обязательно вернусь снова." },
  { id: "7", author: "Татьяна Л.", rating: 5, text: "Понравилось отношение врачей и современное оборудование. Результатом довольна." },
];

export const CONTACTS = {
  address: "г. Йошкар-Ола, ул. Лобачевского, 1",
  workingHours: {
    weekdays: "Пн–Пт: 8:00–20:00",
    saturday: "Сб: 8:00–18:00",
    sunday: "Вс: выходной",
  },
  phone: "+7 (927) 684-54-54",
  stops: "«Якова Эшпая» и «Ленинский проспект»",
  routes: "24П, 21К, 18К, 20К, М8, М2, 3П",
};
