import mongoose from 'mongoose';
import { env } from './env.js';


export const connectDB = async () => {
mongoose.set('strictQuery', true);
await mongoose.connect(env.MONGODB_URI, {
autoIndex: env.NODE_ENV === 'development'
});
console.log('MongoDB connected');
};