import React from 'react';

export default function StarRating({ value = 0, onChange }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map((i) => (
        <button
          key={i}
          onClick={() => onChange?.(i)}
          className={`text-2xl ${i <= value ? 'text-yellow-400' : 'text-gray-300'}`}
          type="button"
          aria-label={`Rate ${i} star`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
