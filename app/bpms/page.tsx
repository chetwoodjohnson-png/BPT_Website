import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductSchema from "@/components/ProductSchema";
import FreeTrialBadge from "@/components/FreeTrialBadge";
import { generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata(
  "BPMS™ Cloud Platform | Energy Audit & Performance Modeling Software",
  "Cloud-based BPMS™ platform for building audits, energy modeling, thermal analysis, and professional reports. Integrated with BPMSField™ mobile app.",
  "/bpms",
  "https://www.buildingperformancetechnologies.com/bpms-dashboard.png",
  [
    "BPMS cloud platform",
    "energy audit software",
    "building performance modeling",
    "thermal imaging reports",
    "HVAC analysis",
    "energy auditors",
    "audit management system",
  ]
);

export default function BpmsPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "BPMS™", url: "/bpms" },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <ProductSchema
        name="BPMS™ Cloud Platform"
        description="Building Performance Modeling System for energy audits, thermal analysis, and professional reports."
        image="https://www.buildingperformancetechnologies.com/bpms-dashboard.png"
        url="https://www.buildingperformancetechnologies.com/bpms"
        aggregateRating={{
          ratingValue: 4.8,
          reviewCount: 120,
        }}
      />
      <PageHeader
        eyebrow="BPMS™ cloud platform"
        title="Building Performance Modeling Systems for professionals."
        description="BPMS™ is a cloud-based platform for building audits, energy documentation, field evidence, performance modeling, reports, proposals, and operational workflows."
      />

      <FreeTrialBadge />

      <section className="section">
        <div className="actions">
          <a className="button" href="https://bpmscloud.com" target="_blank" rel="noreferrer">Go to bpmscloud.com</a>
          <Link className="buttonSecondary" href="/bpmsfield">Use with BPMSField™</Link>
        </div>
      </section>

      <section className="section">
        <div style={{ 
          borderRadius: "20px", 
          overflow: "hidden", 
          border: "1px solid rgba(255,255,255,.12)",
          boxShadow: "0 24px 70px rgba(0,0,0,.35)"
        }}>
          <Image
            src="/bpms-dashboard.png"
            alt="BPMS Dashboard - Solar Savings Overview"
            width={1400}
            height={850}
            priority
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </section>

      <section className="section grid3">
        <div className="card">
          <h3>Audit management</h3>
          <p>Create and manage building audits with structured tabs for building details, envelope, HVAC, DHW, appliances, lighting, photos, thermal images, and reporting.</p>
        </div>
        <div className="card">
          <h3>Reports and documents</h3>
          <p>Generate professional audit reports, photo reports, thermal reports, load calculation outputs, workscopes, proposals, and invoices from one connected workflow.</p>
        </div>
        <div className="card">
          <h3>Business operations</h3>
          <p>Support branding, team management, modules, client workflows, integrations, and subscription-based SaaS operations.</p>
        </div>
      </section>

      <section className="section">
        <h2>Core BPMS™ capabilities</h2>
        <div className="tagList">
          {[
            "Energy audits", "HPXML", "Home Energy Score", "BPMS Load CalC™", "Thermal reports", "Photo reports", "LiDAR geometry", "Workscopes", "Proposals", "Invoices", "Gmail integration", "QuickBooks integration"
          ].map((item) => <span className="tag" key={item}>{item}</span>)}
        </div>
      </section>
    </>
  );
}
