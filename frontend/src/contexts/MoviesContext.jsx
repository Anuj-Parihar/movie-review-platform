import React, { createContext, useContext, useState } from 'react';

const MoviesContext = createContext();
export const useMovies = () => useContext(MoviesContext);

export function MoviesProvider({ children }) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ genre: '', year: '', minRating: '' });
  return (
    <MoviesContext.Provider value={{ query, setQuery, filters, setFilters }}>
      {children}
    </MoviesContext.Provider>
  );
}
