import { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { PROJECTS, type ProjectItem } from './data/portfolioData';
import { getNextProjectSlug } from './utils/portfolioLogic';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MarqueeRibbon } from './components/ui/MarqueeRibbon';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ThemeToggle } from './components/ui/ThemeToggle';

const THEME_STORAGE_KEY = 'girish-portfolio-theme';

const MARQUEE_ITEMS = [
  'UI/UX Design',
  'Full-Stack Engineering',
  'LadeStack Ecosystem',
  'Browser-First Utilities',
  'Privacy by Architecture',
  'Monaco & WebContainers',
  'Local-First Document Tools',
  'Multilingual Astro Sites',
] as const;

function getInitialTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'dark';
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch {
    // Ignore storage access errors in restricted frames
  }
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage write errors
    }
  }, [theme]);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const handleNavigateProject = useCallback(
    (direction: 'prev' | 'next') => {
      if (!activeProject) return;
      const nextSlug = getNextProjectSlug(PROJECTS, activeProject.slug, direction);
      if (!nextSlug) return;
      const target = PROJECTS.find((p) => p.slug === nextSlug);
      if (target) {
        setActiveProject(target);
      }
    },
    [activeProject]
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#FAFAFA] text-[#09090B] transition-colors duration-200 dark:bg-[#050505] dark:text-[#F4F4F5]">
        <Navbar />

        <main>
          <HeroSection onInspectProject={setActiveProject} />
          <MarqueeRibbon items={MARQUEE_ITEMS} />
          <ProjectsSection onSelectProject={setActiveProject} />
          <AboutSection />
          <CapabilitiesSection />
          <ContactSection />
        </main>

        <Footer />

        <ThemeToggle theme={theme} onToggle={handleToggleTheme} />

        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onNavigate={handleNavigateProject}
        />
      </div>
    </MotionConfig>
  );
}
