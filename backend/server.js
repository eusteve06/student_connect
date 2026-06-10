import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import apiRouter from './routes/index.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { initDb } from './data/db.js';

dotenv.config();

// Ensure a JWT secret always exists so auth never crashes in dev.
process.env.JWT_SECRET = process.env.JWT_SECRET || process.env.JSON_SECRET_KEY || 'dev-only-insecure-secret';

const app = express();

// Global CORS — allows the Vite dev server (and any origin in dev) to call the API.
app.use(cors());
app.use(express.json());

// Request logger (lightweight, no extra dependency).
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Health check.
app.get('/', (_req, res) => res.send('Industrial Attachment API Engine Operational.'));

// Mount the full API. The frontend's studentService/universityService call
// `/api/v1/...`, while firmService calls `/firm/...` directly — so we mount the
// same router at both the versioned prefix and the root to satisfy both.
app.use('/api/v1', apiRouter);
app.use('/', apiRouter);

// 404 + central error handling (must be last).
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Initialise the database (real PostgreSQL via DATABASE_URL, else seeded pg-mem)
// before accepting traffic.
initDb()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Backend running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error(`Failed to initialise database: ${err.message}`);
    process.exit(1);
  });
