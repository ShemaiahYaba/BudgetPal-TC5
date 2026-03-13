import { validationResult } from 'express-validator';
import { HTTP, ERR } from '../../constants/index.js';

/**
 * Validation — single source of truth for all validation error handling.
 *
 * 1. `validate` middleware — placed AFTER express-validator rule arrays in routes,
 *    BEFORE the controller. Short-circuits with 400 if any validation errors exist.
 *
 *    Usage in routes:
 *      import { validate } from '../middlewares/errors/index.js';
 *      router.post('/budgets', authMiddleware, [...rules], validate, controller);
 *
 * 2. `isValidationError` / `handleValidationError` — used by the global errorHandler
 *    to catch any ValidationError passed via next(err).
 */

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(HTTP.BAD_REQUEST).json({
      success: false,
      message: ERR.VALIDATION_FAILED,
      data: null,
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }

  next();
};

const isValidationError = (err) =>
  err.type === 'validation' || err.name === 'ValidationError';

const handleValidationError = (err) => ({
  status: HTTP.BAD_REQUEST,
  payload: { success: false, message: ERR.VALIDATION_FAILED, data: null },
  errors: Array.isArray(err.errors)
    ? err.errors.map((e) => ({ field: e.field || e.path, message: e.message }))
    : null,
});

export { validate, isValidationError, handleValidationError };
