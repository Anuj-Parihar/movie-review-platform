import React, { useState } from 'react';
import StarRating from './StarRating';
import API from '../api';
import { useAuth } from '../contexts/AuthContext';

export default function ReviewForm({ movieId, onSubmitted }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e?.preventDefault();
    if (!user) return setError('Please login to write a review.');
    if (!rating || rating < 1) return setError('Select a rating.');

    setLoading(true);
    setError(null);
    try {
      await API.post(`/movies/${movieId}/reviews`, { rating, reviewText: text.trim() });
      setText(''); setRating(5);
      onSubmitted?.();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not submit review.');
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">Your rating:</span>
        <StarRating value={rating} onChange={setRating} />
      </div>
      <label className="block">
        <span className="sr-only">Write your review</span>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          maxLength={5000}
          className="w-full border rounded-xl p-3 min-h-[100px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Share your thoughts…"
        />
      </label>
      <div className="flex justify-end">
        <button
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Posting…' : 'Post review'}
        </button>
      </div>
    </form>
  );
}
