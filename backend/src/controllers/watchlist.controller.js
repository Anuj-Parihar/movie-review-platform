import { Watchlist } from '../models/watchlist.model.js';
import { Movie } from '../models/movie.model.js';

export const getWatchlist = [
  async (req, res, next) => {
    try {
      const items = await Watchlist.find({ userId: req.params.id })
        .sort({ createdAt: -1 })
        .populate('movieId', 'title posterUrl releaseYear averageRating')
        .lean();
      res.json(items);
    } catch (err) { next(err); }
  }
];

export const addToWatchlist = [
  async (req, res, next) => {
    try {
      const movieId = req.body.movieId;
      const movieExists = await Movie.exists({ _id: movieId });
      if (!movieExists) return res.status(404).json({ message: 'Movie not found' });

      const doc = await Watchlist.findOneAndUpdate(
        { userId: req.params.id, movieId },
        { $setOnInsert: { userId: req.params.id, movieId, dateAdded: new Date() } },
        { upsert: true, new: true }
      );
      res.status(201).json({ message: 'Added to watchlist', item: doc });
    } catch (err) { next(err); }
  }
];

export const removeFromWatchlist = [
  async (req, res, next) => {
    try {
      const { id, movieId } = req.params;
      const result = await Watchlist.findOneAndDelete({ userId: id, movieId });
      if (!result) return res.status(404).json({ message: 'Not in watchlist' });
      res.json({ message: 'Removed from watchlist' });
    } catch (err) { next(err); }
  }
];