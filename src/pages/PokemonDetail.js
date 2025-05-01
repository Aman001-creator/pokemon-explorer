import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePokemonContext } from '../context/PokemonContext';

const PokemonDetail = () => {
  const { id } = useParams();
  const { pokemonList } = usePokemonContext();

  const pokemon = pokemonList.find(p => p.id.toString() === id);

  if (!pokemon) return <p>Pokémon not found.</p>;

  return (
    <div className="detail-container">
      <Link to="/">← Back</Link>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.image} alt={pokemon.name} />
      <div className="types">
        {pokemon.types.map(type => (
          <span key={type} className={`type ${type}`}>{type}</span>
        ))}
      </div>

      <h2>Stats</h2>
      <ul>
        {pokemon.stats && Object.entries(pokemon.stats).map(([key, value]) => (
          <li key={key}><strong>{key}:</strong> {value}</li>
        ))}
      </ul>

      <h2>Abilities</h2>
      <ul>
        {pokemon.abilities && pokemon.abilities.map((a, i) => <li key={i}>{a}</li>)}
      </ul>

      <h2>Moves</h2>
      <ul>
        {pokemon.moves && pokemon.moves.slice(0, 10).map((m, i) => <li key={i}>{m}</li>)}
      </ul>

      <h2>Evolution Chain</h2>
      <p>{pokemon.evolution || 'No evolution data available.'}</p>
    </div>
  );
};

export default PokemonDetail;
