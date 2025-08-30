import dotenv from 'dotenv';
import { z } from 'zod';


dotenv.config();


const EnvSchema = z.object({
PORT: z.string().default('4000'),
NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
MONGODB_URI: z.string().url().or(z.string().startsWith('mongodb://')).or(z.string().startsWith('mongodb+srv://')),
JWT_SECRET: z.string().min(16),
JWT_EXPIRES_IN: z.string().default('7d'),
BCRYPT_SALT_ROUNDS: z.string().default('10'),
CORS_ORIGINS: z.string().default('http://localhost:5173')
});


const _env = EnvSchema.safeParse(process.env);
if (!_env.success) {
console.error('❌ Invalid environment variables:', _env.error.flatten().fieldErrors);
process.exit(1);
}


export const env = {
..._env.data,
PORT: parseInt(_env.data.PORT, 10),
BCRYPT_SALT_ROUNDS: parseInt(_env.data.BCRYPT_SALT_ROUNDS, 10),
CORS_ORIGINS: _env.data.CORS_ORIGINS.split(',').map(s => s.trim())
};