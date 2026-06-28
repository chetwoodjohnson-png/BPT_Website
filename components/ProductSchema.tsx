interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  url: string;
  price?: string;
  priceCurrency?: string;
}

export default function ProductSchema({
  name,
  description,
  image,
  url,
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
