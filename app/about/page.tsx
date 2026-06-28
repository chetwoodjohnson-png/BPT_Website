import PageHeader from "@/components/PageHeader";
import Breadcrumbs from "@/components/Breadcrumbs";
import { generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = generatePageMetadata(
  "About BPT | Building Performance Software Company",
  "Learn how Building Performance Technologies develops BPMS software, BPMSField mobile tools, and FluxSense diagnostics for energy professionals.",
  "/about",
  "https://www.buildingperformancetechnologies.com/logo.png",
  ["about BPT", "company mission", "building performance", "BPMS"]
);

export default function AboutPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <PageHeader
        eyebrow="About"
        title="Building Performance Technologies, LLC"
        description="A technology company focused on improving how buildings are measured, documented, modeled, and upgraded."
      />

      <section className="section grid2">
        <div className="card">
          <h3>Our mission</h3>
          <p>
            Building Performance Technologies, LLC exists to help professionals collect better field data, produce stronger reports, improve retrofit decisions, and create a more connected workflow between the building, the technician, and the cloud platform.
          </p>
        </div>
        <div className="card">
          <h3>Who we serve</h3>
          <p>
            Our technology is designed for energy auditors, HVAC contractors, weatherization teams, home performance contractors, building inspectors, engineering firms, and organizations that need reliable building performance documentation.
          </p>
        </div>
      </section>

      <section className="section">
        <h2>What we are building</h2>
        <div className="grid3">
          <div className="card"><h3>Software</h3><p>BPMS™ gives teams a professional cloud system for audits, modeling, proposals, invoices, reports, and client documentation.</p></div>
          <div className="card"><h3>Mobile tools</h3><p>BPMSField™ brings capture, thermal, LiDAR, GPS, photos, and field documentation into one mobile workflow.</p></div>
          <div className="card"><h3>Hardware innovation</h3><p>BPMS FluxSense Analyzer™ is positioned as a diagnostic hardware concept for direct heat flux measurement and performance analysis.</p></div>
        </div>
      </section>

      <section className="section">
        <h2>Explore the product platform</h2>
        <p>
          Review <Link href="/bpms">BPMS energy audit software</Link>,
          <Link href="/bpmsfield"> BPMSField mobile workflows</Link>, and
          <Link href="/bpms-fluxsense-analyzer"> FluxSense diagnostics</Link> to find the best fit for your team.
        </p>
      </section>
    </>
  );
}
