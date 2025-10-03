import { useMemo } from 'react';
import { Box, Chip, Paper, Stack, Typography, alpha, useTheme } from '@mui/material';

import resume from '../data/resume.json';
import type { ResumeData } from '../types/resume';

const resumeData = resume as ResumeData;

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const parseDate = (iso: string | undefined) => {
  if (!iso || iso.toLowerCase() === 'present') {
    return null;
  }

  const [year, month] = iso.split('-').map(Number);

  if (!year) {
    return null;
  }

  const clampedMonth = Math.max(1, Math.min(12, month || 1)) - 1;
  return { year, month: clampedMonth };
};

const formatDateRange = (startDate?: string, endDate?: string) => {
  const start = parseDate(startDate ?? '');
  const end = parseDate(endDate ?? '');

  if (!start) {
    return 'Dates unavailable';
  }

  const startLabel = `${MONTH_NAMES[start.month]} ${start.year}`;
  const endLabel = end ? `${MONTH_NAMES[end.month]} ${end.year}` : 'Present';

  return `${startLabel} — ${endLabel}`;
};

const getInitials = (company: string) =>
  company
    .split(/\s|–|-/)
    .filter(Boolean)
    .map((segment) => segment[0]?.toUpperCase())
    .slice(0, 2)
    .join('');

const Experience = () => {
  const theme = useTheme();
  const items = useMemo(() => resumeData.experience ?? [], []);

  if (items.length === 0) {
    return null;
  }

  return (
    <Stack spacing={6} className="section-block" component="section" id="experience">
      <Stack spacing={1.5}>
        <Typography variant="overline" color="text.secondary">
          Experience
        </Typography>
        <Typography variant="h3" component="h2">
          Leading teams and shipping outcomes.
        </Typography>
        <Typography variant="body1" color="text.secondary" className="max-w-2xl">
          Timeline with highlights and tech stacks. Hover to dig into the work and surface the tools
          referenced most often.
        </Typography>
      </Stack>

      <Stack spacing={5}>
        {items.map((item, index) => {
          const company = item.company ?? 'Company';
          const position = item.position ?? 'Role';
          const summary = item.summary ?? '';
          const highlights = item.highlights ?? [];
          const dateRange = formatDateRange(item.startDate, item.endDate);
          const initials = getInitials(company);

          const techChips = Array.from(
            new Set(
              (highlights.join(' ') + ' ' + summary).match(
                /React|Next\.js|GraphQL|Contentful|TypeScript|Apollo|Tailwind|Node|Express|Jest|TestCafe|RTL|TDD|NestJS|AWS|Docker|CI\/CD|MongoDB|Odoo|Netlify|Vercel|Storybook|Redux|Vonage|Rollbar|Mixpanel|Angular|Azure|Codex|OpenAI/gi
              ) ?? []
            )
          );

          return (
            <Stack
              key={`${company}-${position}-${index}`}
              direction="row"
              spacing={2}
              className="items-start motion-fade-up"
            >
              <Box
                className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border bg-electric/10 text-base font-semibold text-electric shadow-soft"
                sx={{
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '2px',
                    height: index === items.length - 1 ? 0 : `calc(${theme.spacing(5)} + 2rem)`,
                    background: alpha(theme.palette.primary.main, 0.18),
                  },
                }}
              >
                {initials}
              </Box>

              <Paper
                elevation={0}
                className="glass-panel w-full transition-transform duration-200 ease-out-soft hover:-translate-y-1 hover:shadow-glow"
              >
                <Stack spacing={2.5} className="p-6">
                  <Stack spacing={1}>
                    <Typography
                      variant="subtitle1"
                      className="font-display font-semibold text-slate dark:text-slate-contrast"
                    >
                      {company}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {position}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      className="font-mono uppercase tracking-wide"
                    >
                      {dateRange}
                    </Typography>
                  </Stack>

                  {summary && (
                    <Typography variant="body2" color="text.secondary">
                      {summary}
                    </Typography>
                  )}

                  {highlights.length > 0 && (
                    <Stack
                      component="ul"
                      spacing={1.5}
                      className="list-disc pl-5 text-sm text-slate/90 dark:text-slate-contrast/80"
                    >
                      {highlights.map((highlight) => (
                        <Typography component="li" key={highlight} variant="body2">
                          {highlight}
                        </Typography>
                      ))}
                    </Stack>
                  )}

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {(techChips ?? []).map((tech) => (
                      <Chip
                        key={tech}
                        label={tech.replace('ci/cd', 'CI/CD')}
                        size="small"
                        color="primary"
                        variant="outlined"
                        className="rounded-full text-xs font-semibold"
                      />
                    ))}
                  </Stack>
                </Stack>
              </Paper>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Experience;
