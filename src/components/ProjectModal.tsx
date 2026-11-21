import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import type { ProjectItem } from '../data/portfolioData';
import { ProjectGraphic } from './ui/ProjectGraphic';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export function ProjectModal({ project, onClose, onNavigate }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight') {
        onNavigate('next');
      } else if (event.key === 'ArrowLeft') {
        onNavigate('prev');
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/70 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-[#0D0D10]"
          >
            {/* Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-zinc-200 bg-white/95 px-6 py-4 backdrop-blur-md dark:border-zinc-800 dark:bg-[#0D0D10]/95">
              <div className="min-w-0">
                <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                  {project.categoryLabel} · {project.statusLabel}
                </p>
                <h2
                  id="project-modal-title"
                  className="truncate font-display text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl dark:text-zinc-50"
                >
                  {project.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Body */}
            <div className="space-y-8 p-6">
              <ProjectGraphic type={project.previewType} />

              <div>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Role · {project.role}
                </p>
                <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {project.overview}
                </p>
              </div>

              {/* Three Primary Use Cases */}
              <div>
                <h3 className="font-display text-lg font-semibold text-zinc-950 dark:text-zinc-100">
                  Primary Use Cases
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
                  {project.useCases.map((uc, index) => (
                    <div
                      key={uc.title}
                      className="border-t border-zinc-200 pt-3.5 dark:border-zinc-800"
                    >
                      <p className="font-mono text-xs tabular-nums text-[#2563EB] dark:text-[#60A5FA]">
                        0{index + 1}
                      </p>
                      <h4 className="mt-1 font-display text-sm font-semibold text-zinc-950 dark:text-zinc-100">
                        {uc.title}
                      </h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {uc.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Stack & Verification Note */}
              <div className="space-y-4 border-t border-zinc-200 pt-5 dark:border-zinc-800">
                <div>
                  <h3 className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Known Stack & Architecture
                  </h3>
                  <p className="mt-1.5 font-mono text-xs leading-relaxed text-zinc-800 dark:text-zinc-200">
                    {project.stack.join(' · ')}
                  </p>
                </div>

                {project.note && (
                  <p className="rounded-xl border border-zinc-200 bg-zinc-50 p-3.5 text-xs leading-relaxed text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                      Accuracy note:{' '}
                    </span>
                    {project.note}
                  </p>
                )}
              </div>

              {/* Links & Project Navigation */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200 pt-5 dark:border-zinc-800">
                <div className="flex flex-wrap items-center gap-3">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl bg-[#2563EB] px-4 py-2 text-sm font-medium text-white whitespace-nowrap transition-colors hover:bg-[#1D4ED8]"
                    >
                      <span>Open Product Site</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-800 whitespace-nowrap transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                    >
                      <span>View Repository</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigate('prev')}
                    aria-label="Previous project"
                    className="inline-flex h-10 items-center gap-1 rounded-lg border border-zinc-200 px-3 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Prev</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('next')}
                    aria-label="Next project"
                    className="inline-flex h-10 items-center gap-1 rounded-lg border border-zinc-200 px-3 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  >
                    <span>Next</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
