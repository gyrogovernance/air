import { Link } from 'react-router-dom';
import { Page, PageHero, Section, Block } from '../components/Section';

/** Infrastructure page draft [/infrastructure] */
export default function Infrastructure() {
  return (
    <Page>
      <PageHero
        icon="🤝"
        title="Human Capacity Development Infrastructure"
        tint="emerald"
      />

      <Section
        tint="teal"
        icon="📐"
        actions={
          <Link to="/about" className="btn-outline text-sm">
            About us
          </Link>
        }
      >
        <div className="grid md:grid-cols-2 gap-4">
          <Block>
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <span aria-hidden="true">🛤️</span> Uniform Power Distribution Guides
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
        tint="cyan"
        icon="📜"
        title="Protocols"
        actions={
          <a
            href="https://gyrogovernance.com/#ggg"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-sm"
          >
            Learn more ↗
          </a>
        }
      >
        <Block className="space-y-4">
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
            <strong>Gyroscopic Global Governance (GGG)</strong> is a whitepaper describing how Collective Superintelligence
            leads to the alleviation of Poverty, Unemployment, Misinformation, and Ecological Degradation.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Four protocols from our research are being leveraged to support this transformation: the
            <strong> Common Governance Model</strong> (Focusing on Economy), the <strong> Gyroscope Protocol</strong> (Focusing on Employment),
            <strong> ✋ The Human Mark</strong> (Focusing on Education), and <strong> Gyroscopic Global Governance</strong>
            as the overall framework (Focusing on Ecology).
          </p>
        </Block>
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
        tint="orange"
        icon="✋"
        title="The Human Mark (THM)"
        actions={
          <>
            <a href="https://gyrogovernance.com/#thm" target="_blank" rel="noopener noreferrer" className="btn-outline text-sm">
              More info ↗
            </a>
            <a href="https://github.com/gyrogovernance/tools" target="_blank" rel="noopener noreferrer" className="btn-outline text-sm">
              GitHub Repo ↗
            </a>
            <a
              href="https://notebooklm.google.com/notebook/34e2d367-101a-4457-83fc-9c1049d29e32?authuser=1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-sm"
            >
              Interactive NotebookLM ↗
            </a>
          </>
        }
      >
        <Block>
          <p className="text-center text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">
            Epistemic Taxonomy for Jailbreaks, Deceptive Alignment, and Existential Risk
          </p>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
            The Human Mark (THM) is a risk management taxonomy for AI safety evaluation that is designed to prevent harms from AI power concentration by distinguishing knowledge capacity as a matter of constitutive dependence on Direct Authority and Agency preserved through ancestry. Authority and Agency denote types of capacity, not identifications of entities or parties.
          </p>
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            Grounded in epistemology and evidence law&apos;s categorical distinction separating direct testimony and hearsay, THM classifies all AI safety risks as four capacities and their corresponding displacements arising between Direct and Indirect forms of Authority and Agency with applications that include jailbreak testing, deceptive alignment detection, control evaluations, and mechanistic interpretability.
          </p>
        </Block>

        <div className="grid md:grid-cols-2 gap-4">
          <Block>
            <h3 className="font-bold text-lg mb-3 text-center">🎯 Risks</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 list-disc list-inside">
              <li><strong className="text-gray-900 dark:text-white">Governance Traceability Displacement</strong></li>
              <li><strong className="text-gray-900 dark:text-white">Information Variety Displacement</strong></li>
              <li><strong className="text-gray-900 dark:text-white">Inference Accountability Displacement</strong></li>
              <li><strong className="text-gray-900 dark:text-white">Intelligence Integrity Displacement</strong></li>
            </ul>
          </Block>
          <Block>
            <h3 className="font-bold text-lg mb-3 text-center">🔬 Applications</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 list-disc list-inside">
              <li><strong className="text-gray-900 dark:text-white">Jailbreak testing</strong></li>
              <li><strong className="text-gray-900 dark:text-white">Deceptive alignment detection</strong></li>
              <li><strong className="text-gray-900 dark:text-white">Control evaluations</strong></li>
              <li><strong className="text-gray-900 dark:text-white">Mechanistic interpretability</strong></li>
              <li><strong className="text-gray-900 dark:text-white">Regulatory compliance</strong></li>
            </ul>
          </Block>
        </div>
      </Section>
    </Page>
  );
}
