import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata(
  "Energy Audit Software, Field App, and Diagnostics",
  "Compare BPMS software, BPMSField mobile capture, and FluxSense diagnostics for faster audits, clearer reports, and stronger retrofit decisions.",
  "/",
  "https://www.buildingperformancetechnologies.com/og-image.png",
  [
    "energy audit software",
    "building performance",
    "HVAC analysis",
    "thermal imaging",
    "energy auditors",
  ]
);

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="heroGrid">
          <div>
            <p className="eyebrow">Building diagnostics • Energy modeling • Field technology</p>
            <h1>Modern technology for better building performance.</h1>
            <p className="lead">
              Building Performance Technologies, LLC develops software, mobile field tools, and diagnostic hardware for energy auditors, HVAC professionals, home performance contractors, and building analysts.
            </p>
            <div className="actions">
              <Link className="button" href="/bpms">Explore BPMS™</Link>
              <Link className="buttonSecondary" href="/bpmsfield">Download BPMSField™</Link>
            </div>
          </div>
          <aside className="heroCard">
            <h3>Platform focus</h3>
            <p>One connected ecosystem for audit data, field evidence, thermal imaging, LiDAR geometry, reports, proposals, and performance modeling.</p>
            <ul>
              <li>BPMS™ cloud platform</li>
              <li>BPMSField™ mobile app</li>
              <li>BPMS FluxSense Analyzer™ hardware concept</li>
              <li>Professional building performance workflows</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <h2>Technology built for the field and the office.</h2>
        <div className="grid3">
          <div className="card">
            <h3>BPMS™</h3>
            <p>Cloud-based building performance modeling, audit management, report generation, proposals, invoices, and integrated business workflows.</p>
            <Link className="buttonSecondary" href="/bpms">Learn more</Link>
          </div>
          <div className="card">
            <h3>BPMSField™</h3>
            <p>Mobile field companion for photos, thermal evidence, LiDAR scans, GPS documentation, and jobsite data collection.</p>
            <Link className="buttonSecondary" href="/bpmsfield">View app</Link>
          </div>
          <div className="card">
            <h3>FluxSense Analyzer™</h3>
            <p>Heat flux based diagnostic technology concept for direct thermal transfer measurement and building performance analysis.</p>
            <Link className="buttonSecondary" href="/bpms-fluxsense-analyzer">View analyzer</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Solutions by search intent</h2>
        <div className="grid3">
          <div className="card">
            <h3>Need energy audit software?</h3>
            <p>Start with BPMS to manage audits, model performance, and generate reports in a cloud platform.</p>
            <Link className="buttonSecondary" href="/bpms">Energy audit software details</Link>
          </div>
          <div className="card">
            <h3>Need a field data collection app?</h3>
            <p>Use BPMSField for photo capture, thermal documentation, LiDAR measurements, and site evidence workflows.</p>
            <Link className="buttonSecondary" href="/bpmsfield">Field app details</Link>
          </div>
          <div className="card">
            <h3>Need heat flux diagnostics?</h3>
            <p>Explore the FluxSense Analyzer concept for direct thermal transfer measurement and performance analysis.</p>
            <Link className="buttonSecondary" href="/bpms-fluxsense-analyzer">Heat flux diagnostics details</Link>
          </div>
        </div>
      </section>

      <section className="ctaBand">
        <h2>Ready to connect field evidence with performance modeling?</h2>
        <p>Explore the full Building Performance Technologies ecosystem and see how the tools work together.</p>
        <div className="actions">
          <Link className="button" href="/about">About the company</Link>
          <Link className="buttonSecondary" href="/latest-news">Latest News</Link>
        </div>
      </section>
    </>
  );
}
