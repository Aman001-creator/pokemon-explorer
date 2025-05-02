import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PokemonDetailPage = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);

  useEffect(() => {
    // Fetch Pokémon details
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(response => response.json())
      .then(data => {
        console.log("Pokemon Data:", data);  // Log Pokémon data
        setPokemon(data);
      })
      .catch(error => console.error("Error fetching Pokémon data:", error));

    // Fetch Evolution chain
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
      .then(response => response.json())
      .then(speciesData => {
        console.log("Species Data:", speciesData);  // Log species data
        fetch(speciesData.evolution_chain.url)
          .then(response => response.json())
          .then(evolutionData => {
            console.log("Evolution Chain Data:", evolutionData);  // Log evolution chain data
            setEvolutionChain(evolutionData);
          });
      })
      .catch(error => console.error("Error fetching evolution chain:", error));
  }, [id]);

  if (!pokemon) {
    return <div>Loading Pokémon...</div>;
  }

  if (!evolutionChain) {
    return <div>Loading evolution chain...</div>;
  }

  return (
  <div className="pokemon-detail">
    <div className="pokemon-left">
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    </div>
    <div className="pokemon-right">
      <div className="stats">
        <h2>Stats</h2>
        <ul>
          {pokemon.stats.map(stat => (
            <li key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
      <div className="abilities">
        <h2>Abilities</h2>
        <ul>
          {pokemon.abilities.map(ability => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
        </ul>
      </div>
      <div className="moves">
        <h2>Moves</h2>
        <ul>
          {pokemon.moves.slice(0, 10).map(move => (
            <li key={move.move.name}>{move.move.name}</li>
          ))}
        </ul>
      </div>
      <div className="evolution">
        <h2>Evolution Chain</h2>
        <ul>
          {evolutionChain.chain.evolves_to.map(evolution => (
            <li key={evolution.species.name}>
              <a href={`/pokemon/${evolution.species.name}`}>{evolution.species.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

};

export default PokemonDetailPage;
