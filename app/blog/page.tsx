import PostIndex from "@/components/PostIndex";
import { generatePageMetadata } from "@/lib/metadata";
import { pageNumber } from "@/lib/platform";
export const dynamic = "force-dynamic";
type Search = { page?: string; q?: string; category?: string };
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const s = await searchParams,
    p = pageNumber(s.page);
  return {
    ...generatePageMetadata(
      "Building Performance Blog" + (p > 1 ? " — Page " + p : ""),
      "Energy efficiency, weatherization, HVAC, and building diagnostics insights from BPT.",
      "/blog" + (p > 1 ? "?page=" + p : ""),
    ),
    ...(s.q || s.category ? { robots: { index: false, follow: true } } : {}),
  };
}
export default function Page({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  return <PostIndex kind="blog" searchParams={searchParams} />;
}
