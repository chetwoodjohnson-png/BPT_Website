import Link from "next/link";
import Image from "next/image";
import PageHeader from "./PageHeader";
import { listPosts, pageNumber, postPath, dateLabel } from "@/lib/platform";
export default async function PostIndex({
  kind,
  searchParams,
}: {
  kind: "blog" | "news";
  searchParams: Promise<{ page?: string; q?: string; category?: string }>;
}) {
  const s = await searchParams,
    page = pageNumber(s.page),
    q = (s.q || "").slice(0, 100),
    category = (s.category || "").slice(0, 80),
    base = kind === "blog" ? "/blog" : "/latest-news";
  let result;
  try {
    result = await listPosts(kind, page, q, category);
  } catch {
    return (
      <section className="section">
        <h1>{kind === "blog" ? "Blog" : "Latest News"}</h1>
        <p role="alert">
          Articles are temporarily unavailable. Please try again shortly.
        </p>
      </section>
    );
  }
  const url = (n: number) =>
    `${base}?${new URLSearchParams({ page: String(n), q, category })}`;
  return (
    <>
      <PageHeader
        eyebrow={kind === "blog" ? "BPT Journal" : "BPT Newsroom"}
        title={
          kind === "blog"
            ? "Knowledge for better buildings."
            : "The latest from BPT."
        }
        description={
          kind === "blog"
            ? "Practical guidance on energy audits, weatherization, heat pumps, and building performance technology."
            : "Company announcements, product releases, and updates from the BPMS ecosystem."
        }
      />
      <section className="section editorial">
        <div className="toolbar">
          <form className="searchForm">
            <label>
              Search articles
              <input
                name="q"
                defaultValue={q}
                placeholder="Search by title"
                maxLength={100}
              />
            </label>
            <label>
              Category
              <input
                name="category"
                defaultValue={category}
                placeholder="All categories"
                maxLength={80}
              />
            </label>
            <button className="button">Search</button>
          </form>
          <Link href="/feed.xml">Subscribe via RSS ↗</Link>
        </div>
        <div className="grid3">
          {result.items.map((p) => (
            <article className="newsCard postCard" key={p.id}>
              <div className="coverFrame">
                {p.image_url ? (
                  <Image
                    className="cover postCover"
                    unoptimized
                    src={p.image_url}
                    alt={p.image_alt}
                    width={960}
                    height={540}
                    sizes="(max-width: 720px) 90vw, (max-width: 1100px) 45vw, 360px"
                  />
                ) : (
                  <div className="coverPlaceholder" aria-hidden="true">
                    <span>{p.category}</span>
                  </div>
                )}
              </div>
              <div className="postCardBody">
              <p className="newsMeta">{p.category}</p>
              <h2 className="cardTitle">
                <Link href={postPath(p)}>{p.title}</Link>
              </h2>
              <p>{p.excerpt}</p>
              <p className="meta">
                {dateLabel(p.published_at)} ·{" "}
                {Math.max(1, Math.ceil(p.content.split(/\s+/).length / 220))}{" "}
                min read
              </p>
              <Link className="textLink postCardLink" href={postPath(p)}>
                Read article →
              </Link>
              </div>
            </article>
          ))}
        </div>
        {!result.items.length && (
          <div className="emptyState">
            <h2>
              {q || category
                ? "No matching articles"
                : "New stories are on the way"}
            </h2>
            <p>
              {q || category
                ? "Try a different title or category."
                : "Explore our products or join the community while our editorial team prepares new articles."}
            </p>
            <Link href="/forum">Visit the community →</Link>
          </div>
        )}
        <nav className="pagination" aria-label="Article pages">
          {page > 1 && <Link href={url(page - 1)}>← Previous</Link>}
          <span>
            Page {page} · {result.total} articles
          </span>
          {page * 12 < result.total && <Link href={url(page + 1)}>Next →</Link>}
        </nav>
      </section>
    </>
  );
}
