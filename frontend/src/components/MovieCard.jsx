import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  const rating = typeof movie.averageRating === 'number'
    ? movie.averageRating.toFixed(1)
    : movie.averageRating || '—';

  return (
    <Link
      to={`/movies/${movie._id}`}
      className="group block bg-white rounded-2xl border shadow-sm hover:shadow-md transition overflow-hidden"
    >
      <div className="h-56 bg-gray-200 flex items-center justify-center overflow-hidden">
        <img
          src={movie.posterUrl || '/placeholder-poster.png'}
          alt={movie.title}
          className="h-full w-full object-cover group-hover:scale-[1.02] transition"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start gap-3">
          <h3 className="font-semibold leading-tight line-clamp-2">{movie.title}</h3>
          <div className="text-xs text-gray-500 shrink-0">{movie.releaseYear || ''}</div>
        </div>
        <p className="text-xs text-gray-500 mt-1 line-clamp-1">
          {(movie.genre || []).slice(0, 2).join(', ')}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-yellow-50 border text-yellow-700 text-xs font-medium">
            <span aria-hidden>★</span>
            <span>{rating}</span>
          </div>
          <div className="text-[11px] text-gray-400">{movie.ratingsCount || 0} votes</div>
        </div>
      </div>
    </Link>
  );
}
