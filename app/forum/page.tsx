import PageHeader from "@/components/PageHeader";
import DiscussionBoard from "@/components/DiscussionBoard";

const topics = [
  { title: "Energy audit best practices", count: "12 topics", text: "Discuss audit workflows, field documentation, reporting, and customer communication." },
  { title: "BPMS™ product questions", count: "8 topics", text: "Ask platform questions about audits, reporting, proposals, integrations, and modules." },
  { title: "BPMSField™ mobile workflows", count: "6 topics", text: "Share tips for photos, thermal images, LiDAR scanning, and field data collection." },
  { title: "FluxSense Analyzer™ development", count: "4 topics", text: "Follow hardware concept development, heat flux diagnostics, and measurement workflows." }
];

export default function ForumPage() {
  return (
    <>
      <PageHeader
        eyebrow="Forum"
        title="Community and support forum."
        description="A future discussion area for BPMS™ users, field professionals, auditors, contractors, and building performance teams."
      />

      <section className="section">
        <div className="grid2">
          {topics.map((topic) => (
            <div className="forumCard" key={topic.title}>
              <div>
                <h3>{topic.title}</h3>
                <p>{topic.text}</p>
              </div>
              <span className="tag">{topic.count}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <DiscussionBoard />
      </section>

      <section className="ctaBand">
        <h2>Forum integration options</h2>
        <p>This page currently features a custom Next.js discussion board. You can also connect to Supabase, Discourse, Circle, or Slack community links.</p>
      </section>
    </>
  );
}
