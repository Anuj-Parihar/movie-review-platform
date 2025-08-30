import { Router } from 'express';
import { listMovies, getMovieById, createMovie } from '../controllers/movie.controller.js';
import { listReviewsForMovie, createReview } from '../controllers/review.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', ...listMovies); // GET /movies
router.get('/:id', ...getMovieById); // GET /movies/:id
router.post('/', requireAuth, requireRole('admin'), ...createMovie); // POST /movies (admin)

router.get('/:id/reviews', ...listReviewsForMovie); // GET /movies/:id/reviews
router.post('/:id/reviews', requireAuth, ...createReview); // POST /movies/:id/reviews

export default router;