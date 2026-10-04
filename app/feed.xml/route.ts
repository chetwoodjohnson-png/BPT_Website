import { listPosts, ORIGIN, postPath } from "@/lib/platform";
export const dynamic = "force-dynamic";
const escape = (s: string) =>
  s.replace(
    /[<>&"']/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[c]!,
  );
export async function GET() {
  const { items } = await listPosts();
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>BPT Journal and News</title><link>${ORIGIN}</link><description>Building performance insights and energy industry news.</description><language>en-US</language>${items.map((p) => `<item><title>${escape(p.title)}</title><link>${ORIGIN + postPath(p)}</link><guid isPermaLink="true">${ORIGIN + postPath(p)}</guid><description>${escape(p.excerpt)}</description><pubDate>${new Date(p.published_at).toUTCString()}</pubDate></item>`).join("")}</channel></rss>`,
    {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=60",
      },
    },
  );
}
