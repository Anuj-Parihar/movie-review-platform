import { Router } from 'express';
import authRoutes from './auth.routes.js';
import movieRoutes from './movies.routes.js';
import userRoutes from './users.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/movies', movieRoutes);
router.use('/users', userRoutes);

export default router;