import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footerContainer">
        {/* Brand Section */}
        <div className="footerBrand">
          <div style={{ marginBottom: "1rem" }}>
            <Image 
              src="/logo.png" 
              alt="BPT - Building Performance Technologies" 
              width={250} 
              height={85}
            />
          </div>
          <p className="tagline">Developing modern building diagnostics, field data collection, and performance modeling technology.</p>
          <p className="disclaimer">
            <strong>Disclaimer:</strong> Building Performance Technologies, LLC provides energy audit tools and building diagnostics software. 
            All recommendations are for informational purposes. Consult with licensed professionals before implementing any building modifications or energy upgrades.
          </p>
        </div>

        {/* Product Links */}
        <div className="footerSection">
          <h4>Products</h4>
          <div className="footerLinks">
            <Link href="/bpms">BPMS™</Link>
            <Link href="/bpmsfield">BPMSField™</Link>
            <Link href="/bpms-fluxsense-analyzer">FluxSense Analyzer™</Link>
            <Link href="/about">About Us</Link>
          </div>
        </div>

        {/* Resources Links */}
        <div className="footerSection">
          <h4>Resources</h4>
          <div className="footerLinks">
            <Link href="/latest-news">Latest News</Link>
            <Link href="/forum">Forum</Link>
            <a href="mailto:info@bpt-tech.com">Contact Support</a>
          </div>
        </div>

        {/* Legal Links */}
        <div className="footerSection">
          <h4>Legal</h4>
          <div className="footerLinks">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-conditions">Terms & Conditions</Link>
            <a href="mailto:legal@bpt-tech.com">Legal Inquiries</a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footerBottom">
        <div className="copyright">
          <p>
            © {currentYear} Building Performance Technologies, LLC. All rights reserved.<br />
            BPMS™, BPMSField™, and FluxSense Analyzer™ are trademarks of Building Performance Technologies, LLC.
          </p>
        </div>
        <div className="legalLinks">
          <Link href="/privacy-policy">Privacy</Link>
          <span>•</span>
          <Link href="/terms-conditions">Terms</Link>
          <span>•</span>
          <a href="mailto:info@bpt-tech.com">Contact</a>
        </div>
      </div>
    </footer>
  );
}
