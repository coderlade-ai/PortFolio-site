import test from 'node:test';
import assert from 'node:assert/strict';
import { EXPLORATIONS, PROFILE, PROJECTS } from '../data/portfolioData';
import {
  buildProjectSharePayload,
  calculateProjectReadingTime,
  countProjectsByCategory,
  filterProjects,
  getNextProjectSlug,
} from './portfolioLogic';

test('filterProjects filters by category and search text accurately', () => {
  const devTools = filterProjects(PROJECTS, 'developer-tools', '');
  assert.ok(devTools.length >= 2);
  assert.ok(devTools.every((p) => p.category === 'developer-tools'));

  const webContainerMatch = filterProjects(PROJECTS, 'all', 'webcontainers');
  assert.equal(webContainerMatch.length, 1);
  assert.equal(webContainerMatch[0].id, 'gb-coder');

  const noMatch = filterProjects(PROJECTS, 'documents-media', 'snake');
  assert.equal(noMatch.length, 0);
});

test('countProjectsByCategory sums cleanly to total project count', () => {
  const counts = countProjectsByCategory(PROJECTS);
  const categorySum =
    counts['developer-tools'] +
    counts['documents-media'] +
    counts['utilities-games'] +
    counts.explorations;
  assert.equal(counts.all, PROJECTS.length);
  assert.equal(categorySum, PROJECTS.length);
});

test('getNextProjectSlug wraps cleanly in both directions', () => {
  const first = PROJECTS[0].slug;
  const last = PROJECTS[PROJECTS.length - 1].slug;
  assert.equal(getNextProjectSlug(PROJECTS, last, 'next'), first);
  assert.equal(getNextProjectSlug(PROJECTS, first, 'prev'), last);
});

test('calculateProjectReadingTime computes accurate word count and rounded minutes', () => {
  const shortEstimate = calculateProjectReadingTime({
    tagline: 'Short tagline here.',
    overview: 'A concise summary of ten words for testing reading speed.',
    useCases: [{ title: 'Use one', description: 'Quick flow.' }],
  });
  assert.equal(shortEstimate.minutes, 1);
  assert.equal(shortEstimate.label, '1 min read');
  assert.ok(shortEstimate.wordCount > 10);

  const longWords = Array.from({ length: 420 }, () => 'word').join(' ');
  const longEstimate = calculateProjectReadingTime({
    tagline: '',
    overview: longWords,
    useCases: [],
  });
  assert.equal(longEstimate.wordCount, 420);
  assert.equal(longEstimate.minutes, 3);
  assert.equal(longEstimate.label, '3 min read');

  for (const project of PROJECTS) {
    const est = calculateProjectReadingTime(project);
    assert.ok(est.wordCount >= 40, `${project.name} should have descriptive word count`);
    assert.ok(est.minutes >= 1, `${project.name} should have at least 1 min read`);
  }
});

test('buildProjectSharePayload builds title and prioritizes product URL with fallbacks', () => {
  const gbCoder = PROJECTS.find((p) => p.id === 'gb-coder')!;
  const payload = buildProjectSharePayload(gbCoder);
  assert.equal(payload.title, 'GB Coder — Girish Lade | LadeStack');
  assert.equal(payload.url, 'https://code.ladestack.in/');
  assert.equal(payload.text, gbCoder.tagline);

  const fallbackPayload = buildProjectSharePayload(
    {
      name: 'Sample Tool',
      tagline: 'Demo tagline',
      repoUrl: 'https://github.com/girishlade111/sample',
    },
    'https://ladestack.in/'
  );
  assert.equal(fallbackPayload.url, 'https://github.com/girishlade111/sample');
});

test('portfolio dataset strictly excludes private appendix data and honors verification rules', () => {
  const serialized = JSON.stringify({ PROFILE, PROJECTS, EXPLORATIONS });
  assert.equal(serialized.includes('14 May 2001'), false);
  assert.equal(serialized.includes('14/05/2001'), false);
  assert.equal(serialized.includes('Computer Science'), false);

  const drive = PROJECTS.find((p) => p.id === 'ladestack-drive');
  assert.ok(drive);
  assert.equal(drive.isProvisional, true);

  for (const project of PROJECTS) {
    assert.equal(project.useCases.length, 3, `${project.name} must have exactly 3 use cases`);
  }
});
