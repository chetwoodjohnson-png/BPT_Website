import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section">
      <h1>Page not found.</h1>
      <p>This page may have moved or is not published.</p>
      <Link className="button" href="/">
        Return home
      </Link>
    </section>
  );
}
