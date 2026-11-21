import type { ProjectItem } from '../../data/portfolioData';

interface ProjectGraphicProps {
  type: ProjectItem['previewType'];
  compact?: boolean;
}

export function ProjectGraphic({ type, compact = false }: ProjectGraphicProps) {
  const heightClass = compact ? 'h-36' : 'h-48 sm:h-52';

  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-50 dark:border-zinc-800/80 dark:bg-[#09090C] ${heightClass}`}
    >
      <div
        className="pointer-events-none absolute inset-0 text-zinc-950/[0.07] dark:text-zinc-100/[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      />

      {type === 'ecosystem' && (
        <div className="relative flex h-full flex-col justify-between p-4">
          <div className="flex items-center justify-between border-b border-zinc-200/80 pb-2.5 dark:border-zinc-800">
            <span className="font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
              ladestack.in / directory
            </span>
            <span className="font-mono text-[11px] tabular-nums text-[#2563EB] dark:text-[#60A5FA]">
              9 locales · Astro
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-3">
            {[
              { name: 'GB Coder', route: '/code' },
              { name: 'LS PDF', route: '/pdf' },
              { name: 'MD2PDF', route: '/md2pdf' },
              { name: 'Swift Resume', route: '/resume' },
              { name: 'Image Opt', route: '/img' },
              { name: 'Bharat Land', route: '/land' },
            ].map((node) => (
              <div
                key={node.name}
                className="rounded-lg border border-zinc-200 bg-white/90 px-2.5 py-2 dark:border-zinc-800 dark:bg-zinc-900/80"
              >
                <div className="truncate text-[11px] font-medium text-zinc-900 dark:text-zinc-100">
                  {node.name}
                </div>
                <div className="font-mono text-[10px] text-zinc-500">{node.route}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {type === 'ide' && (
        <div className="relative flex h-full flex-col p-3.5">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-2 dark:border-zinc-800">
            <div className="flex items-center gap-3 font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
              <span className="text-zinc-900 dark:text-zinc-100">App.tsx</span>
              <span>styles.css</span>
              <span>package.json</span>
            </div>
            <span className="font-mono text-[10px] text-[#2563EB] dark:text-[#60A5FA]">
              WebContainer
            </span>
          </div>
          <div className="grid flex-1 grid-cols-12 gap-2.5 pt-2.5">
            <div className="col-span-7 space-y-1.5 rounded-lg border border-zinc-200 bg-white/95 p-2.5 font-mono text-[10px] leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950/90 dark:text-zinc-300">
              <div>
                <span className="text-[#2563EB] dark:text-[#60A5FA]">export</span>{' '}
                <span>function Workspace() {'{'}</span>
              </div>
              <div className="pl-3 text-zinc-500">
                const sandbox = useLocalProject();
              </div>
              <div className="pl-3">
                return &lt;Preview runtime="browser" /&gt;;
              </div>
              <div>{'}'}</div>
            </div>
            <div className="col-span-5 flex flex-col justify-between rounded-lg border border-zinc-200 bg-white/95 p-2.5 dark:border-zinc-800 dark:bg-zinc-900/70">
              <div className="text-[10px] font-medium text-zinc-500">Live Preview</div>
              <div className="space-y-1.5">
                <div className="h-2.5 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-2 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
                <div className="h-6 w-20 rounded bg-[#2563EB]/90" />
              </div>
            </div>
          </div>
        </div>
      )}

      {type === 'pdf' && (
        <div className="relative flex h-full flex-col justify-between p-4">
          <div className="flex items-center justify-between font-mono text-[11px] text-zinc-500">
            <span>pdf.ladestack.in</span>
            <span className="tabular-nums text-zinc-700 dark:text-zinc-300">17 local tools</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {['Merge', 'Split', 'Compress'].map((op, i) => (
              <div
                key={op}
                className="flex flex-col justify-between rounded-lg border border-zinc-200 bg-white p-2.5 dark:border-zinc-800 dark:bg-zinc-900/90"
              >
                <span className="font-mono text-[10px] tabular-nums text-zinc-400">
                  0{i + 1}
                </span>
                <span className="mt-3 text-xs font-medium text-zinc-900 dark:text-zinc-100">
                  {op}
                </span>
              </div>
            ))}
          </div>
          <div className="font-mono text-[10px] text-zinc-500">
            Browser Worker · PDF.js · pdf-lib
          </div>
        </div>
      )}

      {type === 'markdown' && (
        <div className="relative grid h-full grid-cols-2 gap-2.5 p-3.5">
          <div className="flex flex-col justify-between rounded-lg border border-zinc-200 bg-white p-2.5 font-mono text-[10px] text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/90 dark:text-zinc-400">
            <div className="space-y-1">
              <div className="text-zinc-900 dark:text-zinc-100"># Architecture</div>
              <div>- Chapter 1: Core</div>
              <div>- Chapter 2: API</div>
              <div>$$E = mc^2$$</div>
            </div>
            <span className="text-[10px] text-[#2563EB] dark:text-[#60A5FA]">GFM + KaTeX</span>
          </div>
          <div className="flex flex-col justify-between rounded-lg border border-zinc-200 bg-white p-2.5 dark:border-zinc-800 dark:bg-zinc-900/90">
            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold text-zinc-900 dark:text-zinc-100">
                Book Export
              </div>
              <div className="h-1.5 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-1.5 w-5/6 rounded bg-zinc-100 dark:bg-zinc-800" />
              <div className="h-1.5 w-4/6 rounded bg-zinc-100 dark:bg-zinc-800" />
            </div>
            <span className="font-mono text-[10px] text-zinc-500">TOC · Print PDF</span>
          </div>
        </div>
      )}

      {type === 'image' && (
        <div className="relative flex h-full flex-col justify-between p-4">
          <div className="flex items-center justify-between font-mono text-[11px] text-zinc-500">
            <span>Canvas Pipeline</span>
            <span className="text-zinc-700 dark:text-zinc-300">WebP / JPEG / PNG</span>
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-600 dark:text-zinc-400">Original asset</span>
              <span className="font-mono tabular-nums text-zinc-900 dark:text-zinc-100">2.4 MB</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
              <div className="h-full w-1/4 rounded-full bg-[#2563EB]" />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-600 dark:text-zinc-400">Client-side output</span>
              <span className="font-mono tabular-nums text-[#2563EB] dark:text-[#60A5FA]">
                WebP · Local
              </span>
            </div>
          </div>
        </div>
      )}

      {type === 'resume' && (
        <div className="relative flex h-full items-center justify-center p-4">
          <div className="flex h-full w-4/5 flex-col justify-between rounded-lg border border-zinc-200 bg-white p-3 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-baseline justify-between border-b border-zinc-200 pb-1.5 dark:border-zinc-800">
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                A4 Live Canvas
              </span>
              <span className="font-mono text-[10px] text-zinc-500">PDF Ready</span>
            </div>
            <div className="space-y-1.5 py-2">
              <div className="h-2 w-1/2 rounded bg-zinc-300 dark:bg-zinc-700" />
              <div className="h-1.5 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
              <div className="h-1.5 w-5/6 rounded bg-zinc-100 dark:bg-zinc-800" />
              <div className="h-1.5 w-2/3 rounded bg-zinc-100 dark:bg-zinc-800" />
            </div>
            <div className="font-mono text-[10px] text-zinc-500">
              Education · Projects · Skills
            </div>
          </div>
        </div>
      )}

      {type === 'land' && (
        <div className="relative flex h-full flex-col justify-between p-4">
          <div className="flex items-center justify-between font-mono text-[11px] text-zinc-500">
            <span>Region-Aware Units</span>
            <span className="text-zinc-700 dark:text-zinc-300">Maharashtra / India</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-lg border border-zinc-200 bg-white p-2.5 dark:border-zinc-800 dark:bg-zinc-900/90">
              <div className="text-[10px] text-zinc-500">Regional Input</div>
              <div className="mt-1 font-mono text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                1.00 Guntha
              </div>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-2.5 dark:border-zinc-800 dark:bg-zinc-900/90">
              <div className="text-[10px] text-zinc-500">Standard Equivalent</div>
              <div className="mt-1 font-mono text-sm font-medium tabular-nums text-[#2563EB] dark:text-[#60A5FA]">
                1,089 sq ft
              </div>
            </div>
          </div>
          <div className="font-mono text-[10px] text-zinc-500">
            Bigha · Biswa · Kattha · Cent · Acre
          </div>
        </div>
      )}

      {type === 'games' && (
        <div className="relative flex h-full flex-col justify-between p-4">
          <div className="flex items-center justify-between font-mono text-[11px] text-zinc-500">
            <span>Next.js 15 Catalog</span>
            <span className="tabular-nums text-zinc-700 dark:text-zinc-300">33 Games</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {['Snake', 'Tetris', '2048'].map((title) => (
              <div
                key={title}
                className="rounded-lg border border-zinc-200 bg-white px-2.5 py-3 text-center dark:border-zinc-800 dark:bg-zinc-900/90"
              >
                <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{title}</div>
                <div className="mt-0.5 font-mono text-[10px] text-zinc-500">Canvas</div>
              </div>
            ))}
          </div>
          <div className="font-mono text-[10px] text-zinc-500">
            Arcade · Puzzle · Strategy · Word
          </div>
        </div>
      )}

      {type === 'drive' && (
        <div className="relative flex h-full flex-col justify-between p-4">
          <div className="flex items-center justify-between font-mono text-[11px] text-zinc-500">
            <span>drive.ladestack.in</span>
            <span className="text-amber-600 dark:text-amber-400">Provisional</span>
          </div>
          <div className="space-y-2">
            {['Folders (Proposed)', 'Scoped Sharing (Proposed)'].map((row) => (
              <div
                key={row}
                className="flex items-center justify-between gap-3 rounded-lg border border-dashed border-zinc-300 bg-white/80 px-3 py-2 text-xs text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300"
              >
                <span className="truncate">{row}</span>
                <span className="shrink-0 font-mono text-[10px] text-zinc-500">Audit pending</span>
              </div>
            ))}
          </div>
          <div className="font-mono text-[10px] text-zinc-500">
            Exploration listing · Verification pending
          </div>
        </div>
      )}
    </div>
  );
}
