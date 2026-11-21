import { motion } from 'motion/react';

export interface TabOption<T extends string> {
  id: T;
  label: string;
  count?: number;
}

interface AnimatedTabsProps<T extends string> {
  tabs: readonly TabOption<T>[];
  activeId: T;
  onChange: (id: T) => void;
  layoutId: string;
  ariaLabel: string;
  className?: string;
}

export function AnimatedTabs<T extends string>({
  tabs,
  activeId,
  onChange,
  layoutId,
  ariaLabel,
  className = '',
}: AnimatedTabsProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`inline-flex max-w-full flex-nowrap items-center gap-1 overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-100/80 p-1 dark:border-zinc-800 dark:bg-zinc-900/80 ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`relative flex min-h-[36px] items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] sm:gap-2 sm:px-3.5 sm:text-sm ${
              isActive
                ? 'text-zinc-950 dark:text-zinc-50'
                : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                className="absolute inset-0 rounded-lg bg-white shadow-xs dark:bg-zinc-800"
              />
            )}
            <span className="relative z-10">{tab.label}</span>
            {typeof tab.count === 'number' && (
              <span className="relative z-10 font-mono text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
