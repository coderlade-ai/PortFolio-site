interface MarqueeRibbonProps {
  items: readonly string[];
  className?: string;
}

export function MarqueeRibbon({ items, className = '' }: MarqueeRibbonProps) {
  const repeated = [...items, ...items];

  return (
    <div
      aria-hidden="true"
      className={`group relative overflow-hidden border-y border-zinc-200/90 bg-white/60 py-3.5 dark:border-zinc-800/80 dark:bg-[#0A0A0D]/70 ${className}`}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#FAFAFA] to-transparent dark:from-[#050505]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#FAFAFA] to-transparent dark:from-[#050505]" />

      <div className="animate-marquee flex w-max items-center gap-8">
        {repeated.map((item, idx) => (
          <div key={`${item}-${idx}`} className="flex items-center gap-8 whitespace-nowrap">
            <span className="font-display text-sm font-medium tracking-tight text-zinc-600 dark:text-zinc-400">
              {item}
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
