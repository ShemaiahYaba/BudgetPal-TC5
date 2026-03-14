import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import swaggerUi from 'swagger-ui-express';
import settings from './config/settings.js';
import { swaggerSpec } from './config/swagger.js';
import corsMiddleware from './config/cors.js';
import logger, { morganStream } from './config/logger.js';
import routes from './routes/index.js';
import viewRoutes from './routes/viewRoutes.js';
import { notFoundHandler, errorHandler } from './middlewares/errors/index.js';
import { startJobs } from './jobs/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ─────────────────────────────────────────────────────────────────────────────
const app = express();

// Static assets (before any middleware that might block them)
app.use(express.static(join(__dirname, '..', 'public')));

// Security & logging
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc:  ["'self'"],
      scriptSrc:   ["'self'", 'https://cdn.tailwindcss.com'],
      styleSrc:    ["'self'", "'unsafe-inline'"],
      connectSrc:  ["'self'", 'https://cdn.tailwindcss.com'],
      imgSrc:      ["'self'", 'data:'],
      fontSrc:     ["'self'", 'https://cdn.tailwindcss.com'],
      objectSrc:   ["'none'"],
      frameAncestors: ["'none'"],
    },
  },
}));

// Relax CSP for Swagger UI (uses inline scripts)
app.use('/api/v1/docs', (_req, res, next) => {
  res.removeHeader('Content-Security-Policy');
  next();
});

app.use(corsMiddleware);
app.use(morgan(settings.isDev ? 'dev' : 'combined', { stream: morganStream }));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Template engine
app.set('view engine', 'ejs');
app.set('views', join(__dirname, '..', 'views'));

// Swagger UI
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use('/api/v1', routes);

// Web views
app.use('/', viewRoutes);

// Error handling (order matters — 404 before global handler)
app.use(notFoundHandler);
app.use(errorHandler);

// Background jobs
startJobs();

// Start server
app.listen(settings.port, () => {
  logger.info(`BudgetPal API running on port ${settings.port} [${settings.nodeEnv}]`);
});

export default app;
