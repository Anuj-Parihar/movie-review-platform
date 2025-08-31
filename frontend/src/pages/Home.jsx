import React, { useEffect, useState } from 'react';
import API from '../api';
import MovieCard from '../components/MovieCard';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const top = await API.get('/movies?limit=8&sort=-averageRating');
        const newMovies = await API.get('/movies?limit=8&sort=-createdAt');
        setFeatured(top.data.data || []);
        setTrending(newMovies.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-indigo-600" />
        <p className="mt-3 text-gray-600">Loading…</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-bold mb-4">Featured</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map((m) => <MovieCard key={m._id} movie={m} />)}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Trending</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trending.map((m) => <MovieCard key={m._id} movie={m} />)}
        </div>
      </section>
    </div>
  );
}
