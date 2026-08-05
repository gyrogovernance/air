export const AIR_CRAFT_BLOB = 'https://github.com/gyrogovernance/air-craft/blob/main';

export const SUBMISSION_README_GITHUB = `${AIR_CRAFT_BLOB}/protocols/submissions/README.md`;
export const REPORT_README_GITHUB = `${AIR_CRAFT_BLOB}/protocols/reports/README.md`;

export const REPORT_PROMPTS = [
  {
    id: 'report-01-detection',
    key: 'detection' as const,
    label: 'Copy prompt 01 — Detection',
  },
  {
    id: 'report-02-processing',
    key: 'processing' as const,
    label: 'Copy prompt 02 — Processing',
  },
  {
    id: 'report-03-treatment',
    key: 'treatment' as const,
    label: 'Copy prompt 03 — Treatment',
  },
] as const;
