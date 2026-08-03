import { Link } from 'react-router-dom';
import { Page, PageHero, Section, Block } from '../components/Section';

export default function Privacy() {
  return (
    <Page>
      <PageHero
        icon="🔒"
        title="Privacy Policy"
        meta="Effective: August 1, 2026"
        tint="blue"
      />

      <Section
        tint="blue"
        actions={
          <Link to="/" className="btn-outline text-sm">
            ← Back to home
          </Link>
        }
      >
        <Block className="space-y-4 prose max-w-none">
          <p>
            At AIR (Alignment Infrastructure Routes), operated by Gyro Governance Lab, we are committed to protecting
            your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
            when you visit our website.
          </p>

          <h3 className="!mt-6 font-bold text-lg">Information We Collect</h3>
          <ul className="space-y-1">
            <li>• Personal information you voluntarily provide (such as name, email, and project details) when submitting projects or joining the fellowship.</li>
            <li>• Usage data, including IP address, browser type, and pages visited.</li>
            <li>• Information collected automatically through cookies and similar technologies.</li>
          </ul>

          <h3 className="!mt-6 font-bold text-lg">How We Use Your Information</h3>
          <p>We use the information we collect to:</p>
          <ul className="space-y-1">
            <li>• Provide and maintain our services</li>
            <li>• Process fellowship applications and project submissions</li>
            <li>• Communicate with you about updates, research, and opportunities</li>
            <li>• Improve our website and offerings</li>
            <li>• Ensure compliance with legal obligations</li>
          </ul>

          <h3 className="!mt-6 font-bold text-lg">Data Sharing and Disclosure</h3>
          <p>
            We do not sell your personal data. We may share your information with trusted service providers,
            research collaborators, or when required by law.
          </p>

          <h3 className="!mt-6 font-bold text-lg">Data Security</h3>
          <p>
            We implement appropriate technical and organizational measures to protect your information.
            However, no method of transmission over the Internet is 100% secure.
          </p>

          <h3 className="!mt-6 font-bold text-lg">Your Rights</h3>
          <p>
            Depending on your location, you may have rights to access, correct, delete, or restrict processing
            of your personal data. Please contact us to exercise these rights.
          </p>

          <h3 className="!mt-6 font-bold text-lg">Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please reach out via the contact methods listed
            on the Gyro Governance Lab website or send an email to the address published on our site.
          </p>
        </Block>
      </Section>
    </Page>
  );
}
