import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import {
  EXPLORATIONS,
  PROJECTS,
  type ProjectCategory,
  type ProjectItem,
} from '../data/portfolioData';
import { countProjectsByCategory, filterProjects } from '../utils/portfolioLogic';
import { AnimatedTabs } from './ui/AnimatedTabs';
import { BlurFade } from './ui/BlurFade';
import { SpotlightCard } from './ui/SpotlightCard';
import { ProjectGraphic } from './ui/ProjectGraphic';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const counts = useMemo(() => countProjectsByCategory(PROJECTS), []);

  const categoryTabs = useMemo(
    () => [
      { id: 'all' as const, label: 'All Projects', count: counts.all },
      { id: 'developer-tools' as const, label: 'Developer Tools', count: counts['developer-tools'] },
      { id: 'documents-media' as const, label: 'Documents & Media', count: counts['documents-media'] },
      { id: 'utilities-games' as const, label: 'Utilities & Games', count: counts['utilities-games'] },
      { id: 'explorations' as const, label: 'Provisional', count: counts.explorations },
    ],
    [counts]
  );

  const visibleProjects = useMemo(
    () => filterProjects(PROJECTS, activeCategory, searchQuery),
    [activeCategory, searchQuery]
  );

  const hasFilters = activeCategory !== 'all' || searchQuery.trim().length > 0;

  return (
    <section id="work" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <BlurFade>
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#2563EB] dark:text-[#60A5FA]">
              01. Selected Work
            </p>
            <h2
              className="mt-2 font-display text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50"
              style={{ textWrap: 'balance' }}
            >
              Featured products and browser-first tools.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              From a Monaco-based browser IDE to local-first PDF and Markdown utilities, each
              project targets a specific workflow with clear interfaces and documented boundaries.
            </p>
          </div>
        </BlurFade>

        {/* Filter bar & Search */}
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <AnimatedTabs
            tabs={categoryTabs}
            activeId={activeCategory}
            onChange={setActiveCategory}
            layoutId="projects-category-tab"
            ariaLabel="Filter projects by category"
          />

          <div className="relative w-full lg:w-72">
            <label htmlFor="project-search" className="sr-only">
              Search projects by name or technology
            </label>
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-400"
              aria-hidden="true"
            />
            <input
              id="project-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name or stack..."
              className="h-11 w-full rounded-xl border border-zinc-200 bg-white pr-9 pl-10 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 dark:border-zinc-800 dark:bg-[#0D0D10] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-[#3B82F6]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear project search"
                className="absolute top-1/2 right-2.5 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="mt-8" data-testid="projects-grid">
          {visibleProjects.length === 0 ? (
            <div className="rounded-2xl border border-zinc-200 bg-white p-10 text-center dark:border-zinc-800 dark:bg-[#0D0D10]">
              <p className="font-display text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                No projects match your current filter.
              </p>
              <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                Try another technology keyword or switch back to all categories.
              </p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                  className="mt-5 inline-flex min-h-[40px] items-center rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1D4ED8]"
                >
                  Reset filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
              <AnimatePresence mode="popLayout">
                {visibleProjects.map((project) => {
                  const isAllUnfiltered =
                    activeCategory === 'all' && !searchQuery.trim();
                  const isWide =
                    isAllUnfiltered && project.featuredSpan === 'wide';
                  const isFullWidthProvisional =
                    isAllUnfiltered && Boolean(project.isProvisional);

                  const spanClass = isFullWidthProvisional
                    ? 'md:col-span-2 lg:col-span-6'
                    : isWide
                      ? 'md:col-span-2 lg:col-span-3'
                      : 'lg:col-span-2';

                  return (
                    <motion.article
                      layout
                      key={project.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                      className={spanClass}
                    >
                      <SpotlightCard className="flex h-full flex-col p-5">
                        <div
                          className={
                            isFullWidthProvisional
                              ? 'grid h-full grid-cols-1 items-center gap-6 lg:grid-cols-12'
                              : 'flex h-full flex-col justify-between gap-5'
                          }
                        >
                          <div className={isFullWidthProvisional ? 'lg:col-span-5' : ''}>
                            <ProjectGraphic
                              type={project.previewType}
                              compact={!isWide}
                            />
                          </div>

                          <div
                            className={
                              isFullWidthProvisional
                                ? 'flex h-full flex-col justify-between gap-4 lg:col-span-7'
                                : 'flex flex-1 flex-col justify-between gap-5'
                            }
                          >
                            <div>
                              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                <span>{project.categoryLabel}</span>
                              </p>

                              <div className="mt-1.5 flex items-baseline justify-between gap-2">
                                <h3 className="font-display text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                                  {project.name}
                                </h3>
                                {project.isProvisional && (
                                  <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                                    Provisional · Verification Pending
                                  </span>
                                )}
                              </div>

                              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                {isFullWidthProvisional ? project.overview : project.tagline}
                              </p>
                            </div>

                            <div className="space-y-4 border-t border-zinc-200/80 pt-4 dark:border-zinc-800/80">
                              <p className="truncate font-mono text-xs text-zinc-500 dark:text-zinc-400">
                                {project.stack.slice(0, 4).join(' · ')}
                              </p>

                              <div className="flex items-center justify-between gap-3">
                                <button
                                  type="button"
                                  onClick={() => onSelectProject(project)}
                                  className="inline-flex min-h-[38px] items-center gap-1.5 text-sm font-medium text-[#2563EB] whitespace-nowrap transition-colors hover:text-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:text-[#60A5FA] dark:hover:text-[#93C5FD]"
                                >
                                  <span>View {project.name} details</span>
                                </button>

                                {project.url && (
                                  <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Open ${project.name} website`}
                                    className="inline-flex min-h-[38px] items-center gap-1 text-xs font-medium text-zinc-600 whitespace-nowrap transition-colors hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:text-zinc-400 dark:hover:text-zinc-100"
                                  >
                                    <span>Visit</span>
                                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </SpotlightCard>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Selected Explorations & Prototypes (Section 8 — clearly distinguished from deployed products) */}
        <BlurFade className="mt-20">
          <div className="border-t border-zinc-200/80 pt-14 dark:border-zinc-800/80">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Concepts · Prototypes · Ongoing Experiments
              </p>
              <h3 className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                In development and product explorations.
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                These initiatives represent active engineering concepts, architectural prototypes,
                and repositories in progress — kept distinct from published tools.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {EXPLORATIONS.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white/70 p-5 dark:border-zinc-800/80 dark:bg-[#0B0B0E]"
                >
                  <div>
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      {item.status}
                    </p>
                    <h4 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">
                      {item.name}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {item.summary}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-zinc-200/80 pt-3.5 dark:border-zinc-800/80">
                    <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      {item.focusAreas.join(' · ')}
                    </p>
                    {item.links && item.links.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-4">
                        {item.links.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-medium text-[#2563EB] hover:text-[#1D4ED8] dark:text-[#60A5FA]"
                          >
                            <span>{link.label}</span>
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
