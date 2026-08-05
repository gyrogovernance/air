import Accordion from './Accordion';
import CopyBlock from './CopyBlock';
import { ExtLink } from '../lib/protocolsContent';
import { WORKFLOW_ARTIFACTS } from '../lib/workflows';
import {
  REPORT_PROMPTS,
  REPORT_README_GITHUB,
  SUBMISSION_README_GITHUB,
} from '../lib/workflowContent';

function ReadmeBody({ text }: { text: string }) {
  return (
    <pre className="overflow-auto whitespace-pre-wrap rounded-lg border border-blue-400/20 bg-white/50 p-3 font-mono text-xs leading-relaxed text-gray-700 dark:bg-black/25 dark:text-gray-200 sm:text-sm">
      {text}
    </pre>
  );
}

/** AIR-Craft Submission and Meta-Evaluation Report workflows. */
export default function WorkflowsSection() {
  return (
    <div className="space-y-3">
      <Accordion
        id="workflow-air-craft-submission"
        title={
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true">📋</span>
            AIR-Craft Submission
          </span>
        }
        subtitle="Required for submitting work"
      >
        <div className="space-y-4 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
          <p>
            <ExtLink href={SUBMISSION_README_GITHUB}>Open on GitHub</ExtLink>
          </p>
          <ReadmeBody text={WORKFLOW_ARTIFACTS.submissionReadme} />
          <CopyBlock
            text={WORKFLOW_ARTIFACTS.submissionTemplate}
            buttonLabel="Copy template"
            showPreview={false}
          />
        </div>
      </Accordion>

      <Accordion
        id="workflow-meta-evaluation-report"
        title={
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true">📝</span>
            Meta-Evaluation Report
          </span>
        }
        subtitle="Formal report on a submission

"
      >
        <div className="space-y-4 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
          <p>
            <ExtLink href={REPORT_README_GITHUB}>Open on GitHub</ExtLink>
          </p>
          <ReadmeBody text={WORKFLOW_ARTIFACTS.reportReadme} />
          <div className="space-y-5">
            {REPORT_PROMPTS.map((prompt) => (
              <CopyBlock
                key={prompt.id}
                text={WORKFLOW_ARTIFACTS.reportPrompts[prompt.key]}
                buttonLabel={prompt.label}
                previewMaxHeight="8rem"
              />
            ))}
          </div>
        </div>
      </Accordion>
    </div>
  );
}
