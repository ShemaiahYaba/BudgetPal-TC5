import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, logout, refresh, forgotPassword, resetPassword, me } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/errors/validationError.js';
import { authLimiter, sensitiveAuthLimiter } from '../config/rateLimiter.js';

const router = Router();

router.post(
  '/register',
  authLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  ],
  validate,
  register
);

router.post(
  '/login',
  authLimiter,
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validate,
  login
);

router.post('/logout', authMiddleware, logout);

router.post(
  '/refresh',
  [body('refresh_token').notEmpty().withMessage('Refresh token is required')],
  validate,
  refresh
);

router.post(
  '/forgot-password',
  sensitiveAuthLimiter,
  [body('email').isEmail().withMessage('Valid email is required')],
  validate,
  forgotPassword
);

router.post(
  '/reset-password',
  sensitiveAuthLimiter,
  [
    body('token').notEmpty().withMessage('Token is required'),
    body('new_password').isLength({ min: 8 }).withMessage('New password must be at least 8 characters'),
  ],
  validate,
  resetPassword
);

router.get('/me', authMiddleware, me);

export default router;
