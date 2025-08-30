import { z } from 'zod';
import { Movie } from '../models/movie.model.js';
import { Review } from '../models/review.model.js';
import { recalcMovieRating } from '../utils/ratings.js';
import { validate } from '../middleware/validate.js';

export const createMovieSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    genre: z.array(z.string()).default([]),
    releaseYear: z.number().int().min(1888).max(new Date().getFullYear()).optional(),
    director: z.string().optional().default(''),
    cast: z.array(z.string()).default([]),
    synopsis: z.string().optional().default(''),
    posterUrl: z.string().url().optional().default('')
  })
});

export const listMoviesSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    genre: z.string().optional(),
    year: z.string().optional(),
    minRating: z.string().optional(),
    q: z.string().optional(),
    sort: z.string().optional() // e.g. '-averageRating,releaseYear'
  })
});

export const listMovies = [
  validate(listMoviesSchema),
  async (req, res, next) => {
    try {
      const page = Math.max(parseInt(req.query.page || '1', 10), 1);
      const limit = Math.min(Math.max(parseInt(req.query.limit || '12', 10), 1), 100);
      const skip = (page - 1) * limit;

      const filter = {};
      if (req.query.genre) filter.genre = { $in: req.query.genre.split(',') };
      if (req.query.year) filter.releaseYear = parseInt(req.query.year, 10);
      if (req.query.minRating) filter.averageRating = { $gte: parseFloat(req.query.minRating) };
      if (req.query.q) filter.$text = { $search: req.query.q };

      let sort = { createdAt: -1 };
      if (req.query.sort) {
        sort = {};
        req.query.sort.split(',').forEach(part => {
          const dir = part.startsWith('-') ? -1 : 1;
          const key = part.replace(/^[-+]/, '');
          sort[key] = dir;
        });
      }

      const [items, total] = await Promise.all([
        Movie.find(filter).sort(sort).skip(skip).limit(limit).lean(),
        Movie.countDocuments(filter)
      ]);

      res.json({
        meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
        data: items
      });
    } catch (err) { next(err); }
  }
];

export const getMovieById = [
  async (req, res, next) => {
    try {
      const movie = await Movie.findById(req.params.id).lean();
      if (!movie) return res.status(404).json({ message: 'Movie not found' });

      // Include last 5 reviews summary
      const reviews = await Review.find({ movieId: movie._id })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('userId', 'username profilePicture')
        .lean();

      res.json({ ...movie, recentReviews: reviews });
    } catch (err) { next(err); }
  }
];

export const createMovie = [
  validate(createMovieSchema),
  async (req, res, next) => {
    try {
      const movie = await Movie.create(req.body);
      res.status(201).json(movie);
    } catch (err) { next(err); }
  }
];