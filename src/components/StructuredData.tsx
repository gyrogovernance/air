import { SITE_URL, DEFAULT_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_OG_IMAGE } from '../lib/seo';

const logoUrl = `${SITE_URL}${SITE_OG_IMAGE}`;

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  alternateName: ['Alignment Infrastructure Routes', 'AIR by Gyro Governance Lab'],
  url: SITE_URL,
  logo: logoUrl,
  image: logoUrl,
  description: DEFAULT_DESCRIPTION,
  parentOrganization: {
    '@type': 'Organization',
    name: 'Gyro Governance Lab',
    url: 'https://gyrogovernance.com',
  },
  sameAs: [
    'https://github.com/gyrogovernance',
    'https://gyrogovernance.com',
  ],
  knowsAbout: [
    'AI Safety',
    'AI Governance',
    'AI Alignment',
    'Uniform Power Distribution',
    'Collective Superintelligence',
    'The Human Mark',
    'Human Capacity Development',
    'AGI Safety',
  ],
};

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: `${SITE_NAME} | ${SITE_TAGLINE}`,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  publisher: {
    '@type': 'Organization',
    name: 'Gyro Governance Lab',
    url: 'https://gyrogovernance.com',
  },
};

/** Organization + WebSite JSON-LD for crawlers. */
export default function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
