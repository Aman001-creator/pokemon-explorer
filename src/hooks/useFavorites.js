// useFavorites.js
import { useState, useEffect } from 'react';

const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemonId) => {
    setFavorites(prev =>
      prev.includes(pokemonId)
        ? prev.filter(id => id !== pokemonId)
        : [...prev, pokemonId]
    );
  };

  return { favorites, toggleFavorite };
};

export default useFavorites;
