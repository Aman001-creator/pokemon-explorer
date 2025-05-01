import React from 'react';
import { usePokemonContext } from '../context/PokemonContext';

const CompareTool = () => {
  const { pokemonList } = usePokemonContext();
  const [selectedPokemon1, setSelectedPokemon1] = useState(null);
  const [selectedPokemon2, setSelectedPokemon2] = useState(null);

  const handleCompare = () => {
    // Compare logic here (e.g., display stats)
  };

  return (
    <div>
      <h3>Compare Pokémon</h3>
      <select onChange={(e) => setSelectedPokemon1(e.target.value)}>
        {pokemonList.map(pokemon => (
          <option key={pokemon.id} value={pokemon.id}>{pokemon.name}</option>
        ))}
      </select>
      <select onChange={(e) => setSelectedPokemon2(e.target.value)}>
        {pokemonList.map(pokemon => (
          <option key={pokemon.id} value={pokemon.id}>{pokemon.name}</option>
        ))}
      </select>
      <button onClick={handleCompare}>Compare</button>
    </div>
  );
};

export default CompareTool;
