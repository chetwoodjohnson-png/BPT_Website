import type { Metadata } from "next";

export function generatePageMetadata(
  title: string,
  description: string,
  path: string,
  ogImage?: string,
  keywords?: string[]
): Metadata {
  const canonical = `https://www.buildingperformancetechnologies.com${path}`;
  const defaultOgImage = "https://www.buildingperformancetechnologies.com/og-image.png";

  return {
    title: `${title} | Building Performance Technologies`,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      images: [
        {
          url: ogImage || defaultOgImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage || defaultOgImage],
    },
    alternates: {
      canonical,
    },
  };
}
