import AccountPanel from "@/components/AccountPanel";
export const metadata = {
  title: "Your BPT Community Account",
  robots: { index: false, follow: true },
  alternates: { canonical: "/account" },
};
export default function Page() {
  return (
    <section className="section reading">
      <p className="eyebrow">BPT Community</p>
      <h1>Your account.</h1>
      <p>Manage your contributions, saved discussions, and account settings.</p>
      <AccountPanel />
    </section>
  );
}
