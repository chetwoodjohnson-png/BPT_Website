import { NextResponse } from "next/server";
import { database } from "@/lib/platform";
export async function GET() {
  try {
    const { data, error } = await database()
      .from("bpt_threads")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .limit(20);
    if (error) throw error;
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Community unavailable" },
      { status: 503 },
    );
  }
}
export async function POST() {
  return NextResponse.json(
    { error: "Use the authenticated community form at /forum." },
    { status: 410 },
  );
}
