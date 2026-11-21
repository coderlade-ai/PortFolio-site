import { AnimatePresence, motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark';

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      whileTap={{ scale: 0.94 }}
      className="fixed right-5 bottom-5 z-40 flex h-11 items-center gap-2 rounded-full border border-zinc-200 bg-white/95 px-3.5 text-xs font-medium text-zinc-900 shadow-lg shadow-zinc-900/5 backdrop-blur-md transition-colors duration-200 hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:border-zinc-800 dark:bg-[#111115]/95 dark:text-zinc-100 dark:shadow-black/40 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
    >
      <span className="relative flex h-4 w-4 items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="sun"
              initial={{ rotate: -45, opacity: 0, scale: 0.7 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 45, opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-center text-amber-400"
            >
              <Sun className="h-4 w-4" aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ rotate: 45, opacity: 0, scale: 0.7 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -45, opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-center text-[#2563EB]"
            >
              <Moon className="h-4 w-4" aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span className="hidden whitespace-nowrap sm:inline">
        {isDark ? 'Light mode' : 'Dark mode'}
      </span>
    </motion.button>
  );
}
