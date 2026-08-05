import { startTransition, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Page, PageHero, Section, Block } from '../components/Section';
import {
  AIR_CRAFT_DOMAIN_ORDER,
  BUILD_AIR_CRAFT_PROJECTS,
  fetchAirCraftProjects,
  filterAirCraftProjects,
  groupAirCraftProjects,
  type AirCraftProject,
} from '../lib/airCraft';

type DomainFilter = 'All' | string;

function domainFilters(projects: AirCraftProject[]): DomainFilter[] {
  const present = new Set(projects.map((p) => p.domain));
  const known = AIR_CRAFT_DOMAIN_ORDER.filter((d) => present.has(d));
  const extras = [...present]
    .filter((d) => !(AIR_CRAFT_DOMAIN_ORDER as readonly string[]).includes(d))
    .sort((a, b) => a.localeCompare(b));
  return ['All', ...known, ...extras];
}

function countInDomain(projects: AirCraftProject[], domain: DomainFilter): number {
  if (domain === 'All') return projects.length;
  return projects.filter((p) => p.domain === domain).length;
}

/** Craft page draft [/craft] (formerly /index) */
export default function Craft() {
  // Build snapshot first (SEO / no-JS crawlers that execute the bundle); live fetch may refresh.
  const [projects, setProjects] = useState<AirCraftProject[]>(BUILD_AIR_CRAFT_PROJECTS);
  const [domain, setDomain] = useState<DomainFilter>('All');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    fetchAirCraftProjects(controller.signal)
      .then((live) => {
        setProjects(live);
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        console.error(error);
        setProjects(BUILD_AIR_CRAFT_PROJECTS);
      });

    return () => controller.abort();
  }, []);

  const searched = filterAirCraftProjects(projects, query);
  const visible =
    domain === 'All' ? searched : searched.filter((p) => p.domain === domain);
  const groups = groupAirCraftProjects(visible);
  const filters = domainFilters(projects);

  return (
    <Page>
      <PageHero
        icon="🛩️"
        title="AIR-Craft"
        subtitle="AI-Empowered Skilled work in Community Safety and Good Governance with reports, datasets and tools by our Fellows and Lab."
        tint="blue"
      />

      <Section tint="blue" icon="🗂️" title="Projects">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by route">
          {filters.map((name) => {
            const active = domain === name;
            const count = countInDomain(projects, name);
            return (
              <button
                key={name}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => startTransition(() => setDomain(name))}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${
                  active
                    ? 'bg-blue-600 text-white dark:bg-blue-500'
                    : 'bg-blue-500/10 text-blue-800 hover:bg-blue-500/20 dark:text-blue-200'
                }`}
              >
                {name}
                <span className={`ml-1.5 tabular-nums ${active ? 'opacity-80' : 'opacity-60'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <label className="block">
          <span className="sr-only">Search projects</span>
          <input
            type="search"
            value={query}
            onChange={(e) => startTransition(() => setQuery(e.target.value))}
            placeholder="Search title or description…"
            className="w-full rounded-xl border border-blue-400/30 bg-white/50 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-500 outline-none focus:border-blue-500/60 dark:bg-black/20 dark:text-gray-100 dark:placeholder:text-gray-400"
          />
        </label>

        <p className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
          {visible.length} of {projects.length}
        </p>

        {groups.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
            No projects match this filter.
          </p>
        ) : (
          <div className="space-y-6">
            {groups.map((group) => (
              <section key={group.domain} aria-labelledby={`craft-${group.domain}`}>
                <h3
                  id={`craft-${group.domain}`}
                  className="mb-2 flex items-center gap-2 border-b border-blue-400/25 pb-1.5 text-sm font-extrabold uppercase tracking-[1px] text-blue-800 dark:text-blue-300"
                >
                  {group.domain}
                  <span className="font-semibold tabular-nums opacity-60">
                    {group.projects.length}
                  </span>
                </h3>

                <ul className="divide-y divide-blue-400/15">
                  {group.projects.map((project) => (
                    <li key={`${project.domain}-${project.title}`}>
                      <a
                        href={project.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-3 py-2.5 transition-colors hover:bg-blue-500/5 -mx-1 px-1 rounded-lg"
                      >
                        <span className="mt-0.5 text-lg leading-none shrink-0" aria-hidden="true">
                          {project.emoji}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-start gap-2">
                            <span className="min-w-0 flex-1 font-bold leading-snug text-gray-900 dark:text-gray-50 group-hover:text-blue-800 dark:group-hover:text-blue-300">
                              {project.title}
                            </span>
                            <span className="shrink-0 pt-0.5 text-xs font-bold text-blue-700 dark:text-blue-400">
                              <span className="hidden sm:inline">{project.linkText} </span>↗
                            </span>
                          </span>
                          <span className="mt-0.5 block text-sm leading-snug text-gray-600 dark:text-gray-300 line-clamp-2">
                            {project.description}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
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
          <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
            <li>Join the Fellowship</li>
            <li>
              Complete a{' '}
              <Link
                to="/protocols#workflow-air-craft-submission"
                className="font-semibold text-blue-700 dark:text-blue-400"
              >
                AIR-Craft Submission
              </Link>
            </li>
            <li>Submit to AIR-Craft</li>
          </ol>
        </Block>
      </Section>
    </Page>
  );
}
