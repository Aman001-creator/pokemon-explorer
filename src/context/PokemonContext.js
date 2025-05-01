import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const PokemonContext = createContext();

export const usePokemonContext = () => useContext(PokemonContext);

export const PokemonProvider = ({ children }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
        const results = response.data.results;

        const pokemonData = await Promise.all(
          results.map(async (pokemon) => {
            const res = await axios.get(pokemon.url);
            return {
              id: res.data.id,
              name: res.data.name,
              image: res.data.sprites.front_default,
              types: res.data.types.map(t => t.type.name),
            };
          })
        );
        
        setPokemonList(pokemonData);
        setFilteredList(pokemonData);
      } catch (err) {
        setError('Failed to fetch Pokémon. Try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const toggleFavorite = (pokemon) => {
    const newFavorites = favorites.includes(pokemon.id) 
      ? favorites.filter(id => id !== pokemon.id)
      : [...favorites, pokemon.id];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <PokemonContext.Provider value={{ pokemonList, filteredList, loading, error, favorites, setFilteredList, toggleFavorite }}>
      {children}
    </PokemonContext.Provider>
  );
};
