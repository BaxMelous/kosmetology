import type { MetadataRoute } from "next";
import { getCosmetologyDoctors } from "@/lib/api/doctors";
import { absoluteUrl } from "@/lib/seo";

type Entry = MetadataRoute.Sitemap[number];

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: Entry["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/prices", priority: 0.9, changeFrequency: "weekly" },
  { path: "/doctors", priority: 0.8, changeFrequency: "monthly" },
  { path: "/reviews", priority: 0.6, changeFrequency: "weekly" },
  { path: "/contacts", priority: 0.7, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Карточки врачей — основной источник E-E-A-T страниц, их нужно отдавать поисковикам явно.
  const doctors = await getCosmetologyDoctors();
  const doctorEntries: MetadataRoute.Sitemap = doctors.map((doctor) => ({
    url: absoluteUrl(`/doctors/${doctor.id}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...doctorEntries];
}
