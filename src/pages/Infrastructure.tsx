import { Link } from 'react-router-dom';
import { Page, Section, Block } from '../components/Section';

/** Infrastructure page draft [/infrastructure] */
export default function Infrastructure() {
  return (
    <Page>
      <Section
        hero
        tint="blue"
        icon="🤝"
        title="Human Capacity Development Infrastructure"
        actions={
          <Link to="/about" className="btn-outline text-sm">
            About us
          </Link>
        }
      >
        <div className="grid md:grid-cols-2 gap-4">
          <Block>
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <span aria-hidden="true">🚶‍♀️‍➡️</span> Uniform Power Distribution Guides
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Protocols as Infrastructure for shared coordination. The framework establishes four capacities for alignment
              and their corresponding displacements.
            </p>
          </Block>
          <Block>
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <span aria-hidden="true">🌐</span> Unified Scope Routes
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              AI-Empowered Economy, Employment, Education, and Ecology for the alleviation of poverty, unemployment,
              misinformation, and ecological degeneration.
            </p>
          </Block>
        </div>
      </Section>

      <Section
        tint="blue"
        icon="✨"
        actions={
          <Link to="/superintelligence" className="btn-secondary">
            Superintelligence
          </Link>
        }
      >
        <Block>
          <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
            <strong>Collective Superintelligence</strong> is central to our research at Gyro Governance Lab.
            Rather than another AI model, it is the infrastructure that helps humans get better together through technology.
          </p>
        </Block>
      </Section>

      <Section
        tint="cyan"
        icon="📃"
        title="Protocols"
        actions={
          <Link to="/protocols" className="btn-outline text-sm">
            Gear up
          </Link>
        }
      >
        <Block className="space-y-4">
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
            <strong>Gyroscopic Global Governance (GGG)</strong> is our foundational whitepaper, describing how Collective Superintelligence
            leads to the alleviation of Poverty, Unemployment, Misinformation, and Ecological Degradation.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Four protocols from our research are being leveraged to support this transformation: the
            <strong> Common Governance Model</strong> (Focusing on Economy), the <strong> Gyroscope Protocol</strong> (Focusing on Employment),
            <strong> ✋ The Human Mark</strong> (Focusing on Education), and <strong> Gyroscopic Global Governance</strong> as the overall framework (Focusing on Ecology).
          </p>
        </Block>

        <Block>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
            Our protocols give you shared methods for alignment work. Our tools help you apply them in practice, with
            documentation and templates ready when you need them.
          </p>
        </Block>
      </Section>
    </Page>
  );
}
