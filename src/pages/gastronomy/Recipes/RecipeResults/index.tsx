import React from 'react';
import { Recipe } from '../../../../types/gastronomy';

interface RecipeResultsProps {
  recipes: Recipe[];
}

const RecipeResults: React.FC<RecipeResultsProps> = ({ recipes }) => {
  return (
    <div>
      <h2>Resultados de la búsqueda</h2>
      {recipes.length > 0 ? (
        <div>
          {recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <h3>{recipe.name}</h3>
              <div>
                <h4>Palabras clave:</h4>
                <ul>
                  {recipe.keywords.map((keyword, i) => (
                    <li key={i}>{keyword}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Ingredientes:</h4>
                <ul>
                  {recipe.ingredients.map((ingredient, i) => (
                    <li key={i}>
                      {ingredient.quantity} {ingredient.name}
                      {ingredient.preparation
                        ? ` (${ingredient.preparation})`
                        : ''}
                      {ingredient.optional ? ' (opcional)' : ''}
                      {ingredient.toTaste ? ' (al gusto)' : ''}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Instrucciones:</h4>
                <ol>
                  {recipe.instructions.map(
                    (
                      instruction:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | React.ReactFragment
                        | React.ReactPortal
                        | null
                        | undefined,
                      i: React.Key | null | undefined
                    ) => (
                      <li key={i}>{instruction}</li>
                    )
                  )}
                </ol>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No se encontraron recetas</p>
      )}
    </div>
  );
};

export default RecipeResults;
