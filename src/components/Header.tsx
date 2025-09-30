import type { PaletteMode } from '@mui/material';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { FiDownload, FiMapPin, FiUser } from 'react-icons/fi';

import type { BasicsData } from '../types/resume';

import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  basics: BasicsData;
  mode: PaletteMode;
  onToggleTheme: () => void;
  onPrint: () => void;
}

const Header = ({ basics, mode, onToggleTheme, onPrint }: HeaderProps) => (
  <Box
    component="header"
    role="banner"
    className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-none backdrop-blur transition-all dark:border-slate-700/70 dark:bg-slate-800/70"
  >
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Box className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand dark:bg-slate-700/70">
          <FiUser size={24} aria-hidden="true" />
        </Box>
        <Box>
          <Typography variant="h1" component="h1" className="text-2xl font-bold">
            {basics.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {basics.label}
          </Typography>
        </Box>
      </Stack>
      {basics.location ? (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <Chip
            icon={<FiMapPin aria-hidden="true" size={16} />}
            label={basics.location.region}
            variant="outlined"
            color="primary"
          />
          {basics.location.availability ? (
            <Chip label={basics.location.availability} variant="outlined" />
          ) : null}
        </Stack>
      ) : null}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        className="print:hidden"
      >
        <Button
          variant="contained"
          color="primary"
          onClick={onPrint}
          startIcon={<FiDownload aria-hidden="true" />}
        >
          Download PDF
        </Button>
        <ThemeToggle mode={mode} onToggle={onToggleTheme} />
      </Stack>
    </Stack>
  </Box>
);

export default Header;
