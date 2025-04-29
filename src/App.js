import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [types, setTypes] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
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

        setPokemonList(pokemonData);
        setFilteredList(pokemonData);
        const allTypes = Array.from(
          new Set(pokemonData.flatMap(p => p.types))
        ).sort();
        setTypes(allTypes);
      } catch (err) {
        setError('Failed to fetch Pokémon. Try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = pokemonList;

    if (search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter(p =>
        p.types.includes(selectedType)
      );
    }

    setFilteredList(filtered);
  }, [search, selectedType, pokemonList]);

  if (loading) return <div className="loader">Loading Pokémon...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="app">
      <h1 className="title">Pokémon Explorer</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select value={selectedType} onChange={e => setSelectedType(e.target.value)}>
          <option value="">All Types</option>
          {types.map(type => (
            <option key={type} value={type}>{type.toUpperCase()}</option>
          ))}
        </select>
      </div>

      {filteredList.length === 0 ? (
        <div className="empty">No Pokémon found.</div>
      ) : (
        <div className="card-container">
          {filteredList.map(pokemon => (
            <div key={pokemon.id} className="card">
              <img src={pokemon.image} alt={pokemon.name} />
              <h2>{pokemon.name}</h2>
              <p>ID: {pokemon.id}</p>
              <div className="types">
                {pokemon.types.map(type => (
                  <span key={type} className={`type ${type}`}>{type}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
