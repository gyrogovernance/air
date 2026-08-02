import { BUILD_AIR_CRAFT_SEO } from './airCraft';

/** Canonical site origin. Override with VITE_SITE_URL when the production domain is final. */
export const SITE_URL = (
  (import.meta.env.VITE_SITE_URL as string | undefined) || 'https://air.gyrogovernance.com'
).replace(/\/$/, '');

export const SITE_NAME = 'AIR';
export const SITE_TAGLINE = 'Alignment Infrastructure Routes';

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
      'Collective Superintelligence Fellowship: support for independent researchers contributing to AI safety and governance. Invest in human capacity for Transformative AI and AGI.',
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
    description: 'Register, self-audit, and submit your AI safety or governance project to AIR-Craft.',
  },
  '/superintelligence/form': {
    path: '/superintelligence/form',
    title: 'Join the Fellowship | AIR',
    description: 'Apply to the Collective Superintelligence Fellowship for AI safety portfolio and career development.',
  },
  '/superintelligence/fund': {
    path: '/superintelligence/fund',
    title: 'Support the Fund | AIR',
    description: 'Support the Collective Superintelligence Fund backing fellowship participants in AI safety and governance.',
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
