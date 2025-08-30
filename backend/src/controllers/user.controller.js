import { z } from 'zod';
import { User } from '../models/user.model.js';
import { Review } from '../models/review.model.js';
import { Movie } from '../models/movie.model.js';
import { validate } from '../middleware/validate.js';

export const updateUserSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    username: z.string().min(3).max(30).optional(),
    profilePicture: z.string().url().optional()
  })
});

export const getUserById = [
  async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id).select('-password').lean();
      if (!user) return res.status(404).json({ message: 'User not found' });

      const reviews = await Review.find({ userId: user._id })
        .sort({ createdAt: -1 })
        .populate('movieId', 'title posterUrl')
        .lean();

      res.json({ ...user, reviewHistory: reviews });
    } catch (err) { next(err); }
  }
];

export const updateUser = [
  validate(updateUserSchema),
  async (req, res, next) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true, select: '-password' }
      );
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) { next(err); }
  }
];