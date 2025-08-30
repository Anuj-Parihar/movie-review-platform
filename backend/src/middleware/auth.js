import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User } from '../models/user.model.js';

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    req.user = payload; // { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

export function requireSelfOrAdmin(paramKey = 'id') {
  return async (req, res, next) => {
    const requester = req.user; // from requireAuth
    const targetId = req.params[paramKey];

    if (requester?.role === 'admin' || requester?.id === targetId) return next();
    return res.status(403).json({ message: 'Forbidden' });
  };
}

export function requireRole(role = 'admin') {
  return (req, res, next) => {
    if (req.user?.role === role) return next();
    return res.status(403).json({ message: 'Admin only' });
  };
}