import React, { useEffect, useState } from 'react';
import API from '../api';
import MovieCard from '../components/MovieCard';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import { useMovies } from '../contexts/MoviesContext';

export default function Movies() {
  const { state, dispatch } = useMovies();
  const [movies, setMovies] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams();
      qs.set('page', state.page);
      qs.set('limit', 12);
      if (state.q) qs.set('q', state.q);
      if (state.genre) qs.set('genre', state.genre);
      if (state.year) qs.set('year', state.year);
      if (state.minRating) qs.set('minRating', state.minRating);

      const { data } = await API.get(`/movies?${qs.toString()}`);
      const payload = data.data || data;
      setMovies(payload.data || payload); // support both {data,meta} or array
      setMeta(data.meta || payload.meta || { page: state.page, totalPages: 1 });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [state]);

  return (
    <div>
      <Filters
        filters={state}
        onChange={(patch) => dispatch({ type: 'SET_FILTERS', payload: patch })}
      />
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-indigo-600" />
          <p className="mt-3 text-gray-600">Loading movies…</p>
        </div>
      ) : (
        <>
          {movies.length === 0 ? (
            <div className="text-center text-gray-600 py-16">
              No movies found. Try adjusting filters.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {movies.map((m) => <MovieCard key={m._id} movie={m} />)}
            </div>
          )}
          <Pagination meta={meta} onPage={(p) => dispatch({ type: 'SET_PAGE', payload: p })} />
        </>
      )}
    </div>
  );
}
