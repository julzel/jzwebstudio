export interface Recipe {
  name: string;
  keywords: string[];
  description: string[];
  ingredients: Ingredient[];
  instructions: string[];
}

export interface Ingredient {
  name: string;
  quantity?: string;
  preparation?: string;
  optional?: boolean;
  toTaste?: boolean;
}

export type RecipeIndex = number;

export type InvertedIndex = Map<string, Set<RecipeIndex>>;
