'use client'

import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { NewsArticle } from "@/lib/supabase";

interface ApiResponse {
  articles: NewsArticle[];
  source: string;
  total: number;
  note?: string;
}

export default function LatestNewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<string>("");

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Latest News", url: "/latest-news" },
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news?limit=10");
        if (!response.ok) throw new Error("Failed to fetch news");
        
        const data: ApiResponse = await response.json();
        setArticles(data.articles);
        setDataSource(data.source);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading news");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <PageHeader
        eyebrow="Latest News"
        title="Updates from Building Performance Technologies."
        description="Follow product updates, company announcements, technology development, and educational content from the Building Performance Technologies ecosystem."
      />

      <section className="section grid3">
        {loading ? (
          <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            Loading articles...
          </p>
        ) : error ? (
          <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "red" }}>
            {error}
          </p>
        ) : articles.length === 0 ? (
          <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            No articles available yet.
          </p>
        ) : (
          articles.map((article) => (
            <article className="newsCard" key={article.id}>
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
    </>
  );
}
