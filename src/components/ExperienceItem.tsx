import { useId } from 'react';
import {
  Box,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { FiCheckCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi';

import type { ExperienceItemData } from '../types/resume';

import TagList from './TagList';

interface ExperienceItemProps {
  item: ExperienceItemData;
  expanded: boolean;
  onToggle: () => void;
}

const formatDate = (value: string) => {
  const normalized = value.trim();

  if (normalized.toLowerCase() === 'present') {
    return 'Present';
  }

  const [year, month] = normalized.split('-');

  if (!year) {
    return normalized;
  }

  const date = new Date(Number(year), month ? Number(month) - 1 : 0);

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
  });
};

const ExperienceItem = ({ item, expanded, onToggle }: ExperienceItemProps) => {
  const collapseId = useId();

  const startLabel = formatDate(item.startDate);
  const endLabel = formatDate(item.endDate);

  return (
    <Paper
      component="article"
      aria-labelledby={`${collapseId}-title`}
      className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/90 p-5 shadow-none backdrop-blur transition-colors dark:border-slate-700/70 dark:bg-slate-800/70"
      sx={{
        pl: { xs: 3, sm: 4 },
        borderLeftWidth: 4,
        borderLeftStyle: 'solid',
        borderLeftColor: 'primary.main',
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 16,
          top: 24,
          width: 12,
          height: 12,
          borderRadius: '9999px',
          backgroundColor: 'primary.main',
        },
      }}
    >
      <Stack spacing={1.5} className="relative">
        <Box className="flex flex-wrap items-baseline justify-between gap-2">
          <Box>
            <Typography
              id={`${collapseId}-title`}
              variant="h3"
              component="h3"
              className="text-lg font-semibold"
            >
              {item.position}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" className="font-medium">
              {item.company}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" className="uppercase tracking-wide">
            {startLabel} – {endLabel}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.primary">
          {item.summary}
        </Typography>
        {item.technologies && item.technologies.length > 0 ? (
          <TagList tags={item.technologies} className="mt-1" />
        ) : null}
        <Box className="pt-1">
          <Button
            variant="text"
            color="primary"
            size="small"
            onClick={onToggle}
            aria-expanded={expanded}
            aria-controls={collapseId}
            endIcon={
              expanded ? <FiChevronUp aria-hidden="true" /> : <FiChevronDown aria-hidden="true" />
            }
          >
            {expanded ? 'Hide highlights' : 'View highlights'}
          </Button>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <List dense aria-label={`${item.company} highlights`} className="mt-2 space-y-1">
              {item.highlights.map((highlight) => (
                <ListItem key={highlight} disableGutters alignItems="flex-start">
                  <ListItemIcon sx={{ minWidth: 32, color: 'primary.main', pt: 0.5 }}>
                    <FiCheckCircle size={14} aria-hidden="true" />
                  </ListItemIcon>
                  <ListItemText primary={highlight} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Box>
      </Stack>
    </Paper>
  );
};

export default ExperienceItem;
