import { useMemo, useState } from 'react';
import { Box, Chip, Divider, Paper, Stack, Tooltip, Typography } from '@mui/material';

import resume from '../data/resume.json';
import type { ResumeData, ResumeSkills } from '../types/resume';

const resumeData = resume as ResumeData;

const CATEGORY_CONFIG = {
  frontend: { label: 'Frontend' },
  backend: { label: 'Backend' },
  apis_data: { label: 'APIs & Data' },
  testing: { label: 'Testing' },
  devops_infra: { label: 'DevOps' },
  tooling: {
    label: 'Tooling',
    fallback: ['Storybook', 'ESLint', 'Prettier'] as readonly string[],
  },
  practices: { label: 'Practices' },
} satisfies Record<string, { label: string; fallback?: readonly string[] }>;

type CategoryKey = keyof typeof CATEGORY_CONFIG;

type FilterId = 'all' | 'frontend' | 'performance' | 'a11y' | 'seo' | 'testing' | 'ci_cd';

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'performance', label: 'Performance' },
  { id: 'a11y', label: 'A11y' },
  { id: 'seo', label: 'SEO' },
  { id: 'testing', label: 'Testing' },
  { id: 'ci_cd', label: 'CI/CD' },
];

const VALUE_STATEMENTS: Record<string, string> = {
  react: 'React → ship resilient interfaces with clean architecture patterns and reusable hooks.',
  'next.js':
    'Next.js → fast full-stack delivery with hybrid rendering, ISR, and SEO-first routing.',
  typescript: 'TypeScript → stricter contracts that prevent regressions and speed up refactors.',
  redux: 'Redux → predictable state modeling for complex UI flows.',
  tailwind: 'Tailwind → design tokens in code, building cohesive systems quickly.',
  mui: 'MUI → accessible component foundations aligned to design tokens.',
  storybook: 'Storybook → document design systems and unblock cross-team collaboration.',
  'node.js': 'Node.js → performant APIs with structured logging and monitoring.',
  express: 'Express → lightweight REST services tuned for maintainability.',
  nestjs: 'NestJS → opinionated backend scaffolding for scalable services.',
  'graphql (schema design)': 'GraphQL → strongly-typed contracts that empower product teams.',
  'apollo client': 'Apollo Client → normalized caching that keeps UIs fast and consistent.',
  'rest apis': 'REST APIs → pragmatic integrations and backwards-compatible evolutions.',
  contentful: 'Contentful → structured content workflows for marketing teams.',
  mongodb: 'MongoDB → schema-flexible data models with performance guardrails.',
  'odoo erp': 'Odoo ERP → unify ops data flows across finance, inventory, and storefronts.',
  jest: 'Jest → fast unit suites with solid snapshot governance.',
  'react testing library':
    'React Testing Library → user-focused tests that harden critical journeys.',
  testcafe: 'TestCafe → cross-browser end-to-end validation in CI.',
  tdd: 'TDD → build confidence-first pipelines, catching regressions before release.',
  'github actions': 'GitHub Actions → automated quality gates and preview env orchestration.',
  circleci: 'CircleCI → parallelized pipelines that keep releases flowing.',
  docker: 'Docker → reproducible environments from laptop to production.',
  kubernetes: 'Kubernetes → resilient workloads with autoscaling and observability baked in.',
  aws: 'AWS → cloud primitives tuned for cost, resilience, and compliance.',
  vercel: 'Vercel → instant previews and global edge delivery for the frontend.',
  netlify: 'Netlify → automated deploy previews with edge functions ready to extend.',
  'frontend architecture':
    'Frontend Architecture → component standards that keep teams aligned at scale.',
  accessibility: 'Accessibility → WCAG-driven interfaces that include every user.',
  'performance optimization':
    'Performance Optimization → real-world budget tracking for fast experiences.',
  seo: 'SEO → technical hygiene that lifts visibility and conversion.',
  'agile/scrum': 'Agile/Scrum → iterative delivery with clear ceremonies and planning.',
  mentorship: 'Mentorship → growing engineers through pairing, feedback, and roadmap context.',
  chromatic: 'Chromatic → automated visual QA guarding against regressions.',
  eslint: 'ESLint → consistent code style & catch issues before they merge.',
  prettier: 'Prettier → automatic formatting that keeps reviews focused on logic.',
};

const BADGES = ['WCAG', 'Lighthouse', 'TDD', 'GraphQL'];

interface SkillItem {
  name: string;
  normalized: string;
  categoryKey: CategoryKey;
  categoryLabel: string;
}

const getSkillsForCategory = (skills: ResumeSkills | undefined, key: CategoryKey): string[] => {
  const values = skills?.[key];

  if (values && Array.isArray(values) && values.length > 0) {
    return values;
  }

  const categoryConfig = CATEGORY_CONFIG[key];
  const fallback =
    'fallback' in categoryConfig && categoryConfig.fallback ? [...categoryConfig.fallback] : [];

  return fallback;
};

const keywordIncludes = (value: string, keywords: string[]) => {
  const lower = value.toLowerCase();
  return keywords.some((keyword) => lower.includes(keyword));
};

