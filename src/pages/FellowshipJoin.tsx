import { Link } from 'react-router-dom';
import { Page, PageHero, Section, Block } from '../components/Section';
import PrototypePill from '../components/PrototypePill';

const INTRO_URL =
  'https://github.com/gyrogovernance/air-craft/discussions/new?category=introductions';
const AGREEMENT_URL =
  'https://github.com/gyrogovernance/air-craft/blob/main/FELLOW_AGREEMENT.md';
const GITHUB_JOIN_URL = 'https://github.com/join';

/** Join Fellowship — GitHub Discussions introduction (not FormEasy). */
export default function FellowshipJoin() {
  return (
    <Page>
      <PageHero
        badge={<PrototypePill detail />}
        icon="🎫"
        title="Join the AIR Fellowship"
        subtitle="Open enrollment. Your introduction post on GitHub is your membership record."
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
              . There is no selective admissions process.
            </li>
            <li>
              Post your introduction with your real public name. You can claim assignments later — there is no day-one production requirement.
            </li>
          </ol>
        </Block>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <a href={GITHUB_JOIN_URL} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm">
            Create GitHub account ↗
          </a>
          <a href={AGREEMENT_URL} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm">
            Read agreement ↗
          </a>
          <a href={INTRO_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Post your introduction ↗
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
