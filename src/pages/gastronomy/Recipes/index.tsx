import React, { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';

// local imports
import { debounce } from '../../../util';
import RecipeSearch from '../Recipes/RecipeSearch/';
import RecipeResults from '../Recipes/RecipeResults';
import { Recipe } from '../../../types/gastronomy';

const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('recetas.json');
        setRecipes(response.data.recetas);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const onSearchChange = (
    event: FormEvent<any>,
    { newValue }: { newValue: string }
  ) => setSearchValue(newValue);

  const onSuggestionsFetchRequested = debounce(
    ({ value }: { value: string }) => {
      setFilteredRecipes(getFilteredRecipes(value));
    },
    300
  );

  const onSuggestionsClearRequested = () => {
    setSearchValue('');
  };

  const getFilteredRecipes = (searchText: string) => {
    const inputKeywords = searchText.toLowerCase().split(' ');

    return recipes.filter((recipe) => {
      const combinedString = [
        recipe.name.toLowerCase(),
        ...recipe.keywords.map((keyword) => keyword.toLowerCase()),
        ...recipe.ingredients.map((ingredient) =>
          ingredient.name.toLowerCase()
        ),
      ].join(' ');

      return inputKeywords.every((keyword) => combinedString.includes(keyword));
    });
  };

  return (
    <section className="recipes">
      <RecipeSearch
        searchValue={searchValue}
        filteredRecipes={filteredRecipes}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSearchChange={onSearchChange}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      />
      <RecipeResults recipes={filteredRecipes} />
    </section>
  );
};

export default Recipes;
