import PublishingDesk from "@/components/PublishingDesk";
export const metadata = {
  title: "BPT Publishing & Moderation",
  robots: { index: false, follow: false },
  alternates: { canonical: "/admin" },
};
export default function Page() {
  return (
    <section className="section">
      <p className="eyebrow">BPT Editorial</p>
      <h1>Publishing desk.</h1>
      <p>Manage the journal, newsroom, and community from one place.</p>
      <PublishingDesk />
    </section>
  );
}
