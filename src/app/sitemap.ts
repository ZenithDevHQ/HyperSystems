import { MetadataRoute } from "next";
import { plugins } from "@/lib/plugins";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hypersystems.dev";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/plugins`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/download`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/community`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Plugin pages
  const pluginPages: MetadataRoute.Sitemap = plugins.map((plugin) => ({
    url: `${baseUrl}/plugins/${plugin.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Wiki pages for hyperfactions
  const wikiPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/plugins/hyperfactions/wiki`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/plugins/hyperfactions/wiki/getting-started`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/plugins/hyperfactions/wiki/getting-started/installation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/plugins/hyperfactions/wiki/getting-started/configuration`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/plugins/hyperfactions/wiki/concepts`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/plugins/hyperfactions/wiki/commands`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/plugins/hyperfactions/wiki/reference`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  return [...staticPages, ...pluginPages, ...wikiPages];
}
