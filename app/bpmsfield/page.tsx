import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductSchema from "@/components/ProductSchema";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata(
  "BPMSField App for Energy Audits | Photos, Thermal, LiDAR",
  "Capture energy audit field data on mobile with photos, thermal images, LiDAR room scans, and site evidence designed for BPMS reporting workflows.",
  "/bpmsfield",
  "https://www.buildingperformancetechnologies.com/bpmsfield-mobile.png",
  [
    "BPMSField",
    "mobile app",
    "energy audit app",
    "thermal imaging",
    "LiDAR scanning",
    "field data collection",
  ]
);

const appStoreUrl = "https://apps.apple.com/pl/app/bpmsfield/id6770362535";

export default function BpmsFieldPage() {
  const faqItems = [
    {
      question: "What does BPMSField capture during an energy audit?",
      answer:
        "BPMSField supports photo capture, thermal image documentation, LiDAR-based room measurements, and location-aware field evidence for audit workflows.",
    },
    {
      question: "Can BPMSField data be used in BPMS reports?",
      answer:
        "Yes. BPMSField is designed to support BPMS cloud reporting and proposal workflows by sending organized field evidence to your building performance process.",
    },
    {
      question: "Is BPMSField only for auditors?",
      answer:
        "No. It is suitable for energy auditors, HVAC teams, inspectors, weatherization programs, and contractors who document conditions on site.",
    },
  ];

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "BPMSField™", url: "/bpmsfield" },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <ProductSchema
        name="BPMSField™ Mobile App"
        description="Field data collection app for energy audits with photo capture, thermal imaging, LiDAR scanning, and GPS documentation."
        image="https://www.buildingperformancetechnologies.com/bpmsfield-mobile.png"
        url="https://www.buildingperformancetechnologies.com/bpmsfield"
      />
      <PageHeader
        eyebrow="BPMSField™ mobile app"
        title="Field data collection for modern building performance work."
        description="BPMSField™ is the mobile companion for BPMS™, helping field teams capture jobsite photos, GPS documentation, thermal images, LiDAR scans, and audit evidence."
      />

      <section className="section">
        <a className="appStoreButton" href={appStoreUrl} target="_blank" rel="noreferrer" aria-label="Download BPMSField on the App Store">
          <span>Download on the</span>
          <strong>App Store</strong>
        </a>
      </section>

      <section className="section">
        <div style={{ 
          borderRadius: "20px", 
          overflow: "hidden", 
          border: "1px solid rgba(255,255,255,.12)",
          boxShadow: "0 24px 70px rgba(0,0,0,.35)"
        }}>
          <Image
            src="/bpmsfield-mobile.png"
            alt="BPMSField Mobile App - Select Audit, Thermal Analysis, and Cloud Connected"
            width={1400}
            height={800}
            priority
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </section>

      <section className="section grid3">
        <div className="card"><h3>Photo capture</h3><p>Capture organized field photos with audit context, captions, GPS location, and cloud sync.</p></div>
        <div className="card"><h3>Thermal imaging</h3><p>Support thermal documentation workflows for building envelope diagnostics, equipment review, and report evidence.</p></div>
        <div className="card"><h3>LiDAR scanning</h3><p>Use compatible device LiDAR capabilities to document rooms, openings, surfaces, and building geometry.</p></div>
      </section>

      <section className="section grid2">
        <div className="card">
          <h3>Built for field professionals</h3>
          <p>BPMSField™ is designed for energy auditors, home performance contractors, HVAC professionals, inspectors, weatherization agencies, and building analysts.</p>
        </div>
        <div className="card">
          <h3>Connected to BPMS™</h3>
          <p>Captured field evidence can support the larger BPMS™ workflow for audits, reports, proposals, invoices, and performance documentation.</p>
        </div>
      </section>

      <section className="section">
        <h2>Related software and diagnostics</h2>
        <p>
          Use BPMSField with <Link href="/bpms">BPMS cloud software</Link> for end-to-end audit documentation,
          and review hardware progress on <Link href="/bpms-fluxsense-analyzer">FluxSense Analyzer</Link>.
        </p>
      </section>

      <FAQ items={faqItems} title="BPMSField App FAQ" />
    </>
  );
}
