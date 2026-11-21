import { PROFILE } from '../data/portfolioData';

export function Footer() {
  return (
    <footer className="border-t border-zinc-200/80 bg-[#FAFAFA] py-12 dark:border-zinc-800/80 dark:bg-[#050505]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-lg">
            <p className="font-display text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              {PROFILE.fullName}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {PROFILE.closingQuote}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <a
              href={PROFILE.brandUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-zinc-950 dark:hover:text-zinc-100"
            >
              LadeStack
            </a>
            <a
              href="https://github.com/girishlade111"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-zinc-950 dark:hover:text-zinc-100"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/girish-lade/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-zinc-950 dark:hover:text-zinc-100"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${PROFILE.contactEmail}`}
              className="transition-colors hover:text-zinc-950 dark:hover:text-zinc-100"
            >
              {PROFILE.contactEmail}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200/80 pt-6 text-xs text-zinc-500 dark:border-zinc-800/80 dark:text-zinc-500">
          <p>
            © {new Date().getFullYear()} {PROFILE.fullName}. Independent founder of LadeStack.
          </p>
          <p>{PROFILE.location}</p>
        </div>
      </div>
    </footer>
  );
}
