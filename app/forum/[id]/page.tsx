import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getThread,
  database,
  ORIGIN,
  jsonLd,
  dateLabel,
  pageNumber,
  type Reply,
} from "@/lib/platform";
import { generatePageMetadata } from "@/lib/metadata";
import CommunityActions from "@/components/CommunityActions";
export const dynamic = "force-dynamic";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const t = await getThread((await params).id);
  return t
    ? generatePageMetadata(t.title, t.content.slice(0, 155), `/forum/${t.id}`)
    : { title: "Discussion not found", robots: { index: false } };
}
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const t = await getThread((await params).id);
  if (!t) notFound();
  const page = pageNumber((await searchParams).page);
  const { data, error, count } = await database()
    .from("bpt_replies")
    .select("*", { count: "exact" })
    .eq("thread_id", t.id)
    .eq("status", "published")
    .order("created_at")
    .order("id")
    .range((page - 1) * 30, page * 30 - 1);
  if (error) throw error;
  const replies = (data || []) as Reply[];
  return (
    <section className="section reading">
      <Link className="textLink" href="/forum">
        ← All discussions
      </Link>
      <p className="eyebrow">
        {t.category}
        {t.locked ? " · Closed" : ""}
      </p>
      <h1>{t.title}</h1>
      <p className="meta">
        {t.author} · {dateLabel(t.created_at)}
      </p>
      <p className="userContent">{t.content}</p>
      <h2 className="cardTitle">{count || 0} replies</h2>
      {replies.map((r) => (
        <article className="card replyCard" key={r.id} id={`reply-${r.id}`}>
          <p className="newsMeta">
            {r.author} · {dateLabel(r.created_at)}
          </p>
          <p className="userContent">{r.content}</p>
        </article>
      ))}
      <nav className="pagination" aria-label="Reply pages">
        {page > 1 && <Link href={`?page=${page - 1}`}>← Previous replies</Link>}
        {page * 30 < (count || 0) && (
          <Link href={`?page=${page + 1}`}>More replies →</Link>
        )}
      </nav>
      <CommunityActions threadId={t.id} locked={t.locked} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "DiscussionForumPosting",
            headline: t.title,
            text: t.content,
            url: `${ORIGIN}/forum/${t.id}`,
            datePublished: t.created_at,
            dateModified: t.updated_at,
            author: { "@type": "Person", name: t.author },
            interactionStatistic: {
              "@type": "InteractionCounter",
              interactionType: "https://schema.org/CommentAction",
              userInteractionCount: count || 0,
            },
            comment: replies.map((r) => ({
              "@type": "Comment",
              text: r.content,
              datePublished: r.created_at,
              author: { "@type": "Person", name: r.author },
            })),
          }),
        }}
      />
    </section>
  );
}
