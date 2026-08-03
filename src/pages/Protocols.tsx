import { Link } from 'react-router-dom';
import Accordion from '../components/Accordion';
import { Page, PageHero, Section, Block } from '../components/Section';
import Tabs from '../components/Tabs';
import {
  ExtLink,
  LinkList,
  PROTOCOLS,
  TOOLS,
} from '../lib/protocolsContent';

/** Protocols and usable Lab tools for Fellows [/protocols] */
export default function Protocols() {
  return (
    <Page>
      <PageHero
        icon="📃"
        title="Protocols"
        subtitle="Shared methods for alignment work, with tools and templates you can use."
        tint="cyan"
      >
        <Block className="text-left sm:text-center">
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-200">
            Protocols define how work stays aligned on Uniform Power Distribution. Tools by Gyro Governance Lab help
            you apply those protocols in practice. AIR-Craft lists the work people produce with them.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            Published alignment work is expected to include THM-consistent framing and a short THM self-audit.
          </p>
        </Block>
      </PageHero>

      <Section tint="blue" title="Foundations" icon="🧭">
        <p className="flex justify-center text-sm text-gray-600 dark:text-gray-300">
          Each protocol is a shared method for alignment work.
        </p>

        <div className="flex justify-center">
          <span
            className="inline-flex items-center px-3 py-1.5 text-center text-xs font-semibold tracking-wide rounded-lg border border-blue-400/35 bg-blue-500/10 text-blue-900 dark:text-blue-100"
            role="note"
          >
            Tip: tap a row to open or close it.
          </span>
        </div>

        <div className="space-y-3">
          {PROTOCOLS.map((protocol) => (
            <Accordion
              key={protocol.id}
              id={protocol.id}
              defaultOpen={protocol.defaultOpen}
              title={
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden="true">{protocol.icon}</span>
                  {protocol.title}
                </span>
              }
              subtitle={
                <span>
                  {protocol.subtitle}
                  <span className="mx-2 text-gray-400">·</span>
                  {protocol.routeFocus}
                </span>
              }
            >
              <Tabs
                label={`${protocol.title} sections`}
                items={[
                  {
                    id: 'what',
                    label: 'What it is',
                    content: <p>{protocol.whatItIs}</p>,
                  },
                  {
                    id: 'for',
                    label: 'What it is for',
                    content: <p>{protocol.whatItIsFor}</p>,
                  },
                  {
                    id: 'practice',
                    label: 'In practice',
                    content: <p>{protocol.inPractice}</p>,
                  },
                  {
                    id: 'tools',
                    label: 'Tools',
                    content: protocol.tools,
                  },
                  {
                    id: 'docs',
                    label: 'Docs',
                    content: <LinkList items={protocol.docs} />,
                  },
                ]}
              />
            </Accordion>
          ))}
        </div>
      </Section>

      <Section tint="orange" title="Tools by Gyro Governance Lab" icon="🛠️" hero={false}>
        <p className="flex justify-center text-sm text-gray-600 dark:text-gray-300">
          Tools and templates you can use in research, evaluation, and work.
        </p>

        <div className="space-y-3">
          {TOOLS.map((tool) => (
            <Accordion
              key={tool.id}
              id={tool.id}
              title={
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden="true">{tool.icon}</span>
                  {tool.title}
                </span>
              }
              subtitle={tool.subtitle}
            >
              <div className="space-y-3 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
                <ul className="list-disc space-y-1.5 pl-5">
                  {tool.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-800 dark:text-blue-300">
                  {tool.supports}
                </p>
                <ul className="flex flex-wrap gap-x-4 gap-y-2">
                  {tool.actions.map((action) => (
                    <li key={action.href}>
                      <ExtLink href={action.href}>{action.label}</ExtLink>
                    </li>
                  ))}
                </ul>
              </div>
            </Accordion>
          ))}
        </div>
      </Section>

      <Section
        tint="blue"
        icon="🚶‍♀️‍➡️"
        title="Next steps"
        actions={
          <>
            <Link to="/craft" className="btn-outline text-sm">
              Browse AIR-Craft
            </Link>
            <Link to="/superintelligence" className="btn-primary text-sm">
              Join Fellowship
            </Link>
          </>
        }
      >
        <Block>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
            Use protocols and Lab tools to help you kickstart your work, then list public artifacts on AIR-Craft.
          </p>
        </Block>
      </Section>
    </Page>
  );
}
