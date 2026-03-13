import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import swaggerUi from 'swagger-ui-express';
import settings from './config/settings.js';
import { swaggerSpec } from './config/swagger.js';
import corsMiddleware from './config/cors.js';
import { morganStream } from './config/logger.js';
import routes from './routes/index.js';
import { notFoundHandler, errorHandler } from './middlewares/errors/index.js';
import { startJobs } from './jobs/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ─────────────────────────────────────────────────────────────────────────────
const app = express();

// Security & logging
app.use(helmet());
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

// Error handling (order matters — 404 before global handler)
app.use(notFoundHandler);
app.use(errorHandler);

// Background jobs
startJobs();

export default app;
