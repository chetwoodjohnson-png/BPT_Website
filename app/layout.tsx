import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Building Performance Technologies | BPMS™ Energy Audit Software",
  description:
    "Cloud-based energy audit software, mobile field tools, and thermal analysis for building performance professionals. BPMS™, BPMSField™, and FluxSense Analyzer™.",
  keywords: [
    "energy audit software",
    "building performance",
    "HVAC analysis",
    "thermal imaging",
    "building diagnostics",
    "home energy audit",
    "energy modeling",
    "BPMSField",
    "BPMS FluxSense",
  ],
  authors: [{ name: "Building Performance Technologies, LLC" }],
  creator: "Building Performance Technologies, LLC",
  publisher: "Building Performance Technologies, LLC",
  formatDetection: {
    email: true,
    telephone: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.buildingperformancetechnologies.com",
    title: "Building Performance Technologies | BPMS™ Energy Audit Software",
    description:
      "Integrated software and hardware solutions for building performance modeling and field intelligence.",
    siteName: "Building Performance Technologies",
    images: [
      {
        url: "https://www.buildingperformancetechnologies.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Building Performance Technologies - Smarter Buildings. Better Performance.",
        type: "image/png",
      },
      {
        url: "https://www.buildingperformancetechnologies.com/logo.png",
        width: 250,
        height: 85,
        alt: "BPT Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Building Performance Technologies | BPMS™",
    description:
      "Cloud-based energy audit software and building diagnostics for professionals.",
    images: ["https://www.buildingperformancetechnologies.com/og-image.png"],
    creator: "@BPTech",
    site: "@BPTech",
  },
  verification: {
    google: "google-verification-code-here",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://www.buildingperformancetechnologies.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#0a1628" />
        <meta name="msapplication-TileColor" content="#0a1628" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Building Performance Technologies, LLC",
              url: "https://www.buildingperformancetechnologies.com",
              logo: "https://www.buildingperformancetechnologies.com/logo.png",
              description:
                "Building Performance Technologies develops software, mobile field tools, and diagnostic hardware for energy auditors, HVAC professionals, and building analysts.",
              foundingDate: "2010",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                telephone: "+1-CONTACT-INFO",
                email: "info@bpt-tech.com",
              },
              sameAs: [
                "https://www.facebook.com/BPTech",
                "https://www.linkedin.com/company/building-performance-technologies",
                "https://twitter.com/BPTech",
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "US",
              },
            }),
          }}
        />

        {/* Structured Data - WebSite with Sitelinks Search Box */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Building Performance Technologies",
              url: "https://www.buildingperformancetechnologies.com",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://www.buildingperformancetechnologies.com/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Structured Data - Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Building Performance Technologies, LLC",
              image: "https://www.buildingperformancetechnologies.com/logo.png",
              description:
                "Energy audit software and building diagnostics for professionals.",
              url: "https://www.buildingperformancetechnologies.com",
              telephone: "+1-CONTACT-INFO",
              email: "info@bpt-tech.com",
              priceRange: "$$",
              areaServed: "US",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "250",
                bestRating: "5",
                worstRating: "1",
              },
            }),
          }}
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
