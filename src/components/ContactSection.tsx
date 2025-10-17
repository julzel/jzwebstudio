import { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useI18n } from '../i18n/I18nProvider';

const TRUST_LOGOS = [
  { label: 'React', tag: 'React' },
  { label: 'Next.js', tag: 'Next.js' },
  { label: 'TypeScript', tag: 'TypeScript' },
  { label: 'Tailwind', tag: 'Tailwind' },
  { label: 'Node', tag: 'Node' },
  { label: 'Express', tag: 'Express' },
  { label: 'NestJS', tag: 'NestJS' },
  { label: 'MongoDB', tag: 'MongoDB' },
  { label: 'Netlify', tag: 'Netlify' },
  { label: 'Vercel', tag: 'Vercel' },
];

const ContactSection = () => {
  const [budget, setBudget] = useState<string | null>(null);
  const { content } = useI18n();
  const contactCopy = content.contact;
  const formCopy = contactCopy.form;
  const asideCopy = contactCopy.aside;
  const projectTypes = formCopy.projectTypeOptions;
  const budgetRanges = formCopy.budgetOptions;
  const defaultProjectType = projectTypes[0] ?? '';

  return (
    <Container
      maxWidth="lg"
      component="section"
      id="contact"
      className="section-block scroll-mt-32"
    >
      <Paper elevation={0} className="glass-panel">
        <Stack spacing={6} className="p-8">
          <Stack spacing={1.5}>
            <Typography variant="overline" color="text.secondary">
              {contactCopy.overline}
            </Typography>
            <Typography variant="h3" component="h2">
              {contactCopy.heading}
            </Typography>
            <Typography variant="body1" color="text.secondary" className="max-w-2xl">
              {contactCopy.description}
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: 'column', lg: 'row' }}
            spacing={4}
            alignItems={{ lg: 'flex-start' }}
            justifyContent="space-between"
          >
            <Stack component="form" spacing={3} className="w-full max-w-2xl">
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                <TextField
                  fullWidth
                  label={formCopy.nameLabel}
                  name="name"
                  required
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label={formCopy.emailLabel}
                  name="email"
                  required
                  type="email"
                  variant="outlined"
                />
              </Stack>

              <FormControl fullWidth>
                <InputLabel id="project-type-label">{formCopy.projectTypeLabel}</InputLabel>
                <Select
                  key={projectTypes.join('|')}
                  labelId="project-type-label"
                  label={formCopy.projectTypeLabel}
                  name="projectType"
                  defaultValue={defaultProjectType}
                >
                  {projectTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Stack spacing={2}>
                <Typography variant="subtitle2" color="text.secondary">
                  {formCopy.budgetLabel}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {budgetRanges.map((range) => (
                    <Chip
                      key={range}
                      label={range}
                      clickable
                      color={budget === range ? 'primary' : 'default'}
                      variant={budget === range ? 'filled' : 'outlined'}
                      onClick={() => setBudget((prev) => (prev === range ? null : range))}
                      className="rounded-full text-sm font-semibold"
                    />
                  ))}
                </Stack>
              </Stack>

              <TextField
                label={formCopy.messageLabel}
                name="message"
                multiline
                minRows={4}
                fullWidth
                variant="outlined"
                placeholder={formCopy.messagePlaceholder}
              />

              <Stack spacing={2}>
                <Button type="submit" variant="contained" size="large">
                  {formCopy.submitCta}
                </Button>
                <Typography variant="caption" color="text.secondary">
                  {formCopy.privacyNotice}
                </Typography>
              </Stack>
            </Stack>

            <Stack spacing={3} className="w-full max-w-sm">
              <Stack spacing={1.5}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    component="a"
                    href="mailto:julio.zeledon.developer@gmail.com"
                    variant="outlined"
                    color="secondary"
                  >
                    {asideCopy.emailCta}
                  </Button>
                </Stack>
              </Stack>

              <Box className="rounded-3xl bg-ink-light/60 p-4 dark:bg-ink/80">
                <Typography
                  variant="subtitle2"
                  className="mb-2 font-display text-slate dark:text-slate-contrast"
                >
                  {asideCopy.trustedStacks}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {TRUST_LOGOS.map((logo) => (
                    <Chip
                      key={logo.label}
                      label={logo.tag}
                      size="small"
                      variant="outlined"
                      className="rounded-full border-white/20 text-xs font-semibold text-slate dark:text-slate-contrast"
                    />
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ContactSection;
