import type { ReactNode } from 'react';

const AIR_CRAFT_DOCS = 'https://github.com/gyrogovernance/air-craft/blob/main/docs';

export function docLink(path: string): string {
  return `${AIR_CRAFT_DOCS}/${path.replace(/^\//, '')}`;
}

export function ExtLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
    >
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}

export function LinkList({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item.href}>
          <ExtLink href={item.href}>{item.label}</ExtLink>
        </li>
      ))}
    </ul>
  );
}

export type ProtocolDef = {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  routeFocus: string;
  defaultOpen?: boolean;
  whatItIs: string;
  whatItIsFor: string;
  inPractice: string;
  tools: ReactNode;
  docs: { href: string; label: string }[];
};

export type ToolDef = {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  points: string[];
  supports: string;
  actions: { href: string; label: string }[];
};

export const PROTOCOLS: ProtocolDef[] = [
  {
    id: 'cgm',
    icon: '⚗️',
    title: 'Common Governance Model (CGM)',
    subtitle: 'Formal foundations for the four capacities',
    routeFocus: 'Focus: Economy',
    whatItIs:
      'A formal deductive foundation establishing the four capacities as conditions for intelligibility.',
    whatItIsFor:
      'Foundational consistency across governance claims and alignment reasoning, including vocabulary shared by THM, Gyroscope, and GGG.',
    inPractice:
      'In AIR-Craft work, CGM most often appears as vocabulary discipline and consistency checks, rather than as a separate deliverable. Fellows use it to keep Authority and Agency framed as capacities, not entity identities.',
    tools: (
      <p>
        CGM is primarily documentary and scientific. Use the science repository and CGM dataset when you need axioms,
        proofs, or structured Q&A material for research and evaluation.
      </p>
    ),
    docs: [
      {
        href: 'https://github.com/gyrogovernance/science/blob/main/docs/CommonGovernanceModel.md',
        label: 'Common Governance Model',
      },
      {
        href: 'https://github.com/gyrogovernance/science/blob/main/docs/CGM_Paper.md',
        label: 'CGM Paper',
      },
      {
        href: 'https://github.com/gyrogovernance/science/blob/main/docs/CGM_Logic.md',
        label: 'CGM Logic',
      },
      {
        href: 'https://github.com/gyrogovernance/science/tree/main/docs/datasets',
        label: 'CGM dataset',
      },
      {
        href: 'https://github.com/gyrogovernance/science',
        label: 'Science repository',
      },
    ],
  },
  {
    id: 'thm',
    icon: '✋',
    title: 'The Human Mark (THM)',
    subtitle: 'Displacement taxonomy and self-audit standard',
    routeFocus: 'Focus: Education',
    defaultOpen: true,
    whatItIs:
      'An epistemic taxonomy for classifying AI safety failures as displacement patterns across Authority and Agency.',
    whatItIsFor:
      'Consistent risk classification, self-audit, and communication across contributors, offices, and labs. Useful for jailbreak testing, deceptive alignment detection, control evaluations, mechanistic interpretability, and regulatory framing.',
    inPractice:
      'A submission typically states the Direct sources, the Indirect processing used, and the displacement risks considered (GTD, IVD, IAD, IID). Published alignment work is expected to include THM-consistent framing and a short THM self-audit.',
    tools: (
      <div className="space-y-3">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>AI Inspector for browser-based evaluation and THM-oriented review of AI outputs.</li>
          <li>GyroGem for orientation and technological literacy grounded in THM.</li>
          <li>GyroDiagnostics for structured evaluation and pathology detection.</li>
          <li>
            THM NotebookLM for interactive study of vocabulary and examples (audio/video overviews, quiz, Q&A). A
            practical on-ramp before writing a THM self-audit for Craft.
          </li>
        </ul>
        <p>
          <ExtLink href="https://notebooklm.google.com/notebook/34e2d367-101a-4457-83fc-9c1049d29e32?authuser=1">
            Open THM NotebookLM
          </ExtLink>
        </p>
      </div>
    ),
    docs: [
      { href: docLink('the_human_mark/THM_Brief.md'), label: 'THM Brief' },
      { href: docLink('the_human_mark/THM.md'), label: 'The Human Mark (canonical)' },
      { href: docLink('the_human_mark/THM_Terms.md'), label: 'THM Terms' },
      { href: docLink('the_human_mark/THM_Specs.md'), label: 'THM Specs' },
      { href: docLink('the_human_mark/THM_Grammar.md'), label: 'THM Grammar' },
      { href: docLink('the_human_mark/THM_Paper.md'), label: 'THM Paper' },
      { href: docLink('the_human_mark/THM_InTheWild.md'), label: 'THM In The Wild' },
      { href: docLink('the_human_mark/THM_Jailbreak.md'), label: 'THM Jailbreak guide' },
      { href: docLink('the_human_mark/THM_MechInterp.md'), label: 'THM Mechanistic Interpretability' },
      {
        href: 'https://github.com/gyrogovernance/tools',
        label: 'Behaviour Lab repository (gyrogovernance/tools)',
      },
    ],
  },
  {
    id: 'gyroscope',
    icon: '🔄',
    title: 'Gyroscope Protocol',
    subtitle: 'Coordination protocol for AI-assisted reasoning',
    routeFocus: 'Focus: Employment',
    whatItIs:
      'A structured reasoning and coordination protocol for alignment-aware chat and iterative work.',
    whatItIsFor:
      'Improving coherence, transparency, and stability of reasoning in AI-assisted workflows, without forcing conformity of content.',
    inPractice:
      'Often used during drafting, research planning, and review comments so collaboration stays synchronized. Fellows can paste Quick Start or chat-guide text into ordinary model chats.',
    tools: (
      <ul className="list-disc space-y-1.5 pl-5">
        <li>Gyroscope Quick Start for immediate protocol use.</li>
        <li>Chat guides and example conversation for shared practice.</li>
        <li>AI Inspector when you want structured review of outputs produced with the protocol.</li>
      </ul>
    ),
    docs: [
      { href: docLink('gyroscope/Gyroscope_Quick_Start.md'), label: 'Gyroscope Quick Start' },
      { href: docLink('gyroscope/Gyroscope_Protocol_Specs.md'), label: 'Gyroscope Protocol Specs' },
      { href: docLink('gyroscope/Gyroscope_Protocol_2_Specs.md'), label: 'Gyroscope Protocol 2 Specs' },
      { href: docLink('gyroscope/gyroscope_chat_guides.txt'), label: 'Gyroscope chat guides' },
      { href: docLink('gyroscope/example_conversation.md'), label: 'Example conversation' },
      {
        href: 'https://github.com/gyrogovernance/tools',
        label: 'Behaviour Lab repository (gyrogovernance/tools)',
      },
    ],
  },
  {
    id: 'ggg',
    icon: '🌐',
    title: 'Gyroscopic Global Governance (GGG)',
    subtitle: 'Unified Scope governance and simulation',
    routeFocus: 'Focus: Ecology',
    whatItIs:
      'A multi-domain governance framework and simulator for the Unified Scope across Economy, Employment, Education, and Ecology.',
    whatItIsFor:
      'Scenario testing and intervention design that connects domains instead of treating crises in isolation.',
    inPractice:
      'Used to frame AIR-Craft projects as interventions that connect across routes. Useful for labs and funders who need a shared scope story for portfolio and program design.',
    tools: (
      <div className="space-y-3">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>GGG Paper, Report, and Results for framework and simulation reading.</li>
          <li>Published simulator results article for an interactive multi-domain overview.</li>
        </ul>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          <li>
            <ExtLink href={docLink('post-agi-economy/GGG_Paper.md')}>GGG Paper</ExtLink>
          </li>
          <li>
            <ExtLink href={docLink('post-agi-economy/GGG_Report.md')}>GGG Report</ExtLink>
          </li>
          <li>
            <ExtLink href={docLink('post-agi-economy/GGG_Results.md')}>GGG Results</ExtLink>
          </li>
          <li>
            <ExtLink href="https://gyrogovernance.com/articles/ggg-simulator-results/">
              Simulator results article
            </ExtLink>
          </li>
        </ul>
      </div>
    ),
    docs: [
      { href: docLink('post-agi-economy/GGG_Paper.md'), label: 'GGG Paper' },
      { href: docLink('post-agi-economy/GGG_Report.md'), label: 'GGG Report' },
      { href: docLink('post-agi-economy/GGG_Results.md'), label: 'GGG Results' },
      {
        href: 'https://gyrogovernance.com/articles/ggg-simulator-results/',
        label: 'GGG simulator results article',
      },
      {
        href: 'https://github.com/gyrogovernance/tools',
        label: 'Behaviour Lab repository (gyrogovernance/tools)',
      },
    ],
  },
];

