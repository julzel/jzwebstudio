export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
}

export interface Dish {
  id: string;
  name: string;
  ingredients: Ingredient[];
}

export interface WeeklyMenu {
  breakfast: Dish[];
  lunch: Dish[];
  supper: Dish[];
}

export interface MenuData {
  weeklyMenu: WeeklyMenu;
}

export type MealType = 'breakfast' | 'lunch' | 'supper';
