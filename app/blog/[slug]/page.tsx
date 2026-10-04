import PostDetail, { postMetadata } from "@/components/PostDetail";
export const dynamic = "force-dynamic";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return postMetadata("blog", (await params).slug);
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <PostDetail kind="blog" slug={(await params).slug} />;
}
