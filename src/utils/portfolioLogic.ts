import type { ProjectCategory, ProjectItem } from '../data/portfolioData';

export interface ProjectFilterCounts {
  all: number;
  'developer-tools': number;
  'documents-media': number;
  'utilities-games': number;
  explorations: number;
}

export function filterProjects(
  projects: readonly ProjectItem[],
  category: ProjectCategory,
  searchQuery: string
): ProjectItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesCategory = category === 'all' || project.category === category;
    if (!matchesCategory) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const searchable = [
      project.name,
      project.tagline,
      project.categoryLabel,
      project.overview,
      ...project.stack,
    ]
      .join(' ')
      .toLowerCase();

    return searchable.includes(normalizedQuery);
  });
}

export function countProjectsByCategory(projects: readonly ProjectItem[]): ProjectFilterCounts {
  const counts: ProjectFilterCounts = {
    all: projects.length,
    'developer-tools': 0,
    'documents-media': 0,
    'utilities-games': 0,
    explorations: 0,
  };

  for (const project of projects) {
    counts[project.category] += 1;
  }

  return counts;
}

export function getNextProjectSlug(
  projects: readonly ProjectItem[],
  currentSlug: string,
  direction: 'next' | 'prev'
): string | null {
  if (projects.length === 0) return null;
  const idx = projects.findIndex((p) => p.slug === currentSlug);
  if (idx === -1) return projects[0].slug;
  const offset = direction === 'next' ? 1 : -1;
  const nextIndex = (idx + offset + projects.length) % projects.length;
  return projects[nextIndex].slug;
}

export interface ReadingTimeEstimate {
  wordCount: number;
  minutes: number;
  label: string;
}

export function calculateProjectReadingTime(
  project: Pick<ProjectItem, 'tagline' | 'overview' | 'useCases' | 'note'>,
  wordsPerMinute = 200
): ReadingTimeEstimate {
  const safeWpm = wordsPerMinute > 0 ? wordsPerMinute : 200;
  const combinedText = [
    project.tagline,
    project.overview,
    ...project.useCases.flatMap((uc) => [uc.title, uc.description]),
    project.note ?? '',
  ].join(' ');

  const words = combinedText
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const wordCount = words.length;
  const minutes = Math.max(1, Math.ceil(wordCount / safeWpm));

  return {
    wordCount,
    minutes,
    label: `${minutes} min read`,
  };
}

export interface ProjectSharePayload {
  title: string;
  text: string;
  url: string;
}

export function buildProjectSharePayload(
  project: Pick<ProjectItem, 'name' | 'tagline' | 'url' | 'repoUrl'>,
  fallbackUrl = 'https://ladestack.in/'
): ProjectSharePayload {
  return {
    title: `${project.name} — Girish Lade | LadeStack`,
    text: project.tagline,
    url: project.url || project.repoUrl || fallbackUrl,
  };
}

export function getProjectTechStack(project: Pick<ProjectItem, 'stack'>): string[] {
  const seen = new Set<string>();
  const normalized: string[] = [];

  for (const raw of project.stack) {
    const item = raw.trim();
    const key = item.toLowerCase();
    if (item && !seen.has(key)) {
      seen.add(key);
      normalized.push(item);
    }
  }

  return normalized;
}
