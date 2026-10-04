import { NextResponse } from "next/server";
import { getThread } from "@/lib/platform";
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const t = await getThread((await params).id);
  return NextResponse.json(t || { error: "Not found" }, {
    status: t ? 200 : 404,
  });
}
