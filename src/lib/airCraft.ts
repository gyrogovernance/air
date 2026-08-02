/** AIR-Craft project card sourced from gyrogovernance/air-craft AIR-Craft.md */
export type AirCraftProject = {
  domain: string;
  emoji: string;
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
};

const DEFAULT_URL =
  'https://raw.githubusercontent.com/gyrogovernance/air-craft/main/AIR-Craft.md';

const REQUIRED_FIELDS = ['emoji', 'title', 'description', 'linkText', 'linkUrl'] as const;

/** Built-in list used when the remote doc is unreachable or invalid. */
export const FALLBACK_AIR_CRAFT_PROJECTS: AirCraftProject[] = [
  {
    domain: 'Economy',
    emoji: '💰',
    title: 'Moments Economy',
    description: 'Mitigating Risks of Transformative AI (TAI)',
    linkText: 'Read the Whitepaper',
    linkUrl:
      'https://github.com/gyrogovernance/superintelligence/blob/main/docs/programs/AIR_Moments_Economy_Whitepaper.md',
  },
  {
    domain: 'Employment',
    emoji: '🕵️',
    title: 'AI Inspector Browser Extension',
    description: 'Transform AI outputs for Evaluation, Interpretability, Governance.',
    linkText: 'Add to Chrome',
    linkUrl:
      'https://chromewebstore.google.com/detail/ai-inspector/hcblmheihnlngnogobgclhfahjljnbok?utm_source=item-share-cb',
  },
  {
    domain: 'Education',
    emoji: '🎓',
    title: 'GyroGem: AI Safety Agent',
    description: 'Explaining AI and Mitigating Risks of technological illiteracy',
    linkText: 'Chat on Google',
    linkUrl: 'https://gemini.google.com/gem/1B-gQt-M3aKfsv9HDp_8gTQHG89bCfqlO?usp=sharing',
  },
  {
    domain: 'Ecology',
    emoji: '🌍',
    title: 'Gyroscopic Global Governance (GGG)',
    description: 'A Post-AGI Multi-domain Governance Sandbox',
    linkText: 'Read More',
    linkUrl: 'https://gyrogovernance.com/articles/ggg-simulator-results/',
  },
];

/**
 * Parse AIR-Craft.md: each `### Domain` block with bullet fields
 * (emoji, title, description, linkText, linkUrl) becomes one project.
 */
export function parseAirCraftMarkdown(markdown: string): AirCraftProject[] {
  const projects: AirCraftProject[] = [];
  const sections = markdown.split(/^###\s+/m).slice(1);

  for (const section of sections) {
    const newline = section.indexOf('\n');
    if (newline === -1) continue;

    const domain = section.slice(0, newline).trim();
    if (!domain) continue;

    const body = section.slice(newline + 1);
    const fields: Record<string, string> = {};

    for (const line of body.split('\n')) {
      const match = line.match(/^\s*-\s*(\w+)\s*:\s*(.+?)\s*$/);
      if (!match) continue;
      fields[match[1]] = match[2].trim();
    }

    if (!REQUIRED_FIELDS.every((key) => fields[key])) continue;

    projects.push({
      domain,
      emoji: fields.emoji,
      title: fields.title,
      description: fields.description,
      linkText: fields.linkText,
      linkUrl: fields.linkUrl,
    });
  }

  return projects;
}

function craftDocUrl(): string {
  return (import.meta.env.VITE_AIR_CRAFT_MD_URL as string | undefined)?.trim() || DEFAULT_URL;
}

/** Fetch and parse the remote AIR-Craft.md project list. Throws on network or parse failure. */
export async function fetchAirCraftProjects(signal?: AbortSignal): Promise<AirCraftProject[]> {
  const response = await fetch(craftDocUrl(), {
    signal,
    headers: { Accept: 'text/plain, text/markdown, */*' },
  });

  if (!response.ok) {
    throw new Error(`AIR-Craft.md fetch failed: ${response.status}`);
  }

  const markdown = await response.text();
  const projects = parseAirCraftMarkdown(markdown);

  if (projects.length === 0) {
    throw new Error('AIR-Craft.md contained no valid projects');
  }

  return projects;
}
