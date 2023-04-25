import { useState, useEffect } from 'react';

const useIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [spanishIngredients, setSpanishIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchIngredients = async () => {
      setIsLoading(true);
      const response = await fetch('/ingredients.json');
      const data = await response.json();
      setIngredients(data.commonIngredients);
      setSpanishIngredients(data.ingredientesComunes);
      setIsLoading(false);
    };
    fetchIngredients();
  }, []);

  return { ingredients, spanishIngredients, isLoading };
};

export { useIngredients };
