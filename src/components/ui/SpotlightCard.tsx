import React, { useCallback } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(37, 99, 235, 0.14)',
}: SpotlightCardProps) {
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-300);
    mouseY.set(-300);
  }, [mouseX, mouseY]);

  const background = useMotionTemplate`radial-gradient(360px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 75%)`;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group/spotlight relative overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-colors duration-200 hover:border-zinc-300 dark:border-zinc-800/90 dark:bg-[#0D0D10] dark:hover:border-zinc-700 ${className}`}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
        style={{ background }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
