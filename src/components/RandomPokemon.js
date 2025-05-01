import React from 'react';
import { usePokemonContext } from '../context/PokemonContext';

const RandomPokemon = () => {
  const { pokemonList } = usePokemonContext();
  const randomPokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)];

  return (
    <div>
      <h3>Random Pokémon</h3>
      <img src={randomPokemon.image} alt={randomPokemon.name} />
      <p>{randomPokemon.name}</p>
    </div>
  );
};

export default RandomPokemon;