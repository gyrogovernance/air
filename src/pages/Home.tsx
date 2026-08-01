import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Strands from '../components/Strands';
import { Page, PageHero, Section, Block } from '../components/Section';

/**
 * Home page draft sections (docs/dev/draft.md [/]):
 * 1. Hero: AIR + tagline + Join us
 * 2. Mission line + About us
 * 3. Power Concentration Risks + Methodology / AIR-Craft
 */
export default function Home() {
  return (
    <Page>
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]" aria-hidden="true">
          <Strands
            colors={['#F97316', '#7C3AED', '#06B6D4']}
            count={3}
            speed={0.5}
            amplitude={1}
            waviness={1}
            thickness={0.7}
            glow={2.6}
            taper={3}
            spread={1}
            intensity={0.6}
            saturation={1.5}
            opacity={0.45}
            scale={1.5}
            glass={false}
          />
        </div>

        <div className="relative z-10">
          <PageHero
            tint="emerald"
            icon="🍃"
            title="AIR"
            subtitle="We deliver AI-Empowered Human Capacity Development for Alignment on Uniform Power Distribution."
          >
            <Link to="/superintelligence" className="btn-primary px-8 py-3.5 text-base inline-flex">
              Join us <ArrowRight size={18} />
            </Link>
          </PageHero>
        </div>
      </div>

      <Section
        tint="teal"
        icon="🧭"
        actions={
          <Link to="/about" className="btn-secondary">
            About us
          </Link>
        }
      >
        <Block className="text-center">
          <p className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 leading-relaxed">
            Alignment Infrastructure Routes for Independent Researchers and Engineers, Offices of Community Safety, and AI Labs.
          </p>
        </Block>
      </Section>

      <Section
        tint="purple"
        icon="⚖️"
        title="Power Concentration Risks"
        actions={
          <>
            <Link to="/infrastructure" className="btn-outline text-sm">
              AI safety methodology
            </Link>
            <Link to="/craft" className="btn-outline text-sm">
              AIR-Craft interventions
            </Link>
          </>
        }
      >
        <Block>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
            People believe that power concentration from autonomy, whether in humans or machines,
            is the root behind high risks to personal, social, and environmental safety, with catastrophic AI risks and failures of AI governance among them.
          </p>
        </Block>

        <div className="grid md:grid-cols-2 gap-4">
          <Block>
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <span aria-hidden="true">🔎</span> When does power really concentrate?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Power concentrates only when governance responsibilities are displaced by misattributing&nbsp;
              <strong className="text-gray-900 dark:text-white">Authority</strong> and&nbsp;
              <strong className="text-gray-900 dark:text-white">Agency</strong> as unique identities of someone or something,
              instead of recognizing them as capacities that operate across people and machines and originate in human ancestry.
            </p>
          </Block>

          <Block>
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <span aria-hidden="true">🛠️</span> What do we do to mitigate such risks?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
              We support independent AI safety researchers and engineers through:
            </p>
            <ul className="bullet-list space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li>
                <strong className="text-gray-900 dark:text-white">Uniform Power Distribution Guides:</strong> Protocols as Infrastructure for shared coordination. The framework establishes four capacities for alignment and their corresponding displacements.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Unified Scope Routes:</strong> AI-Empowered Economy, Employment, Education, and Ecology for the alleviation of poverty, unemployment, misinformation, and ecological degeneration.
              </li>
            </ul>
          </Block>
        </div>
      </Section>
    </Page>
  );
}
