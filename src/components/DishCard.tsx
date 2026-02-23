import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Box,
} from '@mui/material';

import type { Dish } from '../types/menu';

interface DishCardProps {
  dish: Dish;
  checkedIngredients: Set<string>;
  onToggleIngredient: (ingredientId: string) => void;
}

const DishCard = ({ dish, checkedIngredients, onToggleIngredient }: DishCardProps) => {
  return (
    <Card className="mb-4 shadow-md">
      <CardContent>
        <Typography variant="h6" component="h3" className="mb-3 font-semibold">
          {dish.name}
        </Typography>
        <FormGroup>
          {dish.ingredients.map((ingredient) => (
            <FormControlLabel
              key={ingredient.id}
              control={
                <Checkbox
                  checked={checkedIngredients.has(ingredient.id)}
                  onChange={() => onToggleIngredient(ingredient.id)}
                  size="small"
                />
              }
              label={
                <Box component="span" className="text-sm">
                  <span
                    className={
                      checkedIngredients.has(ingredient.id) ? 'line-through opacity-60' : ''
                    }
                  >
                    {ingredient.name}
                  </span>
                  <span className="ml-2 text-gray-500">({ingredient.quantity})</span>
                </Box>
              }
            />
          ))}
        </FormGroup>
      </CardContent>
    </Card>
  );
};

export default DishCard;
