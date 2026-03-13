'use strict';

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      success: false,
      message: 'A record with this value already exists.',
      data: null,
    });
  }

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation failed.',
      data: null,
      errors: err.errors.map(e => ({ field: e.path, message: e.message })),
    });
  }

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'An unexpected error occurred. Please try again.',
    data: null,
  });
};

const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found.',
    data: null,
  });
};

module.exports = { errorHandler, notFoundHandler };
