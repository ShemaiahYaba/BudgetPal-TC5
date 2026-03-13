import { HTTP, ERR } from '../../constants/index.js';

const ORM_ERROR_NAMES = new Set([
  'SequelizeValidationError',
  'SequelizeUniqueConstraintError',
  'SequelizeForeignKeyConstraintError',
  'SequelizeDatabaseError',
  'SequelizeConnectionError',
]);

const isOrmError = (err) => ORM_ERROR_NAMES.has(err.name);

const handleOrmError = (err) => {
  if (err.name === 'SequelizeUniqueConstraintError') {
    return {
      status: HTTP.CONFLICT,
      payload: { success: false, message: ERR.DUPLICATE, data: null },
    };
  }

  if (err.name === 'SequelizeValidationError') {
    return {
      status: HTTP.BAD_REQUEST,
      payload: { success: false, message: ERR.VALIDATION_FAILED, data: null },
      errors: err.errors.map((e) => ({ field: e.path, message: e.message })),
    };
  }

  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return {
      status: HTTP.BAD_REQUEST,
      payload: { success: false, message: 'Invalid reference: related record not found.', data: null },
    };
  }

  return {
    status: HTTP.INTERNAL_SERVER_ERROR,
    payload: { success: false, message: ERR.SERVER_ERROR, data: null },
  };
};

export { isOrmError, handleOrmError };
