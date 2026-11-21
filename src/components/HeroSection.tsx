import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PROFILE, PROJECTS, type ProjectItem } from '../data/portfolioData';
import { BlurFade } from './ui/BlurFade';
import { SpotlightCard } from './ui/SpotlightCard';
import { ProjectGraphic } from './ui/ProjectGraphic';
import { AnimatedTabs } from './ui/AnimatedTabs';

const HERO_SPOTLIGHT_IDS = ['gb-coder', 'ls-pdf', 'md2pdf', 'ladestack'] as const;
type HeroSpotlightId = (typeof HERO_SPOTLIGHT_IDS)[number];

const HERO_TABS = [
  { id: 'gb-coder' as const, label: 'GB Coder' },
  { id: 'ls-pdf' as const, label: 'LS PDF' },
  { id: 'md2pdf' as const, label: 'MD2PDF' },
  { id: 'ladestack' as const, label: 'LadeStack' },
];

interface HeroSectionProps {
  onInspectProject: (project: ProjectItem) => void;
}

export function HeroSection({ onInspectProject }: HeroSectionProps) {
  const [activeId, setActiveId] = useState<HeroSpotlightId>('gb-coder');
  const activeProject =
    PROJECTS.find((p) => p.id === activeId) ?? PROJECTS[0];

  return (
    <section
      id="top"
      className="relative overflow-x-clip border-b border-zinc-200/80 pt-14 pb-16 sm:pt-20 sm:pb-20 dark:border-zinc-800/80"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(37,99,235,0.12),transparent)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(59,130,246,0.16),transparent)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left column: Typographic hero */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <BlurFade immediate delay={0} yOffset={10}>
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                <span>{PROFILE.fullName}</span>
                <span aria-hidden="true" className="mx-2 text-zinc-300 dark:text-zinc-700">
                  ·
                </span>
                <span>{PROFILE.location}</span>
              </p>
            </BlurFade>

            <BlurFade immediate delay={0.06} yOffset={12}>
              <h1
                className="mt-4 font-display font-bold tracking-tight text-zinc-950 dark:text-zinc-50"
                style={{
                  fontSize: 'clamp(2.35rem, 4.3vw, 3.75rem)',
                  lineHeight: 1.07,
                  textWrap: 'balance',
                }}
              >
                {PROFILE.heroHeadline}
              </h1>
            </BlurFade>

            <BlurFade immediate delay={0.12} yOffset={12}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-[17px] dark:text-zinc-400">
                {PROFILE.heroSubheading}
              </p>
            </BlurFade>

            <BlurFade immediate delay={0.18} yOffset={10}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#work"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#050505]"
                >
                  <span>Explore My Work</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <a
                  href="https://github.com/girishlade111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-800 whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:border-zinc-800 dark:bg-[#0D0D10] dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
                >
                  <span>View GitHub</span>
                  <ArrowUpRight className="h-4 w-4 text-zinc-400" aria-hidden="true" />
                </a>
              </div>
            </BlurFade>
          </div>

          {/* Right column: Interactive LadeStack Ecosystem Showcase */}
          <BlurFade immediate delay={0.14} yOffset={14} className="lg:col-span-6">
            <SpotlightCard className="h-full p-5 sm:p-6">
              <div className="flex h-full flex-col justify-between gap-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      LadeStack Ecosystem Preview
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500">
                      Select a product to inspect its architecture
                    </p>
                  </div>
                  <AnimatedTabs
                    tabs={HERO_TABS}
                    activeId={activeId}
                    onChange={setActiveId}
                    layoutId="hero-ecosystem-tab"
                    ariaLabel="Preview LadeStack products"
                  />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-1 flex-col justify-between gap-4"
                  >
                    <ProjectGraphic type={activeProject.previewType} />

                    <div className="space-y-3">
                      <div className="flex items-baseline justify-between gap-3">
                        <h2 className="font-display text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                          {activeProject.name}
                        </h2>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          {activeProject.statusLabel}
                        </span>
                      </div>

                      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {activeProject.tagline}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200/80 pt-3.5 dark:border-zinc-800/80">
                        <p className="truncate text-xs font-mono text-zinc-500 dark:text-zinc-400">
                          {activeProject.stack.slice(0, 3).join(' · ')}
                        </p>

                        <button
                          type="button"
                          onClick={() => onInspectProject(activeProject)}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2563EB] whitespace-nowrap shrink-0 transition-colors hover:text-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:text-[#60A5FA] dark:hover:text-[#93C5FD]"
                        >
                          <span>Inspect {activeProject.name}</span>
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </SpotlightCard>
          </BlurFade>
        </div>

        {/* Full-width foundation strip below split */}
        <BlurFade immediate delay={0.22} yOffset={10}>
          <div className="mt-12 grid grid-cols-1 gap-6 border-t border-zinc-200/80 pt-8 sm:grid-cols-2 lg:grid-cols-4 dark:border-zinc-800/80">
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Practice</p>
              <p className="mt-1 font-display text-base font-semibold text-zinc-950 dark:text-zinc-100">
                UI/UX & Full-Stack
              </p>
              <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                Design systems to TypeScript apps
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Independent Brand</p>
              <p className="mt-1 font-display text-base font-semibold text-zinc-950 dark:text-zinc-100">
                LadeStack Ecosystem
              </p>
              <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                Browser-first utilities & workflows
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Core Principle</p>
              <p className="mt-1 font-display text-base font-semibold text-zinc-950 dark:text-zinc-100">
                Privacy by Architecture
              </p>
              <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                Local processing where practical
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Engineering Roots</p>
              <p className="mt-1 font-display text-base font-semibold text-zinc-950 dark:text-zinc-100">
                Mechanical Engineering
              </p>
              <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                Systems mindset applied to software
              </p>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