const SkillsMatrix = () => {
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');

  const skills = resumeData.skills;

  const skillItems = useMemo<SkillItem[]>(() => {
    const categories = Object.keys(CATEGORY_CONFIG) as CategoryKey[];

    return categories.flatMap((categoryKey) => {
      const categoryLabel = CATEGORY_CONFIG[categoryKey].label;
      const items = getSkillsForCategory(skills, categoryKey);

      return items.map((name) => ({
        name,
        normalized: name.toLowerCase(),
        categoryKey,
        categoryLabel,
      }));
    });
  }, [skills]);

  const filterMatchers: Record<FilterId, (item: SkillItem) => boolean> = useMemo(
    () => ({
      all: () => true,
      frontend: (item) => item.categoryKey === 'frontend',
      performance: (item) =>
        item.categoryKey === 'practices'
          ? keywordIncludes(item.normalized, ['performance'])
          : keywordIncludes(item.normalized, [
              'next.js',
              'react',
              'performance',
              'tailwind',
              'typescript',
            ]),
      a11y: (item) =>
        keywordIncludes(item.normalized, ['accessibility', 'a11y', 'wcag', 'mui', 'aria']),
      seo: (item) => keywordIncludes(item.normalized, ['seo', 'next.js', 'contentful']),
      testing: (item) =>
        item.categoryKey === 'testing' || keywordIncludes(item.normalized, ['test', 'tdd']),
      ci_cd: (item) =>
        keywordIncludes(item.normalized, [
          'ci',
          'cd',
          'github actions',
          'circleci',
          'vercel',
          'netlify',
          'docker',
          'kubernetes',
        ]),
    }),
    []
  );

  const matchedSkills = useMemo(() => {
    if (activeFilter === 'all') {
      return [];
    }

    const matcher = filterMatchers[activeFilter];
    return skillItems.filter(matcher);
  }, [activeFilter, filterMatchers, skillItems]);

  const activeStatements = useMemo(() => {
    if (activeFilter === 'all') {
      return [];
    }

    const unique = new Map<string, string>();

    matchedSkills.forEach((skill) => {
      const statement =
        VALUE_STATEMENTS[skill.normalized] ??
        `${skill.name} → elevates delivery for this focus area.`;
      if (!unique.has(skill.name)) {
        unique.set(skill.name, statement);
      }
    });

    return Array.from(unique.entries()).map(([name, description]) => ({ name, description }));
  }, [activeFilter, matchedSkills]);

  return (
    <Stack spacing={6} className="section-block scroll-mt-32" component="section" id="skills">
      <Stack spacing={1.5}>
        <Typography variant="overline" color="text.secondary">
          Skills & Capabilities
        </Typography>
        <Typography variant="h3" component="h2">
          Systems-minded craft across the stack.
        </Typography>
        <Typography variant="body1" color="text.secondary" className="max-w-2xl">
          Filter the matrix to surface focus areas. Every chip carries a quick note explaining how
          it supports reliable product delivery.
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
        <Typography component="span" variant="subtitle2" color="text.secondary" className="mr-2">
          Filter focus:
        </Typography>
        {FILTERS.map((filter) => (
          <Chip
            key={filter.id}
            label={filter.label}
            clickable
            color={activeFilter === filter.id ? 'primary' : 'default'}
            variant={activeFilter === filter.id ? 'filled' : 'outlined'}
            onClick={() => setActiveFilter(filter.id)}
            className="rounded-full text-xs font-semibold"
          />
        ))}
      </Stack>

      <Box className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {(Object.keys(CATEGORY_CONFIG) as CategoryKey[]).map((categoryKey) => {
          const categoryLabel = CATEGORY_CONFIG[categoryKey].label;
          const categorySkills = skillItems.filter((item) => item.categoryKey === categoryKey);

          if (categorySkills.length === 0) {
            return null;
          }

          return (
            <Paper key={categoryKey} elevation={0} className="glass-panel p-6">
              <Stack spacing={2}>
                <Typography
                  variant="subtitle1"
                  className="font-display font-semibold text-slate dark:text-slate-contrast"
                >
                  {categoryLabel}
                </Typography>

                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {categorySkills.map((skill) => {
                    const isMatch = activeFilter === 'all' || filterMatchers[activeFilter](skill);
                    const statement =
                      VALUE_STATEMENTS[skill.normalized] ??
                      `${skill.name} → elevates delivery for modern teams.`;

                    return (
                      <Tooltip key={skill.name} title={statement} placement="top" arrow>
                        <Chip
                          label={skill.name}
                          className={`rounded-full text-xs font-semibold transition-all duration-200 ease-out-soft ${
                            isMatch ? 'opacity-100' : 'opacity-40'
                          }`}
                          color={isMatch ? 'info' : 'default'}
                          variant={isMatch ? 'filled' : 'outlined'}
                        />
                      </Tooltip>
                    );
                  })}
                </Stack>
              </Stack>
            </Paper>
          );
        })}
      </Box>

      {activeStatements.length > 0 && (
        <Paper elevation={0} className="glass-panel p-6">
          <Stack spacing={2}>
            <Typography variant="subtitle2" color="text.secondary">
              Spotlight notes
            </Typography>
            <Divider flexItem className="border-warm-gray/50" />
            <Stack spacing={1.5}>
              {activeStatements.map((item) => (
                <Typography
                  key={item.name}
                  variant="body2"
                  className="text-slate dark:text-slate-contrast"
                >
                  <strong>{item.name}</strong> — {item.description}
                </Typography>
              ))}
            </Stack>
          </Stack>
        </Paper>
      )}

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {BADGES.map((badge) => (
          <Chip
            key={badge}
            label={badge}
            size="small"
            color="secondary"
            variant="outlined"
            className="rounded-full font-mono text-xs tracking-tight"
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default SkillsMatrix;