export const TOOLS: ToolDef[] = [
  {
    id: 'ai-inspector',
    icon: '🕵️',
    title: 'AI Inspector',
    subtitle: 'Browser extension for evaluation, interpretability, and governance',
    points: [
      'Evaluate AI outputs in Chrome where you already work',
      'Gadgets for rapid tests, policy auditing, sanitization, content enhancement, and THM meta-evaluation',
      'Local-first storage',
      'No API keys needed for ChatGPT, Claude, and Gemini',
    ],
    supports: 'Supports: THM, Gyroscope review workflows',
    actions: [
      {
        href: 'https://chromewebstore.google.com/detail/ai-inspector/hcblmheihnlngnogobgclhfahjljnbok?utm_source=item-share-cb',
        label: 'Add to Chrome',
      },
      {
        href: 'https://github.com/gyrogovernance/apps',
        label: 'Apps repository',
      },
    ],
  },
  {
    id: 'gyrogem',
    icon: '💎',
    title: 'GyroGem',
    subtitle: 'AI safety agent for technological literacy',
    points: [
      'Tailored assistant built on The Human Mark',
      'Explains AI risks and safer choices',
      'Builds technological literacy before and during AIR-Craft work',
    ],
    supports: 'Supports: THM orientation',
    actions: [
      {
        href: 'https://gemini.google.com/gem/1B-gQt-M3aKfsv9HDp_8gTQHG89bCfqlO?usp=sharing',
        label: 'Chat on Gemini',
      },
    ],
  },
  {
    id: 'gyrodiagnostics',
    icon: '🌟',
    title: 'GyroDiagnostics',
    subtitle: 'Physics-grounded evaluation and pathology detection',
    points: [
      'Evaluation suite for structure, behavior, and domain expertise',
      'Flags pathology signals such as hallucination, sycophancy, and semantic instability',
      'For labs and independent evaluators who need deeper checks than a single chat review',
    ],
    supports: 'Supports: THM evaluation practice',
    actions: [
      {
        href: 'https://github.com/gyrogovernance/diagnostics',
        label: 'Diagnostics repository',
      },
    ],
  },
  {
    id: 'gyroscope-guides',
    icon: '🔄',
    title: 'Gyroscope Quick Start and chat guides',
    subtitle: 'Paste-ready protocol text for ordinary model chats',
    points: [
      'Start with the Quick Start for immediate protocol use',
      'Use chat guides and the example conversation in your own drafting and review loops',
      'Works with common chat models without retraining',
    ],
    supports: 'Supports: Gyroscope Protocol',
    actions: [
      {
        href: docLink('gyroscope/Gyroscope_Quick_Start.md'),
        label: 'Quick Start',
      },
      {
        href: docLink('gyroscope/gyroscope_chat_guides.txt'),
        label: 'Chat guides',
      },
      {
        href: docLink('gyroscope/example_conversation.md'),
        label: 'Example conversation',
      },
    ],
  },
];
