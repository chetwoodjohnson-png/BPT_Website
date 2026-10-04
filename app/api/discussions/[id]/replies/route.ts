import { NextResponse } from "next/server";
export async function POST() {
  return NextResponse.json(
    { error: "Use the authenticated discussion page to reply." },
    { status: 410 },
  );
}
