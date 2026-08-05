/**
 * Sync AIR-Craft workflow copy artifacts into src/data/workflows.generated.json.
 * Inputs: WORKFLOWS_LOCAL_DIR (optional), WORKFLOWS_RAW_BASE (optional).
 * Companion: src/lib/workflows.ts (runtime import).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const RAW_BASE =
  (process.env.WORKFLOWS_RAW_BASE || '').trim() ||
  'https://raw.githubusercontent.com/gyrogovernance/air-craft/main';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outPath = join(root, 'src', 'data', 'workflows.generated.json');
const defaultLocalDir = join(root, '..', 'air-craft');
const localDir = (process.env.WORKFLOWS_LOCAL_DIR || '').trim() || defaultLocalDir;

const SOURCES = {
  submissionReadme: 'protocols/submissions/README.md',
  reportReadme: 'protocols/reports/README.md',
  detection: 'protocols/reports/01-detection.md',
  processing: 'protocols/reports/02-processing.md',
  treatment: 'protocols/reports/03-treatment.md',
};

function extractCopyPasteTemplate(markdown) {
  const marker = '## Copy-paste template';
  const idx = markdown.indexOf(marker);
  if (idx === -1) return '';
  const rest = markdown.slice(idx + marker.length);
  const match = rest.match(/```text\s*\n([\s\S]*?)```/);
  return match?.[1]?.trim() ?? '';
}

async function readRelative(relPath) {
  const localPath = join(localDir, relPath);
  if (existsSync(localPath)) {
    return { text: readFileSync(localPath, 'utf8'), via: 'local' };
  }

  const url = `${RAW_BASE.replace(/\/$/, '')}/${relPath}`;
  const response = await fetch(url, {
    headers: { Accept: 'text/plain, text/markdown, */*' },
  });
  console.log(`sync-workflows: GET ${url} -> ${response.status}`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${relPath}`);
  }
  return { text: await response.text(), via: 'live' };
}

function loadExisting() {
  if (!existsSync(outPath)) return null;
  try {
    return JSON.parse(readFileSync(outPath, 'utf8'));
  } catch {
    return null;
  }
}

let sourceStatus = 'cached';
const meta = { localDir, rawBase: RAW_BASE };

try {
  const [submissionReadme, reportReadme, detection, processing, treatment] = await Promise.all([
    readRelative(SOURCES.submissionReadme),
    readRelative(SOURCES.reportReadme),
    readRelative(SOURCES.detection),
    readRelative(SOURCES.processing),
    readRelative(SOURCES.treatment),
  ]);

  const submissionTemplate = extractCopyPasteTemplate(submissionReadme.text);
  if (!submissionTemplate) {
    throw new Error('empty submission template');
  }
  if (!reportReadme.text.trim()) {
    throw new Error('empty report README');
  }

  const vias = new Set([
    submissionReadme.via,
    reportReadme.via,
    detection.via,
    processing.via,
    treatment.via,
  ]);
  sourceStatus = vias.size === 1 && vias.has('local') ? 'local' : 'live';

  const payload = {
    fetchedAt: new Date().toISOString(),
    sourceStatus,
    meta,
    submissionReadme: submissionReadme.text.trim(),
    reportReadme: reportReadme.text.trim(),
    submissionTemplate,
    reportPrompts: {
      detection: detection.text,
      processing: processing.text,
      treatment: treatment.text,
    },
  };

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`sync-workflows: wrote ${outPath}`);
  console.log(`sync-workflows: status=${sourceStatus}`);
} catch (error) {
  console.log(
    `sync-workflows: sync_failed ${error instanceof Error ? error.message : error}`,
  );
  const cached = loadExisting();
  if (cached?.submissionReadme && cached?.reportReadme && cached?.submissionTemplate && cached?.reportPrompts) {
    console.log(`sync-workflows: using cached ${outPath}`);
  } else {
    console.error('sync-workflows: no cached workflows.generated.json');
    process.exitCode = 1;
  }
}
