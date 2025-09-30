import type { ReactNode } from 'react';
import { Box, Stack, Typography } from '@mui/material';

interface SectionTitleProps {
  title: string;
  icon?: ReactNode;
  subtitle?: string;
  actions?: ReactNode;
  id?: string;
}

const SectionTitle = ({ title, icon, subtitle, actions, id }: SectionTitleProps) => (
  <Stack
    direction={{ xs: 'column', sm: 'row' }}
    justifyContent="space-between"
    alignItems={{ xs: 'flex-start', sm: 'center' }}
    spacing={1.5}
    className="gap-y-2"
  >
    <Box className="flex items-center gap-2">
      {icon && (
        <span className="text-xl text-brand" aria-hidden="true">
          {icon}
        </span>
      )}
      <Box>
        <Typography id={id} variant="h2" component="h2">
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        ) : null}
      </Box>
    </Box>
    {actions ? <Box className="flex items-center gap-2">{actions}</Box> : null}
  </Stack>
);

export default SectionTitle;
