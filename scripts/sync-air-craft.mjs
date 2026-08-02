/**
 * Fetch AIR-Craft.md and write src/data/airCraft.generated.json for the Vite bundle.
 * Inputs: AIR_CRAFT_MD_URL or VITE_AIR_CRAFT_MD_URL (optional). Outputs: generated JSON.
 * Companion: src/lib/airCraft.ts (runtime parse + live fetch).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const DEFAULT_URL =
  'https://raw.githubusercontent.com/gyrogovernance/air-craft/main/AIR-Craft.md';

const REQUIRED_FIELDS = ['emoji', 'title', 'description', 'linkText', 'linkUrl'];

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outPath = join(root, 'src', 'data', 'airCraft.generated.json');

const SEED_PROJECTS = [
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

function parseAirCraftMarkdown(markdown) {
  const projects = [];
  const sections = markdown.split(/^###\s+/m).slice(1);

  for (const section of sections) {
    const newline = section.indexOf('\n');
    if (newline === -1) continue;

    const domain = section.slice(0, newline).trim();
    if (!domain) continue;

    const body = section.slice(newline + 1);
    const fields = {};

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

function seoPayload(projects) {
  const titles = projects.map((p) => p.title);
  const domains = [...new Set(projects.map((p) => p.domain))];
  const description =
    `AIR-Craft is skilled work in AI safety and governance with datasets, reports, and tools across ${domains.join(', ')}. ${titles.join(', ')}.`;
  return {
    description,
    keywords: ['AIR-Craft', 'AIR Craft', 'AI safety tools', 'AI safety datasets', ...titles],
  };
}

function writeGenerated(projects, meta) {
  mkdirSync(dirname(outPath), { recursive: true });
  const payload = {
    fetchedAt: meta.fetchedAt,
    source: meta.source,
    sourceStatus: meta.sourceStatus,
    seo: seoPayload(projects),
    projects,
  };
  writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`sync-air-craft: wrote ${outPath}`);
  console.log(`sync-air-craft: projects=${projects.length} status=${meta.sourceStatus}`);
}

function loadExistingProjects() {
  if (!existsSync(outPath)) return null;
  try {
    const parsed = JSON.parse(readFileSync(outPath, 'utf8'));
    if (Array.isArray(parsed.projects) && parsed.projects.length > 0) {
      return parsed.projects;
    }
  } catch {
    // keep going to seed
  }
  return null;
}

const url =
  (process.env.AIR_CRAFT_MD_URL || process.env.VITE_AIR_CRAFT_MD_URL || '').trim() || DEFAULT_URL;

let projects = null;
let sourceStatus = 'seed';

try {
  const response = await fetch(url, {
    headers: { Accept: 'text/plain, text/markdown, */*' },
  });
  console.log(`sync-air-craft: GET ${url} -> ${response.status}`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const markdown = await response.text();
  const parsed = parseAirCraftMarkdown(markdown);
  if (parsed.length === 0) {
    throw new Error('no valid projects');
  }
  projects = parsed;
  sourceStatus = 'live';
} catch (error) {
  console.log(`sync-air-craft: fetch_failed ${error instanceof Error ? error.message : error}`);
  const cached = loadExistingProjects();
  projects = cached ?? SEED_PROJECTS;
  sourceStatus = cached ? 'cached' : 'seed';
}

writeGenerated(projects, {
  fetchedAt: new Date().toISOString(),
  source: url,
  sourceStatus,
});
