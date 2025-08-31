// import { Review } from '../models/review.model.js';
// import { Movie } from '../models/movie.model.js';


// export async function recalcMovieRating(movieId) {
// const stats = await Review.aggregate([
// { $match: { movieId: typeof movieId === 'string' ? new Review.db.Types.ObjectId(movieId) : movieId } },
// { $group: { _id: '$movieId', average: { $avg: '$rating' }, count: { $sum: 1 } } }
// ]);


// const average = stats[0]?.average || 0;
// const count = stats[0]?.count || 0;


// await Movie.findByIdAndUpdate(movieId, {
// averageRating: Math.round(average * 10) / 10,
// ratingsCount: count
// });
// }

// src/utils/ratings.js
import mongoose from 'mongoose';
import { Review } from '../models/review.model.js';
import { Movie } from '../models/movie.model.js';

export async function recalcMovieRating(movieId) {
  const mId = typeof movieId === 'string' ? new mongoose.Types.ObjectId(movieId) : movieId;

  const stats = await Review.aggregate([
    { $match: { movieId: mId } },
    { $group: { _id: '$movieId', average: { $avg: '$rating' }, count: { $sum: 1 } } }
  ]);

  const average = stats[0]?.average || 0;
  const count = stats[0]?.count || 0;

  await Movie.findByIdAndUpdate(movieId, {
    averageRating: Math.round(average * 10) / 10,
    ratingsCount: count
  });
}
