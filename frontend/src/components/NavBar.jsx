import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function NavBar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const doLogout = () => {
    logout();
    nav('/');
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">MovieHub</Link>
        <div className="flex items-center gap-4">
          <Link to="/movies" className="hover:underline">Browse</Link>
          {user ? (
            <>
              <Link to={`/profile/${user.id}`} className="hover:underline">Hi, {user.username}</Link>
              <button onClick={doLogout} className="px-3 py-1 rounded bg-gray-200">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 rounded bg-blue-600 text-white">Login</Link>
              <Link to="/register" className="px-3 py-1 rounded border">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
