import React from 'react';

interface Recipe {
  Receta: string;
  Ingredientes: string[];
  Instrucciones: string[];
}

export interface RecipeProps {
  recipe: Recipe;
}

const RecipeResults: React.FC<RecipeProps> = ({ recipe }) => {
  return (
    <div>
      <h1>{recipe.Receta}</h1>
      <h2>Ingredientes:</h2>
      <ul>
        {recipe.Ingredientes.map((ingrediente, i) => (
          <li key={i}>{ingrediente}</li>
        ))}
      </ul>
      <h2>Instrucciones:</h2>
      <ol>
        {recipe.Instrucciones.map((instruccion, i) => (
          <li key={i}>{instruccion}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeResults;
