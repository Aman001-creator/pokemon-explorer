import React from 'react';
import { usePokemonContext } from '../context/PokemonContext';
import { Link } from 'react-router-dom';

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
      <div className='group-btn'>
      <button className='favorite-btn' onClick={() => toggleFavorite(pokemon)}>
        {isFavorite ? '❤️' : '🤍'}
      </button>
      <button><Link style={{textDecoration:'none',color:'white'}} to={`/pokemon/${pokemon.id}`}>Card Detail</Link></button>
      </div>
    </div>
  );
};

export default PokemonCard;
