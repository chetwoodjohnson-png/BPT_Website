import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getPost,
  listPosts,
  postPath,
  ORIGIN,
  jsonLd,
  dateLabel,
} from "@/lib/platform";
import ArticleBody from "./ArticleBody";
import Breadcrumbs from "./Breadcrumbs";
export async function postMetadata(
  kind: string,
  slug: string,
): Promise<Metadata> {
  const p = await getPost(kind, slug);
  if (!p) return { title: "Article not found", robots: { index: false } };
  const url = ORIGIN + postPath(p),
    title = p.seo_title || p.title,
    description = p.seo_description || p.excerpt;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      publishedTime: p.published_at,
      modifiedTime: p.updated_at,
      authors: [p.author],
      images: p.image_url ? [{ url: p.image_url, alt: p.image_alt }] : [],
    },
    twitter: {
      card: p.image_url ? "summary_large_image" : "summary",
      title,
      description,
      images: p.image_url ? [p.image_url] : [],
    },
  };
}
export default async function PostDetail({
  kind,
  slug,
}: {
  kind: "blog" | "news";
  slug: string;
}) {
  const p = await getPost(kind, slug);
  if (!p) notFound();
  const related = (await listPosts(kind, 1, "", p.category)).items
    .filter((x) => x.id !== p.id)
    .slice(0, 3);
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          {
            name: kind === "blog" ? "Blog" : "Latest News",
            url: kind === "blog" ? "/blog" : "/latest-news",
          },
          { name: p.title, url: postPath(p) },
        ]}
      />
      <article className="section reading">
        <p className="eyebrow">{p.category}</p>
        <h1>{p.title}</h1>
        <p className="lead">{p.excerpt}</p>
        <p className="meta">
          By {p.author} · {dateLabel(p.published_at)} ·{" "}
          {Math.max(1, Math.ceil(p.content.split(/\s+/).length / 220))} min read
        </p>
        {p.image_url && (
          <Image
            className="cover"
            unoptimized
            src={p.image_url}
            alt={p.image_alt}
            width={1200}
            height={675}
            priority
          />
        )}
        <ArticleBody text={p.content} />
        <div className="tagList">
          {p.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        {p.author_bio && (
          <aside className="card">
            <h2 className="cardTitle">About {p.author}</h2>
            <p>{p.author_bio}</p>
          </aside>
        )}
        <div className="actions">
          <Link className="button" href="/forum">
            Discuss with the community
          </Link>
          <Link className="buttonSecondary" href="/bpms">
            Explore BPMS
          </Link>
        </div>
        <p className="meta">Updated {dateLabel(p.updated_at)}</p>
      </article>
      {related.length > 0 && (
        <section className="section">
          <h2>Keep reading</h2>
          <div className="grid3">
            {related.map((x) => (
              <Link className="card" href={postPath(x)} key={x.id}>
                <h3>{x.title}</h3>
                <p>{x.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": kind === "blog" ? "BlogPosting" : "NewsArticle",
            headline: p.title,
            description: p.excerpt,
            datePublished: p.published_at,
            dateModified: p.updated_at,
            mainEntityOfPage: ORIGIN + postPath(p),
            author: { "@type": "Person", name: p.author },
            publisher: {
              "@type": "Organization",
              name: "Building Performance Technologies, LLC",
              url: ORIGIN,
            },
            ...(p.image_url ? { image: p.image_url } : {}),
          }),
        }}
      />
    </>
  );
}
