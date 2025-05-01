import React, { useState, useEffect } from 'react';
import { usePokemonContext } from '../context/PokemonContext';

const Filters = ({ setFilteredList }) => {
  const { pokemonList } = usePokemonContext();
  const [type, setType] = useState('');

  useEffect(() => {
    filterPokemonByType(type);
  }, [pokemonList, type]);

  const handleFilterChange = (e) => {
    const selectedType = e.target.value;
    setType(selectedType);
  };

  const filterPokemonByType = (selectedType) => {
    if (selectedType === '') {
      setFilteredList(pokemonList);
    } else {
      const filtered = pokemonList.filter(p => p.types.includes(selectedType));
      setFilteredList(filtered);
    }
  };

  const uniqueTypes = [...new Set(pokemonList.flatMap(p => p.types))].sort();

  return (
    <div className="filters">
      <label>Filter by Type:</label>
      <select value={type} onChange={handleFilterChange}>
        <option value="">All</option>
        {uniqueTypes.map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
