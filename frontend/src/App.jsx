// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import NavBar from './components/NavBar';
// import Home from './pages/Home';
// import Movies from './pages/Movies';
// import MovieDetails from './pages/MovieDetails';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Profile from './pages/Profile';
// import WatchlistPage from './pages/WatchlistPage';
// import ErrorBoundary from './components/ErrorBoundary';

// export default function App() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <NavBar />
//       <main className="container py-6 flex-1">
//         <ErrorBoundary>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/movies" element={<Movies />} />
//             <Route path="/movies/:id" element={<MovieDetails />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/profile/:id" element={<Profile />} />
//             <Route path="/profile/:id/watchlist" element={<WatchlistPage />} />
//             <Route path="*" element={<div className="text-center py-20">404 — Page not found</div>} />
//           </Routes>
//         </ErrorBoundary>
//       </main>
//       <footer className="bg-white border-t py-4 text-center text-sm">© {new Date().getFullYear()} MovieHub</footer>
//     </div>
//   );
// }

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
import AddMovie from './pages/AddMovie';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <NavBar />
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/profile/:id/watchlist" element={<WatchlistPage />} />
            <Route path="/admin/add-movie" element={<AddMovie />} />
            <Route
              path="*"
              element={
                <div className="text-center py-20">
                  <h1 className="text-3xl font-bold">404</h1>
                  <p className="text-gray-600 mt-2">Page not found</p>
                </div>
              }
            />
          </Routes>
        </ErrorBoundary>
      </main>
      <footer className="bg-white border-t py-4 text-center text-sm">
        © {new Date().getFullYear()} MovieHub
      </footer>
    </div>
  );
}


