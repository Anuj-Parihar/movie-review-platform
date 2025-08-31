import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { useAuth } from '../contexts/AuthContext';

export default function AddMovie() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    genre: '',
    releaseYear: '',
    director: '',
    cast: '',
    synopsis: '',
    posterUrl: '',
    trailerUrl: ''
  });
  const [submitting, setSubmitting] = useState(false);

  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-lg mx-auto bg-white rounded-2xl border shadow p-6 text-center text-red-600">
        Access Denied: Admins Only
      </div>
    );
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await API.post('/movies', {
        title: form.title.trim(),
        genre: form.genre.split(',').map((g) => g.trim()).filter(Boolean),
        releaseYear: Number(form.releaseYear),
        director: form.director.trim(),
        cast: form.cast.split(',').map((c) => c.trim()).filter(Boolean),
        synopsis: form.synopsis.trim(),
        posterUrl: form.posterUrl.trim(),
        trailerUrl: form.trailerUrl.trim() || undefined
      });
      alert('✅ Movie added successfully!');
      navigate('/movies');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add movie');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-sm border rounded-2xl p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Movie</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required
          className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
        <input name="genre" placeholder="Genres (comma separated)" value={form.genre} onChange={handleChange} required
          className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
        <input type="number" name="releaseYear" placeholder="Release Year" value={form.releaseYear} onChange={handleChange} required
          className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
        <input name="director" placeholder="Director" value={form.director} onChange={handleChange} required
          className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
        <input name="cast" placeholder="Cast (comma separated)" value={form.cast} onChange={handleChange} required
          className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
        <textarea name="synopsis" placeholder="Synopsis" value={form.synopsis} onChange={handleChange} rows="4" required
          className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
        <input type="url" name="posterUrl" placeholder="Poster URL" value={form.posterUrl} onChange={handleChange} required
          className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
        <input type="url" name="trailerUrl" placeholder="Trailer URL (optional, embeddable)" value={form.trailerUrl} onChange={handleChange}
          className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-xl shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {submitting ? 'Adding…' : 'Add Movie'}
        </button>
      </form>
    </div>
  );
}
