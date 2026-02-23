import { Typography, Box, Paper } from '@mui/material';

import type { Dish, MealType } from '../types/menu';

import DishCard from './DishCard';

interface MealSectionProps {
  title: string;
  mealType: MealType;
  dishes: Dish[];
  checkedIngredients: Set<string>;
  onToggleIngredient: (ingredientId: string) => void;
}

const MealSection = ({
  title,
  dishes,
  checkedIngredients,
  onToggleIngredient,
}: MealSectionProps) => {
  const getMealEmoji = (mealTitle: string) => {
    if (mealTitle.toLowerCase().includes('breakfast')) return '🍳';
    if (mealTitle.toLowerCase().includes('lunch')) return '🥗';
    if (mealTitle.toLowerCase().includes('supper')) return '🍽️';
    return '🍴';
  };

  return (
    <Paper elevation={2} className="mb-8 p-6">
      <Typography variant="h5" component="h2" className="mb-4 font-bold flex items-center gap-2">
        <span>{getMealEmoji(title)}</span>
        {title}
      </Typography>
      <Box>
        {dishes.map((dish) => (
          <DishCard
            key={dish.id}
            dish={dish}
            checkedIngredients={checkedIngredients}
            onToggleIngredient={onToggleIngredient}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default MealSection;
