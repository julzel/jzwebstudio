import type { HTMLAttributes } from 'react';
import { Chip, Stack, Tooltip } from '@mui/material';

interface TagListProps extends HTMLAttributes<HTMLDivElement> {
  tags: string[];
  selectedTags?: string[];
  onToggleTag?: (tag: string) => void;
  size?: 'small' | 'medium';
  interactive?: boolean;
}

const TagList = ({
  tags,
  selectedTags = [],
  onToggleTag,
  size = 'small',
  interactive = false,
  ...rest
}: TagListProps) => (
  <Stack direction="row" flexWrap="wrap" spacing={1} useFlexGap className="gap-2" {...rest}>
    {tags.map((tag) => {
      const selected = selectedTags.includes(tag);
      const label = interactive ? `${selected ? 'Remove' : 'Add'} filter for ${tag}` : tag;

      const chip = (
        <Chip
          key={tag}
          label={tag}
          color={selected ? 'primary' : 'default'}
          variant={selected ? 'filled' : 'outlined'}
          onClick={
            interactive && onToggleTag
              ? () => {
                  onToggleTag(tag);
                }
              : undefined
          }
          size={size}
          role={interactive ? 'button' : undefined}
          aria-pressed={interactive ? selected : undefined}
          className="transition-colors"
        />
      );

      return interactive ? (
        <Tooltip key={tag} title={label} arrow>
          {chip}
        </Tooltip>
      ) : (
        <Tooltip key={tag} title={tag} arrow>
          {chip}
        </Tooltip>
      );
    })}
  </Stack>
);

export default TagList;
