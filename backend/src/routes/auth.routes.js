import { Router } from 'express';
import { authLimiter } from '../middleware/ratelimit.js';
import { login, register } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', authLimiter, ...register);
router.post('/login', authLimiter, ...login);

export default router;