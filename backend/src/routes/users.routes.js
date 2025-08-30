import { Router } from 'express';
import { getUserById, updateUser } from '../controllers/user.controller.js';
import { getWatchlist, addToWatchlist, removeFromWatchlist } from '../controllers/watchlist.controller.js';
import { requireAuth, requireSelfOrAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/:id', ...getUserById); // GET /users/:id
router.put('/:id', requireAuth, requireSelfOrAdmin('id'), ...updateUser); // PUT /users/:id

router.get('/:id/watchlist', requireAuth, requireSelfOrAdmin('id'), ...getWatchlist); // GET watchlist
router.post('/:id/watchlist', requireAuth, requireSelfOrAdmin('id'), ...addToWatchlist); // POST watchlist
router.delete('/:id/watchlist/:movieId', requireAuth, requireSelfOrAdmin('id'), ...removeFromWatchlist); // DELETE watchlist item

export default router;