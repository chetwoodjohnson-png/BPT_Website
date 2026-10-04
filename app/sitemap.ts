import type { MetadataRoute } from "next";
import { database, ORIGIN, postPath } from "@/lib/platform";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/bpms",
    "/bpmsfield",
    "/bpms-fluxsense-analyzer",
    "/blog",
    "/latest-news",
    "/forum",
    "/privacy-policy",
    "/terms-conditions",
  ].map((path) => ({ url: ORIGIN + path }));
  const db = database();
  for (let offset = 0; offset < 40000; offset += 1000) {
    const { data, error } = await db
      .from("bpt_posts")
      .select("kind,slug,updated_at")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("id")
      .range(offset, offset + 999);
    if (error) throw error;
    for (const p of data || [])
      entries.push({ url: ORIGIN + postPath(p), lastModified: p.updated_at });
    if (!data || data.length < 1000) break;
  }
  for (let offset = 0; offset < 9000; offset += 1000) {
    const { data, error } = await db
      .from("bpt_threads")
      .select("id,updated_at")
      .eq("status", "published")
      .order("id")
      .range(offset, offset + 999);
    if (error) throw error;
    for (const t of data || [])
      entries.push({
        url: `${ORIGIN}/forum/${t.id}`,
        lastModified: t.updated_at,
      });
    if (!data || data.length < 1000) break;
  }
  return entries;
}
