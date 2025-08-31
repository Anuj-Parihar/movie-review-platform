import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setErr(null);
    API.get(`/users/${id}`)
      .then((r) => setUser(r.data.data || r.data))
      .catch((e) => { console.error(e); setErr('Failed to load profile'); });
  }, [id]);

  if (err) return <div className="text-center text-red-600 py-10">{err}</div>;
  if (!user) return (
    <div className="text-center py-20">
      <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-indigo-600" />
      <p className="mt-3 text-gray-600">Loading…</p>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-2xl shadow-sm border flex items-center gap-4">
        <img src={user.profilePicture || '/avatar-placeholder.png'} alt={user.username} className="w-16 h-16 rounded-full border" />
        <div>
          <h2 className="text-lg font-semibold">{user.username}</h2>
          <div className="text-sm text-gray-500">{user.email}</div>
          <Link to={`/profile/${id}/watchlist`} className="text-indigo-600 mt-2 inline-block hover:underline">
            View watchlist
          </Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border">
        <h3 className="font-semibold">Review history</h3>
        {user.reviewHistory?.length ? (
          <div className="space-y-3 mt-3">
            {user.reviewHistory.map((r) => (
              <div className="border p-3 rounded-xl" key={r._id}>
                <div className="flex justify-between">
                  <div className="font-semibold">{r.movieId?.title || 'Movie'}</div>
                  <div className="text-sm text-gray-400">{r.createdAt ? new Date(r.createdAt).toLocaleString() : ''}</div>
                </div>
                <div className="mt-2">{r.rating} ★</div>
                <p className="mt-2 text-gray-700">{r.reviewText}</p>
              </div>
            ))}
          </div>
        ) : <div className="mt-2 text-gray-600">No reviews yet</div>}
      </div>
    </div>
  );
}
