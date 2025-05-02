import React, { useState, useMemo, useEffect } from 'react';
import { usePokemonContext } from '../context/PokemonContext';
import PokemonCard from '../components/PokemonCard';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import Navbar from '../components/Navbar';
import Sort from '../components/Sort';

const HomePage = () => {
  const { pokemonList } = usePokemonContext();
  const [filteredList, setFilteredList] = useState(pokemonList); // Local filtered state
  const [sortedList, setSortedList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [sortOption, setSortOption] = useState('');


  const handleFilter = (newFilteredList) => {
    setFilteredList(newFilteredList);
  };

  
  useEffect(() => {
    let sorted = [...filteredList];

    switch (sortOption) {
      case 'id-asc':
        sorted.sort((a, b) => a.id - b.id);
        break;
      case 'id-desc':
        sorted.sort((a, b) => b.id - a.id);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setSortedList(sorted);
    setCurrentPage(1); 
  }, [sortOption, filteredList]);

  const paginatedList = useMemo(() => {
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    return sortedList.slice(indexOfFirst, indexOfLast);
  }, [currentPage, itemsPerPage, sortedList]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <div className="filter-sort-bar" style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
        <Filters setFilteredList={handleFilter} />
        <Sort sortOption={sortOption} setSortOption={setSortOption} />
      </div>
      <div className="card-container">
        {paginatedList.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <Pagination
        totalItems={sortedList.length}
        itemsPerPage={itemsPerPage}
        paginate={paginate}
      />
    </div>
  );
};

export default HomePage;
