import { useMemo, useState } from 'react';
import { Box, Chip, Divider, Paper, Stack, Tooltip, Typography } from '@mui/material';

import { useI18n } from '../i18n/I18nProvider';
import type { ResumeSkills } from '../types/resume';

const CATEGORY_KEYS = [
  'frontend',
  'backend',
  'apis_data',
  'testing',
  'devops_infra',
  'tooling',
  'practices',
] as const;

const CATEGORY_FALLBACKS: Partial<Record<CategoryKey, readonly string[]>> = {
  tooling: ['Storybook', 'ESLint', 'Prettier'] as const,
};

type CategoryKey = (typeof CATEGORY_KEYS)[number];

type FilterId = 'all' | 'frontend' | 'performance' | 'a11y' | 'seo' | 'testing' | 'ci_cd';

const FILTERS = [
  { id: 'all', key: 'all' },
  { id: 'frontend', key: 'frontend' },
  { id: 'performance', key: 'performance' },
  { id: 'a11y', key: 'a11y' },
  { id: 'seo', key: 'seo' },
  { id: 'testing', key: 'testing' },
  { id: 'ci_cd', key: 'ci_cd' },
] as const;

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

  const fallback = CATEGORY_FALLBACKS[key];
  return fallback ? [...fallback] : [];
};

const keywordIncludes = (value: string, keywords: string[]) => {
  const lower = value.toLowerCase();
  return keywords.some((keyword) => lower.includes(keyword));
};

const SkillsMatrix = () => {
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');
  const { resume, content, translate } = useI18n();

  const skills = resume.skills;
  const valueStatements = content.skills.valueStatements;
  const filters = FILTERS.map((filter) => ({
    id: filter.id,
    label: content.skills.filters[filter.key],
  }));

  const skillItems = useMemo<SkillItem[]>(() => {
    return CATEGORY_KEYS.flatMap((categoryKey) => {
      const categoryLabel = content.skills.categories[categoryKey];
      const items = getSkillsForCategory(skills, categoryKey);

      return items.map((name) => ({
        name,
        normalized: name.toLowerCase(),
        categoryKey,
        categoryLabel,
      }));
    });
  }, [content, skills]);

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
        valueStatements[skill.normalized] ??
        translate('skills.fallbackStatements.focus', { skill: skill.name });
      if (!unique.has(skill.name)) {
        unique.set(skill.name, statement);
      }
    });

    return Array.from(unique.entries()).map(([name, description]) => ({ name, description }));
  }, [activeFilter, matchedSkills, translate, valueStatements]);

  return (
    <Stack spacing={6} className="section-block scroll-mt-32" component="section" id="skills">
      <Stack spacing={1.5}>
        <Typography variant="overline" color="text.secondary">
          {content.skills.overline}
        </Typography>
        <Typography variant="h3" component="h2">
          {content.skills.heading}
        </Typography>
        <Typography variant="body1" color="text.secondary" className="max-w-2xl">
          {content.skills.description}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
        <Typography component="span" variant="subtitle2" color="text.secondary" className="mr-2">
          {content.skills.filterLabel}
        </Typography>
        {filters.map((filter) => (
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
        {CATEGORY_KEYS.map((categoryKey) => {
          const categoryLabel = content.skills.categories[categoryKey];
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
                      valueStatements[skill.normalized] ??
                      translate('skills.fallbackStatements.general', { skill: skill.name });

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
              {content.skills.spotlightTitle}
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
