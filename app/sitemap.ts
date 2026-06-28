import type { MetadataRoute } from "next";
import { getPublishedNews } from "@/lib/news";

const BASE_URL = "https://www.buildingperformancetechnologies.com";

// Keep lastmod stable for mostly static pages so search engines trust this signal.
const PAGE_LAST_MODIFIED = {
  "/": "2026-06-24T00:00:00.000Z",
  "/about": "2026-06-24T00:00:00.000Z",
  "/bpms": "2026-06-24T00:00:00.000Z",
  "/bpmsfield": "2026-06-24T00:00:00.000Z",
  "/bpms-fluxsense-analyzer": "2026-06-24T00:00:00.000Z",
  "/latest-news": "2026-06-25T10:00:00.000Z",
  "/forum": "2026-06-24T00:00:00.000Z",
  "/privacy-policy": "2026-06-24T00:00:00.000Z",
  "/terms-conditions": "2026-06-24T00:00:00.000Z",
} as const;

function getPageLastModified(path: keyof typeof PAGE_LAST_MODIFIED): Date {
  return new Date(PAGE_LAST_MODIFIED[path]);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let latestNewsLastModified = getPageLastModified("/latest-news");

  try {
    const { articles } = await getPublishedNews(1, 0);
    if (articles.length > 0) {
      const newsDate = new Date(articles[0].updated_at || articles[0].published_at);
      latestNewsLastModified = Number.isNaN(newsDate.getTime())
        ? getPageLastModified("/latest-news")
        : newsDate;
    }
  } catch {
    latestNewsLastModified = getPageLastModified("/");
  }

  return [
    {
      url: `${BASE_URL}/`,
      lastModified: getPageLastModified("/"),
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: getPageLastModified("/about"),
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/bpms`,
      lastModified: getPageLastModified("/bpms"),
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/bpmsfield`,
      lastModified: getPageLastModified("/bpmsfield"),
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/bpms-fluxsense-analyzer`,
      lastModified: getPageLastModified("/bpms-fluxsense-analyzer"),
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/latest-news`,
      lastModified: latestNewsLastModified,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/forum`,
      lastModified: getPageLastModified("/forum"),
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: getPageLastModified("/privacy-policy"),
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/terms-conditions`,
      lastModified: getPageLastModified("/terms-conditions"),
      priority: 0.5,
    },
  ];
}