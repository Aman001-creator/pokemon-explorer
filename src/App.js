import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PokemonProvider } from './context/PokemonContext';
import HomePage from './pages/HomePage';
import FavoritePage from './pages/FavoritePage';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <PokemonProvider>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritePage />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </PokemonProvider>
  );
}

export default App;