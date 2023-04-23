import React, { FC } from 'react';
import Autosuggest, {
  InputProps,
  SuggestionsFetchRequestedParams,
} from 'react-autosuggest';
import { Recipe } from '../../../../types/gastronomy';

interface RecipeSearchProps {
  searchValue: string;
  filteredRecipes: Recipe[];
  onSuggestionsClearRequested: () => void;
  onSearchChange: (
    event: React.FormEvent<any>,
    { newValue }: { newValue: string }
  ) => void;
  onSuggestionsFetchRequested: (
    params: SuggestionsFetchRequestedParams
  ) => void;
}

const RecipeSearch: FC<RecipeSearchProps> = ({
  searchValue,
  filteredRecipes,
  onSuggestionsClearRequested,
  onSearchChange,
  onSuggestionsFetchRequested,
}) => {
  const getSuggestionValue = (suggestion: Recipe) => suggestion.name;

  const renderSuggestion = (suggestion: Recipe) => <div>{suggestion.name}</div>;

  const inputProps: InputProps<Recipe> = {
    placeholder: 'Search for a recipe',
    value: searchValue,
    onChange: onSearchChange,
  };

  return (
    <div>
      <Autosuggest
        suggestions={filteredRecipes}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={(event, { suggestion }) => {
          onSearchChange(event, { newValue: suggestion.name });
        }}
      />
    </div>
  );
};

export default RecipeSearch;
