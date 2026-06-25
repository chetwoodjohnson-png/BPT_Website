import PageHeader from "@/components/PageHeader";
import Breadcrumbs from "@/components/Breadcrumbs";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata(
  "Privacy Policy - Building Performance Technologies",
  "Privacy policy for BPT products and services. Information on how we collect, use, and protect your data.",
  "/privacy-policy"
);

export default function PrivacyPolicyPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Legal", url: "#" },
    { name: "Privacy Policy", url: "/privacy-policy" },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we collect, use, and protect your information"
      />

      <section className="section">
        <div style={{ maxWidth: "800px", margin: "0 auto", lineHeight: "1.8" }}>
          <p><strong>Last Updated: June 24, 2026</strong></p>

          <h2>1. Introduction</h2>
          <p>
            Building Performance Technologies, LLC ("we," "our," or "Company") respects your privacy and is committed to protecting your personal data. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our products and services.
          </p>

          <h2>2. Information We Collect</h2>
          <h3>2.1 Information You Provide Directly</h3>
          <ul>
            <li>Account registration information (name, email, company)</li>
            <li>Contact forms and inquiries</li>
            <li>Forum posts and comments</li>
            <li>Product usage data and analytics</li>
            <li>Payment information (processed securely through third-party providers)</li>
          </ul>

          <h3>2.2 Information Collected Automatically</h3>
          <ul>
            <li>Browser type and operating system</li>
            <li>IP address and device identifiers</li>
            <li>Pages visited and time spent on site</li>
            <li>Cookies and tracking technologies</li>
            <li>Referral source</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use collected information for:</p>
          <ul>
            <li>Providing and improving our products and services</li>
            <li>Processing transactions and sending confirmations</li>
            <li>Responding to inquiries and providing customer support</li>
            <li>Sending marketing communications (with your consent)</li>
            <li>Analyzing usage patterns and improving user experience</li>
            <li>Complying with legal obligations</li>
            <li>Preventing fraud and enhancing security</li>
          </ul>

          <h2>4. Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies to enhance your browsing experience. You can control cookie settings through your browser. 
            Some features may not function properly if cookies are disabled.
          </p>

          <h2>5. Data Sharing</h2>
          <p>
            We do not sell your personal data. We may share information with:
          </p>
          <ul>
            <li>Service providers who assist in our operations</li>
            <li>Legal authorities when required by law</li>
            <li>Business partners (with your consent)</li>
          </ul>

          <h2>6. Data Security</h2>
          <p>
            We implement industry-standard security measures including encryption, firewalls, and secure servers. 
            However, no method of transmission over the internet is 100% secure. You acknowledge the inherent security risks of online communications.
          </p>

          <h2>7. Your Rights</h2>
          <p>Depending on your location, you may have rights to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Delete your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Data portability</li>
          </ul>
          <p>To exercise these rights, contact us at privacy@bpt-tech.com</p>

          <h2>8. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party sites. We are not responsible for their privacy practices. 
            We encourage you to review their privacy policies before providing personal information.
          </p>

          <h2>9. Children's Privacy</h2>
          <p>
            Our services are not directed to children under 13. We do not knowingly collect data from children. 
            If we become aware of such collection, we will delete this information immediately.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. We will notify you of significant changes by email or prominent notice on our website.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            For questions or concerns about this Privacy Policy, please contact:<br />
            <strong>Building Performance Technologies, LLC</strong><br />
            Email: privacy@bpt-tech.com<br />
            Website: www.bpt-tech.com
          </p>
        </div>
      </section>
    </>
  );
}
