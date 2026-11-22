import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Share2, X } from 'lucide-react';
import type { ProjectItem } from '../data/portfolioData';
import {
  buildProjectSharePayload,
  calculateProjectReadingTime,
} from '../utils/portfolioLogic';
import { ProjectGraphic } from './ui/ProjectGraphic';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

type ShareFeedback = 'idle' | 'shared' | 'copied' | 'unavailable';

export function ProjectModal({ project, onClose, onNavigate }: ProjectModalProps) {
  const [shareFeedback, setShareFeedback] = useState<ShareFeedback>('idle');

  const readingTime = useMemo(
    () => (project ? calculateProjectReadingTime(project) : null),
    [project]
  );

  useEffect(() => {
    setShareFeedback('idle');
  }, [project?.id]);

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

  const handleShare = async () => {
    if (!project) return;

    const fallbackUrl =
      typeof window !== 'undefined' ? window.location.href : 'https://ladestack.in/';
    const payload = buildProjectSharePayload(project, fallbackUrl);

    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share(payload);
        setShareFeedback('shared');
        window.setTimeout(() => setShareFeedback('idle'), 2400);
        return;
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
      }
    }

    if (
      typeof navigator !== 'undefined' &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === 'function'
    ) {
      try {
        await navigator.clipboard.writeText(`${payload.title} — ${payload.url}`);
        setShareFeedback('copied');
        window.setTimeout(() => setShareFeedback('idle'), 2400);
        return;
      } catch {
        // Fall through to unavailable feedback
      }
    }

    setShareFeedback('unavailable');
    window.setTimeout(() => setShareFeedback('idle'), 2400);
  };

  const shareLabel =
    shareFeedback === 'shared'
      ? 'Shared'
      : shareFeedback === 'copied'
        ? 'Link copied'
        : shareFeedback === 'unavailable'
          ? 'Share unavailable'
          : 'Share';

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
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#05070D]/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-200/90 bg-[#FCFDFE] shadow-[0_32px_80px_-20px_rgba(15,23,42,0.35)] dark:border-slate-800/90 dark:bg-[#0A0C12] dark:shadow-[0_32px_90px_-20px_rgba(0,0,0,0.85)]"
          >
            {/* Subtle top sapphire ambient veil */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#1D4ED8]/[0.07] via-[#1D4ED8]/[0.02] to-transparent dark:from-[#3B82F6]/[0.14] dark:via-[#1E3A8A]/[0.04] dark:to-transparent"
            />

            {/* Header */}
            <div className="sticky top-0 z-20 flex items-start justify-between gap-4 border-b border-slate-200/90 bg-[#FCFDFE]/92 px-6 py-5 backdrop-blur-md dark:border-slate-800/90 dark:bg-[#0A0C12]/92">
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs font-medium text-slate-600 dark:text-slate-400">
                  <span className="text-[#1D4ED8] dark:text-[#93C5FD]">
                    {project.categoryLabel}
                  </span>
                  <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">
                    ·
                  </span>
                  <span>{project.statusLabel}</span>
                  {readingTime && (
                    <>
                      <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">
                        ·
                      </span>
                      <span
                        data-testid="modal-reading-time"
                        className="font-mono tabular-nums text-[#92610A] dark:text-[#E5C07B]"
                      >
                        {readingTime.label} ({readingTime.wordCount} words)
                      </span>
                    </>
                  )}
                </p>

                <h2
                  id="project-modal-title"
                  className="mt-1.5 truncate font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-[28px] dark:text-slate-50"
                >
                  {project.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:border-slate-800 dark:bg-[#111521] dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-50"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Body */}
            <div className="relative space-y-8 p-6 sm:p-7">
              <ProjectGraphic type={project.previewType} />

              {/* Editorial Lead & Overview */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">Role</span>
                    <span aria-hidden="true" className="mx-1.5 text-slate-300 dark:text-slate-700">
                      /
                    </span>
                    <span>{project.role}</span>
                  </span>
                  {readingTime && (
                    <span className="font-mono tabular-nums text-[#92610A] dark:text-[#E5C07B]">
                      Estimated reading time: {readingTime.label}
                    </span>
                  )}
                </div>

                <p className="font-display text-lg font-medium leading-snug tracking-tight text-slate-950 sm:text-xl dark:text-slate-100">
                  {project.tagline}
                </p>

                <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
                  {project.overview}
                </p>
              </div>

              {/* Three Primary Use Cases */}
              <div className="border-t border-slate-200/90 pt-6 dark:border-slate-800/90">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-slate-950 dark:text-slate-50">
                    Primary Use Cases
                  </h3>
                  <span className="font-mono text-xs tabular-nums text-slate-500 dark:text-slate-400">
                    01 — 03
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {project.useCases.map((uc, index) => (
                    <div
                      key={uc.title}
                      className="border-t border-slate-200/90 pt-4 dark:border-slate-800/90"
                    >
                      <p className="font-mono text-xs font-medium tabular-nums text-[#92610A] dark:text-[#E5C07B]">
                        0{index + 1}
                      </p>
                      <h4 className="mt-1.5 font-display text-[15px] font-semibold leading-snug text-slate-950 dark:text-slate-100">
                        {uc.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {uc.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Stack & Verification Note */}
              <div className="space-y-4 border-t border-slate-200/90 pt-6 dark:border-slate-800/90">
                <div>
                  <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Known Stack & Architecture
                  </h3>
                  <p className="mt-2 font-mono text-xs leading-relaxed text-slate-900 dark:text-slate-200">
                    {project.stack.join(' · ')}
                  </p>
                </div>

                {project.note && (
                  <p className="rounded-xl border border-amber-200/80 bg-amber-50/70 p-4 text-xs leading-relaxed text-slate-700 dark:border-amber-500/20 dark:bg-[#16130C] dark:text-slate-300">
                    <span className="font-semibold text-[#92610A] dark:text-[#E5C07B]">
                      Verification & scope note:{' '}
                    </span>
                    {project.note}
                  </p>
                )}
              </div>

              {/* Links, Share Action & Project Navigation */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/90 pt-6 dark:border-slate-800/90">
                <div className="flex flex-wrap items-center gap-3">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl bg-[#1D4ED8] px-4 py-2 text-sm font-medium text-white whitespace-nowrap shrink-0 shadow-xs transition-colors hover:bg-[#1E40AF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:bg-[#2563EB] dark:hover:bg-[#3B82F6]"
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
                      className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 whitespace-nowrap shrink-0 transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:border-slate-800 dark:bg-[#111521] dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-800"
                    >
                      <span>View Repository</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={handleShare}
                    aria-label={`Share ${project.name}`}
                    className={`inline-flex min-h-[42px] items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                      shareFeedback === 'shared' || shareFeedback === 'copied'
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-950/50 dark:text-emerald-300'
                        : 'border-[#C9A24D]/45 bg-[#FEFBF3] text-[#7C5208] hover:border-[#C9A24D]/80 hover:bg-[#FDF4DE] dark:border-[#E5C07B]/30 dark:bg-[#17130B] dark:text-[#E5C07B] dark:hover:border-[#E5C07B]/55 dark:hover:bg-[#1F1A0F]'
                    }`}
                  >
                    {shareFeedback === 'shared' || shareFeedback === 'copied' ? (
                      <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                    ) : (
                      <Share2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                    )}
                    <span>{shareLabel}</span>
                  </motion.button>
                  <span className="sr-only" role="status" aria-live="polite">
                    {shareFeedback === 'shared'
                      ? `${project.name} shared successfully.`
                      : shareFeedback === 'copied'
                        ? `${project.name} link copied to clipboard.`
                        : shareFeedback === 'unavailable'
                          ? 'Sharing is unavailable in this browser.'
                          : ''}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigate('prev')}
                    aria-label="Previous project"
                    className="inline-flex h-10 items-center gap-1 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-700 whitespace-nowrap transition-colors hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Prev</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('next')}
                    aria-label="Next project"
                    className="inline-flex h-10 items-center gap-1 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-700 whitespace-nowrap transition-colors hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
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
