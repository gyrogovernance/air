import { Link } from 'react-router-dom';
import { Page, PageHero, Section, Block } from '../components/Section';
import PrototypePill from '../components/PrototypePill';

const SUBMIT_URL =
  'https://github.com/gyrogovernance/air-craft/issues/new?template=submit-to-air-craft.yml';
const REVIEW_URL =
  'https://github.com/gyrogovernance/air-craft/issues/new?template=review-a-submission.yml';
const AGREEMENT_URL =
  'https://github.com/gyrogovernance/air-craft/blob/main/FELLOW_AGREEMENT.md';

/** Submit project — GitHub Issue Form (not FormEasy). */
export default function CraftSubmit() {
  return (
    <Page>
      <PageHero
        badge={<PrototypePill detail />}
        icon="🛩️"
        title="Submit Your Project to AIR-Craft"
        subtitle="Public listing on air.gyrogovernance.com/craft via a GitHub Issue Form. Real name and typed signature with date are required."
        tint="emerald"
      />

      <Section tint="teal" icon="📤" title="How it works">
        <Block className="space-y-4">
          <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-200 leading-relaxed">
            <li>Register by introducing yourself in the Fellowship Discussions (open enrollment).</li>
            <li>Work and iterate through Self-Audit on your own terms.</li>
            <li>
              Submit with the AIR-Craft Issue Form. Agree to the{' '}
              <a href={AGREEMENT_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-700 dark:text-emerald-400">
                Fellow Agreement ↗
              </a>
              {' '}when you type your signature and date.
            </li>
          </ol>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Accepted submissions are listed from open Issues labeled <code className="text-sm">submission</code>. Peer Fellows may review using the review form.
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
            <Link to="/craft" className="font-semibold text-emerald-700 dark:text-emerald-400">
              ← Back to AIR-Craft
            </Link>
          </p>
        </Block>
      </Section>
    </Page>
  );
}
