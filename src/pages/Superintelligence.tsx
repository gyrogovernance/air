import { Link } from 'react-router-dom';
import { Page, Section, Block } from '../components/Section';

/** Superintelligence page draft [/superintelligence] */
export default function Superintelligence() {
  return (
    <Page>
      <Section
        hero
        tint="teal"
        icon="✨"
        title="Collective Superintelligence"
        actions={
          <a
            href="/protocols"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Learn more
          </a>
        }
      >
        <Block>
          <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
            We redefine superintelligence as the seamless cooperation between humans and machines in the era of
            Transformative AI (TAI) and Artificial General Intelligence (AGI) (see Bostrom, Superintelligence, 2014;
            Korompilias, Gyroscopic Global Governance, 2025).
          </p>
        </Block>
      </Section>

      <Section
        tint="cyan"
        icon="👥"
        title="Our Fellowship"
        actions={
          <Link to="/superintelligence/form" className="btn-primary">
            Join
          </Link>
        }
      >
        <Block>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
            Built for misfits, generalists, autodidacts, and marginalized individuals who want to contribute to independent AI safety research and governance now.
          </p>
        </Block>
        <Block>
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <span aria-hidden="true">🎫</span> Who is eligible?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            We support the 99% of AI safety candidates who wish to build their portfolio and career in alignment and AGI safety, but existing labs
            often do not have the capacity to integrate.
          </p>
        </Block>
      </Section>

      <Section
        tint="purple"
        icon="💚"
        title="Invest in Humanity"
        actions={
          <Link to="/superintelligence/fund" className="btn-primary">
            Support interest
          </Link>
        }
      >
        <Block>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
            For every hire a lab makes, 100 to 1000 people are left out. The Collective Superintelligence Fund
            aims to support all those who join our Fellowship program without barriers and discriminative policies.
          </p>
        </Block>
      </Section>
    </Page>
  );
}
