import React from 'react';

export default function Filters({ filters, onChange }) {
  const clear = () => onChange({ q: '', genre: '', year: '', minRating: '' });

  return (
    <section className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border mb-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <label className="block">
          <span className="sr-only">Search</span>
          <input
            value={filters.q}
            onChange={(e) => onChange({ q: e.target.value })}
            placeholder="Search title, director, cast…"
            className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>

        <label className="block">
          <span className="sr-only">Genre</span>
          <select
            value={filters.genre}
            onChange={(e) => onChange({ genre: e.target.value })}
            className="w-full p-2.5 border rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All genres</option>
            <option>Action</option><option>Drama</option><option>Comedy</option>
            <option>Romance</option><option>Sci-Fi</option><option>Thriller</option>
            <option>Horror</option><option>Animation</option>
          </select>
        </label>

        <div className="flex gap-2">
          <label className="flex-1">
            <span className="sr-only">Year</span>
            <input
              value={filters.year}
              onChange={(e) => onChange({ year: e.target.value })}
              placeholder="Year"
              type="number"
              className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
          <label>
            <span className="sr-only">Min rating</span>
            <select
              value={filters.minRating}
              onChange={(e) => onChange({ minRating: e.target.value })}
              className="p-2.5 border rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Any ★</option>
              <option value="4">≥ 4</option>
              <option value="3">≥ 3</option>
              <option value="2">≥ 2</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={clear}
          className="text-sm px-3 py-1.5 rounded-lg border hover:bg-gray-50"
        >
          Clear
        </button>
      </div>
    </section>
  );
}
