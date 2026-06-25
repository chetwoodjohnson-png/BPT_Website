import Image from "next/image";
import PageHeader from "@/components/PageHeader";

const appStoreUrl = "https://apps.apple.com/pl/app/bpmsfield/id6770362535";

export default function BpmsFieldPage() {
  return (
    <>
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
    </>
  );
}
