import { createClient } from "@supabase/supabase-js";
import type { NewsArticle } from "@/lib/supabase";

const fallbackArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Building Performance Technologies expands the BPMS ecosystem",
    category: "Company Update",
    excerpt:
      "The company is developing a connected system that brings together cloud software, mobile field capture, thermal documentation, LiDAR scanning, and building performance analysis.",
    content:
      "The company is developing a connected system that brings together cloud software, mobile field capture, thermal documentation, LiDAR scanning, and building performance analysis. This comprehensive ecosystem enables building professionals to conduct thorough energy audits and performance assessments.",
    published_at: "2026-06-25T10:00:00.000Z",
    created_at: "2026-06-25T10:00:00.000Z",
    updated_at: "2026-06-25T10:00:00.000Z",
  },
  {
    id: "2",
    title: "BPMSField supports mobile-first building documentation",
    category: "Product News",
    excerpt:
      "BPMSField is positioned as the mobile field companion for collecting photos, thermal images, LiDAR scans, and audit evidence directly from the jobsite.",
    content:
      "BPMSField is positioned as the mobile field companion for collecting photos, thermal images, LiDAR scans, and audit evidence directly from the jobsite. The mobile app integrates seamlessly with the BPMS cloud platform for unified workflows.",
    published_at: "2026-06-24T10:00:00.000Z",
    created_at: "2026-06-24T10:00:00.000Z",
    updated_at: "2026-06-24T10:00:00.000Z",
  },
  {
    id: "3",
    title: "BPMS FluxSense Analyzer concept targets direct heat flux measurement",
    category: "Innovation",
    excerpt:
      "The analyzer concept is designed to strengthen building diagnostics by measuring thermal transfer and supporting cloud-based performance modeling.",
    content:
      "The analyzer concept is designed to strengthen building diagnostics by measuring thermal transfer and supporting cloud-based performance modeling. This hardware innovation will enhance the diagnostic capabilities of the BPMS ecosystem.",
    published_at: "2026-06-23T10:00:00.000Z",
    created_at: "2026-06-23T10:00:00.000Z",
    updated_at: "2026-06-23T10:00:00.000Z",
  },
];

export interface NewsResult {
  articles: NewsArticle[];
  source: "supabase" | "fallback";
  total: number;
  note?: string;
}

export async function getPublishedNews(limit = 10, offset = 0): Promise<NewsResult> {
  const hasSupabaseConfig =
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (hasSupabaseConfig) {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data, error, count } = await supabase
        .from("news_articles")
        .select("*", { count: "exact" })
        .eq("published", true)
        .order("published_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        throw error;
      }

      return {
        articles: (data as NewsArticle[]) || [],
        source: "supabase",
        total: count ?? data?.length ?? 0,
      };
    } catch (supabaseError) {
      console.warn("Failed to fetch from Supabase, using fallback:", supabaseError);
    }
  }

  return {
    articles: fallbackArticles.slice(offset, offset + limit),
    source: "fallback",
    total: fallbackArticles.length,
    note: "Using fallback data. Configure Supabase environment variables for dynamic content.",
  };
}