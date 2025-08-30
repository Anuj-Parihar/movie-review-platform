// src/routes/auth.routes.js
import { Router } from 'express';
import { authLimiter } from '../middleware/ratelimit.js';
import { login, register, me } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/register', authLimiter, ...register);
router.post('/login', authLimiter, ...login);
router.get('/me', requireAuth, me); 

export default router;
