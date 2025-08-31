import React, { createContext, useContext, useReducer } from 'react';

const MoviesContext = createContext();
export const useMovies = () => useContext(MoviesContext);

const initial = { q: '', page: 1, genre: '', year: '', minRating: '' };

function reducer(state, action) {
  switch (action.type) {
    case 'SET_QUERY': return { ...state, q: action.payload, page: 1 };
    case 'SET_FILTERS': return { ...state, ...action.payload, page: 1 };
    case 'SET_PAGE': return { ...state, page: action.payload };
    default: return state;
  }
}

export function MoviesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);
  return <MoviesContext.Provider value={{ state, dispatch }}>{children}</MoviesContext.Provider>;
}
