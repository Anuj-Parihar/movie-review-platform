import mongoose from 'mongoose';


const movieSchema = new mongoose.Schema(
{
title: { type: String, required: true, trim: true },
genre: [{ type: String, index: true }],
releaseYear: { type: Number, index: true },
director: { type: String, default: '' },
cast: [{ type: String, index: true }],
synopsis: { type: String, default: '' },
posterUrl: { type: String, default: '' },
averageRating: { type: Number, default: 0 },
ratingsCount: { type: Number, default: 0 }
},
{ timestamps: true }
);


movieSchema.index({ title: 'text', director: 'text', cast: 'text' });


export const Movie = mongoose.model('Movie', movieSchema);