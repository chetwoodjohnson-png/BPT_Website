import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const verifiedSameAs = (process.env.NEXT_PUBLIC_ORG_SAMEAS || "")
  .split(",")
  .map((url) => url.trim())
  .filter((url) => url.startsWith("http://") || url.startsWith("https://"));

export const metadata: Metadata = {
  metadataBase: new URL("https://www.buildingperformancetechnologies.com"),
  title: "Energy Audit Software for Pros | BPMS, BPMSField, FluxSense",
  description:
    "Energy audit software, field capture, and heat flux diagnostics for building performance professionals. Compare BPMS, BPMSField, and FluxSense workflows.",
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
    title: "Energy Audit Software for Pros | BPMS, BPMSField, FluxSense",
    description:
      "Compare BPMS software, BPMSField mobile capture, and FluxSense diagnostics for building performance workflows.",
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
    title: "Energy Audit Software for Pros | BPT",
    description:
      "Energy audit software, mobile field data capture, and thermal diagnostics for building performance teams.",
    images: ["https://www.buildingperformancetechnologies.com/og-image.png"],
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
                email: "info@bpt-tech.com",
              },
              ...(verifiedSameAs.length > 0 ? { sameAs: verifiedSameAs } : {}),
              address: {
                "@type": "PostalAddress",
                addressCountry: "US",
              },
            }),
          }}
        />

        {/* Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Building Performance Technologies",
              url: "https://www.buildingperformancetechnologies.com",
              ...(verifiedSameAs.length > 0 ? { sameAs: verifiedSameAs } : {}),
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
