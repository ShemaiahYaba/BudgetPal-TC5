import rateLimit from 'express-rate-limit';
import { HTTP, ERR } from '../constants/index.js';

const jsonHandler = (req, res) => {
  res.status(HTTP.TOO_MANY_REQUESTS).json({
    success: false,
    message: 'Too many requests. Please try again later.',
    data: null,
  });
};

// Login & register — 10 attempts per 15 minutes
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: jsonHandler,
});

// Forgot-password & reset-password — 5 attempts per hour
export const sensitiveAuthLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: jsonHandler,
});
