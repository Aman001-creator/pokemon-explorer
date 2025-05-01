import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const usePokemon = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [types, setTypes] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
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

      setPokemonData(pokemonData);
      const allTypes = Array.from(new Set(pokemonData.flatMap(p => p.types))).sort();
      setTypes(allTypes);
    }

    fetchData();
  }, []);

  const filterByType = useCallback((selectedType) => {
    return pokemonData.filter(pokemon => pokemon.types.includes(selectedType));
  }, [pokemonData]);

  return { pokemonData, types, filterByType };
};

export default usePokemon;