import generated from '../data/airCraft.generated.json';

/** AIR-Craft project card sourced from gyrogovernance/air-craft AIR-Craft.md */
export type AirCraftProject = {
  domain: string;
  emoji: string;
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
};

export type AirCraftDomainGroup = {
  domain: string;
  projects: AirCraftProject[];
};

/** Unified Scope Routes order; unknown domains append alphabetically after these. */
export const AIR_CRAFT_DOMAIN_ORDER = [
  'Economy',
  'Employment',
  'Education',
  'Ecology',
] as const;

const DEFAULT_URL =
  'https://raw.githubusercontent.com/gyrogovernance/air-craft/main/AIR-Craft.md';

const REQUIRED_FIELDS = ['emoji', 'title', 'description', 'linkText', 'linkUrl'] as const;

/**
 * Build-time snapshot from `scripts/sync-air-craft.mjs` (daily CI + every `bun run build`).
 * Used for first paint / SEO; live fetch may refresh after mount.
 */
export const BUILD_AIR_CRAFT_PROJECTS: AirCraftProject[] = generated.projects;

export const BUILD_AIR_CRAFT_SEO = generated.seo;

/**
 * Group projects by domain in Unified Scope order.
 * Domains not in AIR_CRAFT_DOMAIN_ORDER follow alphabetically.
 */
export function groupAirCraftProjects(projects: AirCraftProject[]): AirCraftDomainGroup[] {
  const byDomain = new Map<string, AirCraftProject[]>();

  for (const project of projects) {
    const list = byDomain.get(project.domain);
    if (list) list.push(project);
    else byDomain.set(project.domain, [project]);
  }

  const known = new Set<string>(AIR_CRAFT_DOMAIN_ORDER);
  const ordered: AirCraftDomainGroup[] = [];

  for (const domain of AIR_CRAFT_DOMAIN_ORDER) {
    const group = byDomain.get(domain);
    if (group?.length) ordered.push({ domain, projects: group });
  }

  const extras = [...byDomain.keys()]
    .filter((domain) => !known.has(domain))
    .sort((a, b) => a.localeCompare(b));

  for (const domain of extras) {
    ordered.push({ domain, projects: byDomain.get(domain)! });
  }

  return ordered;
}

/** Case-insensitive title/description match; empty query returns all. */
export function filterAirCraftProjects(
  projects: AirCraftProject[],
  query: string,
): AirCraftProject[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return projects;

  return projects.filter((project) => {
    const haystack = `${project.title} ${project.description} ${project.domain}`.toLowerCase();
    return haystack.includes(needle);
  });
}

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
