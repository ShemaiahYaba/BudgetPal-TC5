import { HTTP, ERR } from '../../constants/index.js';
import { isOrmError, handleOrmError } from './ormError.js';

const errorHandler = (err, req, res, next) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: null,
    });
  }

  if (isOrmError(err)) {
    const { status, payload, errors } = handleOrmError(err);
    if (errors) payload.errors = errors;
    return res.status(status).json(payload);
  }

  console.error('[Error]', err.stack);
  return res.status(HTTP.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: ERR.SERVER_ERROR,
    data: null,
  });
};

const notFoundHandler = (req, res) => {
  res.status(HTTP.NOT_FOUND).json({
    success: false,
    message: 'Route not found.',
    data: null,
  });
};

export { errorHandler, notFoundHandler };
