import * as React from 'react';
import { useState } from 'react';
import { useChatGPT } from '../../../hooks/useChatGPT';
import { useIngredients } from '../../../hooks/useIngredients';
import Loading from '../../../components/Loading';

const RecipeCreator: React.FC = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');
  const { messages, handleSendMessage } = useChatGPT();

  const { spanishIngredients, isLoading } = useIngredients();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleAddIngredient = (ingredient: string) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    setSelectedIngredients(
      selectedIngredients.filter(
        (ingredient) => ingredient !== ingredientToRemove
      )
    );
  };

  const handleSubmit = () => {
    const prompt = `Tengo estos ingredientes: ${selectedIngredients.join(
      ', '
    )}. ¿Puedes sugerir una receta creativa utilizando estos ingredientes o sugerir ingredientes adicionales si es necesario? Por favor, responde en formato JSON y en español.`;

    handleSendMessage({ prompt, inputText: '' });
  };

  const filteredIngredients = spanishIngredients.filter(
    (ingredient: String) => {
      if (search !== '') {
        return ingredient.toLowerCase().includes(search.toLowerCase());
      }
      return null;
    }
  );

  console.log(filteredIngredients);

  return (
    <div>
      <h1>Recipe creator!</h1>
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Search ingredients"
      />
      <ul>
        {filteredIngredients.map((ingredient, i) => (
          <li
            key={`${ingredient}-${i}`}
            onClick={() => handleAddIngredient(ingredient)}
          >
            {ingredient}
          </li>
        ))}
      </ul>
      <h2>Selected ingredients:</h2>
      <ul>
        {selectedIngredients.map((ingredient) => (
          <li
            key={ingredient}
            onClick={() => handleRemoveIngredient(ingredient)}
          >
            {ingredient}
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Get Recipe</button>
      <Loading isLoading={isLoading} />
      {!isLoading && messages.length > 0 ? (
        <div>
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              {message.content}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default RecipeCreator;
