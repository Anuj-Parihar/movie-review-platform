import React, { useEffect, useState } from 'react';
import API from '../api';
import MovieCard from '../components/MovieCard';
import { useSearchParams } from 'react-router-dom';

export default function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);

  const page = parseInt(searchParams.get('page') || '1', 10);
  const q = searchParams.get('q') || '';
  const genre = searchParams.get('genre') || '';
  const minRating = searchParams.get('minRating') || '';

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set('page', page);
        params.set('limit', '12');
        if (q) params.set('q', q);
        if (genre) params.set('genre', genre);
        if (minRating) params.set('minRating', minRating);
        const { data } = await API.get(`/movies?${params.toString()}`);
        setMovies(data.data || []);
        setMeta(data.meta || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [page, q, genre, minRating]);

  const doSearch = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const qv = form.get('q')?.toString() || '';
    setSearchParams({ ...Object.fromEntries(searchParams), q: qv, page: '1' });
  };

  if (loading) return <div>Loading movies...</div>;

  return (
    <div>
      <form onSubmit={doSearch} className="mb-4 flex gap-2">
        <input name="q" defaultValue={q} placeholder="Search movies..." className="flex-1 p-2 border rounded" />
        <button className="px-3 py-1 bg-blue-600 text-white rounded">Search</button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((m) => <MovieCard key={m._id} movie={m} />)}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div>{meta ? `${meta.total} results` : null}</div>
        <div className="flex gap-2">
          <button
            onClick={() => setSearchParams({ ...Object.fromEntries(searchParams), page: String(Math.max(1, page - 1)) })}
            disabled={page <= 1}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>
          <div className="px-3 py-1 border rounded">{page}</div>
          <button
            onClick={() => setSearchParams({ ...Object.fromEntries(searchParams), page: String(page + 1) })}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
