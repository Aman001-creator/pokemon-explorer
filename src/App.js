import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PokemonProvider } from './context/PokemonContext';
import HomePage from './pages/HomePage';
import FavoritePage from './pages/FavoritePage';
import PokemonCompare from './pages/PokemonCompare';
import PokemonDetail from './pages/PokemonDetail'; // Import the detail page
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <PokemonProvider>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritePage />} />
            <Route path="/compare" element={<PokemonCompare />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </PokemonProvider>
  );
}

export default App;
