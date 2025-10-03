import { forwardRef, useMemo, useState } from 'react';
import type { ReactElement, Ref } from 'react';
import {
  AppBar,
  Box,
  Button,
  Chip,
  Dialog,
  Divider,
  IconButton,
  Slide,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from '@mui/material';
import type { PaletteMode } from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import { FiGithub, FiGlobe, FiLinkedin, FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
import type { IconType } from 'react-icons';

import resume from '../data/resume.json';

type HeaderProps = {
  mode: PaletteMode;
  onToggleTheme: () => void;
  language: 'en' | 'es';
  onLanguageChange: (value: 'en' | 'es') => void;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const socialIconMap: Record<string, IconType> = {
  github: FiGithub,
  linkedin: FiLinkedin,
};

const Header = ({ mode, onToggleTheme, language, onLanguageChange }: HeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const availability = resume.basics?.location?.availability ?? 'Open to opportunities';

  const profiles = useMemo(
    () =>
      (resume.basics?.profiles || []).filter((profile) =>
        ['github', 'linkedin'].includes(profile.network.toLowerCase())
      ),
    []
  );

  const handleLanguage = (_: unknown, value: 'en' | 'es' | null) => {
    if (value) {
      onLanguageChange(value);
    }
  };

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  const monogram = (
    <Button
      href="#top"
      color="inherit"
      sx={{
        padding: 0,
        minWidth: 'auto',
        textTransform: 'none',
        fontFamily: 'Sora, system-ui, sans-serif',
        fontWeight: 600,
        letterSpacing: '0.2em',
      }}
      aria-label="JZ Web Studio home"
    >
      <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
        <Box component="span" sx={{ color: 'primary.main', fontSize: '1.5rem' }}>
          {'{'}
        </Box>
        <Typography component="span" variant="h6" sx={{ fontSize: '1.1rem' }}>
          JZ
        </Typography>
        <Box component="span" sx={{ color: 'secondary.main', fontSize: '1.5rem' }}>
          {'}'}
        </Box>
      </Box>
    </Button>
  );

  const navigation = (
    <Stack
      component="nav"
      direction="row"
      spacing={3}
      className="hidden md:flex"
      alignItems="center"
    >
      {navLinks.map((link) => (
        <Button
          key={link.href}
          href={link.href}
          color="inherit"
          className="text-sm text-slate/80 dark:text-slate-contrast/80 transition-colors duration-150 ease-out-soft hover:text-electric"
        >
          {link.label}
        </Button>
      ))}
    </Stack>
  );

  const socialButtons = (
    <Stack direction="row" spacing={1} alignItems="center">
      {profiles.map((profile) => {
        const Icon = socialIconMap[profile.network.toLowerCase()];

        if (!Icon) {
          return null;
        }

        return (
          <IconButton
            key={profile.network}
            component="a"
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            color="inherit"
            aria-label={profile.network}
            className="text-slate/80 transition-transform duration-150 ease-out-soft hover:scale-105 hover:text-electric dark:text-slate-contrast/80 dark:hover:text-electric"
          >
            <Icon />
          </IconButton>
        );
      })}
    </Stack>
  );

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{ backdropFilter: 'blur(18px)', borderRadius: 0, border: 'none' }}
    >
      <Toolbar className="mx-auto flex w-full max-w-[var(--app-max-width)] items-center justify-between gap-4 px-0 py-4 md:py-5">
        <Stack
          direction="row"
          spacing={{ xs: 1.5, md: 2 }}
          alignItems="center"
          sx={{
            flexWrap: { xs: 'wrap', md: 'nowrap' },
            justifyContent: { xs: 'flex-end', md: 'flex-end' },
          }}
        >
          <Box className="inline-flex items-center justify-center rounded-full bg-electric/10 px-3 py-2">
            {monogram}
          </Box>
          <Typography
            variant="body2"
            className="hidden text-slate/70 dark:text-slate-contrast/70 sm:block"
          >
            {resume.basics?.label}
          </Typography>
        </Stack>

        {navigation}

        <Stack direction="row" spacing={2} alignItems="center">
          <Box className="hidden items-center gap-1 md:flex">
            <FiGlobe className="text-base text-slate/60 dark:text-slate-contrast/70" aria-hidden />
            <ToggleButtonGroup
              size="small"
              color="primary"
              value={language}
              exclusive
              onChange={handleLanguage}
              aria-label="Language selector"
              sx={{
                '& .MuiToggleButton-root': {
                  borderRadius: '999px',
                  paddingInline: '0.75rem',
                  textTransform: 'none',
                  fontSize: '0.75rem',
                  letterSpacing: '0.06em',
                },
              }}
            >
              <ToggleButton value="en">EN</ToggleButton>
              <ToggleButton value="es">ES</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {socialButtons}

          <IconButton
            color="inherit"
            onClick={onToggleTheme}
            aria-label={`Activate ${mode === 'light' ? 'dark' : 'light'} mode`}
            className="text-slate/80 transition-transform duration-150 ease-out-soft hover:scale-105 hover:text-electric dark:text-slate-contrast/80"
          >
            {mode === 'light' ? <FiMoon /> : <FiSun />}
          </IconButton>

          <IconButton
            className="md:hidden"
            color="inherit"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <FiMenu />
          </IconButton>
        </Stack>
      </Toolbar>

      <Dialog
        fullScreen
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(11, 18, 32, 0.92)',
            backdropFilter: 'blur(16px)',
            color: 'white',
          },
        }}
      >
        <Toolbar className="flex items-center justify-between">
          <Box className="inline-flex items-center justify-center rounded-full bg-white/10 px-3 py-2 text-white">
            {monogram}
          </Box>

          <IconButton
            color="inherit"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <FiX />
          </IconButton>
        </Toolbar>

        <Stack spacing={6} className="px-6 pb-12 pt-4">
          <Stack spacing={3} component="nav">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                href={link.href}
                color="inherit"
                onClick={handleNavClick}
                className="justify-start text-3xl font-semibold tracking-tight"
              >
                {link.label}
              </Button>
            ))}
          </Stack>

          <Divider flexItem light sx={{ borderColor: 'rgba(226, 232, 240, 0.12)' }} />

          <Stack spacing={2}>
            <Chip
              label={`Availability: ${availability}`}
              color="info"
              variant="outlined"
              size="medium"
              className="w-fit rounded-full border-teal/40 bg-white/5 text-sm font-medium text-teal"
            />
            <ToggleButtonGroup
              size="small"
              color="primary"
              value={language}
              exclusive
              onChange={handleLanguage}
              aria-label="Language selector"
              sx={{
                '& .MuiToggleButton-root': {
                  borderRadius: '999px',
                  paddingInline: '1.25rem',
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  letterSpacing: '0.12em',
                  color: 'white',
                  borderColor: 'rgba(226, 232, 240, 0.24)',
                },
              }}
            >
              <ToggleButton value="en">EN</ToggleButton>
              <ToggleButton value="es">ES</ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Stack direction="row" spacing={2}>
            {profiles.map((profile) => {
              const Icon = socialIconMap[profile.network.toLowerCase()];

              if (!Icon) {
                return null;
              }

              return (
                <Button
                  key={profile.network}
                  component="a"
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                  className="gap-2 rounded-full bg-white/10 px-4 py-2 text-base"
                  startIcon={<Icon />}
                  onClick={handleNavClick}
                >
                  {profile.network}
                </Button>
              );
            })}
          </Stack>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            className="self-start"
            href="#contact"
            onClick={handleNavClick}
          >
            Start a project
          </Button>
        </Stack>
      </Dialog>
    </AppBar>
  );
};

export default Header;
