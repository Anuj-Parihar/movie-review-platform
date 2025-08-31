import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
import MovieCard from '../components/MovieCard';

export default function WatchlistPage() {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    API.get(`/users/${id}/watchlist`)
      .then((r) => setItems(r.data.data || r.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-indigo-600" />
        <p className="mt-3 text-gray-600">Loading watchlist…</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Watchlist</h2>
      {items.length === 0 ? (
        <div className="text-gray-600">No movies in watchlist</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((it) => {
            const movie = it.movieId || it; // support either shape
            return <MovieCard key={movie._id} movie={movie} />;
          })}
        </div>
      )}
    </div>
  );
}
