import React from 'react';
import { usePokemonContext } from '../context/PokemonContext';
import PokemonCard from '../components/PokemonCard';

const FavoritePage = () => {
  const { pokemonList, favorites } = usePokemonContext();

  const favoritePokemons = pokemonList.filter(pokemon => favorites.includes(pokemon.id));

  return (
    <div>
      <h2 style={{ backgroundColor: 'white',padding:'20px',textAlign: 'center' }}>Favorite Pokémon</h2>

      {favoritePokemons.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>
          You haven't added any Pokémon to favorites yet. ❤️
        </p>
      ) : (
        <div className="card-container">
          {favoritePokemons.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
