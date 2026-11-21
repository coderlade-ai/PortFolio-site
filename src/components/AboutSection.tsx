import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PROFILE } from '../data/portfolioData';
import { AnimatedTabs } from './ui/AnimatedTabs';
import { BlurFade } from './ui/BlurFade';
import { SpotlightCard } from './ui/SpotlightCard';

type AboutTab = 'story' | 'vision' | 'values';

const ABOUT_TABS = [
  { id: 'story' as const, label: 'Story & Education' },
  { id: 'vision' as const, label: 'Vision & LadeStack' },
  { id: 'values' as const, label: 'Core Values' },
];

export function AboutSection() {
  const [activeTab, setActiveTab] = useState<AboutTab>('story');

  return (
    <section
      id="about"
      className="border-y border-zinc-200/80 bg-white/50 py-20 sm:py-24 dark:border-zinc-800/80 dark:bg-[#08080A]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left editorial bio column */}
          <BlurFade className="lg:col-span-5">
            <p className="text-sm font-medium text-[#2563EB] dark:text-[#60A5FA]">
              02. About
            </p>
            <h2
              className="mt-2 font-display text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50"
              style={{ textWrap: 'balance' }}
            >
              {PROFILE.secondaryHeadline}
            </h2>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-600 sm:text-[15px] dark:text-zinc-400">
              {PROFILE.extendedBio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 border-t border-zinc-200 pt-6 dark:border-zinc-800">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Qualitative Highlights
              </p>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {PROFILE.qualitativeHighlights.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span aria-hidden="true" className="text-zinc-400 dark:text-zinc-600">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </BlurFade>

          {/* Right interactive tabbed dossier */}
          <BlurFade delay={0.08} className="lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <AnimatedTabs
                tabs={ABOUT_TABS}
                activeId={activeTab}
                onChange={setActiveTab}
                layoutId="about-section-tab"
                ariaLabel="Explore background, vision, and values"
              />
            </div>

            <div className="mt-6">
              <AnimatePresence mode="wait">
                {activeTab === 'story' && (
                  <motion.div
                    key="story"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {PROFILE.storyChapters.map((chapter) => (
                        <SpotlightCard key={chapter.index} className="p-5">
                          <p className="font-mono text-xs tabular-nums text-[#2563EB] dark:text-[#60A5FA]">
                            {chapter.index}
                          </p>
                          <h3 className="mt-2 font-display text-base font-semibold text-zinc-950 dark:text-zinc-100">
                            {chapter.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {chapter.body}
                          </p>
                        </SpotlightCard>
                      ))}
                    </div>

                    <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-[#0D0D10]">
                      <h3 className="font-display text-lg font-semibold text-zinc-950 dark:text-zinc-100">
                        Education & Learning Path
                      </h3>
                      <div className="mt-4 divide-y divide-zinc-200 dark:divide-zinc-800">
                        {PROFILE.education.map((edu) => (
                          <div
                            key={`${edu.stage}-${edu.institution}`}
                            className="py-3.5 first:pt-0 last:pb-0"
                          >
                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                              <p className="font-display text-sm font-semibold text-zinc-950 dark:text-zinc-100">
                                {edu.institution}
                              </p>
                              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                {edu.stage}
                              </span>
                            </div>
                            <p className="mt-0.5 text-sm text-zinc-700 dark:text-zinc-300">
                              {edu.field}
                            </p>
                            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                              {edu.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'vision' && (
                  <motion.div
                    key="vision"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <SpotlightCard className="p-6">
                        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          Personal Vision
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
                          {PROFILE.visionMission.personalVision}
                        </p>
                      </SpotlightCard>
                      <SpotlightCard className="p-6">
                        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          Personal Mission
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
                          {PROFILE.visionMission.personalMission}
                        </p>
                      </SpotlightCard>
                      <SpotlightCard className="p-6">
                        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          LadeStack Vision
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
                          {PROFILE.visionMission.ladeStackVision}
                        </p>
                      </SpotlightCard>
                      <SpotlightCard className="p-6">
                        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          LadeStack Mission
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
                          {PROFILE.visionMission.ladeStackMission}
                        </p>
                      </SpotlightCard>
                    </div>

                    <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-[#0D0D10]">
                      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        Main Brand Site Multilingual Scope · Astro Content Strategy
                      </p>
                      <p className="mt-2 font-mono text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                        {PROFILE.visionMission.languages.join(' · ')}
                      </p>
                      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                        Defined localization scope for ladestack.in; individual standalone utilities
                        vary by product roadmap.
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'values' && (
                  <motion.div
                    key="values"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                  >
                    {PROFILE.coreValues.map((value) => (
                      <SpotlightCard key={value.index} className="p-5">
                        <p className="font-mono text-xs tabular-nums text-[#2563EB] dark:text-[#60A5FA]">
                          {value.index}
                        </p>
                        <h3 className="mt-2 font-display text-base font-semibold text-zinc-950 dark:text-zinc-100">
                          {value.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                          {value.description}
                        </p>
                      </SpotlightCard>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
