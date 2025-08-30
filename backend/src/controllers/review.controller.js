import { z } from 'zod';
import { Review } from '../models/review.model.js';
import { Movie } from '../models/movie.model.js';
import { recalcMovieRating } from '../utils/ratings.js';
import { validate } from '../middleware/validate.js';

export const createReviewSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    rating: z.number().min(1).max(5),
    reviewText: z.string().max(5000).optional().default('')
  })
});

export const listReviewsSchema = z.object({
  params: z.object({ id: z.string() }),
  query: z.object({ page: z.string().optional(), limit: z.string().optional() })
});

export const listReviewsForMovie = [
  validate(listReviewsSchema),
  async (req, res, next) => {
    try {
      const page = Math.max(parseInt(req.query.page || '1', 10), 1);
      const limit = Math.min(Math.max(parseInt(req.query.limit || '10', 10), 1), 100);
      const skip = (page - 1) * limit;

      const [items, total] = await Promise.all([
        Review.find({ movieId: req.params.id })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .populate('userId', 'username profilePicture')
          .lean(),
        Review.countDocuments({ movieId: req.params.id })
      ]);

      res.json({ meta: { page, limit, total, totalPages: Math.ceil(total / limit) }, data: items });
    } catch (err) { next(err); }
  }
];

export const createReview = [
  validate(createReviewSchema),
  async (req, res, next) => {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) return res.status(404).json({ message: 'Movie not found' });

      const exists = await Review.findOne({ userId: req.user.id, movieId: req.params.id });
      if (exists) return res.status(409).json({ message: 'You have already reviewed this movie' });

      await Review.create({ userId: req.user.id, movieId: req.params.id, rating: req.body.rating, reviewText: req.body.reviewText || '' });
      await recalcMovieRating(req.params.id);

      res.status(201).json({ message: 'Review added' });
    } catch (err) { next(err); }
  }
];