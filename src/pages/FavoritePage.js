import React from 'react';
import { usePokemonContext } from '../context/PokemonContext';
import PokemonCard from '../components/PokemonCard';

const FavoritePage = () => {
  const { pokemonList, favorites } = usePokemonContext();

  const favoritePokemons = pokemonList.filter(pokemon => favorites.includes(pokemon.id));

  return (
    <div>
      <h2>Favorite Pokémon</h2>
      <div className="card-container">
        {favoritePokemons.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />)}
      </div>
    </div>
  );
};

export default FavoritePage;
