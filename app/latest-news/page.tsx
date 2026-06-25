import PageHeader from "@/components/PageHeader";

const posts = [
  {
    date: "Company Update",
    title: "Building Performance Technologies expands the BPMS™ ecosystem",
    text: "The company is developing a connected system that brings together cloud software, mobile field capture, thermal documentation, LiDAR scanning, and building performance analysis."
  },
  {
    date: "Product News",
    title: "BPMSField™ supports mobile-first building documentation",
    text: "BPMSField™ is positioned as the mobile field companion for collecting photos, thermal images, LiDAR scans, and audit evidence directly from the jobsite."
  },
  {
    date: "Innovation",
    title: "BPMS FluxSense Analyzer™ concept targets direct heat flux measurement",
    text: "The analyzer concept is designed to strengthen building diagnostics by measuring thermal transfer and supporting cloud-based performance modeling."
  }
];

export default function LatestNewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Latest News"
        title="Updates from Building Performance Technologies."
        description="Follow product updates, company announcements, technology development, and educational content from the Building Performance Technologies ecosystem."
      />

      <section className="section grid3">
        {posts.map((post) => (
          <article className="newsCard" key={post.title}>
            <p className="newsMeta">{post.date}</p>
            <h3>{post.title}</h3>
            <p>{post.text}</p>
          </article>
        ))}
      </section>

      <section className="ctaBand">
        <h2>News page ready for CMS integration</h2>
        <p>This page can later be connected to a blog CMS, Supabase table, Markdown files, or a headless content system.</p>
      </section>
    </>
  );
}
