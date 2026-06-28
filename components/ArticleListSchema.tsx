interface ArticleListItem {
  id: string;
  title: string;
  excerpt?: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  category?: string;
}

interface ArticleListSchemaProps {
  title: string;
  description: string;
  url: string;
  items: ArticleListItem[];
}

export default function ArticleListSchema({
  title,
  description,
  url,
  items,
}: ArticleListSchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: title,
          description,
          url,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: items.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${url}#article-${item.id}`,
              item: {
                "@type": "NewsArticle",
                headline: item.title,
                description: item.excerpt || "",
                datePublished: item.publishedAt,
                dateModified: item.updatedAt || item.publishedAt,
                author: {
                  "@type": "Organization",
                  name: item.author || "Building Performance Technologies, LLC",
                },
                articleSection: item.category,
                mainEntityOfPage: `${url}#article-${item.id}`,
              },
            })),
          },
        }),
      }}
    />
  );
}