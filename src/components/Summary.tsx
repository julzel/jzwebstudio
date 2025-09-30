import { useMemo, useState } from 'react';
import { Box, Button, Collapse, Typography } from '@mui/material';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import SectionTitle from './SectionTitle';

interface SummaryProps {
  summary: string;
}

const SUMMARY_CHAR_LIMIT = 260;

const Summary = ({ summary }: SummaryProps) => {
  const [expanded, setExpanded] = useState(false);

  const { preview, remainder, needsToggle } = useMemo(() => {
    if (summary.length <= SUMMARY_CHAR_LIMIT) {
      return { preview: summary, remainder: '', needsToggle: false };
    }

    const snippet = summary.slice(0, SUMMARY_CHAR_LIMIT);
    const lastSpaceIndex = snippet.lastIndexOf(' ');
    const cleanPreview = snippet.slice(0, lastSpaceIndex > 0 ? lastSpaceIndex : snippet.length);

    return {
      preview: cleanPreview,
      remainder: summary.slice(cleanPreview.length),
      needsToggle: true,
    };
  }, [summary]);

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Box component="section" aria-labelledby="resume-summary">
      <SectionTitle title="Profile" id="resume-summary" subtitle="At a glance" />
      <Box className="mt-3 rounded-3xl border border-slate-200/70 bg-white/80 p-5 leading-relaxed shadow-none backdrop-blur dark:border-slate-700/70 dark:bg-slate-800/60">
        <Typography variant="body1" color="text.primary">
          {needsToggle ? `${preview}${expanded ? '' : '…'}` : summary}
        </Typography>
        {needsToggle ? (
          <>
            <Collapse in={expanded} unmountOnExit>
              <Typography id="summary-more" variant="body1" color="text.primary" className="mt-3">
                {remainder.trimStart()}
              </Typography>
            </Collapse>
            <Box className="mt-3 text-right">
              <Button
                variant="text"
                color="primary"
                size="small"
                onClick={handleToggle}
                aria-expanded={expanded}
                aria-controls="summary-more"
                endIcon={
                  expanded ? (
                    <FiChevronUp aria-hidden="true" />
                  ) : (
                    <FiChevronDown aria-hidden="true" />
                  )
                }
              >
                {expanded ? 'Show less' : 'Read more'}
              </Button>
            </Box>
          </>
        ) : null}
      </Box>
    </Box>
  );
};

export default Summary;
