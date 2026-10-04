import { NextResponse } from "next/server";
import { listPosts, pageNumber } from "@/lib/platform";
export async function GET(request: Request) {
  try {
    const p = new URL(request.url).searchParams;
    const r = await listPosts(
      "news",
      pageNumber(p.get("page") || undefined),
      p.get("q") || "",
    );
    return NextResponse.json({
      articles: r.items,
      total: r.total,
      source: "supabase",
    });
  } catch {
    return NextResponse.json({ error: "News unavailable" }, { status: 503 });
  }
}
