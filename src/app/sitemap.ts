import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://irtezaasadrizvi.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/ai", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/projects", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/writing", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
  ];

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
