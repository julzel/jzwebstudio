import type { PaletteMode } from '@mui/material';
import { IconButton, Tooltip } from '@mui/material';
import { FiMoon, FiSun } from 'react-icons/fi';

interface ThemeToggleProps {
  mode: PaletteMode;
  onToggle: () => void;
}

const ThemeToggle = ({ mode, onToggle }: ThemeToggleProps) => {
  const isDark = mode === 'dark';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <Tooltip title={label} arrow>
      <IconButton
        color={isDark ? 'secondary' : 'primary'}
        onClick={onToggle}
        aria-label={label}
        aria-pressed={isDark}
        size="large"
      >
        {isDark ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
