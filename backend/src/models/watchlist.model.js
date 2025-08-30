import mongoose from 'mongoose';


const watchlistSchema = new mongoose.Schema(
{
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true, index: true },
dateAdded: { type: Date, default: Date.now }
},
{ timestamps: true }
);


watchlistSchema.index({ userId: 1, movieId: 1 }, { unique: true });


export const Watchlist = mongoose.model('Watchlist', watchlistSchema);