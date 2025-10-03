import { Fragment } from 'react';
import { Button, Chip, IconButton, Stack, Typography } from '@mui/material';
import type { IconType } from 'react-icons';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

import resume from '../data/resume.json';
import type { ResumeData, ResumeProfile } from '../types/resume';

const resumeData = resume as ResumeData;

const socialIconMap: Record<'github' | 'linkedin' | 'email', IconType> = {
  github: FiGithub,
  linkedin: FiLinkedin,
  email: FiMail,
};

const KPI_ITEMS = [
  '10+ yrs shipping React/Next',
  'A11y & SEO as first-class citizens',
  'CI/CD with preview envs',
];

const Hero = () => {
  const basics = resumeData.basics;

  const label = typeof basics?.label === 'string' ? basics.label : 'Product Designer & Engineer';
  const name = typeof basics?.name === 'string' ? basics.name : 'Julio Zeledón';
  const rawSummary = typeof basics?.summary === 'string' ? basics.summary : '';

  const region = typeof basics?.location?.region === 'string' ? basics.location.region : 'Remote';
  const availability =
    typeof basics?.location?.availability === 'string'
      ? basics.location.availability
      : 'Open to opportunities';
  const timezone =
    typeof basics?.location?.timezone === 'string' ? basics.location.timezone : 'UTC-6';
  const email = typeof basics?.email === 'string' ? basics.email : '';

  const profiles = (basics?.profiles ?? []).filter(
    (profile): profile is ResumeProfile & { network: string; url: string } =>
      typeof profile?.network === 'string' && typeof profile?.url === 'string'
  );

  const socialLinks = [
    ...profiles
      .filter((profile) => ['github', 'linkedin'].includes(profile.network.toLowerCase()))
      .map((profile) => ({
        id: profile.network.toLowerCase() as 'github' | 'linkedin',
        label: profile.network,
        href: profile.url,
      })),
    ...(email
      ? [
          {
            id: 'email' as const,
            label: 'Email',
            href: `mailto:${email}`,
          },
        ]
      : []),
  ];

  return (
    <Stack spacing={3}>
      <Chip
        label={label}
        color="secondary"
        variant="outlined"
        className="w-fit rounded-full text-xs font-semibold tracking-wide"
      />

      <Typography variant="h1" component="h1">
        {name}
      </Typography>

      <Typography variant="body1" color="text.secondary" className="max-w-xl text-lg">
        {rawSummary}
      </Typography>

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {[region, timezone, availability].map((item) => (
          <Chip
            key={item}
            label={item}
            size="small"
            color="info"
            variant="outlined"
            className="rounded-full border-teal/40 bg-teal/5 text-sm font-medium text-teal"
          />
        ))}
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} className="pt-2">
        <Button variant="contained" size="large" href="#contact">
          Start a project
        </Button>
        <Button
          component="a"
          variant="outlined"
          size="large"
          color="secondary"
          href="/resume/cv-julio-zeledon.pdf"
          download
        >
          Resume (PDF)
        </Button>
      </Stack>

      {socialLinks.length > 0 && (
        <Stack direction="row" spacing={1.5} alignItems="center" className="pt-4">
          {socialLinks.map((item, index) => {
            const Icon = socialIconMap[item.id];

            return (
              <Fragment key={item.id}>
                <IconButton
                  component="a"
                  href={item.href}
                  target={item.id === 'email' ? undefined : '_blank'}
                  rel={item.id === 'email' ? undefined : 'noopener noreferrer'}
                  color="inherit"
                  aria-label={item.label}
                  className="h-12 w-12 rounded-full border border-white/10 bg-electric/10 text-electric transition-transform duration-150 ease-out-soft hover:scale-105 hover:bg-electric/20"
                >
                  <Icon />
                </IconButton>
                {index < socialLinks.length - 1 && (
                  <span className="hidden text-sm font-medium text-slate/60 last:hidden sm:inline">
                    ·
                  </span>
                )}
              </Fragment>
            );
          })}
        </Stack>
      )}

      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        flexWrap="wrap"
        useFlexGap
        className="pt-2"
      >
        {KPI_ITEMS.map((item, index) => (
          <Fragment key={item}>
            <Typography
              component="span"
              className="font-mono text-xs uppercase tracking-tight text-slate/70 dark:text-slate-contrast/70"
            >
              {item}
            </Typography>
            {index < KPI_ITEMS.length - 1 && (
              <Typography
                component="span"
                aria-hidden
                className="hidden font-mono text-xs text-slate/50 last:hidden sm:inline"
              >
                •
              </Typography>
            )}
          </Fragment>
        ))}
      </Stack>
    </Stack>
  );
};

export default Hero;
