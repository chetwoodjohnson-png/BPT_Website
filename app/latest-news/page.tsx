import PageHeader from "@/components/PageHeader";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getPublishedNews } from "@/lib/news";
import ArticleListSchema from "@/components/ArticleListSchema";
import Link from "next/link";

export default async function LatestNewsPage() {
  const { articles } = await getPublishedNews(10, 0);
  const pageUrl = "https://www.buildingperformancetechnologies.com/latest-news";

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Latest News", url: "/latest-news" },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <ArticleListSchema
        title="Latest News | Building Performance Technologies"
        description="Product announcements, software updates, and building performance insights from Building Performance Technologies."
        url={pageUrl}
        items={articles.map((article) => ({
          id: article.id,
          title: article.title,
          excerpt: article.excerpt,
          publishedAt: article.published_at,
          updatedAt: article.updated_at,
          author: article.author,
          category: article.category,
        }))}
      />
      <PageHeader
        eyebrow="Latest News"
        title="Updates from Building Performance Technologies."
        description="Follow product updates, company announcements, technology development, and educational content from the Building Performance Technologies ecosystem."
      />

      <section className="section grid3">
        {articles.length === 0 ? (
          <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            No articles available yet.
          </p>
        ) : (
          articles.map((article) => (
            <article className="newsCard" key={article.id} id={`article-${article.id}`}>
              <p className="newsMeta">{article.category}</p>
              <h3>{article.title}</h3>
              <p>{article.excerpt || article.content.substring(0, 150)}...</p>
              <small style={{ color: "#999" }}>
                {new Date(article.published_at).toLocaleDateString()}
              </small>
            </article>
          ))
        )}
      </section>

      <section className="section">
        <h2>Explore product pages</h2>
        <p>
          Looking for implementation details? Visit <Link href="/bpms">BPMS software</Link>,
          <Link href="/bpmsfield"> BPMSField mobile app</Link>, and
          <Link href="/bpms-fluxsense-analyzer"> FluxSense Analyzer diagnostics</Link>.
        </p>
      </section>
    </>
  );
}
