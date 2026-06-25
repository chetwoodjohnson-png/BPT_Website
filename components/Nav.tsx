import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/bpms", label: "BPMS™" },
  { href: "/bpms-fluxsense-analyzer", label: "FluxSense Analyzer™" },
  { href: "/bpmsfield", label: "BPMSField™" },
  { href: "/latest-news", label: "Latest News" },
  { href: "/forum", label: "Forum" },
];

export default function Nav() {
  return (
    <header className="siteHeader">
      <Link href="/" className="brand" aria-label="Building Performance Technologies home">
        <Image 
          src="/logo.png" 
          alt="BPT - Building Performance Technologies" 
          width={300} 
          height={100}
          priority
        />
      </Link>

      <nav className="navLinks" aria-label="Main navigation">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
