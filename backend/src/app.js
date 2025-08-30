// src/app.js
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';

import routes from './routes/index.js';
import { apiLimiter } from './middleware/ratelimit.js';
import { notFound, errorHandler } from './middleware/error.js';
import { env } from './config/env.js';

const app = express();

app.use(helmet());
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (env.CORS_ORIGINS.includes(origin)) return cb(null, true);
    return cb(new Error('CORS not allowed'), false);
  },
  credentials: true
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// ✅ FIXED: don't overwrite req.query/body/params
// src/app.js
// app.use(mongoSanitize({ replaceWith: '_' }));



app.use(compression());
app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined'));

app.use('/api', apiLimiter, routes);

app.use(notFound);
app.use(errorHandler);

export default app;
