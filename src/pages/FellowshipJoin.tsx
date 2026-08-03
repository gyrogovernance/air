import { Link } from 'react-router-dom';
import { Page, PageHero, Section, Block } from '../components/Section';
import PrototypePill, { VoluntaryPill } from '../components/PrototypePill';

const INTRO_URL =
  'https://github.com/gyrogovernance/air-craft/discussions/new?category=introductions';
const AGREEMENT_URL =
  'https://github.com/gyrogovernance/air-craft/blob/main/FELLOW_AGREEMENT.md';
const GITHUB_JOIN_URL = 'https://github.com/join';
const ASSIGNMENTS_URL =
  'https://github.com/gyrogovernance/air-craft/discussions/categories/assignments';

/** Join Fellowship via GitHub Discussions introduction (not FormEasy). */
export default function FellowshipJoin() {
  return (
    <Page>
      <PageHero
        badge={<PrototypePill detail />}
        icon="🎫"
        title="Join the AIR Fellowship"
        belowTitle={
          <div className="flex justify-center">
            <VoluntaryPill />
          </div>
        }
        subtitle="Open enrollment, without admissions."
        tint="blue"
      />

      <Section tint="cyan" icon="🛤️" title="Three steps">
        <Block>
          <ol className="space-y-6">
            <li>
              <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-50 tracking-tight">
                <span className="text-blue-700 dark:text-blue-400 tabular-nums mr-2">1.</span>
                Create a GitHub account
              </p>
              <p className="mt-1.5 pl-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                Skip this if you already have one. GitHub is required for membership, articles, and reports.
              </p>
            </li>
            <li>
              <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-50 tracking-tight">
                <span className="text-blue-700 dark:text-blue-400 tabular-nums mr-2">2.</span>
                Read the Fellow Agreement
              </p>
              <p className="mt-1.5 pl-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                <a
                  href={AGREEMENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-700 dark:text-blue-400"
                >
                  AIR Fellow Agreement ↗
                </a>
              </p>
            </li>
            <li>
              <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-50 tracking-tight">
                <span className="text-blue-700 dark:text-blue-400 tabular-nums mr-2">3.</span>
                Post your introduction
              </p>
              <p className="mt-1.5 pl-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                Use your real public name. That post is your membership record. You can claim{' '}
                <a
                  href={ASSIGNMENTS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-700 dark:text-blue-400"
                >
                  assignments ↗
                </a>{' '}
                later.
              </p>
            </li>
          </ol>
        </Block>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <a href={GITHUB_JOIN_URL} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm">
            Create GitHub account ↗
          </a>
          <a href={INTRO_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Post your introduction on GitHub ↗
          </a>
        </div>
      </Section>

      <Section tint="blue">
        <Block>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">
            Prefer to browse first?{' '}
            <Link to="/superintelligence" className="font-semibold text-blue-700 dark:text-blue-400">
              Back to Collective Superintelligence
            </Link>
          </p>
        </Block>
      </Section>
    </Page>
  );
}
