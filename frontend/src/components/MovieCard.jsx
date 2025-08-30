import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movies/${movie._id}`} className="block bg-white rounded shadow hover:shadow-lg overflow-hidden">
      <div className="h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img src={movie.posterUrl || '/placeholder-poster.png'} alt={movie.title} className="h-full object-cover" />
      </div>
      <div className="p-3">
        <h3 className="font-semibold">{movie.title}</h3>
        <p className="text-sm text-gray-500">{movie.releaseYear} • {movie.genre?.join(', ')}</p>
        <div className="mt-2 text-yellow-600 font-semibold">{movie.averageRating || '—'} ⭐</div>
      </div>
    </Link>
  );
}
