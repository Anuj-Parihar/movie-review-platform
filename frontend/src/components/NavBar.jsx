import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-indigo-600 w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shadow">
            M
          </div>
          <div className="text-lg font-semibold">MovieHub</div>
        </Link>

        <nav className="flex items-center gap-3">
          <Link to="/movies" className="text-sm px-3 py-1.5 rounded-lg hover:bg-gray-100">Browse</Link>
          <Link to="/movies" className="text-sm px-3 py-1.5 rounded-lg hover:bg-gray-100">Top Rated</Link>

          {user?.role === 'admin' && (
            <Link
              to="/admin/add-movie"
              className="text-sm px-3 py-1.5 rounded-lg bg-rose-100 text-rose-700 border border-rose-200 hover:bg-rose-200 font-medium"
            >
              + Add Movie
            </Link>
          )}

          {user ? (
            <>
              <Link to={`/profile/${user.id}`} className="text-sm px-3 py-1.5 rounded-lg hover:bg-gray-100">
                Hi, {user.username}
              </Link>
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500">
                Login
              </Link>
              <Link to="/register" className="px-3 py-1.5 rounded-lg border text-sm hover:bg-gray-50">
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
