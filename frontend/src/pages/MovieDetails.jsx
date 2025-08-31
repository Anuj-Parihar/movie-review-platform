import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
import ReviewForm from '../components/ReviewForm';
import { useAuth } from '../contexts/AuthContext';

export default function MovieDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [watchAdded, setWatchAdded] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await API.get(`/movies/${id}`);
      // Assuming your backend returns a single movie object; adjust if wrapped.
      setMovie(data.data || data);
      setReviews((data.data || data).recentReviews || []);
    } catch (err) {
      setError('Failed to load movie.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [id]);

  const addToWatchlist = async () => {
    if (!user) return alert('Please login to add to watchlist.');
    try {
      await API.post(`/users/${user.id}/watchlist`, { movieId: id });
      setWatchAdded(true);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to add to watchlist.');
    }
  };

  if (loading) return (
    <div className="text-center py-20">
      <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-top border-t-indigo-600" />
      <p className="mt-3 text-gray-600">Loading…</p>
    </div>
  );

  if (error) return <div className="text-center text-red-600 py-10">{error}</div>;
  if (!movie) return <div>Movie not found</div>;

  const avg = typeof movie.averageRating === 'number' ? movie.averageRating.toFixed(1) : movie.averageRating || '—';

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-1 space-y-4">
        <img src={movie.posterUrl || '/placeholder-poster.png'} alt={movie.title} className="rounded-2xl w-full border shadow-sm" />
        <div className="bg-white p-4 rounded-2xl shadow-sm border">
          <h2 className="text-2xl font-bold">{movie.title}</h2>
          <p className="text-sm text-gray-500 mt-1">{movie.releaseYear} • {(movie.genre || []).join(', ')}</p>
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-50 border text-yellow-700">
            <span>★</span><span className="font-semibold">{avg}</span>
          </div>
          {user && (
            <button
              onClick={addToWatchlist}
              disabled={watchAdded}
              className="mt-4 w-full py-2 rounded-xl bg-indigo-600 text-white shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {watchAdded ? 'Added' : 'Add to Watchlist'}
            </button>
          )}
        </div>
      </div>

      <div className="md:col-span-2 space-y-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border">
          <h3 className="font-semibold">Synopsis</h3>
          <p className="mt-2 text-gray-700">{movie.synopsis || 'No synopsis available.'}</p>
        </div>

        {movie.trailerUrl && (
          <div className="bg-white p-4 rounded-2xl shadow-sm border">
            <h3 className="font-semibold">Trailer</h3>
            <div className="mt-2 aspect-video rounded-lg overflow-hidden">
              <iframe
                title="trailer"
                src={movie.trailerUrl}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        )}

        <div className="bg-white p-4 rounded-2xl shadow-sm border">
          <h3 className="font-semibold">Cast</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {(movie.cast || []).map((c, i) => (
              <div key={i} className="px-2 py-1 bg-gray-100 rounded-full text-sm">{c}</div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border">
          <h3 className="font-semibold mb-3">Write a review</h3>
          <ReviewForm movieId={id} onSubmitted={load} />
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border">
          <h3 className="font-semibold mb-3">Recent reviews</h3>
          {reviews.length === 0 ? (
            <div className="text-gray-600">No reviews yet</div>
          ) : (
            <div className="space-y-3">
              {reviews.map((r) => (
                <div key={r._id} className="border p-3 rounded-xl">
                  <div className="flex justify-between">
                    <div className="font-semibold">{r.userId?.username || 'User'}</div>
                    <div className="text-sm text-gray-400">
                      {r.createdAt ? new Date(r.createdAt).toLocaleString() : ''}
                    </div>
                  </div>
                  <div className="mt-1 font-semibold">{r.rating} ★</div>
                  <p className="mt-2 text-gray-700">{r.reviewText}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
