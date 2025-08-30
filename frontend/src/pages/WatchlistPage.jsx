import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
import MovieCard from '../components/MovieCard';

export default function WatchlistPage() {
  const { id } = useParams();
  const [items, setItems] = useState([]);

  const load = async () => {
    try {
      const { data } = await API.get(`/users/${id}/watchlist`);
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, [id]);

  if (!items) return <div>Loading...</div>;
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Watchlist</h2>
      {items.length === 0 ? <div>No movies in watchlist</div> : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(it => <MovieCard key={it._id} movie={it.movieId} />)}
        </div>
      )}
    </div>
  );
}
