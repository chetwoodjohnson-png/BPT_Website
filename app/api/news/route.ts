import { NextResponse } from "next/server";
import { getPublishedNews } from "@/lib/news";

/**
 * GET /api/news
 * Fetches all published news articles from Supabase or fallback data
 * Supports query parameters:
 *   - limit: number of articles to return (default: 10)
 *   - offset: pagination offset (default: 0)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);
    const result = await getPublishedNews(limit, offset);

    return NextResponse.json(result);
  } catch (error) {
    console.error("News API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch news articles" },
      { status: 500 }
    );
  }
}
