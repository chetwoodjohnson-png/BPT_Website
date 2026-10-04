import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import CommunityActions from "@/components/CommunityActions";
import {
  database,
  CATEGORIES,
  pageNumber,
  dateLabel,
  type Thread,
} from "@/lib/platform";
import { generatePageMetadata } from "@/lib/metadata";
export const dynamic = "force-dynamic";
export const metadata = generatePageMetadata(
  "Building Performance Community Forum",
  "Ask questions and share practical experience in energy audits, BPMS, thermal diagnostics, HVAC, and weatherization.",
  "/forum",
);
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
}) {
  const s = await searchParams,
    page = pageNumber(s.page),
    q = (s.q || "").slice(0, 100),
    category = CATEGORIES.includes(s.category || "") ? s.category! : "";
  let rows: Thread[] = [],
    total = 0,
    unavailable = false;
  try {
    let query = database()
      .from("bpt_threads")
      .select("*", { count: "exact" })
      .eq("status", "published")
      .order("pinned", { ascending: false })
      .order("created_at", { ascending: false })
      .order("id")
      .range((page - 1) * 20, page * 20 - 1);
    if (q) query = query.ilike("title", `%${q.replace(/[%_]/g, "")}%`);
    if (category) query = query.eq("category", category);
    const r = await query;
    if (r.error) throw r.error;
    rows = r.data || [];
    total = r.count || 0;
  } catch {
    unavailable = true;
  }
  const href = (n: number) =>
    `/forum?${new URLSearchParams({ page: String(n), q, category })}`;
  return (
    <>
      <PageHeader
        eyebrow="BPT Community"
        title="Better buildings. Shared knowledge."
        description="Connect with energy auditors, HVAC professionals, and BPMS users. Ask questions, share field experience, and learn together."
      />
      <section className="section editorial">
        <form className="searchForm">
          <label>
            Search discussions
            <input
              name="q"
              defaultValue={q}
              placeholder="What would you like to learn?"
            />
          </label>
          <label>
            Topic
            <select name="category" defaultValue={category}>
              <option value="">All topics</option>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <button className="button">Search</button>
        </form>
        <div className="threadList">
          {rows.map((t) => (
            <article className="card" key={t.id}>
              <p className="newsMeta">
                {t.category}
                {t.pinned ? " · Pinned" : ""}
                {t.locked ? " · Closed" : ""}
              </p>
              <h2 className="cardTitle">
                <Link href={`/forum/${t.id}`}>{t.title}</Link>
              </h2>
              <p>
                {t.content.slice(0, 220)}
                {t.content.length > 220 ? "…" : ""}
              </p>
              <span className="meta">
                {t.author} · {dateLabel(t.created_at)}
              </span>
            </article>
          ))}
        </div>
        {!rows.length && (
          <p className="emptyState">
            {unavailable
              ? "The community is temporarily unavailable. Please try again shortly."
              : q || category
                ? "No matching discussions."
                : "Be the first to share a question or field experience."}
          </p>
        )}
        <nav className="pagination" aria-label="Discussion pages">
          {page > 1 && <Link href={href(page - 1)}>← Previous</Link>}
          <span>{total} discussions</span>
          {page * 20 < total && <Link href={href(page + 1)}>Next →</Link>}
        </nav>
        <CommunityActions />
      </section>
    </>
  );
}
