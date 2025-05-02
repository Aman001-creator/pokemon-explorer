import React from 'react';
import { usePokemonContext } from '../context/PokemonContext';
import { Link } from 'react-router-dom'; // Import Link

const PokemonCard = ({ pokemon }) => {
  const { toggleFavorite, favorites } = usePokemonContext();
  const isFavorite = favorites.includes(pokemon.id);

  return (
    <div className="card">
      <img src={pokemon.image} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <div className="types">
        {pokemon.types.map(type => (
          <span key={type} className={`type ${type}`}>{type}</span>
        ))}
      </div>
      <button onClick={() => toggleFavorite(pokemon)}>
        {isFavorite ? '❤️ Remove Favorite' : '🤍 Add Favorite'}
      </button>
      {/* Add Link to navigate to the detail page */}
      <Link to={`/pokemon/${pokemon.id}`}>View Details</Link>
    </div>
  );
};

export default PokemonCard;
