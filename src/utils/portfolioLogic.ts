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
