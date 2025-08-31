import React from 'react';

export default function StarRating({ value = 0, onChange, size = 'text-2xl' }) {
  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Star rating">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          aria-checked={i === value}
          onClick={() => onChange?.(i)}
          className={`${size} ${i <= value ? 'text-yellow-400' : 'text-gray-300'} focus:outline-none`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
