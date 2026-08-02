import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Page, PageHero, Section, Block } from '../components/Section';
import {
  FALLBACK_AIR_CRAFT_PROJECTS,
  fetchAirCraftProjects,
  type AirCraftProject,
} from '../lib/airCraft';

/** Craft page draft [/craft] (formerly /index) */
export default function Craft() {
  const [projects, setProjects] = useState<AirCraftProject[]>(FALLBACK_AIR_CRAFT_PROJECTS);

  useEffect(() => {
    const controller = new AbortController();

    fetchAirCraftProjects(controller.signal)
      .then((live) => {
        setProjects(live);
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        console.error(error);
        setProjects(FALLBACK_AIR_CRAFT_PROJECTS);
      });

    return () => controller.abort();
  }, []);

  return (
    <Page>
      <PageHero
        icon="🛩️"
        title="AIR-Craft"
        subtitle="Skilled work in AI safety and governance with datasets, reports, and tools by our Fellows and Lab."
        tint="emerald"
      />

      <Section tint="teal" icon="🗂️">
        <div className="space-y-4">
          {projects.map((project) => (
            <Block key={`${project.domain}-${project.title}`}>
              <div className="mb-3 flex items-center gap-2">
                <span className="text-xl" aria-hidden="true">
                  {project.emoji}
                </span>
                <span className="text-xs uppercase font-bold tracking-[1px] px-2.5 py-0.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                  {project.domain}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-1">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                {project.description}
              </p>
              <a
                href={project.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400"
              >
                {project.linkText} <span className="ml-1">↗</span>
              </a>
            </Block>
          ))}
        </div>
      </Section>

      <Section
        tint="cyan"
        icon="📤"
        title="Submit your Project"
        actions={
          <Link to="/craft/form" className="btn-primary">
            Join
          </Link>
        }
      >
        <Block>
          <p className="font-semibold mb-3 text-gray-800 dark:text-gray-100">Process:</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
            <li>Register and receive Orientation</li>
            <li>Work and Iterate through Self-Audit on your own terms</li>
            <li>Submit to AIR-Craft</li>
          </ol>
        </Block>
      </Section>
    </Page>
  );
}
