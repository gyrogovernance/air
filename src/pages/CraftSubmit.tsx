import { Link } from 'react-router-dom';
import { Page, PageHero, Section, Block } from '../components/Section';
import PrototypePill from '../components/PrototypePill';

const SUBMIT_URL =
  'https://github.com/gyrogovernance/air-craft/issues/new?template=1-submit.yml';
const REVIEW_URL =
  'https://github.com/gyrogovernance/air-craft/issues/new?template=2-review.yml';
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
        subtitle="List public work on air.gyrogovernance.com/craft. Issues are Submit and Review only. Include a link to your Fellowship introduction."
        tint="blue"
      />

      <Section tint="blue" icon="📤" title="How it works">
        <Block className="space-y-4">
          <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-200 leading-relaxed">
            <li>
              If you have not already,{' '}
              <a href={INTRO_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 dark:text-blue-400">
                post your introduction ↗
              </a>{' '}
              (open enrollment; you are a Fellow once you post).
            </li>
            <li>Work and iterate through Self-Audit on your own terms.</li>
            <li>
              Open the Submit form. Use your real public name and link your introduction. Agree to the{' '}
              <a href={AGREEMENT_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 dark:text-blue-400">
                Fellow Agreement ↗
              </a>
              .
            </li>
          </ol>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Open Issues labeled <code className="text-sm">submission</code> appear on the Craft list. Closing an issue withdraws it. Peer Fellows may review with the review form.
          </p>
        </Block>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <a href={SUBMIT_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Submit to AIR-Craft ↗
          </a>
          <a href={REVIEW_URL} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm">
            Review a submission ↗
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
