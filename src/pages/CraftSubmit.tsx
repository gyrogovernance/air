import { Link } from 'react-router-dom';
import { Page, PageHero, Section, Block } from '../components/Section';
import PrototypePill from '../components/PrototypePill';

const SUBMIT_URL =
  'https://github.com/gyrogovernance/air-craft/issues/new?template=1-submit.yml';
const REPORT_URL =
  'https://github.com/gyrogovernance/air-craft/issues/new?template=2-report.yml';
const INTRO_URL =
  'https://github.com/gyrogovernance/air-craft/discussions/new?category=introductions';
const AGREEMENT_URL =
  'https://github.com/gyrogovernance/air-craft/blob/main/FELLOW_AGREEMENT.md';

/** Submit project via GitHub Issue Form (not FormEasy). */
export default function CraftSubmit() {
  return (
    <Page>
      <PageHero
        badge={<PrototypePill />}
        icon="🛩️"
        title="Submit Your Project to AIR-Craft"
        subtitle="Share a dataset, report, eval, or tool on the AIR-Craft list. Include a link to your Fellowship introduction."
        tint="blue"
      />

      <Section tint="blue" icon="📤" title="How it works">
        <Block className="space-y-4">
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
            If you have not already,{' '}
            <a
              href={INTRO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-700 dark:text-blue-400"
            >
              post your introduction ↗
            </a>
            . Before submitting, complete the{' '}
            <Link
              to="/protocols#workflow-air-craft-submission"
              className="font-semibold text-blue-700 dark:text-blue-400"
            >
              AIR-Craft Submission
            </Link>{' '}
            workflow on the Protocols page. Open the Submit form with your real public name, link your introduction, and agree to the{' '}
            <a
              href={AGREEMENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-700 dark:text-blue-400"
            >
              Fellow Agreement ↗
            </a>
            .
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Your project appears on the Craft list after you submit. Close the submission anytime to remove it. Other Fellows can report on your work.
          </p>
        </Block>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <a href={SUBMIT_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Submit to AIR-Craft ↗
          </a>
          <a href={REPORT_URL} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm">
            File a Formal Report ↗
          </a>
        </div>
      </Section>

      <Section tint="cyan">
        <Block>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">
            <Link to="/craft" className="font-semibold text-blue-700 dark:text-blue-400">
              ← Back to AIR-Craft
            </Link>
          </p>
        </Block>
      </Section>
    </Page>
  );
}
