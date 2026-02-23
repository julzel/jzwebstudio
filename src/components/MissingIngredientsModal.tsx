import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

import type { Dish } from '../types/menu';

interface MissingIngredientsModalProps {
  open: boolean;
  onClose: () => void;
  dishes: Dish[];
  checkedIngredients: Set<string>;
}

const MissingIngredientsModal = ({
  open,
  onClose,
  dishes,
  checkedIngredients,
}: MissingIngredientsModalProps) => {
  const missingIngredients = dishes.flatMap((dish) =>
    dish.ingredients
      .filter((ingredient) => !checkedIngredients.has(ingredient.id))
      .map((ingredient) => ({
        dishName: dish.name,
        ingredient,
      }))
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Missing Ingredients</DialogTitle>
      <DialogContent dividers>
        {missingIngredients.length === 0 ? (
          <Typography variant="body1" className="py-4 text-center">
            🎉 All ingredients are checked! You&apos;re all set.
          </Typography>
        ) : (
          <List>
            {missingIngredients.map(({ dishName, ingredient }) => (
              <ListItem key={ingredient.id} className="border-b last:border-b-0">
                <ListItemText
                  primary={`${ingredient.name} (${ingredient.quantity})`}
                  secondary={`For: ${dishName}`}
                  primaryTypographyProps={{ className: 'font-medium' }}
                  secondaryTypographyProps={{ className: 'text-sm text-gray-500' }}
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MissingIngredientsModal;
