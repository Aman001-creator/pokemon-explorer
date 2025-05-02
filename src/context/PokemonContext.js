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
  
  // Fetch detailed data for each Pokémon
  const fetchPokemonDetails = async (pokemon) => {
    try {
      const res = await axios.get(pokemon.url);
      const details = res.data;
      
      // Include stats, abilities, moves, and evolution chain
      const detailedPokemon = {
        ...pokemon,
        id: details.id,
        name: details.name,
        image: details.sprites.front_default,
        types: details.types.map(t => t.type.name),
        stats: details.stats.map(stat => ({
          name: stat.stat.name,
          base_stat: stat.base_stat,
        })),
        abilities: details.abilities.map(ability => ({
          name: ability.ability.name,
          is_hidden: ability.is_hidden,
        })),
        moves: details.moves.map(move => move.move.name),
        evolutionChainUrl: details.species.url,
      };
      return detailedPokemon;
    } catch (err) {
      console.error("Error fetching Pokémon details:", err);
      return null;
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
        const results = response.data.results;

        // Fetch details for each Pokémon in the list
        const pokemonData = await Promise.all(
          results.map(async (pokemon) => {
            const detailedPokemon = await fetchPokemonDetails(pokemon);
            return detailedPokemon;
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
