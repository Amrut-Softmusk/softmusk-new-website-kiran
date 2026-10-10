import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { servicesData } from "./(public)/services/[slug]/data";
import { productsData } from "./(public)/products/[slug]/data";

// Slugs that only alias another page (canonical points elsewhere) stay out of the sitemap.
const ALIASES = new Set(["medimusk"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    page("/", 1, "weekly"),
    page("/services", 0.9),
    page("/products", 0.9),
    page("/contact", 0.9),
    page("/internships", 0.8, "weekly"),
    page("/internship-registration", 0.7),
    page("/workshops", 0.7),
    page("/portfolio", 0.7),
    page("/careers", 0.6, "weekly"),
    ...Object.keys(servicesData).map((slug) => page(`/services/${slug}`, 0.8)),
    ...Object.keys(productsData)
      .filter((slug) => !ALIASES.has(slug))
      .map((slug) => page(`/products/${slug}`, 0.8)),
    page("/privacy", 0.3, "yearly"),
  ];
}
