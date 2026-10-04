import { createClient } from "@supabase/supabase-js";
export const ORIGIN = "https://www.buildingperformancetechnologies.com";
export const CATEGORIES = [
  "Energy audits",
  "BPMS support",
  "BPMSField",
  "FluxSense",
  "HVAC and heat pumps",
  "Weatherization",
];
export type Post = {
  id: string;
  kind: "blog" | "news";
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  author_bio: string;
  image_url: string | null;
  image_alt: string;
  seo_title: string;
  seo_description: string;
  status: string;
  published_at: string;
  created_at: string;
  updated_at: string;
};
export type Thread = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  status: string;
  pinned: boolean;
  locked: boolean;
  created_at: string;
  updated_at: string;
};
export type Reply = {
  id: string;
  thread_id: string;
  user_id: string;
  content: string;
  author: string;
  status: string;
  created_at: string;
  updated_at: string;
};
export function database(token?: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL,
    key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key)
    throw new Error(
      "Publishing and community services are not configured yet.",
    );
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    ...(token
      ? { global: { headers: { Authorization: `Bearer ${token}` } } }
      : {}),
  });
}
export function postPath(p: Pick<Post, "kind" | "slug">) {
  return `/${p.kind === "blog" ? "blog" : "latest-news"}/${p.slug}`;
}
export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
export function dateLabel(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  });
}
export function pageNumber(value?: string) {
  const n = Number(value);
  return Number.isSafeInteger(n) && n > 0 ? Math.min(n, 10000) : 1;
}
export async function listPosts(
  kind?: string,
  page = 1,
  q = "",
  category = "",
) {
  let query = database()
    .from("bpt_posts")
    .select("*", { count: "exact" })
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .order("id")
    .range((page - 1) * 12, page * 12 - 1);
  if (kind) query = query.eq("kind", kind);
  if (q)
    query = query.ilike("title", `%${q.replace(/[%_]/g, "").slice(0, 100)}%`);
  if (category) query = query.eq("category", category);
  const { data, error, count } = await query;
  if (error) throw error;
  return { items: (data || []) as Post[], total: count || 0 };
}
export async function getPost(kind: string, slug: string) {
  const { data, error } = await database()
    .from("bpt_posts")
    .select("*")
    .eq("kind", kind)
    .eq("slug", slug)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .maybeSingle();
  if (error) throw error;
  return data as Post | null;
}
export async function getThread(id: string) {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const { data, error } = await database()
    .from("bpt_threads")
    .select("*")
    .eq("id", id)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw error;
  return data as Thread | null;
}
