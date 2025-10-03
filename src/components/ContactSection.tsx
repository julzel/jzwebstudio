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

const PROJECT_TYPES = ['Product build', 'Site refresh', 'Design system', 'Consulting'];
const BUDGET_RANGES = ['$5k–$10k', '$10k–$25k', '$25k–$50k', '$50k+'];

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

  return (
    <Container maxWidth="lg" component="section" id="contact" className="section-block">
      <Paper elevation={0} className="glass-panel">
        <Stack spacing={6} className="p-8">
          <Stack spacing={1.5}>
            <Typography variant="overline" color="text.secondary">
              Contact
            </Typography>
            <Typography variant="h3" component="h2">
              Let’s build performant, inclusive web experiences.
            </Typography>
            <Typography variant="body1" color="text.secondary" className="max-w-2xl">
              I’m based in Costa Rica (UTC-6), making it easy to sync with U.S. schedules. Share
              your project details and we’ll map a plan to ship something exceptional.
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
                <TextField fullWidth label="Name" name="name" required variant="outlined" />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  required
                  type="email"
                  variant="outlined"
                />
              </Stack>

              <FormControl fullWidth>
                <InputLabel id="project-type-label">Project type</InputLabel>
                <Select
                  labelId="project-type-label"
                  label="Project type"
                  name="projectType"
                  defaultValue={PROJECT_TYPES[0]}
                >
                  {PROJECT_TYPES.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Stack spacing={2}>
                <Typography variant="subtitle2" color="text.secondary">
                  Budget range
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {BUDGET_RANGES.map((range) => (
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
                label="Message"
                name="message"
                multiline
                minRows={4}
                fullWidth
                variant="outlined"
                placeholder="Tell me about your goals, timelines, and success metrics."
              />

              <Stack spacing={2}>
                <Button type="submit" variant="contained" size="large">
                  Start a conversation
                </Button>
                <Typography variant="caption" color="text.secondary">
                  I respect your privacy—details stay between us unless we engage a project.
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
                    Email me
                  </Button>
                </Stack>
              </Stack>

              <Box className="rounded-3xl bg-ink-light/60 p-4 dark:bg-ink/80">
                <Typography
                  variant="subtitle2"
                  className="mb-2 font-display text-slate dark:text-slate-contrast"
                >
                  Trusted stacks
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
