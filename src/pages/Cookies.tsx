import { Link } from 'react-router-dom';
import { Page, PageHero, Section, Block } from '../components/Section';

export default function Cookies() {
  return (
    <Page>
      <PageHero
        icon="🍪"
        title="Cookie Policy"
        meta="Last updated: August 1, 2026"
        tint="teal"
      />

      <Section
        tint="teal"
        actions={
          <Link to="/" className="btn-outline text-sm">
            ← Back to home
          </Link>
        }
      >
        <Block className="space-y-4 prose max-w-none">
          <p>
            This Cookie Policy explains how AIR (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) uses cookies and similar tracking technologies
            on our website.
          </p>

          <h3 className="!mt-6 font-bold text-lg">What Are Cookies?</h3>
          <p>
            Cookies are small text files that are placed on your device when you visit a website. They are widely
            used to make websites work, or work more efficiently, as well as to provide information to the owners
            of the site.
          </p>

          <h3 className="!mt-6 font-bold text-lg">How We Use Cookies</h3>
          <p>We use cookies for the following purposes:</p>

          <div>
            <div className="font-bold">Essential Cookies</div>
            <p className="text-sm mt-1">These are required for the website to function properly (e.g., navigation and security).</p>
          </div>

          <div>
            <div className="font-bold">Analytics Cookies</div>
            <p className="text-sm mt-1">Help us understand how visitors use the site so we can improve user experience.</p>
          </div>

          <div>
            <div className="font-bold">Preference Cookies</div>
            <p className="text-sm mt-1">Remember your settings, such as theme preference (light/dark mode).</p>
          </div>

          <h3 className="!mt-6 font-bold text-lg">Managing Cookies</h3>
          <p>
            You can control and/or delete cookies as you wish. You can delete all cookies already on your computer
            and set most browsers to block them from being placed. If you do this, however, you may have to manually
            adjust some preferences every time you visit a site and some services may not function properly.
          </p>

          <h3 className="!mt-6 font-bold text-lg">Third-Party Cookies</h3>
          <p>
            We may allow third-party service providers to place cookies on your device. These are used for analytics
            (e.g., Google Analytics) and to provide interactive content.
          </p>

          <h3 className="!mt-6 font-bold text-lg">Updates to This Policy</h3>
          <p>
            We may update this Cookie Policy from time to time. We encourage you to periodically review this page
            for the latest information.
          </p>
        </Block>
      </Section>
    </Page>
  );
}
