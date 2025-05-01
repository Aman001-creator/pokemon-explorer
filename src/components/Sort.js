// Sort.js
import React from 'react';

const Sort = ({ sortOption, setSortOption }) => {
  return (
    <div className="sort-container">
      <label htmlFor="sort">Sort By:</label>
      <select
        id="sort"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="">-- Select --</option>
        <option value="id-asc">ID (Ascending)</option>
        <option value="id-desc">ID (Descending)</option>
        <option value="name-asc">Name (A–Z)</option>
        <option value="name-desc">Name (Z–A)</option>
      </select>
    </div>
  );
};

export default Sort;
