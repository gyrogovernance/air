import { BUILD_AIR_CRAFT_SEO } from './airCraft';

/** Canonical site origin. Override with VITE_SITE_URL when the production domain is final. */
export const SITE_URL = (
  (import.meta.env.VITE_SITE_URL as string | undefined) || 'https://air.gyrogovernance.com'
).replace(/\/$/, '');

export const SITE_NAME = 'AIR';
export const SITE_TAGLINE = 'Alignment Infrastructure Routes';

/** Raster logo for Open Graph / Twitter / apple-touch-icon (`public/air_logo.png`). */
export const SITE_OG_IMAGE = '/air_logo.png';

export const DEFAULT_DESCRIPTION =
  'AIR: AI-Empowered Human Capacity Development for Alignment on Uniform Power Distribution.';

/** Shared keyword pool for meta tags (AIR-focused, not article CMS). */
export const SITE_KEYWORDS = [
  'AIR',
  'Alignment Infrastructure Routes',
  'AI safety',
  'AI governance',
  'AI alignment',
  'uniform power distribution',
  'collective superintelligence',
  'human capacity development',
  'independent AI safety research',
  'AI power concentration',
  'The Human Mark',
  'Gyroscopic Global Governance',
  'Gyro Governance',
  'AGI safety',
  'Transformative AI',
  'AI fellowship',
] as const;

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
  noindex?: boolean;
};

const pages: Record<string, PageSeo> = {
  '/': {
    path: '/',
    title: 'AIR | Alignment Infrastructure Routes',
    description: DEFAULT_DESCRIPTION,
    keywords: SITE_KEYWORDS,
  },
  '/about': {
    path: '/about',
    title: 'About | AIR',
    description:
      'AIR is a framework for Alignment on Uniform Power Distribution through AI-Empowered Human Capacity Development. Learn our approach to AI safety, governance, and collective superintelligence.',
    keywords: [
      'AIR about',
      'AI alignment framework',
      'uniform power distribution',
      'human capacity development',
      'AI governance approach',
    ],
  },
  '/infrastructure': {
    path: '/infrastructure',
    title: 'Infrastructure | AIR',
    description:
      'Human Capacity Development Infrastructure: Uniform Power Distribution Guides, Unified Scope Routes, The Human Mark taxonomy for jailbreaks and deceptive alignment, and Gyroscopic Global Governance protocols.',
    keywords: [
      'AI safety infrastructure',
      'The Human Mark',
      'deceptive alignment',
      'jailbreak testing',
      'mechanistic interpretability',
      'AI governance protocols',
      'Gyroscopic Global Governance',
    ],
  },
  '/protocols': {
    path: '/protocols',
    title: 'Protocols | AIR',
    description:
      'Shared alignment protocols (CGM, The Human Mark, Gyroscope, GGG) and tools by Gyro Governance Lab that Fellows can use in AIR-Craft work.',
    keywords: [
      'AI safety protocols',
      'The Human Mark',
      'Gyroscope Protocol',
      'Common Governance Model',
      'Gyroscopic Global Governance',
      'AI Inspector',
      'GyroDiagnostics',
      'AI governance tools',
    ],
  },
  '/craft': {
    path: '/craft',
    title: 'AIR-Craft | Datasets, Reports, and Tools',
    description: BUILD_AIR_CRAFT_SEO.description,
    keywords: [...BUILD_AIR_CRAFT_SEO.keywords, 'post-AGI governance'],
  },
  '/superintelligence': {
    path: '/superintelligence',
    title: 'Collective Superintelligence | AIR',
    description:
      'Collective Superintelligence Fellowship: support for independent researchers contributing to Community Safety and Good Governance. Invest in human capacity for Transformative AI and AGI.',
    keywords: [
      'collective superintelligence',
      'AI safety fellowship',
      'AGI safety',
      'Transformative AI',
      'independent AI researchers',
    ],
  },
  '/craft/form': {
    path: '/craft/form',
    title: 'Submit a Project | AIR-Craft',
    description:
      'Submit a dataset, report, eval, or tool to AIR-Craft via GitHub Issue Form. Real name and Fellowship introduction link required. Listed on air.gyrogovernance.com/craft.',
  },
  '/superintelligence/form': {
    path: '/superintelligence/form',
    title: 'Join the Fellowship | AIR',
    description:
      'Join the AIR Fellowship by posting an introduction on GitHub Discussions. Open enrollment: you are a Fellow once you post. Not an admissions process.',
  },
  '/superintelligence/fund': {
    path: '/superintelligence/fund',
    title: 'Support interest | AIR',
    description:
      'Register interest in supporting the future Collective Superintelligence Fund. We are not accepting funds through this site at this time.',
  },
  '/privacy': {
    path: '/privacy',
    title: 'Privacy Policy | AIR',
    description: 'Privacy policy for the AIR website operated by Gyro Governance Lab.',
  },
  '/cookies': {
    path: '/cookies',
    title: 'Cookie Policy | AIR',
    description: 'Cookie policy for the AIR website operated by Gyro Governance Lab.',
  },
};

/** Resolve SEO for a pathname (trailing slash stripped). Falls back to home defaults. */
export function getPageSeo(pathname: string): PageSeo {
  const normalized = pathname.replace(/\/$/, '') || '/';
  return pages[normalized] ?? {
    path: normalized,
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: DEFAULT_DESCRIPTION,
  };
}

export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${p === '/' ? '' : p}`;
}
