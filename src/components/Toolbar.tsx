import { useMemo } from 'react';
import { Box, Button, InputAdornment, Paper, Stack, TextField } from '@mui/material';
import { FiChevronDown, FiChevronUp, FiSearch, FiX } from 'react-icons/fi';

import TagList from './TagList';

interface ToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  disableExpandCollapse?: boolean;
}

const Toolbar = ({
  search,
  onSearchChange,
  tags,
  selectedTags,
  onTagToggle,
  onClearFilters,
  onExpandAll,
  onCollapseAll,
  disableExpandCollapse = false,
}: ToolbarProps) => {
  const showClear = useMemo(
    () => search.length > 0 || selectedTags.length > 0,
    [search, selectedTags]
  );

  return (
    <Paper
      component="section"
      aria-label="Experience controls"
      className="space-y-4 rounded-3xl border border-slate-200/70 bg-white/80 p-4 shadow-none backdrop-blur dark:border-slate-700/70 dark:bg-slate-800/60 print:hidden"
    >
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="stretch">
        <TextField
          fullWidth
          value={search}
          label="Search experience"
          placeholder="Filter by company, role, summary, or highlight"
          onChange={(event) => onSearchChange(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FiSearch size={18} className="text-slate-400" aria-hidden="true" />
              </InputAdornment>
            ),
          }}
        />
        <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
          {showClear ? (
            <Button
              variant="text"
              color="inherit"
              startIcon={<FiX aria-hidden="true" />}
              onClick={onClearFilters}
            >
              Clear
            </Button>
          ) : null}
          <Button
            variant="outlined"
            color="primary"
            startIcon={<FiChevronUp aria-hidden="true" />}
            onClick={onCollapseAll}
            disabled={disableExpandCollapse}
          >
            Collapse all
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FiChevronDown aria-hidden="true" />}
            onClick={onExpandAll}
            disabled={disableExpandCollapse}
          >
            Expand all
          </Button>
        </Stack>
      </Stack>
      {tags.length > 0 ? (
        <Box>
          <TagList
            tags={tags}
            selectedTags={selectedTags}
            onToggleTag={onTagToggle}
            interactive
            aria-label="Filter by technology"
          />
        </Box>
      ) : null}
    </Paper>
  );
};

export default Toolbar;
