import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductSchema from "@/components/ProductSchema";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata(
  "FluxSense Heat Flux Diagnostics | Building Performance Hardware",
  "Explore the FluxSense Analyzer concept for direct heat flux measurement and building envelope diagnostics connected to BPMS analysis workflows.",
  "/bpms-fluxsense-analyzer",
  "https://www.buildingperformancetechnologies.com/fluxsense-wall-module.png",
  [
    "FluxSense Analyzer",
    "heat flux measurement",
    "building diagnostics",
    "thermal analysis",
    "building performance",
  ]
);

export default function FluxSenseAnalyzerPage() {
  const faqItems = [
    {
      question: "What is the FluxSense Analyzer concept?",
      answer:
        "FluxSense Analyzer is a building diagnostics hardware concept focused on direct heat flux measurement and thermal transfer analysis for building performance teams.",
    },
    {
      question: "How does heat flux measurement help audits?",
      answer:
        "Heat flux data can provide direct evidence of thermal transfer through assemblies, helping teams compare measured behavior against modeled expectations.",
    },
    {
      question: "How does FluxSense connect to BPMS workflows?",
      answer:
        "The concept is intended to support BPMS cloud analysis so measured thermal data can be reviewed alongside field evidence, reports, and retrofit recommendations.",
    },
  ];

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "FluxSense Analyzer™", url: "/bpms-fluxsense-analyzer" },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <ProductSchema
        name="BPMS FluxSense Analyzer™"
        description="Direct heat flux measurement device for building thermal diagnostics and performance analysis."
        image="https://www.buildingperformancetechnologies.com/fluxsense-wall-module.png"
        url="https://www.buildingperformancetechnologies.com/bpms-fluxsense-analyzer"
      />

      <PageHeader
        eyebrow="BPMS FluxSense Analyzer™"
        title="Direct heat flux diagnostics for building performance insight."
        description="BPMS FluxSense Analyzer™ is a hardware concept designed around direct heat flux measurement, temperature sensing, and cloud-based building performance analysis."
      />

      <section className="section">
        <div style={{ 
          borderRadius: "20px", 
          overflow: "hidden", 
          border: "1px solid rgba(255,255,255,.12)",
          boxShadow: "0 24px 70px rgba(0,0,0,.35)",
          backgroundColor: "#0a1628"
        }}>
          <Image
            src="/fluxsense-wall-module.png"
            alt="BPMS FluxSense Wall Module - Real-time environmental intelligence"
            width={1400}
            height={800}
            priority
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </section>

      <section className="section grid2">
        <div className="card">
          <h3>What it measures</h3>
          <p>The analyzer concept is designed to measure heat transfer through building assemblies and support deeper understanding of BTU loss, thermal movement, and envelope performance.</p>
          <ul>
            <li>Heat flux readings</li>
            <li>Indoor and outdoor temperature context</li>
            <li>Minute-by-minute performance trends</li>
            <li>Cloud-connected analysis potential</li>
          </ul>
        </div>
        <div className="card">
          <h3>Why it matters</h3>
          <p>Traditional building analysis often relies on estimates, assumptions, and indirect measurements. Direct heat flux sensing can help strengthen diagnostics by connecting measured performance with modeling outputs.</p>
        </div>
      </section>

      <section className="section">
        <h2>Potential workflow</h2>
        <div className="grid3">
          <div className="card"><h3>1. Place</h3><p>Attach the analyzer to the target wall, ceiling, or building assembly area being evaluated.</p></div>
          <div className="card"><h3>2. Measure</h3><p>Collect heat flux and temperature data over time to understand actual transfer behavior.</p></div>
          <div className="card"><h3>3. Analyze</h3><p>Send the data to BPMS™ for building performance modeling, comparison, reporting, and recommendations.</p></div>
        </div>
      </section>

      <section className="section">
        <h2>Where this fits in your stack</h2>
        <p>
          FluxSense is designed to complement <Link href="/bpms">BPMS software</Link> and
          <Link href="/bpmsfield"> BPMSField mobile capture</Link> for a more complete building diagnostics workflow.
        </p>
      </section>

      <FAQ items={faqItems} title="FluxSense Analyzer FAQ" />
    </>
  );
}
