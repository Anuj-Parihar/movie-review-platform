import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import WatchlistPage from './pages/WatchlistPage';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="container mx-auto p-4">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/profile/:id/watchlist" element={<WatchlistPage />} />
            <Route path="*" element={<div>Not found</div>} />
          </Routes>
        </ErrorBoundary>
      </main>
    </div>
  );
}
