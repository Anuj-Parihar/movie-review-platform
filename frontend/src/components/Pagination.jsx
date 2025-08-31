import React from 'react';

export default function Pagination({ meta, onPage }) {
  if (!meta) return null;
  const { page = 1, totalPages = 1 } = meta;

  const btn =
    'px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed focus:ring-2 focus:ring-indigo-500';

  return (
    <div className="flex items-center gap-3 justify-center mt-6">
      <button
        onClick={() => onPage(Math.max(1, page - 1))}
        disabled={page <= 1}
        className={btn}
        aria-label="Previous page"
      >
        Prev
      </button>
      <div className="px-3 py-1.5 rounded-lg border bg-gray-50 text-sm">
        {page} / {totalPages}
      </div>
      <button
        onClick={() => onPage(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        className={btn}
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
}
