'use strict';

const { HTTP, ERR } = require('../../constants');
const { isOrmError, handleOrmError } = require('./ormError');

// Global error handler — must be registered last in app.js with 4 args
const errorHandler = (err, req, res, next) => {
  // 1. Operational errors thrown via AppError
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: null,
    });
  }

  // 2. Sequelize ORM errors
  if (isOrmError(err)) {
    const { status, payload, errors } = handleOrmError(err);
    if (errors) payload.errors = errors;
    return res.status(status).json(payload);
  }

  // 3. Unhandled / unexpected errors — log server-side, hide from client
  console.error('[Error]', err.stack);
  return res.status(HTTP.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: ERR.SERVER_ERROR,
    data: null,
  });
};

// 404 catch-all — registered before errorHandler
const notFoundHandler = (req, res) => {
  res.status(HTTP.NOT_FOUND).json({
    success: false,
    message: 'Route not found.',
    data: null,
  });
};

module.exports = { errorHandler, notFoundHandler };
