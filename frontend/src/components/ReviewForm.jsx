import React, { useState } from 'react';
import StarRating from './StarRating';
import API from '../api';
import { useAuth } from '../contexts/AuthContext';

export default function ReviewForm({ movieId, onSubmitted }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const submit = async (e) => {
    e?.preventDefault();
    if (!user) return setErr('You must be logged in to review.');
    if (rating < 1 || rating > 5) return setErr('Rating must be 1–5');
    if (text.length > 5000) return setErr('Review too long');

    try {
      setLoading(true);
      await API.post(`/movies/${movieId}/reviews`, { rating, reviewText: text });
      setText('');
      setRating(5);
      setErr(null);
      if (onSubmitted) onSubmitted();
    } catch (error) {
      setErr(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow">
      <h4 className="font-semibold mb-2">Write a review</h4>
      {err && <div className="mb-2 text-sm text-red-600">{err}</div>}
      <div className="mb-2">
        <StarRating value={rating} onChange={setRating} />
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share your thoughts..."
        className="w-full border p-2 rounded mb-2 min-h-[90px]"
      />
      <div className="flex justify-end">
        <button type="submit" disabled={loading} className="px-3 py-1 rounded bg-blue-600 text-white">
          {loading ? 'Sending...' : 'Submit review'}
        </button>
      </div>
    </form>
  );
}
