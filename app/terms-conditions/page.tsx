import PageHeader from "@/components/PageHeader";
import Breadcrumbs from "@/components/Breadcrumbs";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata(
  "Terms & Conditions - Building Performance Technologies",
  "Terms and conditions for BPT products and services. Legal agreement for using our software and platforms.",
  "/terms-conditions"
);

export default function TermsConditionsPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Legal", url: "#" },
    { name: "Terms & Conditions", url: "/terms-conditions" },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <PageHeader
        eyebrow="Legal"
        title="Terms & Conditions"
        description="Please read these terms carefully before using our products and services"
      />

      <section className="section">
        <div style={{ maxWidth: "800px", margin: "0 auto", lineHeight: "1.8" }}>
          <p><strong>Last Updated: June 24, 2026</strong></p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using the websites, products, and services of Building Performance Technologies, LLC (the "Company"), 
            you agree to be bound by these Terms & Conditions. If you do not agree with any part, please discontinue use immediately.
          </p>

          <h2>2. Use License</h2>
          <p>
            The Company grants you a limited, non-exclusive, non-transferable license to use our products and services for lawful purposes only. 
            You may not:
          </p>
          <ul>
            <li>Reproduce, distribute, or transmit content without permission</li>
            <li>Modify or reverse-engineer our software</li>
            <li>Use automated tools to access our systems</li>
            <li>Attempt to gain unauthorized access</li>
            <li>Remove copyright or proprietary notices</li>
            <li>Use our services for illegal or harmful purposes</li>
          </ul>

          <h2>3. Intellectual Property Rights</h2>
          <p>
            All content, software, trademarks, and logos ("Intellectual Property") are owned by or licensed to Building Performance Technologies, LLC. 
            BPMS™, BPMSField™, and FluxSense Analyzer™ are registered trademarks. Unauthorized use is prohibited.
          </p>

          <h2>4. User Accounts</h2>
          <p>
            If you create an account, you agree to:
          </p>
          <ul>
            <li>Provide accurate, complete information</li>
            <li>Maintain account confidentiality</li>
            <li>Accept responsibility for all activities under your account</li>
            <li>Notify us immediately of unauthorized access</li>
          </ul>

          <h2>5. User Content and Forums</h2>
          <p>
            When posting on our forums or platforms, you grant the Company a perpetual, royalty-free license to use your content. 
            You represent that your content:
          </p>
          <ul>
            <li>Does not infringe on others' rights</li>
            <li>Is not defamatory, offensive, or illegal</li>
            <li>Does not contain malware or harmful code</li>
            <li>Does not violate our community guidelines</li>
          </ul>

          <h2>6. Disclaimer of Warranties</h2>
          <p>
            OUR PRODUCTS AND SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING:
          </p>
          <ul>
            <li>Merchantability and fitness for a particular purpose</li>
            <li>Non-infringement of third-party rights</li>
            <li>Uninterrupted or error-free service</li>
            <li>Accuracy of results or recommendations</li>
          </ul>

          <h2>7. Limitation of Liability</h2>
          <p>
            TO THE FULLEST EXTENT PERMITTED BY LAW, THE COMPANY SHALL NOT BE LIABLE FOR:
          </p>
          <ul>
            <li>Indirect, incidental, or consequential damages</li>
            <li>Lost profits or revenue</li>
            <li>Data loss or corruption</li>
            <li>Business interruption</li>
          </ul>
          <p>
            Our total liability shall not exceed the amount you paid for the service within the past 12 months.
          </p>

          <h2>8. Indemnification</h2>
          <p>
            You agree to defend and indemnify the Company from any claims, losses, or damages arising from your use of our services, 
            violation of these terms, or infringement of third-party rights.
          </p>

          <h2>9. Termination</h2>
          <p>
            The Company reserves the right to terminate or suspend your account for:
          </p>
          <ul>
            <li>Violation of these terms</li>
            <li>Illegal activities</li>
            <li>Non-payment of fees</li>
            <li>Other reasons at our discretion</li>
          </ul>

          <h2>10. Privacy and Data Protection</h2>
          <p>
            Our collection and use of your data is governed by our Privacy Policy. By using our services, you consent to our data practices.
          </p>

          <h2>11. Professional Advice Disclaimer</h2>
          <p>
            Our software and tools provide informational data and analysis only. They do not constitute professional engineering, 
            architectural, or legal advice. Always consult with licensed professionals before making building modifications or decisions.
          </p>

          <h2>12. Third-Party Services</h2>
          <p>
            Our products may integrate with or reference third-party services. We are not responsible for their operation, accuracy, 
            or compliance with these terms.
          </p>

          <h2>13. Modifications to Terms</h2>
          <p>
            We may update these Terms & Conditions at any time. Continued use constitutes acceptance of changes. 
            We will notify you of material changes via email or prominent website notice.
          </p>

          <h2>14. Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with applicable state and federal laws, 
            without regard to conflicts of law principles.
          </p>

          <h2>15. Dispute Resolution</h2>
          <p>
            Any disputes shall be resolved through binding arbitration or mediation as specified in your service agreement. 
            You waive your right to jury trial and class action.
          </p>

          <h2>16. Severability</h2>
          <p>
            If any provision is deemed unenforceable, that provision shall be modified to the minimum extent necessary, 
            and other provisions shall remain in full effect.
          </p>

          <h2>17. Contact Information</h2>
          <p>
            For questions about these Terms & Conditions, please contact:<br />
            <strong>Building Performance Technologies, LLC</strong><br />
            Email: legal@bpt-tech.com<br />
            Website: www.bpt-tech.com
          </p>

          <p style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#f5f5f5", borderRadius: "6px" }}>
            <strong>Important Notice:</strong> These Terms & Conditions along with our Privacy Policy form the entire agreement between you and the Company. 
            If you do not accept these terms, you may not use our products or services.
          </p>
        </div>
      </section>
    </>
  );
}
