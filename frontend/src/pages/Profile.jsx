import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await API.get(`/users/${id}`);
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [id]);

  if (!user) return <div>Loading...</div>;
  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold">{user.username}</h2>
        <p>{user.email}</p>
        <Link to={`/profile/${id}/watchlist`} className="text-blue-600 underline">Watchlist</Link>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Reviews</h3>
        {user.reviewHistory?.length ? (
          <div className="space-y-3 mt-3">
            {user.reviewHistory.map(r => (
              <div key={r._id} className="border p-3 rounded">
                <div className="font-semibold">{r.movieId?.title}</div>
                <div className="text-sm">{r.rating} ⭐ — {new Date(r.createdAt).toLocaleString()}</div>
                <p className="mt-2">{r.reviewText}</p>
              </div>
            ))}
          </div>
        ) : <div className="mt-2">No reviews yet</div>}
      </div>
    </div>
  );
}
