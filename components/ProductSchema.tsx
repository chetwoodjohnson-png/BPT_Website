interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  url: string;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
  price?: string;
  priceCurrency?: string;
}

export default function ProductSchema({
  name,
  description,
  image,
  url,
  aggregateRating,
  price,
  priceCurrency = "USD",
}: ProductSchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name,
          description,
          image,
          url,
          brand: {
            "@type": "Brand",
            name: "Building Performance Technologies",
          },
          manufacturer: {
            "@type": "Organization",
            name: "Building Performance Technologies, LLC",
            url: "https://www.buildingperformancetechnologies.com",
          },
          ...(aggregateRating && {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: aggregateRating.ratingValue,
              ratingCount: aggregateRating.reviewCount,
              bestRating: "5",
              worstRating: "1",
            },
          }),
          ...(price && {
            offers: {
              "@type": "Offer",
              price,
              priceCurrency,
              availability: "https://schema.org/InStock",
              url,
            },
          }),
        }),
      }}
    ></script>
  );
}
