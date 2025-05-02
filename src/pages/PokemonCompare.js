// pages/PokemonCompare.js
import { useState, useEffect } from 'react';

const PokemonCompare = () => {
  const [pokemon1, setPokemon1] = useState('');
  const [pokemon2, setPokemon2] = useState('');
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [pokemonNames, setPokemonNames] = useState([]);

  // Fetch Pokémon names from the API (first 1000 Pokémon)
  useEffect(() => {
    const fetchPokemonNames = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const data = await res.json();
        const names = data.results.map(pokemon => pokemon.name);
        setPokemonNames(names);
      } catch (err) {
        console.error('Error fetching Pokémon names:', err);
      }
    };
    fetchPokemonNames();
  }, []);

  const fetchData = async () => {
    try {
      const res1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon1.toLowerCase()}`);
      const res2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon2.toLowerCase()}`);
      if (!res1.ok || !res2.ok) throw new Error('Pokémon not found');
      const d1 = await res1.json();
      const d2 = await res2.json();
      setData1(d1);
      setData2(d2);
    } catch (err) {
      alert(err.message);
    }
  };

  const getRandomPokemon = () => {
    const randomIndex = Math.floor(Math.random() * pokemonNames.length);
    return pokemonNames[randomIndex];
  };

  const fetchRandom1 = () => {
    const randomPokemon = getRandomPokemon();
    setPokemon1(randomPokemon);
  };

  const fetchRandom2 = () => {
    const randomPokemon = getRandomPokemon();
    setPokemon2(randomPokemon);
  };

  return (
    <div>
      <h2 style={{ backgroundColor: 'white',padding:'20px',textAlign: 'center' }}>Compare Two Pokémon</h2>

      <div className='compare-form'>
        <input
          value={pokemon1}
          onChange={e => setPokemon1(e.target.value)}
          placeholder="First Pokémon name"
        />
        <button className="random-btn" onClick={fetchRandom1}>🎲</button>

        <input
          value={pokemon2}
          onChange={e => setPokemon2(e.target.value)}
          placeholder="Second Pokémon name"
        />
        <button className="random-btn" onClick={fetchRandom2}>🎲</button>
      <button  onClick={fetchData}>Compare</button>
      </div>
      
      {data1 && data2 && (
        <div>
          <h3>Stats Comparison: {data1.name} vs {data2.name}</h3>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Stat</th>
                <th>{data1.name}</th>
                <th>{data2.name}</th>
              </tr>
            </thead>
            <tbody>
              {data1.stats.map((stat, idx) => (
                <tr key={stat.stat.name}>
                  <td>{stat.stat.name}</td>
                  <td>{stat.base_stat}</td>
                  <td>{data2.stats[idx].base_stat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PokemonCompare;
