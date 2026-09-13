import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  // Coming-soon case studies are thin/placeholder pages (noindexed via
  // generateMetadata) — keep them out of the sitemap so it only lists
  // pages we actually want Google to index.
  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((p) => !p.comingSoon)
    .map((p) => ({
      url: `${base}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticRoutes, ...projectRoutes];
}
