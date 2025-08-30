import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
import ReviewForm from '../components/ReviewForm';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const { data } = await API.get(`/movies/${id}`);
      setMovie(data);
      setReviews(data.recentReviews || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <img src={movie.posterUrl || '/placeholder-poster.png'} alt={movie.title} className="w-full rounded" />
        <div className="mt-3 bg-white p-3 rounded shadow">
          <h2 className="text-xl font-bold">{movie.title}</h2>
          <p>{movie.releaseYear} • {movie.genre?.join(', ')}</p>
          <div className="mt-2">Rating: {movie.averageRating || '—'} ({movie.ratingsCount || 0})</div>
        </div>
      </div>

      <div className="md:col-span-2 space-y-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Synopsis</h3>
          <p className="mt-2">{movie.synopsis || 'No synopsis available'}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Add your review</h3>
          <ReviewForm movieId={id} onSubmitted={load} />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Recent reviews</h3>
          {reviews.length === 0 && <div>No reviews yet</div>}
          <div className="space-y-3">
            {reviews.map((r) => (
              <div key={r._id} className="border p-3 rounded">
                <div className="font-semibold">{r.userId?.username || 'Unknown'}</div>
                <div className="text-sm text-gray-500">{new Date(r.createdAt).toLocaleString()}</div>
                <div className="mt-1 font-semibold">{r.rating} ⭐</div>
                <p className="mt-2">{r.reviewText}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
