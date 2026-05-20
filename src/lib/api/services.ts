import { fetchApi } from "@/lib/api/client";
import { SERVICE_CATEGORIES, type Service, type ServiceCategory } from "@/lib/data";
import type { MedDirectionDto, MedServiceDto } from "@/lib/types/api";

type CategoryDefinition = Pick<ServiceCategory, "id" | "title" | "description" | "icon" | "image"> & {
  keywords: string[];
};

const CATEGORY_DEFINITIONS: CategoryDefinition[] = [
  {
    id: "injection",
    title: "Инъекционная косметология",
    description: "Инъекционные методики для омоложения, увлажнения и коррекции возрастных изменений.",
    icon: "Syringe",
    image: "/images/services/injection.webp",
    keywords: ["ботул", "биорев", "контур", "мезо", "плазмо", "инъек", "увеличение губ", "коллаген"],
  },
  {
    id: "hardware",
    title: "Аппаратная косметология",
    description: "Технологичные процедуры для лифтинга, лечения кожи и улучшения текстуры.",
    icon: "Zap",
    image: "/images/services/hardware.webp",
    keywords: ["smas", "смас", "лазер", "фото", "rf", "микроток", "ультразвук", "аппарат"],
  },
  {
    id: "thread",
    title: "Нитевой лифтинг",
    description: "Безоперационные методики лифтинга и армирования тканей.",
    icon: "Layers",
    image: "/images/services/thread.webp",
    keywords: ["нити", "нитевой", "aptos", "аптос", "мезонит"],
  },
  {
    id: "peeling",
    title: "Пилинги и обновление кожи",
    description: "Программы обновления, выравнивания тона и текстуры кожи.",
    icon: "Sparkles",
    image: "/images/services/peeling.webp",
    keywords: ["пилинг", "prx", "tca", "peel", "джесснер"],
  },
  {
    id: "care",
    title: "Уходовые процедуры",
    description: "Уход, чистки, массажи и деликатные процедуры для поддержания качества кожи.",
    icon: "Flower2",
    image: "/images/services/care.webp",
    keywords: ["чистк", "уход", "массаж", "пилинг-уход", "маск", "карбокси"],
  },
];

const POPULAR_SERVICE_PATTERNS = [/ботул/i, /биорев/i, /контур/i, /smas|смас/i, /чистк/i];

const FALLBACK_PRICE_BY_NAME = new Map(
  SERVICE_CATEGORIES.flatMap((category) =>
    category.services.map((service) => [normalizeText(service.name), service.price] as const)
  )
);

const FALLBACK_DESCRIPTION_BY_NAME = new Map(
  SERVICE_CATEGORIES.flatMap((category) =>
    category.services
      .filter((service) => service.description)
      .map((service) => [normalizeText(service.name), service.description as string] as const)
  )
);

function normalizeText(value: string) {
  return value.toLowerCase().replaceAll("ё", "е").replace(/\s+/g, " ").trim();
}

function formatPrice(price: MedServiceDto["price"], serviceName: string) {
  const amount = price?.individuals;

  if (typeof amount === "number") {
    return `${new Intl.NumberFormat("ru-RU").format(amount)} ₽`;
  }

  return FALLBACK_PRICE_BY_NAME.get(normalizeText(serviceName)) ?? "По запросу";
}

function buildServiceDescription(service: MedServiceDto) {
  return (
    service.description ??
    service.applyReason ??
    service.preparation ??
    FALLBACK_DESCRIPTION_BY_NAME.get(normalizeText(service.name))
  );
}

function pickCategory(serviceName: string) {
  const normalizedName = normalizeText(serviceName);

  return (
    CATEGORY_DEFINITIONS.find((category) =>
      category.keywords.some((keyword) => normalizedName.includes(keyword))
    ) ?? {
      id: "other",
      title: "Другие услуги",
      description: "Дополнительные процедуры и консультации.",
      icon: "Sparkles",
      image: "/images/services/care.webp",
      keywords: [],
    }
  );
}

function mapServiceToCard(service: MedServiceDto): Service {
  return {
    id: service.id,
    name: service.name,
    price: formatPrice(service.price, service.name),
    description: buildServiceDescription(service),
    isPopular: POPULAR_SERVICE_PATTERNS.some((pattern) => pattern.test(service.name)),
  };
}

function groupServices(services: MedServiceDto[]): ServiceCategory[] {
  const grouped = new Map<string, ServiceCategory>();

  for (const service of services) {
    const category = pickCategory(service.name);
    const existing = grouped.get(category.id);

    if (!existing) {
      grouped.set(category.id, {
        id: category.id,
        title: category.title,
        description: category.description,
        icon: category.icon,
        image: category.image,
        services: [mapServiceToCard(service)],
      });
      continue;
    }

    existing.services.push(mapServiceToCard(service));
  }

  return Array.from(grouped.values()).map((category) => ({
    ...category,
    services: category.services.sort((left, right) => left.name.localeCompare(right.name, "ru")),
  }));
}

function findCosmetologyDirection(directions: MedDirectionDto[]) {
  return directions.find((direction) => /(космет|эстет)/i.test(direction.name));
}

export async function getCosmetologyServices(): Promise<ServiceCategory[]> {
  const directions = await fetchApi<MedDirectionDto[]>("/dictionary/directions", {
    method: "POST",
    body: JSON.stringify({}),
  });

  if (!directions) {
    return SERVICE_CATEGORIES;
  }

  const cosmetologyDirection = findCosmetologyDirection(directions);

  if (!cosmetologyDirection) {
    return SERVICE_CATEGORIES;
  }

  const services = await fetchApi<MedServiceDto[]>("/dictionary/services", {
    method: "POST",
    body: JSON.stringify({ directionId: cosmetologyDirection.id }),
  });

  if (!services?.length) {
    return SERVICE_CATEGORIES;
  }

  return groupServices(services);
}

export function getPopularServicesFromCategories(categories: ServiceCategory[]) {
  return categories.flatMap((category) =>
    category.services
      .filter((service) => service.isPopular)
      .map((service) => ({ ...service, category: category.title }))
  );
}
