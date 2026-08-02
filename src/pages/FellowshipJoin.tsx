import { Link } from 'react-router-dom';
import { Page, PageHero, Section, Block } from '../components/Section';
import PrototypePill from '../components/PrototypePill';

const INTRO_URL =
  'https://github.com/gyrogovernance/air-craft/discussions/new?category=introductions';
const AGREEMENT_URL =
  'https://github.com/gyrogovernance/air-craft/blob/main/FELLOW_AGREEMENT.md';
const GITHUB_JOIN_URL = 'https://github.com/join';
const ASSIGNMENTS_URL =
  'https://github.com/gyrogovernance/air-craft/discussions/categories/assignments';

/** Join Fellowship — GitHub Discussions introduction (not FormEasy). */
export default function FellowshipJoin() {
  return (
    <Page>
      <PageHero
        badge={<PrototypePill detail />}
        icon="🎫"
        title="Join the AIR Fellowship"
        subtitle="Open enrollment — not an admissions process. You are a Fellow once you post your introduction."
        tint="emerald"
      />

      <Section tint="cyan" icon="🛤️" title="Three steps">
        <Block className="space-y-4">
          <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-200 leading-relaxed">
            <li>
              Create a GitHub account if you do not have one. GitHub is required, including for articles and reports.
            </li>
            <li>
              Read the{' '}
              <a href={AGREEMENT_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-700 dark:text-emerald-400">
                AIR Fellow Agreement ↗
              </a>
              .
            </li>
            <li>
              Post your introduction with your real public name. That post is your membership record. Claim{' '}
              <a href={ASSIGNMENTS_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-700 dark:text-emerald-400">
                assignments ↗
              </a>{' '}
              later if you want — no day-one production requirement.
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

      <Section tint="teal">
        <Block>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">
            Prefer to browse first?{' '}
            <Link to="/superintelligence" className="font-semibold text-emerald-700 dark:text-emerald-400">
              Back to Collective Superintelligence
            </Link>
          </p>
        </Block>
      </Section>
    </Page>
  );
}
