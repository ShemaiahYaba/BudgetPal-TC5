import { HTTP, ERR } from '../../constants/index.js';
import AppError from './appError.js';
import { validate, isValidationError, handleValidationError } from './validationError.js';
import { isOrmError, handleOrmError } from './ormError.js';
import { handleServerError } from './serverError.js';

/**
 * Errors module — barrel export + Express middleware assembly.
 *
 * Exported for use throughout the codebase:
 *   AppError            — throw new AppError('msg', HTTP.NOT_FOUND)
 *   validate            — express-validator middleware (use in routes)
 *   isOrmError          — Sequelize error detector
 *   handleOrmError      — Sequelize error formatter
 *   handleServerError   — 500 catch-all formatter
 *
 * Exported middleware (register in app.js):
 *   notFoundHandler     — 404 catch-all, AFTER all routes
 *   errorHandler        — global handler, LAST (4-arg signature)
 */

// ─── Express Middleware ───────────────────────────────────────────────────────

const notFoundHandler = (_req, res) => {
  res.status(HTTP.NOT_FOUND).json({
    success: false,
    message: ERR.ROUTE_NOT_FOUND,
    data: null,
  });
};

const errorHandler = (err, _req, res, _next) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: null,
    });
  }

  if (isValidationError(err)) {
    const { status, payload, errors } = handleValidationError(err);
    if (errors) payload.errors = errors;
    return res.status(status).json(payload);
  }

  if (isOrmError(err)) {
    const { status, payload, errors } = handleOrmError(err);
    if (errors) payload.errors = errors;
    return res.status(status).json(payload);
  }

  const { status, payload } = handleServerError(err);
  res.status(status).json(payload);
};

// ─── Barrel ──────────────────────────────────────────────────────────────────

export {
  AppError,
  validate,
  isValidationError,
  handleValidationError,
  isOrmError,
  handleOrmError,
  handleServerError,
  notFoundHandler,
  errorHandler,
};
