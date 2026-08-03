import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Strands from '../components/Strands';
import PrototypePill from '../components/PrototypePill';
import AirLogo from '../components/AirLogo';
import { Page, PageHero, Section, Block } from '../components/Section';

/**
 * Home page draft sections (docs/dev/draft.md [/]):
 * 1. Hero: AIR + mission + tagline + About us / Join us
 * 2. Power Concentration Risks + Methodology / AIR-Craft
 */
export default function Home() {
  return (
    <Page>
      <PageHero
        tint="blue"
        badge={<PrototypePill />}
        icon={<AirLogo variant="logo" size={64} className="mx-auto" alt="" />}
        title="AIR"
        belowTitle={
          <Block className="text-center">
            <p className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 leading-relaxed">
              Alignment Infrastructure Routes for Independent Researchers, Engineers, Offices of Community Safety, and AI Labs.
            </p>
          </Block>
        }
        subtitle="We deliver AI-Empowered Human Capacity Development for Alignment on Uniform Power Distribution."
        backdrop={
          <Strands
            className="absolute inset-0 h-full w-full"
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
        }
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/about" className="btn-secondary">
            About us
          </Link>
          <Link to="/superintelligence" className="btn-primary px-8 py-3.5 text-base inline-flex">
            Join us <ArrowRight size={18} />
          </Link>
        </div>
      </PageHero>

      <Section
        tint="purple"
        icon="⚡"
        title="Power Concentration Risks"
        actions={
          <>
            <Link to="/infrastructure" className="btn-outline text-sm">
              Alignment Infrastructure
            </Link>
            <Link to="/craft" className="btn-outline text-sm">
              AI Safety Interventions
            </Link>
          </>
        }
      >
        <Block>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
            People believe that power concentration from autonomy, whether in humans or machines,
            is the root behind high risks to personal, social, and environmental safety.
          </p>
        </Block>

        <div className="grid md:grid-cols-2 gap-4">
          <Block>
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <span aria-hidden="true"></span> When does power really concentrate?
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
              <span aria-hidden="true"></span> What do we do to mitigate such risks?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We provide protocols as shared infrastructure to help you research and build solutions to today’s most urgent crises in the age of Transformative AI, and we welcome anyone who wants to contribute, without credential or hiring gatekeeping.
            </p>
          </Block>
        </div>
      </Section>
    </Page>
  );
}
