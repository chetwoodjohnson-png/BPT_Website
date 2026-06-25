import Image from "next/image";
import PageHeader from "@/components/PageHeader";

export default function FluxSenseAnalyzerPage() {
  return (
    <>
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
    </>
  );
}
