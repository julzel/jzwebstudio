import { useState, useEffect } from 'react';

const useIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [spanishIngredients, setSpanishIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      const response = await fetch('/ingredients.json');
      const data = await response.json();
      setIngredients(data.commonIngredients);
      setSpanishIngredients(data.ingredientesComunes);
    };
    fetchIngredients();
  }, []);

  return [ingredients, spanishIngredients];
};

export { useIngredients };
