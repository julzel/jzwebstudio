import { useCallback, useEffect, useMemo, useState } from 'react';
import type { PaletteMode } from '@mui/material';
import { Box, Container, CssBaseline, ThemeProvider, Typography, Button } from '@mui/material';

import { createAppTheme } from '../theme';
import menuData from '../data/menu.json';
import type { MenuData, Dish } from '../types/menu';

import Header from './Header';
import SiteFooter from './SiteFooter';
import MealSection from './MealSection';
import MissingIngredientsModal from './MissingIngredientsModal';

const Culinary = () => {
  const [mode, setMode] = useState<PaletteMode>('dark');
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());
  const [showMissingModal, setShowMissingModal] = useState(false);

  const { weeklyMenu } = menuData as MenuData;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', mode === 'dark');
  }, [mode]);

  const handleToggleTheme = useCallback(() => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  const handleToggleIngredient = useCallback((ingredientId: string) => {
    setCheckedIngredients((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(ingredientId)) {
        newSet.delete(ingredientId);
      } else {
        newSet.add(ingredientId);
      }
      return newSet;
    });
  }, []);

  const handleOpenMissingModal = () => {
    setShowMissingModal(true);
  };

  const handleCloseMissingModal = () => {
    setShowMissingModal(false);
  };

  const allDishes: Dish[] = [...weeklyMenu.breakfast, ...weeklyMenu.lunch, ...weeklyMenu.supper];

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Box
        component="div"
        id="top"
        sx={{
          position: 'relative',
          minHeight: '100vh',
          overflow: 'hidden',
          backgroundImage:
            'radial-gradient(circle at 15% 20%, rgba(37, 99, 235, 0.18), transparent 55%), radial-gradient(circle at 85% 15%, rgba(124, 58, 237, 0.16), transparent 52%)',
        }}
      >
        <Header mode={mode} onToggleTheme={handleToggleTheme} />

        <Box component="main" role="main" className="py-section-sm md:py-section-lg">
          <Container maxWidth="lg">
            <Box className="motion-fade-up mb-8">
              <Typography
                variant="h2"
                component="h1"
                className="mb-4 text-4xl font-bold md:text-5xl"
              >
                This Week&apos;s Menu
              </Typography>
              <Typography variant="body1" className="mb-6 text-lg">
                Plan your meals and track your ingredients for the week.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenMissingModal}
                size="large"
                className="mb-8"
              >
                📋 List Missing Ingredients
              </Button>
            </Box>

            <Box className="motion-fade-up">
              <MealSection
                title="Breakfast"
                mealType="breakfast"
                dishes={weeklyMenu.breakfast}
                checkedIngredients={checkedIngredients}
                onToggleIngredient={handleToggleIngredient}
              />

              <MealSection
                title="Lunch"
                mealType="lunch"
                dishes={weeklyMenu.lunch}
                checkedIngredients={checkedIngredients}
                onToggleIngredient={handleToggleIngredient}
              />

              <MealSection
                title="Supper"
                mealType="supper"
                dishes={weeklyMenu.supper}
                checkedIngredients={checkedIngredients}
                onToggleIngredient={handleToggleIngredient}
              />
            </Box>
          </Container>
        </Box>

        <MissingIngredientsModal
          open={showMissingModal}
          onClose={handleCloseMissingModal}
          dishes={allDishes}
          checkedIngredients={checkedIngredients}
        />

        <SiteFooter />
      </Box>
    </ThemeProvider>
  );
};

export default Culinary;
