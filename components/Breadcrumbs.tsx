import Link from "next/link";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schemaItems = items.filter((item) => item.url.startsWith("/"));

  return (
    <>
      {/* Breadcrumbs HTML */}
      <nav aria-label="breadcrumb" style={{ margin: "0 0 1.5em 0", fontSize: "0.9em" }}>
        <ol style={{ display: "flex", gap: "0.5em", flexWrap: "wrap", listStyle: "none", padding: 0, margin: 0 }}>
          {items.map((item, index) => (
            <li key={item.url} style={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
              {item.url.startsWith("/") ? (
                <Link href={item.url} style={{ color: "#0066cc", textDecoration: "none" }}>
                  {item.name}
                </Link>
              ) : (
                <span style={{ color: "#666" }}>{item.name}</span>
              )}
              {index < items.length - 1 && <span style={{ color: "#666" }}>/</span>}
            </li>
          ))}
        </ol>
      </nav>

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
              itemListElement: schemaItems.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.name,
              item: `https://www.buildingperformancetechnologies.com${item.url}`,
            })),
          }),
        }}
      />
    </>
  );
}
