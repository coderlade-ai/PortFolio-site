import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { AnimatedTabs } from './ui/AnimatedTabs';
import { BlurFade } from './ui/BlurFade';
import { SpotlightCard } from './ui/SpotlightCard';

export function CapabilitiesSection() {
  const [selectedDomainId, setSelectedDomainId] = useState(
    PROFILE.strengthDomains[0].id
  );
  const [openChallengeIdx, setOpenChallengeIdx] = useState<number | null>(0);

  const domainTabs = PROFILE.strengthDomains.map((d) => ({
    id: d.id,
    label: d.domain,
  }));

  const activeDomain =
    PROFILE.strengthDomains.find((d) => d.id === selectedDomainId) ??
    PROFILE.strengthDomains[0];

  return (
    <section id="capabilities" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <BlurFade>
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#2563EB] dark:text-[#60A5FA]">
              03. Capabilities & Engineering Practice
            </p>
            <h2
              className="mt-2 font-display text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50"
              style={{ textWrap: 'balance' }}
            >
              Design thinking meets hands-on engineering.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Technologies listed below distinguish working strengths demonstrated across shipped
              repositories from tools actively explored and evaluated — without arbitrary
              percentage bars.
            </p>
          </div>
        </BlurFade>

        {/* Demonstrated Working Strengths Interactive Switcher */}
        <div className="mt-10">
          <AnimatedTabs
            tabs={domainTabs}
            activeId={selectedDomainId}
            onChange={setSelectedDomainId}
            layoutId="capabilities-domain-tab"
            ariaLabel="Explore demonstrated capability domains"
          />

          <div className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDomain.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <SpotlightCard className="p-6 sm:p-8">
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        Project-Backed Domain
                      </p>
                      <h3 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                        {activeDomain.domain}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {activeDomain.summary}
                      </p>
                    </div>

                    <div className="space-y-6 border-t border-zinc-200 pt-6 lg:col-span-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8 dark:border-zinc-800">
                      <div>
                        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          Technologies & Methods
                        </p>
                        <p className="mt-2 font-mono text-sm leading-relaxed text-zinc-900 dark:text-zinc-100">
                          {activeDomain.technologies.join(' · ')}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          Typical Application
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                          {activeDomain.application}
                        </p>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Two-column editorial split: Approach Steps & Technical Challenges Accordion */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <BlurFade className="lg:col-span-6">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Workflow
            </p>
            <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              How I approach a project.
            </h3>

            <ol className="mt-6 divide-y divide-zinc-200 dark:divide-zinc-800">
              {PROFILE.approachSteps.map((step) => (
                <li key={step.index} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                  <span className="font-mono text-xs font-medium tabular-nums text-[#2563EB] pt-0.5 dark:text-[#60A5FA]">
                    {step.index}
                  </span>
                  <div>
                    <h4 className="font-display text-base font-semibold text-zinc-950 dark:text-zinc-100">
                      {step.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </BlurFade>

          <BlurFade delay={0.08} className="lg:col-span-6">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Engineering Themes
            </p>
            <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              Problems I enjoy solving.
            </h3>

            <div className="mt-6 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
              {PROFILE.technicalChallenges.map((challenge, idx) => {
                const isOpen = openChallengeIdx === idx;
                return (
                  <div key={challenge.title}>
                    <button
                      type="button"
                      onClick={() => setOpenChallengeIdx(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="flex min-h-[52px] w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-[#2563EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:hover:text-[#60A5FA]"
                    >
                      <span className="font-display text-base font-semibold text-zinc-950 dark:text-zinc-100">
                        {challenge.title}
                      </span>
                      <ChevronDown
                        aria-hidden="true"
                        className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {challenge.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Active Evaluation & Learning Landscape */}
            <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-[#0D0D10]">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Active Evaluation & Learning Landscape
              </p>
              <div className="mt-4 space-y-3">
                {PROFILE.learningLandscape.map((group) => (
                  <div key={group.category} className="text-xs leading-relaxed">
                    <span className="font-medium text-zinc-900 dark:text-zinc-200">
                      {group.category}:{' '}
                    </span>
                    <span className="font-mono text-zinc-500 dark:text-zinc-400">
                      {group.items.join(' · ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
