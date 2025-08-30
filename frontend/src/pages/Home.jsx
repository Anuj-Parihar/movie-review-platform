import React, { useEffect, useState } from 'react';
import API from '../api';
import MovieCard from '../components/MovieCard';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // top rated
        const f = await API.get('/movies?limit=6&sort=-averageRating');
        setFeatured(f.data.data || []);
        // trending = newest
        const t = await API.get('/movies?limit=6&sort=-createdAt');
        setTrending(t.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Featured</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featured.map((m) => <MovieCard key={m._id} movie={m} />)}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Trending</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {trending.map((m) => <MovieCard key={m._id} movie={m} />)}
        </div>
      </section>
    </div>
  );
}
