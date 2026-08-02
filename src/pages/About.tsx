import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Page, Section, Block } from '../components/Section';

/** About page draft [/about] */
export default function About() {
  return (
    <Page>
      <Section
        hero
        tint="teal"
        icon="ℹ️"
        title="About"
        actions={
          <Link to="/infrastructure" className="btn-primary inline-flex">
            Alignment infrastructure <ArrowRight className="ml-1.5" size={18} />
          </Link>
        }
      >
        <Block>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 leading-relaxed">
            AIR is a framework for Alignment on Uniform Power Distribution through AI-Empowered Human Capacity Development.
            This Alignment operates over a Unified Scope for AI safety and governance, enabling us to collectively address the interconnected crises of
            poverty, unemployment, misinformation, and ecological degeneration.
          </p>
        </Block>
      </Section>

      <Section
        tint="cyan"
        icon="🔄"
        title="How we work"
        actions={
          <Link to="/superintelligence" className="btn-secondary">
            Collective Superintelligence Fellowship
          </Link>
        }
      >
        <Block>
          <p className="quote text-lg mb-0">
            Alignment requires synchronization, not enforced conformity to external measurements.
          </p>
        </Block>
        <Block>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
            We provide Guides to help you coordinate in any topic you choose, aligning all contributions with Four Routes
            for effective operationalization of your AI safety and governance interventions.
          </p>
        </Block>
      </Section>

      <Section
        tint="purple"
        icon="🤝"
        title="Our Common Consensus"
        actions={
          <a
            href="https://gyrogovernance.com/#thm"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-sm"
          >
            ✋ The Human Mark ↗
          </a>
        }
      >
        <Block className="space-y-4">
          <p className="text-xl font-semibold text-gray-800 dark:text-gray-100 leading-relaxed">
            All Artificial categories of Authority and Agency are Indirect, constitutively dependent on Human Intelligence.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            AI systems are pattern-matching algorithms that transform prior human knowledge, measurements, and instructions,
            making them mechanistically and epistemically Indirect Authority and Agency even when treated as Direct.
            Enhanced capability represents a more sophisticated transformation of these inputs rather than a change in class (Direct/Indirect).
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Authority and Agency denote types of capacity, not identifications of entities or parties.
            Safety failures occur when this distinction is violated. The framework provides four capacities and their corresponding displacements covering all such violations.
          </p>
        </Block>
      </Section>
    </Page>
  );
}
